/** Imágenes curadas — Pexels (licencia gratuita). Fuente: https://www.pexels.com */

export const HERO_GOWN = {
  src: "/images/hero-gown.jpg",
  width: 2000,
  height: 2667,
  pexelsId: 32394175,
  photographer: "Andrés AB",
  alt: {
    en: "Editorial couture — one-shoulder peach tulle gown in a warm, softly lit atelier lounge",
    es: "Editorial couture — vestido de tul peach con un hombro en lounge de atelier con luz cálida y suave",
  },
} as const;

/** Carrusel quinceañeras — sección principal de clientela */
export const QUINCE_CAROUSEL_IMAGES = [
  {
    src: "/images/quince-carousel/01.jpg",
    width: 1400,
    height: 1750,
    pexelsId: 31331104,
    photographer: "eduardo199o9",
    alt: {
      en: "Young woman in a red quinceañera ball gown by a scenic lake",
      es: "Joven en vestido de quinceañera rojo junto a un lago",
    },
    caption: { en: "Pearl Tulle · Heights", es: "Tul Perla · Heights" },
  },
  {
    src: "/images/quince-carousel/02.jpg",
    width: 1400,
    height: 1750,
    pexelsId: 36669023,
    alt: {
      en: "Light blue quinceañera ball gown with gold embroidery in a boutique",
      es: "Vestido de quinceañera azul cielo con bordado dorado en boutique",
    },
    caption: { en: "Sky Tulle · Gulfton", es: "Tul Celeste · Gulfton" },
  },
  {
    src: "/images/quince-carousel/03.jpg",
    width: 1400,
    height: 1750,
    pexelsId: 31331108,
    photographer: "eduardo199o9",
    alt: {
      en: "Red quinceañera gown at golden hour by the water",
      es: "Vestido de quinceañera rojo al atardecer junto al agua",
    },
    caption: { en: "Golden Hour · Katy", es: "Hora Dorada · Katy" },
  },
  {
    src: "/images/quince-carousel/04.jpg",
    width: 1400,
    height: 1750,
    pexelsId: 31331106,
    photographer: "eduardo199o9",
    alt: {
      en: "Quinceañera in a red floral ball gown holding a rose bouquet",
      es: "Quinceañera en vestido rojo con flores y ramo de rosas",
    },
    caption: { en: "Floral Lace · Memorial", es: "Encaje Floral · Memorial" },
  },
  {
    src: "/images/quince-carousel/05.jpg",
    width: 1400,
    height: 1750,
    pexelsId: 4541967,
    photographer: "Pexels",
    alt: {
      en: "Ivory strapless gown among blooming roses in a garden",
      es: "Vestido marfil strapless entre rosas en flor en un jardín",
    },
    caption: { en: "Garden Ivory · River Oaks", es: "Marfil Jardín · River Oaks" },
  },
  {
    src: "/images/quince-carousel/06.jpg",
    width: 1400,
    height: 1750,
    pexelsId: 32394175,
    photographer: "Andrés AB",
    alt: {
      en: "Peach one-shoulder couture gown with tiered tulle skirt",
      es: "Vestido couture peach de un hombro con falda de tul en capas",
    },
    caption: { en: "Blush Couture · West University", es: "Couture Blush · West University" },
  },
] as const;

/** Imágenes del lookbook — orden: quinceañeras → bodas → noche */
export const LOOKBOOK_IMAGES = [
  {
    src: "/images/lookbook/01-pearl-cascade.jpg",
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
    src: "/images/lookbook/02-garden-vows.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 4541967,
    photographer: "Pexels",
    alt: {
      en: "Garden vows — bride in strapless ivory gown among blooming pink roses",
      es: "Votos en el jardín — novia en vestido marfil strapless entre rosas rosadas en flor",
    },
  },
  {
    src: "/images/lookbook/03-ivory-arc.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 11813954,
    photographer: "Vladimir Konoplev",
    alt: {
      en: "Ivory arc — bride in strapless white gown with architectural train in a luxury salon",
      es: "Arco marfil — novia en vestido blanco strapless con cola arquitectónica en salón de lujo",
    },
  },
  {
    src: "/images/lookbook/04-candlelight-soiree.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 1926769,
    photographer: "Pexels",
    alt: {
      en: "Candlelight soirée — flowing blush evening gown in a warm candlelit salon",
      es: "Velada a la luz de las velas — vestido de noche blush fluido en salón cálido iluminado",
    },
  },
  {
    src: "/images/lookbook/05-velvet-twilight.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 985635,
    photographer: "Anne",
    alt: {
      en: "Velvet twilight — emerald brocade evening gown with full skirt in soft motion",
      es: "Crepúsculo de terciopelo — vestido de noche brocado esmeralda con falda amplia en movimiento",
    },
  },
  {
    src: "/images/lookbook/06-blush-evening.jpg",
    width: 1200,
    height: 1600,
    pexelsId: 20610585,
    photographer: "Pexels",
    alt: {
      en: "Blush evening — refined formal gown in warm taupe and blush at an upscale Houston venue",
      es: "Noche blush — vestido formal refinado en taupe cálido y blush en venue exclusivo de Houston",
    },
  },
] as const;

/** Placeholder grid para Instagram — sustituir cuando se tenga el usuario real */
export const INSTAGRAM_FEED_IMAGES = LOOKBOOK_IMAGES.map((img) => ({
  src: img.src,
  width: img.width,
  height: img.height,
  alt: img.alt,
}));

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
