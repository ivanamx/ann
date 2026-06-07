import { lazy, Suspense } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { BUSINESS } from "../data/seo";
import { SECTION_BACKGROUNDS } from "../data/images";

const HoustonMap = lazy(() =>
  import("./HoustonMap").then((m) => ({ default: m.HoustonMap })),
);

export function Houston() {
  const { t, locale } = useLocale();
  const ref = useReveal<HTMLElement>();
  const bg = SECTION_BACKGROUNDS.houston;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${BUSINESS.lat},${BUSINESS.lng}`;

  return (
    <section
      id="houston"
      ref={ref}
      className="houston-section reveal relative overflow-hidden bg-ink"
      aria-labelledby="houston-title"
    >
      {/* Imagen izquierda → difuminado a negro hacia el mapa */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="houston-section__visual absolute inset-0">
          <img
            src={bg.src}
            alt=""
            className="houston-section__img h-full w-full object-cover object-[28%_center] lg:object-[32%_22%]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="houston-section__fade-map" />
        <div className="houston-section__fade-top" />
      </div>
      <span className="sr-only">{bg.alt[locale]}</span>

      <div className="relative z-10 mx-auto max-w-7xl px-3 min-[375px]:px-4 py-14 min-[375px]:py-16 sm:px-6 sm:py-24">
        <div className="grid gap-8 min-[375px]:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="houston-section__copy lg:pr-4">
            <h2 id="houston-title" className="font-display text-2xl min-[375px]:text-3xl sm:text-4xl text-cream">
              {t.houston.title}
            </h2>
            <p className="mt-1.5 min-[375px]:mt-2 text-cream-muted text-[0.8125rem] min-[375px]:text-sm sm:text-base">{t.houston.subtitle}</p>

            <address className="mt-6 min-[375px]:mt-8 not-italic text-[0.8125rem] min-[375px]:text-sm space-y-1.5 min-[375px]:space-y-2">
              <p className="text-cream">{t.houston.address}</p>
              <p className="text-cream-muted">{t.houston.city}</p>
              <p className="houston-section__hours text-gold">{t.houston.hours}</p>
              <p className="text-cream-muted">{t.houston.parking}</p>
              <a
                href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
                className="block mt-4 text-cream hover:text-gold transition-colors min-h-[44px] flex items-center"
              >
                {BUSINESS.phone}
              </a>
            </address>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="houston-section__directions mt-5 min-[375px]:mt-6 inline-flex min-h-[44px] items-center px-5 min-[375px]:px-6 py-2.5 min-[375px]:py-3 border border-gold/50 text-gold text-[0.65rem] min-[375px]:text-xs uppercase tracking-[0.16em] min-[375px]:tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
              data-cursor-hover
            >
              {t.houston.directions}
            </a>
          </div>

          <div className="houston-section__map-wrap relative lg:pl-2">
            <Suspense
              fallback={
                <div
                  className="houston-map relative aspect-[4/3] min-h-[200px] max-[374px]:min-h-[190px] min-[375px]:min-h-[240px] w-full overflow-hidden bg-ink-soft animate-pulse"
                  aria-hidden
                />
              }
            >
              <HoustonMap />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
