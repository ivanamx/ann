import { useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { LOOKBOOK_IMAGES } from "../data/images";
import { DressModal } from "./DressModal";

export function Lookbook() {
  const { t, locale } = useLocale();
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="lookbook"
      ref={ref}
      className="reveal pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pb-28 border-b border-cream/5"
      aria-labelledby="lookbook-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 id="lookbook-title" className="font-display text-3xl sm:text-4xl text-cream">
              {t.lookbook.title}
            </h2>
            <p className="mt-2 text-cream-muted text-sm">{t.lookbook.subtitle}</p>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[minmax(140px,1fr)] sm:auto-rows-[minmax(180px,1fr)]">
          {t.lookbook.items.map((item, i) => {
            const image = LOOKBOOK_IMAGES[i];
            const alt = image.alt[locale];

            return (
              <button
                key={item.title}
                type="button"
                className={`lookbook-card group relative overflow-hidden text-left bg-ink-soft ${
                  i === 0 ? "col-span-2 row-span-2 min-h-[200px] sm:min-h-[320px]" : "min-h-[140px]"
                } border border-cream/5 hover:border-gold/40 transition-all duration-500`}
                onClick={() => setActive(i)}
                data-cursor-hover
                aria-label={`${locale === "en" ? "View" : "Ver"} ${item.title} — ${item.event}`}
              >
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
                <div
                  className="lookbook-card__plus absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg"
                  aria-hidden
                >
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
