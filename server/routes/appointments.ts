import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { createAppointment } from "../services/booking.js";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  occasion: z.string().trim().max(200).optional(),
  locale: z.enum(["en", "es"]).default("en"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hour: z.number().int().min(0).max(23),
});

export const appointmentRoutes: FastifyPluginAsync = async (app) => {
  app.post("/appointments", async (request, reply) => {
    const parsed = bodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "INVALID_BODY", details: parsed.error.flatten() });
    }

    try {
      const appointment = await createAppointment({
        fullName: parsed.data.name,
        email: parsed.data.email,
        locale: parsed.data.locale,
        occasion: parsed.data.occasion,
        date: parsed.data.date,
        hour: parsed.data.hour,
      });

      void import("../services/email.js").then(({ sendAppointmentReceivedEmail }) =>
        sendAppointmentReceivedEmail({
          fullName: parsed.data.name,
          email: parsed.data.email,
          locale: parsed.data.locale,
          startsAt: appointment.startsAt,
          occasion: parsed.data.occasion,
        }).catch((error) => {
          app.log.error({ err: error }, "Failed to send appointment email");
        }),
      );

      return reply.status(201).send({
        id: appointment.id,
        startsAt: appointment.startsAt.toISOString(),
        status: appointment.status,
      });
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      const code = error.message;
      if (
        code === "DATE_NOT_AVAILABLE" ||
        code === "INVALID_SLOT" ||
        code === "SLOT_UNAVAILABLE"
      ) {
        return reply.status(409).send({ error: code });
      }

      if (code === "INVALID_DATE") {
        return reply.status(400).send({ error: code });
      }

      throw error;
    }
  });
};
