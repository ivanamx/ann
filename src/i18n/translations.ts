export type Locale = "en" | "es";

export const translations = {
  en: {
    meta: {
      title: "Ann Atelier | Custom Couture Dresses Houston TX",
      description:
        "Bespoke women's dresses and private fittings in Houston, Texas. One-of-one couture for galas, weddings, and milestone celebrations.",
    },
    nav: {
      philosophy: "Philosophy",
      process: "Process",
      lookbook: "Lookbook",
      houston: "Houston",
      faq: "FAQ",
      book: "Book Consultation",
      menu: "Menu",
      close: "Close",
    },
    theme: {
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
    },
    hero: {
      eyebrow: "Houston · Bespoke Couture",
      title: "Dresses sculpted for the woman the room remembers.",
      subtitle:
        "One-of-one gowns crafted in our private atelier. From first sketch to final stitch — an experience as rare as the occasion itself.",
      cta: "Reserve Private Fitting",
      ctaSecondary: "Explore the Atelier",
    },
    marquee: [
      "Bespoke",
      "Couture",
      "Houston",
      "Private Fittings",
      "Silk & Structure",
      "One-of-One",
    ],
    philosophy: {
      title: "The Atelier Philosophy",
      subtitle: "Three pillars define every commission we accept.",
      items: [
        {
          title: "Artistry",
          body: "Each gown begins as an original sketch — never a catalog number. Fabric is sourced globally, selected for how it moves with you.",
        },
        {
          title: "Precision Fit",
          body: "Multiple private fittings sculpt the silhouette to your form. Structure and drape are engineered, not guessed.",
        },
        {
          title: "Exclusivity",
          body: "We accept a limited number of commissions per season. Your dress will never be replicated.",
        },
      ],
    },
    process: {
      title: "From Vision to Veil",
      subtitle: "A transparent journey — typically 12–16 weeks.",
      steps: [
        { title: "Consultation", body: "Private session in our Houston atelier. Mood, silhouette, timeline." },
        { title: "Design", body: "Hand-rendered sketches and fabric swatches curated for you." },
        { title: "Muslin", body: "First toile fitting — architecture before adornment." },
        { title: "Creation", body: "Couture construction with interim fittings." },
        { title: "Revelation", body: "Final fitting. Your gown, ready for the world." },
      ],
    },
    lookbook: {
      title: "Selected Commissions",
      subtitle: "A glimpse into recent one-of-one creations.",
      modal: {
        close: "Close",
        codename: "Commission Ref.",
        scan: "3D Atelier Scan",
        gallery: "Editorial View",
        drag: "Drag to rotate",
        specs: "Technical Profile",
        investment: "Investment from",
        leadTime: "Lead time",
        cta: "Reserve Private Fitting",
        ctaNote: "One-of-one · Never replicated",
      },
      items: [
        {
          title: "Midnight Gala",
          event: "Gala",
          tag: "Silk charmeuse · Houston",
          codename: "AA-MG-001",
          headline: "The dress that enters before you do — and stays in memory long after the last dance.",
          description:
            "Crafted for a private Houston gala, this one-of-one charmeuse column was built around one woman's presence — not a size chart. Three intimate fittings sculpted every line to move like liquid shadow across marble floors. When you commission Midnight Gala, you are not buying a gown. You are investing in the moment the room goes quiet.",
          hotspots: [
            { id: "neckline", label: "Neckline", body: "Strapless sweetheart with internal corsetry — 14-point boning lifts and holds for hours without sacrificing comfort or movement." },
            { id: "fabric", label: "Fabric", body: "Double-layer silk charmeuse, 19 momme, sourced in Milan. The drape is calibrated to your stride — it catches light differently with every step you take." },
            { id: "color", label: "Color", body: "Obsidian Noir · AA-PIG-004. A deep black with a blue undertone that reads impossibly rich under ballroom chandeliers — never flat, never common." },
            { id: "silhouette", label: "Silhouette", body: "Bias-cut column engineered for fluid movement. The hem falls clean and uninterrupted — designed for the woman who owns the floor without trying." },
          ],
          specs: [
            { k: "Construction", v: "French-seam couture" },
            { k: "Closure", v: "Invisible zip · hook-eye" },
            { k: "Lining", v: "Silk habotai" },
            { k: "Fittings", v: "3 private sessions" },
          ],
          investment: "$3,200",
          leadTime: "14 weeks",
        },
        {
          title: "Garden Vows",
          event: "Wedding",
          tag: "Organza layers · River Oaks",
          codename: "AA-GV-002",
          headline: "Walk down the aisle like light itself — weightless, luminous, unforgettable.",
          description:
            "Designed for an intimate River Oaks garden ceremony, Garden Vows layers silk organza like petals opening at golden hour. Every tier was cut on the bias to catch breeze and sunlight simultaneously. Brides who choose this silhouette don't just arrive — they appear. Your version will be mapped to your aisle, your florals, your light.",
          hotspots: [
            { id: "neckline", label: "Neckline", body: "Architectural strapless bodice with hand-draped organza — sculpted precisely to your collarbone for a frame that photographs like a painting." },
            { id: "fabric", label: "Fabric", body: "Triple-layer silk organza over tulle structure. Each tier floats independently — the skirt moves as if it has its own breath." },
            { id: "color", label: "Color", body: "Garden Ivory · AA-PIG-001. Warm ivory with a rose undertone that harmonizes with natural florals — never competes, always complements." },
            { id: "silhouette", label: "Silhouette", body: "Graduated A-line with tiered volume. Train length is calibrated to your ceremony aisle — every step choreographed in advance." },
          ],
          specs: [
            { k: "Construction", v: "Layered organza tiers" },
            { k: "Closure", v: "Corset back · lace-up" },
            { k: "Lining", v: "Silk crepe de chine" },
            { k: "Fittings", v: "4 private sessions" },
          ],
          investment: "$5,000",
          leadTime: "16 weeks",
        },
        {
          title: "Golden Hour",
          event: "Black-Tie",
          tag: "Hand-beaded · Galleria",
          codename: "AA-GH-003",
          headline: "Two thousand four hundred crystals. One woman. Every eye in the room.",
          description:
            "Golden Hour was born from a single request: make me look like the light follows me. One hundred eighty hours of hand-knotting later, this gown refracts candlelight from every angle — in person and in every photograph. Commissioned near the Galleria for black-tie events where second impressions don't exist. This is couture as jewelry you can walk in.",
          hotspots: [
            { id: "neckline", label: "Neckline", body: "One-shoulder drape with asymmetric crystal cascade — counterweighted so the silhouette stays balanced through an entire evening." },
            { id: "fabric", label: "Fabric", body: "Silk georgette foundation with hand-beaded overlay. Each crystal is individually knotted — built to survive the dance floor and the camera flash." },
            { id: "color", label: "Color", body: "Champagne Gold · AA-PIG-012. Warm metallic with honey undertones — engineered for golden-hour photography and candlelit rooms alike." },
            { id: "embellishment", label: "Embellishment", body: "Swarovski gradient from bodice to hem. Crystal density mapped to your movement zones — maximum refraction where the light finds you most." },
          ],
          specs: [
            { k: "Construction", v: "Beaded couture overlay" },
            { k: "Crystals", v: "2,400 hand-set" },
            { k: "Lining", v: "Silk charmeuse" },
            { k: "Fittings", v: "4 private sessions" },
          ],
          investment: "$7,500",
          leadTime: "16 weeks",
        },
        {
          title: "Velvet Nocturne",
          event: "Gala",
          tag: "Structured bodice · Memorial",
          codename: "AA-VN-004",
          headline: "Power you can wear — sculpted velvet for the woman who doesn't ask for the spotlight. She takes it.",
          description:
            "Velvet Nocturne was designed for a Memorial-area gala where the dress needed to hold its line from arrival through the final toast — eight hours, no compromise. The structured mermaid bodice maps to your proportions, not a standard size chart. This is the gown for women who understand that presence is architecture.",
          hotspots: [
            { id: "neckline", label: "Neckline", body: "Strapless sculpted neckline with velvet fold detail — internal structure that maintains its line for 8+ hours without shifting." },
            { id: "fabric", label: "Fabric", body: "Silk-viscose velvet at 450gsm. Nap direction engineered so depth shifts as you move through light — the fabric looks alive." },
            { id: "color", label: "Color", body: "Nocturne Black · AA-PIG-007. True black velvet with a crimson undertone under stage lighting — dramatic, never dull." },
            { id: "structure", label: "Structure", body: "16-point boned bodice with mermaid flare at the knee. Hip line and flare mapped to your body — couture means yours alone." },
          ],
          specs: [
            { k: "Construction", v: "Structured mermaid" },
            { k: "Boning", v: "16-point corsetry" },
            { k: "Lining", v: "Silk organza" },
            { k: "Fittings", v: "3 private sessions" },
          ],
          investment: "$3,900",
          leadTime: "14 weeks",
        },
        {
          title: "Pearl Cascade",
          event: "Quinceañera",
          tag: "Pearl embroidery · Heights",
          codename: "AA-PC-005",
          headline: "Her moment. Her light. A gown that makes every photograph a keepsake.",
          description:
            "Pearl Cascade was created for a quinceañera in the Heights — a celebration where she should be the center of every frame. Eight hundred freshwater pearls hand-sewn through layers of tulle, each placement designed to catch light when she spins. Mothers tell us this is the dress their daughters still talk about years later. Yours will be built for her story, her dance, her night.",
          hotspots: [
            { id: "neckline", label: "Neckline", body: "Sweetheart bodice with pearl-trimmed edge — seed pearls hand-embroidered along the décolletage for a glow that starts at the first glance." },
            { id: "fabric", label: "Fabric", body: "Silk satin bodice with layered tulle skirt. Pearl embroidery flows from bodice through the upper skirt — 800+ freshwater pearls, each placed by hand." },
            { id: "color", label: "Color", body: "Blush Pearl · AA-PIG-009. Soft blush ivory with pearl luminosity — universally flattering, impossibly romantic in every light." },
            { id: "embellishment", label: "Embellishment", body: "Cascading pearl pattern designed for movement. Light catches differently with every turn on the dance floor — built for the waltz and the photos after." },
          ],
          specs: [
            { k: "Construction", v: "Ballgown · tulle layers" },
            { k: "Pearls", v: "800+ hand-sewn" },
            { k: "Lining", v: "Silk habotai" },
            { k: "Fittings", v: "4 private sessions" },
          ],
          investment: "$4,200",
          leadTime: "15 weeks",
        },
        {
          title: "Ivory Arc",
          event: "Wedding",
          tag: "Architectural train · Museum District",
          codename: "AA-IA-006",
          headline: "The aisle becomes a runway. The train becomes the statement.",
          description:
            "Ivory Arc was designed for a Museum District bride who wanted modern architecture, not tradition for tradition's sake. The cathedral train is engineered to your height and stride — a sculptural arc that moves with intention. Double-face silk satin holds structure and fluidity simultaneously. This is the wedding gown for women who edit their lives the way they edit a guest list: with precision and zero apology.",
          hotspots: [
            { id: "neckline", label: "Neckline", body: "Clean bateau neckline with architectural shoulder line — minimal, modern, and impossible to forget in every photograph." },
            { id: "fabric", label: "Fabric", body: "Double-face silk satin at 23 momme. Crisp enough to hold the train's arc, fluid enough to move like water when you walk." },
            { id: "color", label: "Color", body: "Museum Ivory · AA-PIG-002. Cool ivory with architectural clarity — editorial in photographs, timeless in person." },
            { id: "train", label: "Train", body: "Cathedral-length architectural train with internal horsehair hem. The arc is engineered to your height — a silhouette no ready-to-wear gown can replicate." },
          ],
          specs: [
            { k: "Construction", v: "Architectural satin" },
            { k: "Train", v: "Cathedral · 2.4m" },
            { k: "Lining", v: "Silk organza" },
            { k: "Fittings", v: "5 private sessions" },
          ],
          investment: "$6,200",
          leadTime: "16 weeks",
        },
      ],
    },
    testimonials: {
      title: "Client Reflections",
      items: [
        {
          quote:
            "Ann understood the dress I couldn't articulate. The fitting experience felt like working with a sculptor.",
          name: "Elena M.",
          event: "Gala · Houston",
        },
        {
          quote:
            "I've worn couture in New York and Paris. This atelier rivals them — with warmth only Houston offers.",
          name: "Sarah K.",
          event: "Wedding · River Oaks",
        },
        {
          quote:
            "My quinceañera gown was a masterpiece. Every detail was intentional. I still get stopped for photos.",
          name: "Isabella R.",
          event: "Quinceañera · Katy",
        },
      ],
    },
    houston: {
      title: "Your Houston Atelier",
      subtitle: "Private appointments by schedule only.",
      address: "2400 Westheimer Rd, Suite 120",
      city: "Houston, TX 77098",
      hours: "Tue–Sat · 10am – 6pm",
      parking: "Valet & garage parking available",
      directions: "Get Directions",
    },
    faq: {
      title: "Frequently Asked",
      items: [
        {
          q: "How long does a custom dress take?",
          a: "Most commissions require 12–16 weeks from signed design to delivery. Rush timelines may be available for an additional fee.",
        },
        {
          q: "What is the investment range?",
          a: "Custom couture gowns typically begin at $3,200 and vary based on fabric, embellishment, and complexity. Your consultation includes a tailored estimate.",
        },
        {
          q: "Do you travel outside Houston?",
          a: "Primary fittings occur in our Houston atelier. Remote clients may arrange virtual design sessions with select in-person fitting trips.",
        },
        {
          q: "What occasions do you design for?",
          a: "Galas, weddings, quinceañeras, black-tie events, and milestone celebrations where a one-of-one gown is warranted.",
        },
      ],
    },
    cta: {
      title: "Begin Your Experience of Custom Couture",
      subtitle: "Share your vision. We'll respond within one business day.",
      name: "Full Name",
      email: "Email",
      event: "Occasion & Date",
      message: "Tell us about your vision",
      submit: "Request Consultation",
      success: "Thank you. We'll be in touch shortly.",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
    },
    legal: {
      back: "Back to Home",
      toc: "On this page",
      privacy: {
        metaTitle: "Privacy Policy | Ann Atelier Houston",
        metaDescription:
          "How Ann Atelier collects, uses, and protects your personal information for bespoke couture consultations and commissions in Houston, Texas.",
      },
      terms: {
        metaTitle: "Terms of Service | Ann Atelier Houston",
        metaDescription:
          "Terms governing use of the Ann Atelier website and consultation requests for custom couture in Houston, Texas.",
      },
    },
    plans: {
      metaTitle: "Digital Presence Plans | Ann Atelier",
      metaDescription:
        "Monthly website and digital care plans for Ann Atelier — launch included, no upfront build fee.",
      downloadPdf: "Download PDF",
      downloading: "Generating…",
      labels: {
        perMonth: "/ month",
        oneTime: "one-time",
        minimum: "{n}-month minimum commitment",
        recommended: "Recommended",
        includes: "Includes",
        notIncluded: "Not included",
      },
    },
  },
  es: {
    meta: {
      title: "Ann Atelier | Vestidos de Alta Costura a Medida Houston TX",
      description:
        "Vestidos de mujer hechos a medida y citas privadas en Houston, Texas. Alta costura única para galas, bodas y celebraciones especiales.",
    },
    nav: {
      philosophy: "Filosofía",
      process: "Proceso",
      lookbook: "Portafolio",
      houston: "Houston",
      faq: "Preguntas",
      book: "Reservar Consulta",
      menu: "Menú",
      close: "Cerrar",
    },
    theme: {
      switchToLight: "Cambiar a modo claro",
      switchToDark: "Cambiar a modo oscuro",
    },
    hero: {
      eyebrow: "Houston · Alta Costura a Medida",
      title: "Vestidos esculpidos para la mujer que deja huella.",
      subtitle:
        "Piezas únicas creadas en nuestro atelier privado. Del primer boceto a la última puntada — una experiencia tan excepcional como tu ocasión.",
      cta: "Reservar Cita Privada",
      ctaSecondary: "Conocer el Atelier",
    },
    marquee: [
      "A Medida",
      "Alta Costura",
      "Houston",
      "Citas Privadas",
      "Seda y Estructura",
      "Pieza Única",
    ],
    philosophy: {
      title: "Filosofía del Atelier",
      subtitle: "Tres pilares definen cada encargo que aceptamos.",
      items: [
        {
          title: "Arte",
          body: "Cada vestido nace de un boceto original — nunca de catálogo. Telas seleccionadas en el mundo por cómo se mueven contigo.",
        },
        {
          title: "Ajuste Preciso",
          body: "Múltiples pruebas privadas esculpen la silueta a tu cuerpo. Estructura y caída se diseñan, no se adivinan.",
        },
        {
          title: "Exclusividad",
          body: "Aceptamos un número limitado de encargos por temporada. Tu vestido nunca se replicará.",
        },
      ],
    },
    process: {
      title: "De la Visión al Velo",
      subtitle: "Un recorrido transparente — típicamente 12–16 semanas.",
      steps: [
        { title: "Consulta", body: "Sesión privada en nuestro atelier en Houston. Estilo, silueta, calendario." },
        { title: "Diseño", body: "Bocetos a mano y muestras de tela curadas para ti." },
        { title: "Muselina", body: "Primera prueba en toile — arquitectura antes del adorno." },
        { title: "Creación", body: "Construcción couture con pruebas intermedias." },
        { title: "Revelación", body: "Prueba final. Tu vestido, listo para el mundo." },
      ],
    },
    lookbook: {
      title: "Encargos Selectos",
      subtitle: "Una mirada a creaciones recientes únicas.",
      modal: {
        close: "Cerrar",
        codename: "Ref. Encargo",
        scan: "Escaneo 3D Atelier",
        gallery: "Vista Editorial",
        drag: "Arrastra para rotar",
        specs: "Ficha Técnica",
        investment: "Inversión desde",
        leadTime: "Tiempo de entrega",
        cta: "Reservar Cita Privada",
        ctaNote: "Pieza única · Nunca replicada",
      },
      items: [
        {
          title: "Gala de Medianoche",
          event: "Gala",
          tag: "Charmeuse de seda · Houston",
          codename: "AA-MG-001",
          headline: "El vestido que entra antes que tú — y permanece en la memoria mucho después del último baile.",
          description:
            "Creado para una gala privada en Houston, esta columna de charmeuse única se construyó alrededor de la presencia de una mujer — no de una talla estándar. Tres pruebas íntimas esculpieron cada línea para moverse como sombra líquida sobre mármol. Cuando encargas Gala de Medianoche, no compras un vestido. Inviertes en el instante en que la sala se queda en silencio.",
          hotspots: [
            { id: "neckline", label: "Escote", body: "Strapless corazón con corsetería interna — 14 varillas que elevan y sostienen por horas sin sacrificar comodidad ni movimiento." },
            { id: "fabric", label: "Tela", body: "Charmeuse de seda doble capa, 19 momme, origen Milán. La caída se calibra a tu paso — captura la luz distinto en cada movimiento." },
            { id: "color", label: "Color", body: "Obsidian Noir · AA-PIG-004. Negro profundo con subtono azul que se ve imposiblemente rico bajo candelabros — nunca plano, nunca común." },
            { id: "silhouette", label: "Silueta", body: "Columna al bias diseñada para fluir. La bastilla cae limpia e ininterrumpida — para la mujer que domina la pista sin esfuerzo." },
          ],
          specs: [
            { k: "Construcción", v: "Costura francesa couture" },
            { k: "Cierre", v: "Cremallera invisible · corchetes" },
            { k: "Forro", v: "Habotai de seda" },
            { k: "Pruebas", v: "3 sesiones privadas" },
          ],
          investment: "$3,200",
          leadTime: "14 semanas",
        },
        {
          title: "Votos en el Jardín",
          event: "Boda",
          tag: "Capas de organza · River Oaks",
          codename: "AA-GV-002",
          headline: "Camina al altar como la luz misma — ligera, luminosa, inolvidable.",
          description:
            "Diseñado para una ceremonia íntima en jardín en River Oaks, Votos en el Jardín superpone organza de seda como pétalos que abren en la hora dorada. Cada nivel se cortó al bias para captar brisa y sol al mismo tiempo. Las novias que eligen esta silueta no llegan — aparecen. Tu versión se mapeará a tu pasillo, tus flores, tu luz.",
          hotspots: [
            { id: "neckline", label: "Escote", body: "Corpiño strapless arquitectónico con organza drapeada a mano — esculpido a tu clavícula para enmarcar como una pintura." },
            { id: "fabric", label: "Tela", body: "Organza de seda triple capa sobre estructura de tul. Cada nivel flota de forma independiente — la falda se mueve como si respirara." },
            { id: "color", label: "Color", body: "Garden Ivory · AA-PIG-001. Marfil cálido con subtono rosa que armoniza con flores naturales — nunca compite, siempre complementa." },
            { id: "silhouette", label: "Silueta", body: "Línea A graduada con volumen escalonado. La cola se calibra a tu pasillo — cada paso coreografiado de antemano." },
          ],
          specs: [
            { k: "Construcción", v: "Capas de organza escalonadas" },
            { k: "Cierre", v: "Espalda corset · cordón" },
            { k: "Forro", v: "Crepe de chine de seda" },
            { k: "Pruebas", v: "4 sesiones privadas" },
          ],
          investment: "$5,000",
          leadTime: "16 semanas",
        },
        {
          title: "Hora Dorada",
          event: "Etiqueta rigurosa",
          tag: "Bordado a mano · Galleria",
          codename: "AA-GH-003",
          headline: "Dos mil cuatrocientas cristales. Una mujer. Todas las miradas en la sala.",
          description:
            "Hora Dorada nació de una sola petición: haz que parezca que la luz me sigue. Ciento ochenta horas de anudado a mano después, este vestido refracta la luz de las velas desde cada ángulo — en persona y en cada fotografía. Encargado cerca de Galleria para eventos de etiqueta donde no hay segunda oportunidad. Alta costura como joyería que puedes llevar puesta.",
          hotspots: [
            { id: "neckline", label: "Escote", body: "Drapeado de un hombro con cascada asimétrica de cristales — contrapesado para mantener equilibrio toda la noche." },
            { id: "fabric", label: "Tela", body: "Base de georgette de seda con overlay bordado a mano. Cada cristal anudado individualmente — hecho para la pista de baile y el flash de la cámara." },
            { id: "color", label: "Color", body: "Champagne Gold · AA-PIG-012. Metálico cálido con subtono miel — diseñado para fotografía en hora dorada y salones a la luz de las velas." },
            { id: "embellishment", label: "Adorno", body: "Gradiente Swarovski del corpiño a la bastilla. Densidad de cristales mapeada a tus zonas de movimiento — máxima refracción donde la luz te encuentra." },
          ],
          specs: [
            { k: "Construcción", v: "Overlay couture bordado" },
            { k: "Cristales", v: "2,400 a mano" },
            { k: "Forro", v: "Charmeuse de seda" },
            { k: "Pruebas", v: "4 sesiones privadas" },
          ],
          investment: "$7,500",
          leadTime: "16 semanas",
        },
        {
          title: "Noche de Terciopelo",
          event: "Gala",
          tag: "Corpiño estructurado · Memorial",
          codename: "AA-VN-004",
          headline: "Poder que puedes vestir — terciopelo esculpido para la mujer que no pide la atención. La toma.",
          description:
            "Noche de Terciopelo se diseñó para una gala en Memorial donde el vestido debía mantener su línea desde la llegada hasta el brindis final — ocho horas, cero concesiones. El corpiño sirena estructurado se mapea a tus proporciones, no a una talla estándar. El vestido para mujeres que entienden que la presencia es arquitectura.",
          hotspots: [
            { id: "neckline", label: "Escote", body: "Escote strapless esculpido con pliegue de terciopelo — estructura interna que mantiene la línea 8+ horas sin moverse." },
            { id: "fabric", label: "Tela", body: "Terciopelo seda-viscosa a 450gsm. Dirección del pelo diseñada para que la profundidad cambie al moverte en la luz — la tela parece viva." },
            { id: "color", label: "Color", body: "Nocturne Black · AA-PIG-007. Terciopelo negro puro con subtono carmesí bajo luces de escenario — dramático, nunca opaco." },
            { id: "structure", label: "Estructura", body: "Corpiño con 16 varillas y flare sirena en rodilla. Cadera y flare mapeados a tu cuerpo — couture significa solo tuyo." },
          ],
          specs: [
            { k: "Construcción", v: "Sirena estructurada" },
            { k: "Varillas", v: "Corsetería 16 puntos" },
            { k: "Forro", v: "Organza de seda" },
            { k: "Pruebas", v: "3 sesiones privadas" },
          ],
          investment: "$3,900",
          leadTime: "14 semanas",
        },
        {
          title: "Cascada de Perlas",
          event: "Quinceañera",
          tag: "Bordado de perlas · Heights",
          codename: "AA-PC-005",
          headline: "Su momento. Su luz. Un vestido que convierte cada fotografía en recuerdo.",
          description:
            "Cascada de Perlas se creó para una quinceañera en the Heights — una celebración donde ella debe ser el centro de cada encuadre. Ochocientas perlas de agua dulce cosidas a mano entre capas de tul, cada una colocada para captar luz cuando gira. Las madres nos dicen que este es el vestido del que sus hijas aún hablan años después. El tuyo se construirá para su historia, su baile, su noche.",
          hotspots: [
            { id: "neckline", label: "Escote", body: "Corpiño corazón con borde de perlas — perlas semilla bordadas a mano en el escote para un brillo desde el primer vistazo." },
            { id: "fabric", label: "Tela", body: "Corpiño de satén de seda con falda de tul en capas. Bordado de perlas fluye del corpiño a la falda superior — 800+ perlas de agua dulce, cada una a mano." },
            { id: "color", label: "Color", body: "Blush Pearl · AA-PIG-009. Marfil blush suave con luminosidad perla — favorecedor en todo tono de piel, imposiblemente romántico." },
            { id: "embellishment", label: "Adorno", body: "Patrón de perlas en cascada diseñado para el movimiento. La luz cambia con cada giro en la pista — hecho para el vals y las fotos después." },
          ],
          specs: [
            { k: "Construcción", v: "Ballgown · capas tul" },
            { k: "Perlas", v: "800+ cosidas a mano" },
            { k: "Forro", v: "Habotai de seda" },
            { k: "Pruebas", v: "4 sesiones privadas" },
          ],
          investment: "$4,200",
          leadTime: "15 semanas",
        },
        {
          title: "Arco Marfil",
          event: "Boda",
          tag: "Cola arquitectónica · Museum District",
          codename: "AA-IA-006",
          headline: "El pasillo se convierte en pasarela. La cola se convierte en la declaración.",
          description:
            "Arco Marfil se diseñó para una novia del Museum District que quería arquitectura moderna, no tradición por inercia. La cola catedral se diseña a tu altura y paso — un arco escultórico que se mueve con intención. Satén de seda doble faz sostiene estructura y fluidez a la vez. El vestido de boda para mujeres que editan su vida como editan la lista de invitados: con precisión y sin disculpas.",
          hotspots: [
            { id: "neckline", label: "Escote", body: "Escote barco limpio con línea de hombro arquitectónica — minimal, moderno e imposible de olvidar en cada fotografía." },
            { id: "fabric", label: "Tela", body: "Satén de seda doble faz a 23 momme. Lo bastante rígido para sostener el arco de la cola, lo bastante fluido para moverse como agua al caminar." },
            { id: "color", label: "Color", body: "Museum Ivory · AA-PIG-002. Marfil frío con claridad arquitectónica — editorial en fotos, atemporal en persona." },
            { id: "train", label: "Cola", body: "Cola catedral arquitectónica con bastilla interna de crin. El arco se diseña a tu altura — una silueta que ningún prêt-à-porter puede replicar." },
          ],
          specs: [
            { k: "Construcción", v: "Satén arquitectónico" },
            { k: "Cola", v: "Catedral · 2.4m" },
            { k: "Forro", v: "Organza de seda" },
            { k: "Pruebas", v: "5 sesiones privadas" },
          ],
          investment: "$6,200",
          leadTime: "16 semanas",
        },
      ],
    },
    testimonials: {
      title: "Reflexiones de Clientas",
      items: [
        {
          quote:
            "Ann entendió el vestido que yo no podía describir. La experiencia de prueba fue como trabajar con una escultora.",
          name: "Elena M.",
          event: "Gala · Houston",
        },
        {
          quote:
            "He usado alta costura en Nueva York y París. Este atelier las iguala — con la calidez que solo Houston ofrece.",
          name: "Sarah K.",
          event: "Boda · River Oaks",
        },
        {
          quote:
            "Mi vestido de quinceañera fue una obra maestra. Cada detalle fue intencional. Aún me piden fotos.",
          name: "Isabella R.",
          event: "Quinceañera · Katy",
        },
      ],
    },
    houston: {
      title: "Tu Atelier en Houston",
      subtitle: "Citas privadas solo con reservación.",
      address: "2400 Westheimer Rd, Suite 120",
      city: "Houston, TX 77098",
      hours: "Mar–Sáb · 10am – 6pm",
      parking: "Valet y estacionamiento en garaje disponibles",
      directions: "Cómo Llegar",
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          q: "¿Cuánto tarda un vestido a medida?",
          a: "La mayoría de encargos requieren 12–16 semanas desde el diseño firmado hasta la entrega. Plazos urgentes pueden estar disponibles con cargo adicional.",
        },
        {
          q: "¿Cuál es el rango de inversión?",
          a: "Los vestidos de alta costura suelen comenzar en $3,200 y varían según tela, adornos y complejidad. Tu consulta incluye una estimación personalizada.",
        },
        {
          q: "¿Atienden fuera de Houston?",
          a: "Las pruebas principales son en nuestro atelier en Houston. Clientas remotas pueden coordinar sesiones virtuales de diseño con visitas selectas.",
        },
        {
          q: "¿Para qué ocasiones diseñan?",
          a: "Galas, bodas, quinceañeras, eventos de etiqueta y celebraciones donde un vestido único es la elección natural.",
        },
      ],
    },
    cta: {
      title: "Inicia Tu Experiencia de Alta Costura",
      subtitle: "Comparte tu visión. Respondemos en un día hábil.",
      name: "Nombre Completo",
      email: "Correo",
      event: "Ocasión y Fecha",
      message: "Cuéntanos tu visión",
      submit: "Solicitar Consulta",
      success: "Gracias. Nos pondremos en contacto pronto.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
    },
    legal: {
      back: "Volver al Inicio",
      toc: "En esta página",
      privacy: {
        metaTitle: "Política de Privacidad | Ann Atelier Houston",
        metaDescription:
          "Cómo Ann Atelier recopila, usa y protege su información personal para consultas y encargos de alta costura en Houston, Texas.",
      },
      terms: {
        metaTitle: "Términos de Servicio | Ann Atelier Houston",
        metaDescription:
          "Términos de uso del sitio de Ann Atelier y solicitudes de consulta para alta costura a medida en Houston, Texas.",
      },
    },
    plans: {
      metaTitle: "Planes de Presencia Digital | Ann Atelier",
      metaDescription:
        "Planes mensuales de sitio web y cuidado digital para Ann Atelier — lanzamiento incluido, sin pago inicial.",
      downloadPdf: "Descargar PDF",
      downloading: "Generando…",
      labels: {
        perMonth: "/ mes",
        oneTime: "pago único",
        minimum: "Compromiso mínimo: {n} meses",
        recommended: "Recomendado",
        includes: "Incluye",
        notIncluded: "No incluye",
      },
    },
  },
} as const;

export type Translation = (typeof translations)[Locale];
