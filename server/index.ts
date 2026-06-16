import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import { env } from "./env.js";
import { appointmentRoutes } from "./routes/appointments.js";
import { adminAppointmentRoutes } from "./routes/admin/appointments.js";
import { adminAuthRoutes } from "./routes/admin/auth.js";
import { availabilityRoutes } from "./routes/availability.js";
import { healthRoutes } from "./routes/health.js";
import { leadRoutes } from "./routes/leads.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST", "PATCH", "OPTIONS"],
  credentials: true,
});

await app.register(cookie);
await app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "admin_token",
    signed: false,
  },
});

await app.register(healthRoutes, { prefix: "/api" });
await app.register(availabilityRoutes, { prefix: "/api" });
await app.register(appointmentRoutes, { prefix: "/api" });
await app.register(leadRoutes, { prefix: "/api" });
await app.register(adminAuthRoutes, { prefix: "/api/admin" });
await app.register(adminAppointmentRoutes, { prefix: "/api/admin" });

try {
  await app.listen({ port: env.PORT, host: env.HOST });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
