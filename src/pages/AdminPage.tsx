import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AdminApiError,
  adminLogin,
  adminLogout,
  fetchAdminAppointments,
  fetchAdminMe,
  formatAdminDateTime,
  updateAdminAppointmentStatus,
  type AdminAppointment,
  type AdminUser,
  type AppointmentStatus,
} from "../api/admin";

const STATUS_OPTIONS: AppointmentStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
];

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
  no_show: "No show",
};

function statusClass(status: AppointmentStatus) {
  switch (status) {
    case "pending":
      return "admin-status admin-status--pending";
    case "confirmed":
      return "admin-status admin-status--confirmed";
    case "cancelled":
      return "admin-status admin-status--cancelled";
    case "completed":
      return "admin-status admin-status--completed";
    case "no_show":
      return "admin-status admin-status--noshow";
  }
}

function AdminLogin({
  onSuccess,
}: {
  onSuccess: (user: AdminUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user } = await adminLogin(email.trim(), password);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof AdminApiError ? "Invalid email or password." : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <h1 className="admin-login__title font-display">Admin</h1>
      <p className="admin-login__subtitle">Sign in to manage appointments.</p>

      <form onSubmit={onSubmit} className="admin-login__form">
        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? (
          <p className="admin-error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function AppointmentsDashboard({
  user,
  onLogout,
}: {
  user: AdminUser;
  onLogout: () => void;
}) {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { appointments: rows } = await fetchAdminAppointments();
      setAppointments(rows);
    } catch {
      setError("Could not load appointments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visibleAppointments = useMemo(
    () =>
      statusFilter === "all"
        ? appointments
        : appointments.filter((item) => item.status === statusFilter),
    [appointments, statusFilter],
  );

  const counts = useMemo(() => {
    const base = { pending: 0, confirmed: 0, cancelled: 0, completed: 0, no_show: 0 };
    for (const item of appointments) {
      base[item.status] += 1;
    }
    return base;
  }, [appointments]);

  const onStatusChange = async (id: string, status: AppointmentStatus) => {
    setUpdatingId(id);
    try {
      const { appointment } = await updateAdminAppointmentStatus(id, status);
      setAppointments((prev) => prev.map((row) => (row.id === id ? appointment : row)));
    } catch {
      setError("Could not update appointment.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div>
          <h1 className="admin-dashboard__title font-display">Appointments</h1>
          <p className="admin-dashboard__meta">
            Signed in as {user.fullName} · {user.email}
          </p>
        </div>
        <div className="admin-dashboard__actions">
          <a href="/" className="admin-link">
            View site
          </a>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => void load()}>
            Refresh
          </button>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => void handleLogout()}>
            Sign out
          </button>
        </div>
      </header>

      <div className="admin-filters" role="tablist" aria-label="Filter by status">
        {(["all", ...STATUS_OPTIONS] as const).map((status) => (
          <button
            key={status}
            type="button"
            role="tab"
            aria-selected={statusFilter === status}
            className={`admin-filter ${statusFilter === status ? "is-active" : ""}`}
            onClick={() => setStatusFilter(status)}
          >
            {status === "all" ? "All" : STATUS_LABELS[status]}
            {status !== "all" && counts[status] > 0 ? ` (${counts[status]})` : ""}
          </button>
        ))}
      </div>

      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="admin-empty">Loading appointments…</p>
      ) : visibleAppointments.length === 0 ? (
        <p className="admin-empty">No appointments found.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date & time</th>
                <th>Client</th>
                <th>Occasion</th>
                <th>Status</th>
                <th>Requested</th>
              </tr>
            </thead>
            <tbody>
              {visibleAppointments.map((item) => (
                <tr key={item.id}>
                  <td data-label="Date & time">
                    <strong>{formatAdminDateTime(item.startsAt)}</strong>
                  </td>
                  <td data-label="Client">
                    <div>{item.contact.fullName}</div>
                    <a className="admin-link" href={`mailto:${item.contact.email}`}>
                      {item.contact.email}
                    </a>
                  </td>
                  <td data-label="Occasion">{item.occasion || "—"}</td>
                  <td data-label="Status">
                    <select
                      className={`admin-select ${statusClass(item.status)}`}
                      value={item.status}
                      disabled={updatingId === item.id}
                      onChange={(e) =>
                        void onStatusChange(item.id, e.target.value as AppointmentStatus)
                      }
                      aria-label={`Status for ${item.contact.fullName}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td data-label="Requested">{formatAdminDateTime(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    document.title = "Admin — Ann Atelier";
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", "noindex, nofollow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    fetchAdminMe()
      .then((result) => setUser(result?.user ?? null))
      .finally(() => setChecking(false));
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-page__inner">
        {checking ? (
          <p className="admin-empty">Loading…</p>
        ) : user ? (
          <AppointmentsDashboard user={user} onLogout={() => setUser(null)} />
        ) : (
          <AdminLogin onSuccess={setUser} />
        )}
      </div>
    </div>
  );
}
