export type AvailabilityResponse = {
  date: string;
  slots: number[];
};

export type CreateAppointmentPayload = {
  name: string;
  email: string;
  occasion?: string;
  locale: "en" | "es";
  date: string;
  hour: number;
};

export type CreateAppointmentResponse = {
  id: string;
  startsAt: string;
  status: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new ApiError(data.error ?? "REQUEST_FAILED", res.status, data.error);
  }
  return data;
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function fetchAvailability(date: Date): Promise<AvailabilityResponse> {
  const params = new URLSearchParams({ date: toDateKey(date) });
  const res = await fetch(`/api/availability?${params}`);
  return parseJson<AvailabilityResponse>(res);
}

export async function createAppointment(
  payload: CreateAppointmentPayload,
): Promise<CreateAppointmentResponse> {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson<CreateAppointmentResponse>(res);
}
