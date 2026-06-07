export type SilhouetteType = "sheath" | "aline" | "ballgown" | "mermaid" | "architectural";

export type PhotoHotspotLayout = {
  id: string;
  /** Punto de anclaje sobre la prenda (%) */
  x: number;
  y: number;
  /** Destino del vástago — tarjeta (%) */
  labelX: number;
  labelY: number;
  /** Anclaje de la tarjeta respecto a su punto */
  align: "tl" | "tr" | "bl" | "br";
};

/** Posiciones de anotaciones sobre la foto — una por hotspot, distribuidas en la imagen */
export const PHOTO_HOTSPOT_LAYOUTS: PhotoHotspotLayout[][] = [
  [
    { id: "neckline", x: 50, y: 26, labelX: 78, labelY: 14, align: "tr" },
    { id: "fabric", x: 36, y: 46, labelX: 10, labelY: 40, align: "tl" },
    { id: "color", x: 64, y: 54, labelX: 90, labelY: 50, align: "tr" },
    { id: "silhouette", x: 48, y: 74, labelX: 12, labelY: 70, align: "bl" },
  ],
  [
    { id: "neckline", x: 52, y: 24, labelX: 82, labelY: 12, align: "tr" },
    { id: "fabric", x: 34, y: 50, labelX: 8, labelY: 44, align: "tl" },
    { id: "color", x: 66, y: 42, labelX: 88, labelY: 38, align: "tr" },
    { id: "silhouette", x: 50, y: 78, labelX: 14, labelY: 74, align: "bl" },
  ],
  [
    { id: "neckline", x: 48, y: 22, labelX: 76, labelY: 10, align: "tr" },
    { id: "fabric", x: 38, y: 44, labelX: 10, labelY: 36, align: "tl" },
    { id: "color", x: 60, y: 58, labelX: 90, labelY: 54, align: "tr" },
    { id: "embellishment", x: 55, y: 38, labelX: 86, labelY: 28, align: "tr" },
  ],
  [
    { id: "neckline", x: 50, y: 25, labelX: 80, labelY: 13, align: "tr" },
    { id: "fabric", x: 35, y: 48, labelX: 9, labelY: 42, align: "tl" },
    { id: "color", x: 62, y: 56, labelX: 88, labelY: 52, align: "tr" },
    { id: "structure", x: 45, y: 68, labelX: 11, labelY: 64, align: "bl" },
  ],
  [
    { id: "neckline", x: 51, y: 23, labelX: 79, labelY: 11, align: "tr" },
    { id: "fabric", x: 33, y: 47, labelX: 8, labelY: 41, align: "tl" },
    { id: "color", x: 67, y: 55, labelX: 91, labelY: 49, align: "tr" },
    { id: "embellishment", x: 52, y: 62, labelX: 13, labelY: 58, align: "bl" },
  ],
  [
    { id: "neckline", x: 49, y: 24, labelX: 77, labelY: 12, align: "tr" },
    { id: "fabric", x: 37, y: 45, labelX: 10, labelY: 39, align: "tl" },
    { id: "color", x: 63, y: 52, labelX: 89, labelY: 48, align: "tr" },
    { id: "train", x: 54, y: 82, labelX: 15, labelY: 76, align: "bl" },
  ],
];

export type HotspotAnchor = {
  id: string;
  position: [number, number, number];
};

export type DressVisual = {
  silhouette: SilhouetteType;
  colorHex: string;
  roughness: number;
  metalness: number;
  sheen: number;
  clearcoat: number;
  emissive?: string;
  emissiveIntensity?: number;
};

export const DRESS_VISUALS: DressVisual[] = [
  {
    silhouette: "sheath",
    colorHex: "#0a0a0a",
    roughness: 0.18,
    metalness: 0.08,
    sheen: 0.85,
    clearcoat: 0.6,
  },
  {
    silhouette: "aline",
    colorHex: "#f5f0e8",
    roughness: 0.42,
    metalness: 0.02,
    sheen: 0.35,
    clearcoat: 0.15,
  },
  {
    silhouette: "aline",
    colorHex: "#c9a962",
    roughness: 0.25,
    metalness: 0.35,
    sheen: 0.7,
    clearcoat: 0.45,
    emissive: "#c9a962",
    emissiveIntensity: 0.08,
  },
  {
    silhouette: "mermaid",
    colorHex: "#141010",
    roughness: 0.78,
    metalness: 0.04,
    sheen: 0.2,
    clearcoat: 0.05,
  },
  {
    silhouette: "ballgown",
    colorHex: "#f0e6dc",
    roughness: 0.3,
    metalness: 0.12,
    sheen: 0.55,
    clearcoat: 0.35,
  },
  {
    silhouette: "architectural",
    colorHex: "#faf7f2",
    roughness: 0.22,
    metalness: 0.05,
    sheen: 0.48,
    clearcoat: 0.4,
  },
];

export const DRESS_HOTSPOTS: HotspotAnchor[][] = [
  [
    { id: "neckline", position: [0, 1.72, 0.26] },
    { id: "fabric", position: [0.28, 1.1, 0.18] },
    { id: "color", position: [-0.24, 0.85, 0.22] },
    { id: "silhouette", position: [0.32, 0.45, 0.12] },
  ],
  [
    { id: "neckline", position: [0, 1.75, 0.3] },
    { id: "fabric", position: [0.35, 1.2, 0.2] },
    { id: "color", position: [-0.3, 0.9, 0.25] },
    { id: "silhouette", position: [0.42, 0.35, 0.15] },
  ],
  [
    { id: "neckline", position: [0, 1.7, 0.24] },
    { id: "fabric", position: [0.26, 1.05, 0.2] },
    { id: "color", position: [-0.22, 0.7, 0.18] },
    { id: "embellishment", position: [0.3, 1.35, 0.22] },
  ],
  [
    { id: "neckline", position: [0, 1.68, 0.22] },
    { id: "fabric", position: [0.24, 0.95, 0.16] },
    { id: "color", position: [-0.2, 0.6, 0.14] },
    { id: "structure", position: [0.28, 1.25, 0.2] },
  ],
  [
    { id: "neckline", position: [0, 1.78, 0.34] },
    { id: "fabric", position: [0.38, 1.15, 0.22] },
    { id: "color", position: [-0.32, 0.8, 0.28] },
    { id: "embellishment", position: [0.35, 1.4, 0.26] },
  ],
  [
    { id: "neckline", position: [0, 1.74, 0.28] },
    { id: "fabric", position: [0.3, 1.08, 0.2] },
    { id: "color", position: [-0.26, 0.75, 0.2] },
    { id: "train", position: [0.15, 0.08, 0.35] },
  ],
];
