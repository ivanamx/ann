import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { QUINCE_CAROUSEL_IMAGES } from "../data/images";
import { SectionHeader } from "./SectionHeader";

export function QuinceCarousel() {
  const { t, locale } = useLocale();
  const ref = useReveal<HTMLElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const images = QUINCE_CAROUSEL_IMAGES;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const slides = root.querySelectorAll<HTMLElement>("[data-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (best) {
          const idx = Number((best.target as HTMLElement).dataset.slide);
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { root, threshold: [0.45, 0.6, 0.75] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const scrollToSlide = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, next));
      const slide = scrollRef.current?.querySelector<HTMLElement>(`[data-slide="${clamped}"]`);
      slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    },
    [images.length],
  );

  return (
    <section
      id="quinceaneras"
      ref={ref}
      className="reveal quince-section section-pad section-surface border-b border-cream/5"
      aria-labelledby="quince-title"
    >
      <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6">
        <div className="mb-8 min-[375px]:mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeader
            eyebrow={t.quinceCarousel.eyebrow}
            title={t.quinceCarousel.title}
            subtitle={t.quinceCarousel.subtitle}
            titleId="quince-title"
            className="max-w-xl"
          />

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              className="atelier-control"
              onClick={() => scrollToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label={t.quinceCarousel.prev}
              data-cursor-hover
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <button
              type="button"
              className="atelier-control"
              onClick={() => scrollToSlide(activeIndex + 1)}
              disabled={activeIndex === images.length - 1}
              aria-label={t.quinceCarousel.next}
              data-cursor-hover
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="quince-filmstrip-wrap">
        <div
          ref={scrollRef}
          className="quince-filmstrip"
          role="list"
          aria-label={t.quinceCarousel.title}
        >
          {images.map((image, i) => (
            <figure
              key={image.src}
              data-slide={i}
              role="listitem"
              className="quince-filmstrip__slide atelier-card"
              style={{ "--slide-index": i } as CSSProperties}
            >
              <span className="atelier-card__shine" aria-hidden />
              <div className="quince-filmstrip__frame">
                <img
                  src={image.src}
                  alt={image.alt[locale]}
                  width={image.width}
                  height={image.height}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </div>
              {image.caption && (
                <figcaption className="quince-filmstrip__caption">
                  <span className="quince-filmstrip__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="quince-filmstrip__label">{image.caption[locale]}</span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6 mt-5 sm:mt-6 flex items-center justify-between gap-4">
        <p className="quince-filmstrip__hint">{t.quinceCarousel.scrollHint}</p>
        <p className="quince-filmstrip__counter" aria-live="polite">
          <span className="quince-filmstrip__counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="quince-filmstrip__counter-sep">/</span>
          <span>{String(images.length).padStart(2, "0")}</span>
        </p>
      </div>
    </section>
  );
}
