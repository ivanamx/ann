import type { ReactNode } from "react";

type SectionBackdropProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  className?: string;
  overlay?: "light" | "medium" | "heavy";
};

const OVERLAY_STYLES = {
  light: "from-ink/45 via-ink/35 to-ink/50",
  medium: "from-ink/55 via-ink/40 to-ink/48",
  heavy: "from-ink/65 via-ink/50 to-ink/58",
} as const;

export function SectionBackdrop({
  imageSrc,
  imageAlt,
  children,
  className = "",
  overlay = "medium",
}: SectionBackdropProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover object-center scale-105 brightness-[0.92] saturate-[1.08]"
          loading="lazy"
          decoding="async"
        />
        <div
          className={`section-backdrop__overlay section-backdrop__overlay--${overlay} absolute inset-0 bg-gradient-to-br ${OVERLAY_STYLES[overlay]}`}
        />
        <div className="section-backdrop__wash absolute inset-0 bg-ink/15" />
      </div>
      <span className="sr-only">{imageAlt}</span>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
