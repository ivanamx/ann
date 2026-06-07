/** Lee variables VITE_* — valores booleanos: "true" | "1" activan el flag. */
function envFlag(value: string | undefined, fallback = false): boolean {
  if (value === undefined || value === "") return fallback;
  return value === "true" || value === "1";
}

/** Activa la vista 3D en los modales del lookbook. Por defecto: desactivado. */
export const LOOKBOOK_3D_ENABLED = envFlag(import.meta.env.VITE_LOOKBOOK_3D, false);
