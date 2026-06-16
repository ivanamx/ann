import { and, eq, ne, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import {
  appointments,
  businessSettings,
  contacts,
  scheduleBlocks,
  type BusinessHours,
} from "../db/schema.js";

const DEFAULT_HOURS: BusinessHours = {
  timezone: "America/Chicago",
  weekdays: [2, 3, 4, 5, 6],
  slot_hours: [10, 11, 12, 13, 14, 15, 16, 17],
  slot_duration_minutes: 60,
  appointment_only: true,
};

export async function getBusinessHours(): Promise<BusinessHours> {
  const [row] = await db
    .select()
    .from(businessSettings)
    .where(eq(businessSettings.key, "hours"))
    .limit(1);

  if (!row?.value) return DEFAULT_HOURS;
  return { ...DEFAULT_HOURS, ...(row.value as BusinessHours) };
}

function parseDateParts(date: string): { year: number; month: number; day: number } {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) throw new Error("INVALID_DATE");

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(year, month - 1, day);

  if (
    probe.getFullYear() !== year ||
    probe.getMonth() !== month - 1 ||
    probe.getDate() !== day
  ) {
    throw new Error("INVALID_DATE");
  }

  return { year, month, day };
}

async function houstonWeekday(date: string): Promise<number> {
  const result = await db.execute<{ weekday: number }>(sql`
    SELECT EXTRACT(DOW FROM (${date}::date AT TIME ZONE 'America/Chicago'))::int AS weekday
  `);
  return Number(result.rows[0]?.weekday ?? -1);
}

async function slotStartsAt(
  date: string,
  hour: number,
  timezone: string,
): Promise<Date> {
  const result = await db.execute<{ starts_at: string }>(sql`
    SELECT ((${date}::date + ${hour} * interval '1 hour') AT TIME ZONE ${timezone}) AS starts_at
  `);
  const value = result.rows[0]?.starts_at;
  if (!value) throw new Error("INVALID_SLOT");
  return new Date(value);
}

export async function getAvailableSlots(date: string): Promise<number[]> {
  const hours = await getBusinessHours();
  parseDateParts(date);

  const weekday = await houstonWeekday(date);
  if (!hours.weekdays.includes(weekday)) {
    return [];
  }

  const futureSlots = await db.execute<{ hour: number }>(sql`
    SELECT hour
    FROM unnest(${sql.raw(`ARRAY[${hours.slot_hours.join(",")}]`)}::int[]) AS hour
    WHERE ((${date}::date + hour * interval '1 hour') AT TIME ZONE ${hours.timezone}) > now()
  `);

  const candidateHours = futureSlots.rows.map((row) => Number(row.hour));
  if (candidateHours.length === 0) return [];

  const booked = await db
    .select({
      hour: sql<number>`EXTRACT(HOUR FROM (${appointments.startsAt} AT TIME ZONE ${hours.timezone}))::int`,
    })
    .from(appointments)
    .where(
      and(
        ne(appointments.status, "cancelled"),
        sql`(${appointments.startsAt} AT TIME ZONE ${hours.timezone})::date = ${date}::date`,
      ),
    );

  const bookedHours = new Set(booked.map((row) => row.hour));

  const blocked = await db
    .select({ startsAt: scheduleBlocks.startsAt, endsAt: scheduleBlocks.endsAt })
    .from(scheduleBlocks)
    .where(
      sql`${scheduleBlocks.startsAt} < ((${date}::date + interval '1 day') AT TIME ZONE ${hours.timezone})
        AND ${scheduleBlocks.endsAt} > ((${date}::date) AT TIME ZONE ${hours.timezone})`,
    );

  const available: number[] = [];

  for (const hour of candidateHours) {
    if (bookedHours.has(hour)) continue;

    const slotStart = await slotStartsAt(date, hour, hours.timezone);
    const slotEnd = new Date(slotStart.getTime() + hours.slot_duration_minutes * 60_000);
    const overlapsBlock = blocked.some(
      (block) => slotStart < block.endsAt && slotEnd > block.startsAt,
    );

    if (!overlapsBlock) available.push(hour);
  }

  return available;
}

type CreateAppointmentInput = {
  fullName: string;
  email: string;
  locale: "en" | "es";
  occasion?: string;
  date: string;
  hour: number;
};

export async function createAppointment(input: CreateAppointmentInput) {
  const hours = await getBusinessHours();
  parseDateParts(input.date);

  const weekday = await houstonWeekday(input.date);
  if (!hours.weekdays.includes(weekday)) {
    throw new Error("DATE_NOT_AVAILABLE");
  }

  if (!hours.slot_hours.includes(input.hour)) {
    throw new Error("INVALID_SLOT");
  }

  const available = await getAvailableSlots(input.date);
  if (!available.includes(input.hour)) {
    throw new Error("SLOT_UNAVAILABLE");
  }

  const startsAt = await slotStartsAt(input.date, input.hour, hours.timezone);
  const endsAt = new Date(startsAt.getTime() + hours.slot_duration_minutes * 60_000);

  return db.transaction(async (tx) => {
    const [existingContact] = await tx
      .select()
      .from(contacts)
      .where(sql`lower(${contacts.email}) = lower(${input.email})`)
      .limit(1);

    let contact = existingContact;

    if (!contact) {
      const [created] = await tx
        .insert(contacts)
        .values({
          fullName: input.fullName.trim(),
          email: input.email.trim().toLowerCase(),
          locale: input.locale,
          source: "booking",
        })
        .returning();
      contact = created;
    } else if (contact.fullName !== input.fullName.trim()) {
      const [updated] = await tx
        .update(contacts)
        .set({ fullName: input.fullName.trim(), locale: input.locale })
        .where(eq(contacts.id, contact.id))
        .returning();
      contact = updated ?? contact;
    }

    if (!contact) throw new Error("CONTACT_CREATE_FAILED");

    const [appointment] = await tx
      .insert(appointments)
      .values({
        contactId: contact.id,
        startsAt,
        endsAt,
        occasion: input.occasion?.trim() || null,
        status: "pending",
      })
      .returning();

    return appointment;
  });
}
