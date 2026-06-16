import { and, desc, eq, gte, lte, ne, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { appointments, contacts } from "../db/schema.js";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type AdminAppointment = {
  id: string;
  startsAt: string;
  endsAt: string;
  occasion: string | null;
  notes: string | null;
  status: AppointmentStatus;
  createdAt: string;
  contact: {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    locale: string;
  };
};

type ListFilters = {
  status?: AppointmentStatus;
  from?: string;
  to?: string;
};

export async function listAppointments(filters: ListFilters = {}): Promise<AdminAppointment[]> {
  const conditions = [];

  if (filters.status) {
    conditions.push(eq(appointments.status, filters.status));
  }

  if (filters.from) {
    conditions.push(gte(appointments.startsAt, new Date(`${filters.from}T00:00:00.000Z`)));
  }

  if (filters.to) {
    conditions.push(lte(appointments.startsAt, new Date(`${filters.to}T23:59:59.999Z`)));
  }

  const rows = await db
    .select({
      id: appointments.id,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
      occasion: appointments.occasion,
      notes: appointments.notes,
      status: appointments.status,
      createdAt: appointments.createdAt,
      contactId: contacts.id,
      fullName: contacts.fullName,
      email: contacts.email,
      phone: contacts.phone,
      locale: contacts.locale,
    })
    .from(appointments)
    .innerJoin(contacts, eq(appointments.contactId, contacts.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(appointments.startsAt));

  return rows.map((row) => ({
    id: row.id,
    startsAt: row.startsAt.toISOString(),
    endsAt: row.endsAt.toISOString(),
    occasion: row.occasion,
    notes: row.notes,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    contact: {
      id: row.contactId,
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      locale: row.locale,
    },
  }));
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const now = new Date();
  const patch: Partial<typeof appointments.$inferInsert> = { status };

  if (status === "confirmed") {
    patch.confirmedAt = now;
    patch.cancelledAt = null;
  }

  if (status === "cancelled") {
    patch.cancelledAt = now;
  }

  const [updated] = await db
    .update(appointments)
    .set(patch)
    .where(eq(appointments.id, id))
    .returning();

  if (!updated) return null;

  const [row] = await db
    .select({
      id: appointments.id,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
      occasion: appointments.occasion,
      notes: appointments.notes,
      status: appointments.status,
      createdAt: appointments.createdAt,
      contactId: contacts.id,
      fullName: contacts.fullName,
      email: contacts.email,
      phone: contacts.phone,
      locale: contacts.locale,
    })
    .from(appointments)
    .innerJoin(contacts, eq(appointments.contactId, contacts.id))
    .where(eq(appointments.id, id))
    .limit(1);

  if (!row) return null;

  return {
    id: row.id,
    startsAt: row.startsAt.toISOString(),
    endsAt: row.endsAt.toISOString(),
    occasion: row.occasion,
    notes: row.notes,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    contact: {
      id: row.contactId,
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      locale: row.locale,
    },
  } satisfies AdminAppointment;
}

export async function getAppointmentById(id: string) {
  const items = await listAppointments();
  return items.find((item) => item.id === id) ?? null;
}

export async function countUpcomingAppointments() {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(appointments)
    .where(and(ne(appointments.status, "cancelled"), gte(appointments.startsAt, new Date())));

  return row?.count ?? 0;
}
