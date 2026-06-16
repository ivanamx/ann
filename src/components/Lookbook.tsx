import type { CSSProperties } from "react";
import { useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { LOOKBOOK_IMAGES } from "../data/images";
import { DressModal } from "./DressModal";
import { SectionHeader } from "./SectionHeader";

export function Lookbook() {
  const { t, locale } = useLocale();
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="lookbook"
      ref={ref}
      className="reveal lookbook-section section-pad section-surface--soft grain relative border-b border-cream/5"
      aria-labelledby="lookbook-title"
    >
      <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.lookbook.eyebrow}
          title={t.lookbook.title}
          subtitle={t.lookbook.subtitle}
          titleId="lookbook-title"
          className="mb-8 min-[375px]:mb-10 sm:mb-14"
        />

        <div className="lookbook-grid grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-2.5 max-[374px]:gap-2 min-[375px]:gap-3 sm:gap-4 auto-rows-[minmax(180px,1fr)] min-[480px]:auto-rows-[minmax(140px,1fr)] sm:auto-rows-[minmax(180px,1fr)]">
          {t.lookbook.items.map((item, i) => {
            const image = LOOKBOOK_IMAGES[i];
            const alt = image.alt[locale];

            return (
              <button
                key={item.title}
                type="button"
                className={`lookbook-card lookbook-grid__item group relative overflow-hidden text-left bg-ink-soft atelier-card ${
                  i === 0
                    ? "lookbook-card--featured min-[480px]:col-span-2 min-[480px]:row-span-2 min-h-[200px] max-[374px]:min-h-[210px] min-[375px]:min-h-[240px] sm:min-h-[320px]"
                    : "min-h-[150px] max-[374px]:min-h-[145px] min-[480px]:min-h-[140px]"
                }`}
                style={{ "--card-index": i } as CSSProperties}
                onClick={() => setActive(i)}
                data-cursor-hover
                aria-label={`${locale === "en" ? "View" : "Ver"} ${item.title} — ${item.event}`}
              >
                <span className="atelier-card__shine" aria-hidden />
                <img
                  src={image.src}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="lookbook-card__shade absolute inset-0 transition-opacity duration-500" aria-hidden />
                <div className="lookbook-card__caption">
                  <span className="lookbook-card__tag">{item.tag}</span>
                  <h3 className="lookbook-card__title">
                    {item.title}
                    <span className="lookbook-card__event">· {item.event}</span>
                  </h3>
                </div>
                <div className="lookbook-card__plus absolute top-3 right-3 min-[375px]:top-4 min-[375px]:right-4 w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-full flex items-center justify-center text-base min-[375px]:text-lg" aria-hidden>
                  +
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active !== null && (
        <DressModal
          index={active}
          item={t.lookbook.items[active]}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
