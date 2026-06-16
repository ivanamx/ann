import type { AdminAppointment } from "./admin-appointments.js";
import { env, isEmailEnabled } from "../env.js";

const HOUSTON_TZ = "America/Chicago";

async function getResend() {
  if (!isEmailEnabled) return null;
  const { Resend } = await import("resend");
  return new Resend(env.RESEND_API_KEY);
}

function formatAppointmentDateTime(startsAt: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    timeZone: HOUSTON_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(startsAt));
}

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#1f1d1b;font-family:Georgia,serif;color:#e8e4dc;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1f1d1b;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:560px;background:#2a2624;border:1px solid #3d3834;">
            <tr>
              <td style="padding:32px 28px;">
                <p style="margin:0 0 24px;font-size:22px;letter-spacing:0.04em;color:#9a8b7a;">
                  Ann <span style="font-style:italic;">Atelier</span>
                </p>
                ${content}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

type AppointmentEmailInput = {
  fullName: string;
  email: string;
  locale: "en" | "es";
  startsAt: Date;
  occasion?: string | null;
};

export async function sendAppointmentReceivedEmail(input: AppointmentEmailInput) {
  const resend = await getResend();
  if (!resend) return;

  const when = formatAppointmentDateTime(input.startsAt.toISOString(), input.locale);
  const isEs = input.locale === "es";

  const clientHtml = layout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:400;color:#e8e4dc;">
      ${isEs ? "Solicitud de cita recibida" : "Appointment request received"}
    </h1>
    <p style="margin:0 0 16px;line-height:1.6;color:#a39e94;">
      ${
        isEs
          ? `Hola ${input.fullName}, gracias por reservar una consulta privada en nuestro atelier en Houston.`
          : `Hello ${input.fullName}, thank you for booking a private consultation at our Houston atelier.`
      }
    </p>
    <p style="margin:0 0 8px;line-height:1.6;color:#e8e4dc;">
      <strong>${isEs ? "Fecha y hora solicitada" : "Requested date & time"}:</strong><br />
      ${when}
    </p>
    ${
      input.occasion
        ? `<p style="margin:16px 0 0;line-height:1.6;color:#e8e4dc;"><strong>${isEs ? "Ocasión" : "Occasion"}:</strong> ${input.occasion}</p>`
        : ""
    }
    <p style="margin:24px 0 0;line-height:1.6;color:#a39e94;">
      ${
        isEs
          ? "Confirmaremos tu cita por correo en un día hábil."
          : "We'll confirm your appointment by email within one business day."
      }
    </p>
  `);

  const staffHtml = layout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:400;color:#e8e4dc;">
      New appointment request
    </h1>
    <p style="margin:0 0 12px;line-height:1.6;color:#e8e4dc;"><strong>Client:</strong> ${input.fullName}</p>
    <p style="margin:0 0 12px;line-height:1.6;color:#e8e4dc;"><strong>Email:</strong> ${input.email}</p>
    <p style="margin:0 0 12px;line-height:1.6;color:#e8e4dc;"><strong>When:</strong> ${when}</p>
    ${
      input.occasion
        ? `<p style="margin:0 0 12px;line-height:1.6;color:#e8e4dc;"><strong>Occasion:</strong> ${input.occasion}</p>`
        : ""
    }
    <p style="margin:24px 0 0;line-height:1.6;color:#a39e94;">
      Review and confirm in the admin panel.
    </p>
  `);

  await Promise.all([
    resend.emails.send({
      from: env.EMAIL_FROM,
      to: input.email,
      subject: isEs ? "Solicitud de cita — Ann Atelier" : "Appointment request — Ann Atelier",
      html: clientHtml,
    }),
    resend.emails.send({
      from: env.EMAIL_FROM,
      to: env.ATELIER_NOTIFY_EMAIL,
      subject: `New fitting request — ${input.fullName}`,
      html: staffHtml,
    }),
  ]);
}

export async function sendAppointmentConfirmedEmail(appointment: AdminAppointment) {
  const resend = await getResend();
  if (!resend) return;

  const locale = appointment.contact.locale === "es" ? "es" : "en";
  const when = formatAppointmentDateTime(appointment.startsAt, locale);
  const isEs = locale === "es";

  const html = layout(`
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:400;color:#e8e4dc;">
      ${isEs ? "Tu cita está confirmada" : "Your appointment is confirmed"}
    </h1>
    <p style="margin:0 0 16px;line-height:1.6;color:#a39e94;">
      ${
        isEs
          ? `Hola ${appointment.contact.fullName}, tu cita privada en Ann Atelier ha sido confirmada.`
          : `Hello ${appointment.contact.fullName}, your private fitting at Ann Atelier is confirmed.`
      }
    </p>
    <p style="margin:0 0 8px;line-height:1.6;color:#e8e4dc;">
      <strong>${isEs ? "Fecha y hora" : "Date & time"}:</strong><br />
      ${when}
    </p>
    ${
      appointment.occasion
        ? `<p style="margin:16px 0 0;line-height:1.6;color:#e8e4dc;"><strong>${isEs ? "Ocasión" : "Occasion"}:</strong> ${appointment.occasion}</p>`
        : ""
    }
    <p style="margin:24px 0 0;line-height:1.6;color:#a39e94;">
      ${
        isEs
          ? "Si necesitas reprogramar, responde a este correo con al menos 48 horas de anticipación."
          : "If you need to reschedule, reply to this email at least 48 hours in advance."
      }
    </p>
  `);

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: appointment.contact.email,
    subject: isEs ? "Cita confirmada — Ann Atelier" : "Appointment confirmed — Ann Atelier",
    html,
  });
}
