import type { CSSProperties } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { useBooking } from "../booking/BookingContext";
import { INSTAGRAM_FEED_IMAGES } from "../data/images";
import { BUSINESS } from "../data/seo";
import { SectionHeader } from "./SectionHeader";

export function Instagram() {
  const { t, locale } = useLocale();
  const { openBooking } = useBooking();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="instagram"
      ref={ref}
      className="reveal instagram-section section-pad section-surface border-t border-cream/5"
      aria-labelledby="instagram-title"
    >
      <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.instagram.eyebrow}
          title={t.instagram.title}
          titleId="instagram-title"
          align="center"
          className="mb-8 min-[375px]:mb-10 sm:mb-12"
        />

        <a
          href={BUSINESS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-handle mx-auto block w-fit font-display text-lg sm:text-xl text-cream-muted transition-colors hover:text-accent"
          data-cursor-hover
        >
          {t.instagram.handle}
        </a>

        <div className="instagram-grid mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:gap-4">
          {INSTAGRAM_FEED_IMAGES.map((image, i) => (
            <a
              key={image.src}
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-tile instagram-grid__item atelier-card group relative aspect-square overflow-hidden bg-ink"
              style={{ "--card-index": i } as CSSProperties}
              data-cursor-hover
              aria-label={`${t.instagram.viewOn} — ${image.alt[locale]}`}
            >
              <span className="atelier-card__shine" aria-hidden />
              <img
                src={image.src}
                alt={image.alt[locale]}
                width={image.width}
                height={image.height}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="instagram-tile__overlay absolute inset-0 flex items-center justify-center" aria-hidden>
                <span className="instagram-tile__icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.25" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.25" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="atelier-btn-ghost btn-magnetic inline-flex min-h-[44px] items-center justify-center px-8 py-3 text-xs uppercase tracking-[0.18em]"
            data-cursor-hover
          >
            {t.instagram.follow}
          </a>
        </div>

        <div className="instagram-close atelier-card mt-14 min-[375px]:mt-16 sm:mt-20 text-center">
          <span className="atelier-card__shine" aria-hidden />
          <p className="section-eyebrow">{t.instagram.eyebrow}</p>
          <h3 className="instagram-close__title font-display text-2xl min-[375px]:text-3xl sm:text-4xl text-cream">
            {t.instagram.closingTitle}
          </h3>
          <p className="instagram-close__subtitle mt-2 min-[375px]:mt-3 text-cream-muted text-[0.8125rem] min-[375px]:text-sm sm:text-base max-w-md mx-auto">
            {t.instagram.closingSubtitle}
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="atelier-btn-primary btn-magnetic mt-6 min-[375px]:mt-8 inline-flex min-h-[44px] items-center justify-center px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
            data-cursor-hover
          >
            {t.instagram.closingCta}
          </button>
        </div>
      </div>
    </section>
  );
}
