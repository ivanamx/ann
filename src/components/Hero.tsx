import { useEffect, useRef } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useBooking } from "../booking/BookingContext";
import { HERO_GOWN } from "../data/images";

export function Hero() {
  const { t, locale } = useLocale();
  const { openBooking } = useBooking();
  const parallaxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const el = parallaxRef.current;
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 4;
        const y = (e.clientY / window.innerHeight - 0.5) * 4;
        el.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const alt = HERO_GOWN.alt[locale];

  return (
    <section
      className="hero-section relative min-h-[100svh] overflow-hidden bg-ink grain"
      aria-labelledby="hero-title"
      data-hero
    >
      <div className="hero-visual absolute inset-0" aria-hidden>
        <div className="hero-visual__frame absolute inset-0">
          <img
            ref={parallaxRef}
            src={HERO_GOWN.src}
            alt={alt}
            width={HERO_GOWN.width}
            height={HERO_GOWN.height}
            fetchPriority="high"
            decoding="async"
            className="hero-visual__img h-full w-full object-cover object-[center_24%] sm:object-[center_28%]"
          />
        </div>
        <div className="hero-visual__fade-top" />
        <div className="hero-visual__fade-anchor" />
      </div>

      <div className="hero-anchor relative z-10 flex min-h-[100svh] flex-col justify-end items-start px-4 pb-[5.5rem] pt-[5.5rem] sm:px-8 sm:pb-24 lg:px-14 lg:pb-28">
        <div className="hero-anchor__copy w-full max-w-md">
          <p className="hero-section__eyebrow section-eyebrow">{t.hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="hero-section__title hero-anchor__title font-display text-[1.625rem] leading-[1.18] sm:text-3xl lg:text-4xl mt-3"
          >
            {t.hero.title}
          </h1>
          <p className="hero-section__subtitle mt-3 text-[0.8125rem] sm:text-sm leading-relaxed max-w-sm">
            {t.hero.subtitle}
          </p>

          <button
            type="button"
            onClick={openBooking}
            className="hero-section__cta-primary atelier-btn-primary btn-magnetic mt-6 inline-flex min-h-[44px] items-center justify-center px-7 py-3 text-[0.62rem] sm:text-xs font-semibold uppercase tracking-[0.16em]"
            data-cursor-hover
          >
            {t.hero.cta}
          </button>
        </div>
      </div>

      <a
        href="#quinceaneras"
        className="hero-scroll-hint hero-section__scroll absolute bottom-5 right-4 z-20 flex flex-col items-center gap-2 scroll-indicator min-h-[44px] min-w-[44px] justify-center sm:bottom-6 sm:right-6"
        aria-label={t.hero.scrollAria}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <span className="hero-section__scroll-line block h-8 w-px" />
      </a>
    </section>
  );
}
