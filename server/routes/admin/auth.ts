import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { requireAdmin } from "../../middleware/auth.js";
import { getAdminById, verifyAdminPassword } from "../../services/auth.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const adminAuthRoutes: FastifyPluginAsync = async (app) => {
  app.post("/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "INVALID_BODY" });
    }

    const user = await verifyAdminPassword(parsed.data.email, parsed.data.password);
    if (!user) {
      return reply.status(401).send({ error: "INVALID_CREDENTIALS" });
    }

    await reply.jwtSign(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: "7d" },
    );

    return { user };
  });

  app.post("/logout", async (_request, reply) => {
    reply.clearCookie("admin_token", { path: "/" });
    return { ok: true };
  });

  app.get("/me", { preHandler: requireAdmin }, async (request, reply) => {
    const payload = request.user as { sub: string };
    const user = await getAdminById(payload.sub);
    if (!user) {
      return reply.status(401).send({ error: "UNAUTHORIZED" });
    }
    return { user };
  });
};
