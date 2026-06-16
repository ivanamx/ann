export type TimelineWeek = {
  week: string;
  dates: string;
  title: string;
  tasks: string[];
  measure: string;
};

export type TimelineMonth = {
  label: string;
  period: string;
  goal: string;
  weeks: TimelineWeek[];
};

export type GrowthTimelineContent = {
  title: string;
  subtitle: string;
  intro: string;
  workTag: string;
  measureTag: string;
  goalTag: string;
  outcomeLabel: string;
  outcome: string;
  months: TimelineMonth[];
};

export type GrowthTimelineLocaleContent = {
  en: GrowthTimelineContent;
  es: GrowthTimelineContent;
};

export const growthTimelineContent: GrowthTimelineLocaleContent = {
  en: {
    title: "12-Week Growth Schedule",
    subtitle: "Growth Partner · landing live · starts June 11, 2026",
    intro:
      "Your site is already live. Each week has clear tasks and a simple number to track — so you always know if you’re on pace before going independent.",
    workTag: "This week",
    measureTag: "Target",
    goalTag: "Month goal",
    outcomeLabel: "Week 12 · September 11",
    outcome:
      "15+ total contacts · 5+ consultations held or booked · about 1 new inquiry per week on average — ready to run the atelier on your own.",
    months: [
      {
        label: "Month 1 · Turn on the funnel",
        period: "June 11 – July 10",
        goal: "Everything connected — first real inquiries arriving",
        weeks: [
          {
            week: "Week 1",
            dates: "Jun 11 – 17",
            title: "Booking bot & profiles",
            tasks: [
              "Telegram booking bot connected to the contact form",
              "Instagram and Pinterest profiles set up (bio, link to site, highlights)",
              "Google Business Profile created",
              "Auto-reply email activated for new inquiries",
            ],
            measure:
              "0 clients yet — that’s normal. Checklist: bot works, you receive a test inquiry on your phone, profiles are public.",
          },
          {
            week: "Week 2",
            dates: "Jun 18 – 24",
            title: "First visibility push",
            tasks: [
              "4 Instagram posts (lookbook + atelier process)",
              "First Pinterest pins",
              "Email to your personal network: “I’m now taking private consultations”",
            ],
            measure:
              "Projection: 1–2 form contacts (often friends or referrals). Success = at least 1 real message received.",
          },
          {
            week: "Week 3",
            dates: "Jun 25 – Jul 1",
            title: "Local discovery",
            tasks: [
              "Google Business published and verified",
              "Basic Houston SEO on the site (custom gowns, galas, quinceañeras)",
              "Gentle follow-up emails for inquiries who haven’t booked yet",
            ],
            measure:
              "Projection: 2–4 total contacts. Success = 1 consultation booked via Telegram.",
          },
          {
            week: "Week 4",
            dates: "Jul 2 – 10",
            title: "Review & adjust",
            tasks: [
              "Up to 3 new lookbook pieces on the site",
              "Check analytics — where are clicks coming from?",
              "Tweak form or page copy if something isn’t clear",
            ],
            measure:
              "Projection: 5 total contacts · 1–2 consultations booked. You should see which channel brought the first leads.",
          },
        ],
      },
      {
        label: "Month 2 · Build momentum",
        period: "July 11 – August 10",
        goal: "Steady flow — not just one-off referrals",
        weeks: [
          {
            week: "Week 5",
            dates: "Jul 11 – 17",
            title: "Content rhythm",
            tasks: [
              "4 new posts + story templates",
              "Email #2 to your network and non-responders",
              "Lead report #1 delivered (who wrote, who needs your reply)",
            ],
            measure:
              "Projection: 7 total contacts · 2 consultations held or booked. Success = inquiries from someone outside your close circle.",
          },
          {
            week: "Week 6",
            dates: "Jul 18 – 24",
            title: "Expand reach",
            tasks: [
              "Optional Meta Ads for Houston consultation leads (if budget approved)",
              "Google Business photos and hours optimized",
              "Pinterest push for wedding and quinceañera searches",
            ],
            measure:
              "Projection: 9 total contacts · 3 consultations. Success = at least 1 contact from Google or social search.",
          },
          {
            week: "Week 7",
            dates: "Jul 25 – 31",
            title: "Nurture what’s warm",
            tasks: [
              "Follow-up sequence refined from real inquiry patterns",
              "Testimonial added to site (with your approval)",
              "Lookbook refresh — up to 3 pieces",
            ],
            measure:
              "Projection: 11 total contacts · 3–4 consultations. Success = 1 person who wrote in week 2–3 finally books.",
          },
          {
            week: "Week 8",
            dates: "Aug 1 – 10",
            title: "Month 2 checkpoint",
            tasks: [
              "Lead report #2 — full funnel review",
              "Adjust social or email based on what converted",
              "Plan content for month 3",
            ],
            measure:
              "Projection: 12 total contacts · 4 consultations. Pace check: ~1 new contact per week on average.",
          },
        ],
      },
      {
        label: "Month 3 · Ready to go solo",
        period: "August 11 – September 10",
        goal: "Predictable weekly inquiries before you resign",
        weeks: [
          {
            week: "Week 9",
            dates: "Aug 11 – 17",
            title: "Fall event push",
            tasks: [
              "Email #3 — fall gala and wedding season + consultation invite",
              "4 posts highlighting event-ready pieces",
              "Google review requests to happy clients",
            ],
            measure:
              "Projection: 13 total contacts · 4–5 consultations. Success = inquiries mentioning a specific event or date.",
          },
          {
            week: "Week 10",
            dates: "Aug 18 – 24",
            title: "Search & trust",
            tasks: [
              "Local SEO refresh (Houston + occasion keywords)",
              "Pinterest and Instagram aligned to top-performing pieces",
              "Social calendar drafted for months 4–6",
            ],
            measure:
              "Projection: 14 total contacts · 5 consultations. Success = site visits growing week over week.",
          },
          {
            week: "Week 11",
            dates: "Aug 25 – 31",
            title: "Your weekly routine",
            tasks: [
              "Personal follow-up guide — step by step when a lead arrives",
              "5-minute lead report template for you every Monday",
              "Optional ad performance review",
            ],
            measure:
              "Projection: you know exactly what to do each Monday. Success = no lead sits unanswered more than 48 hours.",
          },
          {
            week: "Week 12",
            dates: "Sep 1 – 10",
            title: "Independence review",
            tasks: [
              "90-day numbers review: contacts, bookings, channels",
              "Priorities set for month 4 onward",
              "Confirm: ready to run the atelier on your own?",
            ],
            measure:
              "Projection: 15+ contacts · 5+ consultations · ~1 new inquiry per week. Green light to go independent.",
          },
        ],
      },
    ],
  },
  es: {
    title: "Cronograma · 12 semanas",
    subtitle: "Growth Partner · landing lista · inicio 11 de junio de 2026",
    intro:
      "Tu sitio ya está en línea. Cada semana tiene tareas claras y un número simple para medir avance — así siempre sabes si vas al ritmo antes de independizarte.",
    workTag: "Esta semana",
    measureTag: "Proyección",
    goalTag: "Meta del mes",
    outcomeLabel: "Semana 12 · 11 de septiembre",
    outcome:
      "15+ contactos en total · 5+ consultas realizadas o agendadas · ~1 consulta nueva por semana en promedio — lista para manejar el atelier por tu cuenta.",
    months: [
      {
        label: "Mes 1 · Encender el embudo",
        period: "11 jun – 10 jul",
        goal: "Todo conectado — llegan las primeras consultas reales",
        weeks: [
          {
            week: "Semana 1",
            dates: "11 – 17 jun",
            title: "Bot de agenda y perfiles",
            tasks: [
              "Bot de citas en Telegram conectado al formulario",
              "Perfiles de Instagram y Pinterest listos (bio, link al sitio, destacadas)",
              "Google Business Profile creado",
              "Correo de acuse automático activado",
            ],
            measure:
              "0 clientas aún — es normal. Checklist: el bot funciona, recibes una consulta de prueba en tu celular, perfiles públicos.",
          },
          {
            week: "Semana 2",
            dates: "18 – 24 jun",
            title: "Primer empujón de visibilidad",
            tasks: [
              "4 publicaciones en Instagram (lookbook + proceso del atelier)",
              "Primeros pins en Pinterest",
              "Correo a tu red personal: “Ya estoy tomando consultas privadas”",
            ],
            measure:
              "Proyección: 1–2 contactos del formulario (a menudo conocidas o referidos). Éxito = al menos 1 mensaje real recibido.",
          },
          {
            week: "Semana 3",
            dates: "25 jun – 1 jul",
            title: "Que te encuentren en Houston",
            tasks: [
              "Google Business publicado y verificado",
              "SEO básico en el sitio (vestidos a medida, galas, quinceañeras, Houston)",
              "Correos de seguimiento amables para quienes aún no agendaron",
            ],
            measure:
              "Proyección: 2–4 contactos en total. Éxito = 1 consulta agendada vía Telegram.",
          },
          {
            week: "Semana 4",
            dates: "2 – 10 jul",
            title: "Revisar y ajustar",
            tasks: [
              "Hasta 3 piezas nuevas en el lookbook del sitio",
              "Revisar analítica — ¿de dónde vienen los clics?",
              "Ajustar textos del formulario o página si algo no se entiende",
            ],
            measure:
              "Proyección: 5 contactos en total · 1–2 consultas agendadas. Ya ves qué canal trajo los primeros leads.",
          },
        ],
      },
      {
        label: "Mes 2 · Ganar ritmo",
        period: "11 jul – 10 ago",
        goal: "Flujo constante — no solo referidos de una vez",
        weeks: [
          {
            week: "Semana 5",
            dates: "11 – 17 jul",
            title: "Ritmo de contenido",
            tasks: [
              "4 publicaciones nuevas + plantillas de stories",
              "Correo #2 a tu red y quienes no respondieron",
              "Reporte de leads #1 (quién escribió, quién necesita tu respuesta)",
            ],
            measure:
              "Proyección: 7 contactos en total · 2 consultas realizadas o agendadas. Éxito = consulta de alguien fuera de tu círculo cercano.",
          },
          {
            week: "Semana 6",
            dates: "18 – 24 jul",
            title: "Ampliar alcance",
            tasks: [
              "Meta Ads opcionales para consultas en Houston (si apruebas presupuesto)",
              "Fotos y horarios optimizados en Google Business",
              "Pinterest enfocado en bodas y quinceañeras",
            ],
            measure:
              "Proyección: 9 contactos en total · 3 consultas. Éxito = al menos 1 contacto desde Google o redes.",
          },
          {
            week: "Semana 7",
            dates: "25 – 31 jul",
            title: "Nutrir lo que está tibio",
            tasks: [
              "Secuencia de seguimiento ajustada según consultas reales",
              "Testimonio en el sitio (con tu aprobación)",
              "Lookbook actualizado — hasta 3 piezas",
            ],
            measure:
              "Proyección: 11 contactos en total · 3–4 consultas. Éxito = alguien que escribió en semana 2–3 por fin agenda.",
          },
          {
            week: "Semana 8",
            dates: "1 – 10 ago",
            title: "Checkpoint mes 2",
            tasks: [
              "Reporte de leads #2 — revisión completa del embudo",
              "Ajustar redes o correo según lo que convirtió",
              "Planificar contenido del mes 3",
            ],
            measure:
              "Proyección: 12 contactos en total · 4 consultas. Ritmo: ~1 contacto nuevo por semana en promedio.",
          },
        ],
      },
      {
        label: "Mes 3 · Lista para renunciar",
        period: "11 ago – 10 sep",
        goal: "Consultas semanales predecibles antes de independizarte",
        weeks: [
          {
            week: "Semana 9",
            dates: "11 – 17 ago",
            title: "Empujón temporada de eventos",
            tasks: [
              "Correo #3 — temporada de galas y bodas de otoño + invitación a consulta",
              "4 publicaciones con piezas listas para eventos",
              "Pedir reseñas en Google a clientas satisfechas",
            ],
            measure:
              "Proyección: 13 contactos en total · 4–5 consultas. Éxito = consultas que mencionan un evento o fecha concreta.",
          },
          {
            week: "Semana 10",
            dates: "18 – 24 ago",
            title: "Búsqueda y confianza",
            tasks: [
              "Refresco de SEO local (Houston + palabras de ocasión)",
              "Instagram y Pinterest alineados a las piezas que más funcionan",
              "Calendario editorial para meses 4–6",
            ],
            measure:
              "Proyección: 14 contactos en total · 5 consultas. Éxito = visitas al sitio subiendo semana a semana.",
          },
          {
            week: "Semana 11",
            dates: "25 – 31 ago",
            title: "Tu rutina semanal",
            tasks: [
              "Guía de seguimiento personal — paso a paso cuando llega un contacto",
              "Plantilla de reporte de leads de 5 minutos cada lunes",
              "Revisión opcional de anuncios",
            ],
            measure:
              "Proyección: sabes exactamente qué hacer cada lunes. Éxito = ningún lead sin respuesta más de 48 horas.",
          },
          {
            week: "Semana 12",
            dates: "1 – 10 sep",
            title: "Revisión de independencia",
            tasks: [
              "Revisión de números a 90 días: contactos, citas, canales",
              "Prioridades definidas para el mes 4 en adelante",
              "Confirmar: ¿lista para manejar el atelier sola?",
            ],
            measure:
              "Proyección: 15+ contactos · 5+ consultas · ~1 consulta nueva por semana. Luz verde para independizarte.",
          },
        ],
      },
    ],
  },
};
