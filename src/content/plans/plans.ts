import type { PlansLocaleContent } from "./types";

export const plansContent: PlansLocaleContent = {
  en: {
    title: "Digital Presence Plans",
    subtitle: "Ann Atelier · Houston, Texas",
    date: "Proposal · June 2026",
    intro:
      "Two paths for your atelier online: a one-time frontend delivery, or a monthly plan with launch, hosting, and ongoing care. Most ateliers choose a monthly plan to stay live and receive consultation requests without managing technical details.",
    frontendOnly: {
      title: "Frontend Only",
      tagline: "One-time delivery · as shown today",
      price: 100,
      description:
        "Receive the website frontend exactly as it is now — the design, lookbook, and bilingual experience — delivered as files. Ideal if you already have hosting or prefer to manage everything yourself.",
      includes: [
        "Complete frontend (design, lookbook, English & Spanish)",
        "Production build / source files delivered to you",
        "No monthly commitment",
      ],
      excludes: [
        "No domain, hosting, or SSL setup",
        "No contact form email integration",
        "No updates, support, or maintenance after delivery",
      ],
    },
    tiersLabel: "Monthly plans",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        tagline: "Stable online presence",
        price: 129,
        minimumMonths: 12,
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
        tagline: "Consultations from your site",
        price: 449,
        minimumMonths: 12,
        features: [
          "Everything in Studio",
          "Quarterly marketing strategy call (30 min)",
          "Instagram & Pinterest (4 posts/pins per month + story templates) or Meta Ads — one primary channel set per month",
          "Local SEO updates (on-page meta, schema, Houston content) once per quarter",
          "Up to 1.5 hours/month technical maintenance (bugs, UI tweaks, image optimization)",
          "Lookbook updates — up to 3 pieces per month",
          "Ad budget billed separately: $200–500/month (your card, your control)",
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
  "-",
    frontendOnly: {
      title: "Solo Frontend",
      tagline: "Entrega única · tal como está hoy",
      price: 100,
      description:
        "-",
      includes: [
        "Frontend completo (diseño, lookbook, inglés y español)",
        "Build de producción / archivos fuente entregados",
        "Sin compromiso mensual",
      ],
      excludes: [
        "Sin dominio, hosting ni configuración SSL",
        "Sin integración de correo en el formulario de contacto",
        "Sin actualizaciones, soporte ni mantenimiento tras la entrega",
      ],
    },
    tiersLabel: "Planes mensuales",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        tagline: "Presencia online estable",
        price: 129,
        minimumMonths: 12,
        features: [
          "Lanzamiento completo (sitio + correo + publicación)",
          "Hosting, dominio y SSL incluidos",
          "Monitoreo del formulario de contacto",
          "1 actualización de contenido al mes (hasta 20 min: foto lookbook, FAQ, horario)",
          "Soporte por correo · respuesta en 72 h laborables",
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
        features: [
          "Todo lo incluido en Essential",
          "Gestión de agenda vía Telegram — citas agregadas directo a su celular",
          "Google Business Profile + revisión trimestral",
          "Analítica básica (GA4) + reporte trimestral de visitas y formularios",
          "1 actualización al mes (hasta 30 min: lookbook, testimonios, textos de temporada)",
          "Soporte prioritario · respuesta en 48 h laborables",
        ],
      },
      {
        id: "growth",
        name: "Growth Partner",
        tagline: "Consultas desde su sitio",
        price: 449,
        minimumMonths: 12,
        features: [
          "Todo lo incluido en Studio",
          "Llamada trimestral de estrategia de marketing (30 min)",
          "Instagram y Pinterest (4 publicaciones/pins al mes + plantillas de stories) o Meta Ads — un conjunto de canales principal al mes",
          "SEO local (meta, schema, contenido Houston) una vez por trimestre",
          "Hasta 1.5 h/mes de mantenimiento técnico (errores, ajustes visuales, imágenes)",
          "Actualizaciones de lookbook — hasta 3 piezas al mes",
          "Presupuesto de anuncios aparte: $200–500/mes (su tarjeta, su control)",
        ],
      },
    ],
    notIncluded: {
      title: "No incluido en ningún plan",
      items: [
        "Fotografía profesional o retoque (usted proporciona las imágenes)",
        "Pagos en línea / checkout Stripe (presupuesto aparte: aprox. $800–1,500 único)",
        "Backend personalizado, CRM o base de datos (presupuesto como add-on)",
        "Trabajo fuera de los límites mensuales → $90/hora, preaprobado por escrito",
      ],
    },
    terms: {
      title: "Términos resumidos",
      items: [
        "Facturación mensual el día 1 (o al firmar, por el primer mes).",
        "Plazo mínimo según el plan; cancelación anticipada: saldo restante adeudado.",
        "Meta de go-live: dentro de 30–45 días tras onboarding y entrega de contenido.",
        "Transferencia de dominio y sitio tras cumplir el plazo mínimo con cuenta al día.",
        "Las actualizaciones requieren materiales suyos dentro de 5 días hábiles de cada solicitud.",
        "Subida de plan en cualquier momento; bajada solo al renovar.",
      ],
    },
    footerNote:
      "Esta propuesta es confidencial y fue preparada para Ann Atelier. Precios válidos 30 días desde la fecha indicada.",
  },
};
