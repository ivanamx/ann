import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  JWT_SECRET: z.string().min(16).default("dev-jwt-secret-change-me"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ADMIN_EMAIL: z.string().email().default("atelier@annatelier.com"),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("Ann Atelier <onboarding@resend.dev>"),
  ATELIER_NOTIFY_EMAIL: z.string().email().default("atelier@annatelier.com"),
});

export const env = envSchema.parse(process.env);

export const isEmailEnabled = Boolean(env.RESEND_API_KEY);
