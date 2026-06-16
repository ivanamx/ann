/** Mar–Sáb · 10am–6pm (Houston atelier) */
export const BOOKING_OPEN_WEEKDAYS = [2, 3, 4, 5, 6] as const;

export const BOOKING_SLOT_HOURS = [10, 11, 12, 13, 14, 15, 16, 17] as const;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isDateSelectable(date: Date, today = startOfDay(new Date())): boolean {
  const day = startOfDay(date);
  if (day < today) return false;
  return BOOKING_OPEN_WEEKDAYS.includes(day.getDay() as (typeof BOOKING_OPEN_WEEKDAYS)[number]);
}

export function getMonthMatrix(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

export function formatSlotTime(hour: number, locale: string): string {
  const d = new Date(2026, 0, 1, hour, 0);
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function formatSelectedDateTime(
  date: Date,
  hour: number,
  locale: string,
): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0);
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}
