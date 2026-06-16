export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

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

export class AdminApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

const credentials: RequestCredentials = "include";

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new AdminApiError(data.error ?? "REQUEST_FAILED", res.status, data.error);
  }
  return data;
}

export async function fetchAdminMe(): Promise<{ user: AdminUser } | null> {
  const res = await fetch("/api/admin/me", { credentials });
  if (res.status === 401) return null;
  return parseJson<{ user: AdminUser }>(res);
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    credentials,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseJson<{ user: AdminUser }>(res);
}

export async function adminLogout() {
  const res = await fetch("/api/admin/logout", { method: "POST", credentials });
  return parseJson<{ ok: boolean }>(res);
}

type ListParams = {
  status?: AppointmentStatus;
  from?: string;
  to?: string;
};

export async function fetchAdminAppointments(params: ListParams = {}) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);

  const query = search.toString();
  const res = await fetch(`/api/admin/appointments${query ? `?${query}` : ""}`, {
    credentials,
  });
  return parseJson<{ appointments: AdminAppointment[] }>(res);
}

export async function updateAdminAppointmentStatus(id: string, status: AppointmentStatus) {
  const res = await fetch(`/api/admin/appointments/${id}`, {
    method: "PATCH",
    credentials,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return parseJson<{ appointment: AdminAppointment }>(res);
}

export function formatAdminDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
