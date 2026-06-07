/** Imágenes curadas — Pexels (licencia gratuita). Fuente: https://www.pexels.com */

export const HERO_GOWN = {
  src: "/images/hero-gown.jpg",
  width: 1800,
  height: 2400,
  pexelsId: 32394175,
  photographer: "Andrés AB",
  alt: {
    en: "Editorial couture — one-shoulder peach tulle gown in a warm upscale lounge",
    es: "Editorial couture — vestido de tul peach con un hombro en lounge de lujo con luz cálida",
  },
} as const;

/** Imágenes del lookbook — orden alineado con translations lookbook.items */
export const LOOKBOOK_IMAGES = [
  {
    src: "/images/lookbook/01-midnight-gala.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 19517637,
    photographer: "Wolrider YURTSEVEN",
    alt: {
      en: "Midnight gala — strapless black dress with gold jewelry in a moody lounge",
      es: "Gala de medianoche — vestido negro strapless con joyería dorada en lounge elegante",
    },
  },
  {
    src: "/images/lookbook/02-garden-vows.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 4541967,
    photographer: "Pexels",
    alt: {
      en: "Garden vows — bride in strapless white gown among blooming pink roses",
      es: "Votos en el jardín — novia en vestido blanco strapless entre rosas rosadas en flor",
    },
  },
  {
    src: "/images/lookbook/03-golden-hour.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 32394174,
    photographer: "Andrés AB",
    alt: {
      en: "Golden hour — flowing evening gown in warm gold tones at an upscale bar",
      es: "Hora dorada — vestido de noche fluido en tonos dorados en bar de lujo",
    },
  },
  {
    src: "/images/lookbook/04-velvet-nocturne.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 985635,
    photographer: "Anne",
    alt: {
      en: "Velvet nocturne — emerald brocade evening gown with full skirt in motion against a concrete atelier wall",
      es: "Noche de terciopelo — vestido de noche brocado esmeralda con falda amplia en movimiento frente a muro de atelier",
    },
  },
  {
    src: "/images/lookbook/05-pearl-cascade.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 31331104,
    photographer: "eduardo199o9",
    alt: {
      en: "Pearl cascade — young Latina in an elegant quinceañera ball gown by a scenic lake",
      es: "Cascada de perlas — joven latina en vestido de quinceañera elegante junto a un lago",
    },
  },
  {
    src: "/images/lookbook/06-ivory-arc.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 11813954,
    photographer: "Vladimir Konoplev",
    alt: {
      en: "Ivory arc — bride in strapless white gown with architectural train in a luxury salon",
      es: "Arco marfil — novia en vestido blanco strapless con cola arquitectónica en salón de lujo",
    },
  },
] as const;

export type LookbookGalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: { en: string; es: string };
};

/** Imágenes HD para el modal — principal + galería opcional por encargo. */
export function getLookbookGallery(index: number): LookbookGalleryImage[] {
  const main = LOOKBOOK_IMAGES[index];
  if (!main) return [];

  const extras =
    "gallery" in main && Array.isArray(main.gallery) ? main.gallery : [];

  return [
    { src: main.src, width: main.width, height: main.height, alt: main.alt },
    ...extras,
  ];
}

/** Fondos de sección */
export const SECTION_BACKGROUNDS = {
  process: {
    src: "/images/sections/process-bg.jpg",
    pexelsId: 7148008,
    photographer: "Michael Burrows",
    alt: {
      en: "From vision to veil — couturier draping muslin on a dress form at a sunlit work table with fabrics and patterns",
      es: "De la visión al velo — modista drapeando muselina en maniquí junto a mesa de trabajo con telas y patrones a la luz natural",
    },
  },
  contact: {
    src: "/images/sections/contact-bg.jpg",
    pexelsId: 32632267,
    photographer: "Wolrider YURTSEVEN",
    alt: {
      en: "High-fashion editorial — bride twirling in flowing white organza in a sunlit garden",
      es: "Editorial de alta moda — novia girando en organza blanca fluida en jardín iluminado",
    },
  },
  houston: {
    src: "/images/sections/houston-bg.jpg",
    pexelsId: 996329,
    photographer: "Pexels",
    alt: {
      en: "Your Houston atelier — curated garments on wooden hangers in a warm private boutique",
      es: "Tu atelier en Houston — prendas curadas en perchas de madera en boutique privada cálida",
    },
  },
} as const;
