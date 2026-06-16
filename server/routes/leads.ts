import { eq, sql } from "drizzle-orm";
import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { contacts, leads } from "../db/schema.js";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  occasion: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  dressInterest: z.string().trim().max(120).optional(),
  locale: z.enum(["en", "es"]).default("en"),
});

export const leadRoutes: FastifyPluginAsync = async (app) => {
  app.post("/leads", async (request, reply) => {
    const parsed = bodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "INVALID_BODY", details: parsed.error.flatten() });
    }

    const data = parsed.data;

    const result = await db.transaction(async (tx) => {
      const [existingContact] = await tx
        .select()
        .from(contacts)
        .where(sql`lower(${contacts.email}) = lower(${data.email})`)
        .limit(1);

      let contact = existingContact;

      if (!contact) {
        const [created] = await tx
          .insert(contacts)
          .values({
            fullName: data.name,
            email: data.email.toLowerCase(),
            locale: data.locale,
            source: "website",
          })
          .returning();
        contact = created;
      } else {
        const [updated] = await tx
          .update(contacts)
          .set({ fullName: data.name, locale: data.locale })
          .where(eq(contacts.id, contact.id))
          .returning();
        contact = updated ?? contact;
      }

      if (!contact) throw new Error("CONTACT_CREATE_FAILED");

      const [lead] = await tx
        .insert(leads)
        .values({
          contactId: contact.id,
          occasion: data.occasion || null,
          message: data.message || null,
          dressInterest: data.dressInterest || null,
        })
        .returning();

      return lead;
    });

    return reply.status(201).send({ id: result.id, status: result.status });
  });
};
