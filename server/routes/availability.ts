import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getAvailableSlots } from "../services/booking.js";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const availabilityRoutes: FastifyPluginAsync = async (app) => {
  app.get("/availability", async (request, reply) => {
    const parsed = querySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({ error: "INVALID_DATE" });
    }

    try {
      const slots = await getAvailableSlots(parsed.data.date);
      return { date: parsed.data.date, slots };
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_DATE") {
        return reply.status(400).send({ error: "INVALID_DATE" });
      }
      throw error;
    }
  });
};
