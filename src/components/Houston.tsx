import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { BUSINESS } from "../data/seo";
import { SECTION_BACKGROUNDS } from "../data/images";
import { HoustonMap } from "./HoustonMap";

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

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="houston-section__copy lg:pr-4">
            <h2 id="houston-title" className="font-display text-3xl sm:text-4xl text-cream">
              {t.houston.title}
            </h2>
            <p className="mt-2 text-cream-muted text-sm sm:text-base">{t.houston.subtitle}</p>

            <address className="mt-8 not-italic text-sm space-y-2">
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
              className="houston-section__directions mt-6 inline-flex min-h-[44px] items-center px-6 py-3 border border-gold/50 text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
              data-cursor-hover
            >
              {t.houston.directions}
            </a>
          </div>

          <div className="houston-section__map-wrap relative lg:pl-2">
            <HoustonMap />
          </div>
        </div>
      </div>
    </section>
  );
}
