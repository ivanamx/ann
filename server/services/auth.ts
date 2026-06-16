import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { adminUsers } from "../db/schema.js";

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

export async function findAdminByEmail(email: string) {
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(sql`lower(${adminUsers.email}) = lower(${email})`)
    .limit(1);

  return user ?? null;
}

export async function verifyAdminPassword(email: string, password: string) {
  const user = await findAdminByEmail(email);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return toPublicAdmin(user);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function upsertAdminUser(input: {
  email: string;
  password: string;
  fullName: string;
  role?: string;
}) {
  const passwordHash = await hashPassword(input.password);
  const existing = await findAdminByEmail(input.email);

  if (existing) {
    const [updated] = await db
      .update(adminUsers)
      .set({
        passwordHash,
        fullName: input.fullName,
        role: input.role ?? existing.role,
      })
      .where(eq(adminUsers.id, existing.id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(adminUsers)
    .values({
      email: input.email.toLowerCase(),
      passwordHash,
      fullName: input.fullName,
      role: input.role ?? "owner",
    })
    .returning();

  return created;
}

function toPublicAdmin(user: typeof adminUsers.$inferSelect): AdminUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  return user ? toPublicAdmin(user) : null;
}
