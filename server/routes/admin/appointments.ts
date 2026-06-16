import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { requireAdmin } from "../../middleware/auth.js";
import {
  listAppointments,
  updateAppointmentStatus,
  type AppointmentStatus,
} from "../../services/admin-appointments.js";
import { sendAppointmentConfirmedEmail } from "../../services/email.js";

const statusSchema = z.enum(["pending", "confirmed", "cancelled", "completed", "no_show"]);

const listQuerySchema = z.object({
  status: statusSchema.optional(),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const patchBodySchema = z.object({
  status: statusSchema,
});

export const adminAppointmentRoutes: FastifyPluginAsync = async (app) => {
  app.addHook("preHandler", requireAdmin);

  app.get("/appointments", async (request, reply) => {
    const parsed = listQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({ error: "INVALID_QUERY" });
    }

    const appointments = await listAppointments(parsed.data);
    return { appointments };
  });

  app.patch("/appointments/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = patchBodySchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({ error: "INVALID_BODY" });
    }

    const previous = await listAppointments();
    const existing = previous.find((item) => item.id === id);
    if (!existing) {
      return reply.status(404).send({ error: "NOT_FOUND" });
    }

    const updated = await updateAppointmentStatus(id, parsed.data.status as AppointmentStatus);
    if (!updated) {
      return reply.status(404).send({ error: "NOT_FOUND" });
    }

    if (parsed.data.status === "confirmed" && existing.status !== "confirmed") {
      void sendAppointmentConfirmedEmail(updated).catch((error) => {
        app.log.error({ err: error }, "Failed to send confirmation email");
      });
    }

    return { appointment: updated };
  });
};
