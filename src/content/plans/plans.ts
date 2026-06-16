import type { PlansLocaleContent } from "./types";

export const plansContent: PlansLocaleContent = {
  en: {
    title: "Digital Presence Plans",
    subtitle: "Ann Atelier · Houston, Texas",
    date: "Proposal · June 2026",
    intro:
      "Monthly plans for your atelier online — launch, hosting, and ongoing care included. Stay live and receive consultation requests without managing technical details.",
    estimatesDisclaimer:
      "Monthly projections for a Houston custom atelier (quinceañera, gala & bridal). Based on metro search volume and typical inquiry-to-order conversion. Season (spring quince, fall gala) and your consultation close rate affect results.",
    tiersLabel: "Monthly plans",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        tagline: "Stable online presence",
        price: 129,
        minimumMonths: 12,
        estimates: {
          context: "Passive presence · direct & referral traffic",
          leadsPerMonth: "2–4",
          salesPerMonth: "0–1",
          note: "Steady baseline; no active local SEO or social push.",
        },
        features: [
          "Full website launch (site + email + deploy)",
          "Hosting, domain & SSL included",
          "Contact form monitoring",
          "1 content update per month (up to 20 min: lookbook photo, FAQ text, hours)",
          "Email support · response within 72 business hours",
          "Quarterly site backup",
        ],
      },
      {
        id: "studio",
        name: "Studio",
        tagline: "Bookings & local visibility",
        price: 279,
        minimumMonths: 12,
        recommended: true,
        estimates: {
          context: "Local discovery · Houston GBP & booking flow",
          leadsPerMonth: "6–12",
          salesPerMonth: "1–2",
          note: "Google Maps + easier booking typically lift inquiries within 60–90 days.",
        },
        features: [
          "Everything in Essential",
          "Appointment management via Telegram — bookings added directly to your phone",
          "Google Business Profile setup + quarterly review",
          "Basic analytics (GA4) + quarterly traffic & form report",
          "1 content update per month (up to 30 min: lookbook, testimonials, seasonal copy)",
          "Priority support · response within 48 business hours",
        ],
      },
      {
        id: "growth",
        name: "Growth Partner",
        tagline: "Launch solo — with clients in the pipeline",
        price: 449,
        minimumMonths: 12,
        estimates: {
          context: "Full funnel · SEO, social, email & nurture in Houston",
          leadsPerMonth: "12–22",
          salesPerMonth: "2–4",
          note: "Aligns with 12-week growth target (~15+ contacts, 5+ consultations). Optional Meta Ads can add 5–8 leads/mo (ad budget separate).",
        },
        features: [
          "Everything in Studio",
          "Contact follow-up — auto-reply plus gentle nurture emails for inquiries who haven’t booked yet (no hard selling; you handle the consultation)",
          "Monthly email campaign — lookbook highlights, Houston event season, and private consultation invitation",
          "Instagram & Pinterest for your atelier — 4 posts/month (process, fittings, finished pieces) + story templates",
          "Monthly local SEO — custom gown, gala, and wedding searches in Houston",
          "Lookbook — up to 3 new pieces on the site each month",
          "Monthly lead report — form submissions, bookings, and contacts awaiting your personal reply",
          "Up to 1.5 hours/month technical maintenance (bugs, UI tweaks, image optimization)",
          "Optional Meta Ads for Houston consultation leads — ad budget billed separately",
        ],
      },
    ],
    notIncluded: {
      title: "Not included in any plan",
      items: [
        "Professional photography or retouching (you provide images)",
        "Online payments / Stripe checkout (quoted separately: approx. $800–1,500 one-time)",
        "Custom backend, CRM, or database (quoted as add-on)",
        "Work beyond monthly update limits → $90/hour, pre-approved in writing",
      ],
    },
    terms: {
      title: "Terms at a glance",
      items: [
        "Monthly billing on the 1st of each month (or upon signing for month one).",
        "Minimum term applies per plan; early cancellation: remaining balance due.",
        "Go-live target: within 30–45 days of onboarding and content delivery.",
        "Domain & site transfer to you after minimum term is fulfilled and account is current.",
        "Content updates require assets from you within 5 business days of each request.",
        "Tier upgrades available anytime; downgrades at renewal only.",
      ],
    },
    footerNote:
      "This proposal is confidential and prepared for Ann Atelier. Pricing valid for 30 days from the date above.",
  },
  es: {
    title: "Planes de Presencia Digital",
    subtitle: "Ann Atelier · Houston, Texas",
    date: "Propuesta · Junio 2026",
    intro:
      "Planes mensuales",
    estimatesDisclaimer:
      "Proyecciones estimadas",
    tiersLabel: "Planes mensuales",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        tagline: "Presencia online estable",
        price: 129,
        minimumMonths: 12,
        estimates: {
          context: "Presencia pasiva · tráfico directo y referidos",
          leadsPerMonth: "2–4",
          salesPerMonth: "0–1",
          note: "Línea base estable; sin SEO local ni redes activas.",
        },
        features: [
          "Lanzamiento completo (sitio + correo + publicación)",
          "Hosting, dominio y SSL incluidos",
          "Monitoreo del formulario de contacto",
          "1 actualización de contenido al mes (hasta 20 min: foto lookbook, FAQ, horario)",
          "Soporte por correo",
          "Respaldo trimestral del sitio",
        ],
      },
      {
        id: "studio",
        name: "Studio",
        tagline: "Citas y visibilidad local",
        price: 279,
        minimumMonths: 12,
        recommended: true,
        estimates: {
          context: "Descubrimiento local · GBP Houston",
          leadsPerMonth: "6–12",
          salesPerMonth: "1–2",
          note: "Google Maps + reserva fácil suelen subir consultas en 60–90 días.",
        },
        features: [
          "Todo lo incluido en Essential",
          "Gestión de agenda — citas agregadas directo a su celular",
          "Google Business Profile + revisión trimestral",
          "Analítica básica (GA4) + reporte trimestral de visitas y formularios",
        ],
      },
      {
        id: "growth",
        name: "Growth Partner",
        tagline: "Tu lanzamiento como independiente",
        price: 449,
        minimumMonths: 12,
        estimates: {
          context: "Embudo completo · SEO, redes, correo y nurture en Houston",
          leadsPerMonth: "12–22",
          salesPerMonth: "2–4",
          note: "Alineado con meta de 12 semanas (~15+ contactos, 5+ consultas). Meta Ads opcional suma 5–8 leads/mes (presupuesto aparte).",
        },
        features: [
          "Todo lo incluido en Studio",
          "Seguimiento de contactos — acuse automático y correos de seguimiento amables para quienes aún no agendaron",
          "Campaña de correo mensual — lookbook, temporada de eventos en Houston e invitación a consulta privada",
          "Publicaciones diarias y campañas en Instagram y Pinterest (proceso, fittings, piezas terminadas) + plantillas de stories",
          "SEO local mensual — búsquedas de vestidos a medida, galas y bodas en Houston",
          "Reporte mensual de leads — formularios, citas y contactos que requieren tu respuesta personal",
          "Diseno de Google Ads yMeta Ads para consultas en Houston (presupuesto aparte)",
          "Mantenimiento y actulizaciones del sitio ilimitadas",
          "Base de datos de clientes, citas, y ventas",
          "Diseno de app movil para citas y gestion de agenda",
        ],
      },
    ],
    notIncluded: {
      title: "No incluido en ningún plan",
      items: [
        "Fotografía profesional o retoque",
        "Pagos en línea / checkout Stripe (presupuesto aparte)",
      ],
    },
    terms: {
      title: "Términos resumidos",
      items: [
        "Facturación mensual el día 1 (o al firmar, por el primer mes).",
        "Meta de go-live: 1 julio 2026 tras onboarding y entrega de contenido.",
      ],
    },
    footerNote:
      "Esta propuesta es confidencial. Precios válidos 30 días desde la fecha indicada.",
  },
};
