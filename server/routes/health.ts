import type { FastifyPluginAsync } from "fastify";
import { checkDbConnection } from "../db/index.js";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => {
    const dbOk = await checkDbConnection();
    return {
      status: dbOk ? "ok" : "degraded",
      db: dbOk,
      timestamp: new Date().toISOString(),
    };
  });
};
