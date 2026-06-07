import { useEffect, useRef } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { HERO_GOWN } from "../data/images";

export function Hero() {
  const { t, locale } = useLocale();
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
        const x = (e.clientX / window.innerWidth - 0.5) * 5;
        const y = (e.clientY / window.innerHeight - 0.5) * 5;
        el.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
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
        <div className="hero-visual__frame absolute inset-0 sm:inset-y-0 sm:left-[28%] sm:right-0">
          <img
            ref={parallaxRef}
            src={HERO_GOWN.src}
            alt={alt}
            width={HERO_GOWN.width}
            height={HERO_GOWN.height}
            fetchPriority="high"
            decoding="async"
            className="hero-visual__img h-full w-full object-cover object-[center_22%] max-[374px]:object-[center_18%] sm:object-[68%_28%]"
          />
        </div>
        <div className="hero-visual__fade-left" />
        <div className="hero-visual__fade-top" />
        <div className="hero-visual__fade-bottom" />
        <div className="hero-visual__glow" />
      </div>

      {/* Texto anclado a la columna izquierda — no centrado en toda la pantalla */}
      <div className="relative z-10 grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-3 pb-20 pt-[5.25rem] max-[374px]:pb-[4.5rem] max-[374px]:pt-[4.75rem] min-[375px]:px-4 min-[375px]:pb-28 min-[375px]:pt-28 sm:px-6 sm:pb-28 sm:pt-36 lg:px-10 xl:px-14">
          <div className="w-full max-w-lg text-left">
            <p className="hero-eyebrow mb-2.5 max-[374px]:mb-2 min-[375px]:mb-4 text-[0.58rem] max-[374px]:tracking-[0.2em] min-[375px]:text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] min-[375px]:tracking-[0.35em] text-gold font-medium">
              {t.hero.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="hero-title font-display font-medium text-cream max-w-[18ch] max-[374px]:max-w-[16ch] min-[375px]:max-w-none"
            >
              {t.hero.title}
            </h1>

            <p className="mt-3 max-[374px]:mt-2.5 min-[375px]:mt-5 max-w-md text-cream-muted text-[0.8125rem] max-[374px]:leading-[1.55] min-[375px]:text-sm sm:text-base leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="mt-5 max-[374px]:mt-4 min-[375px]:mt-8 flex flex-col gap-2 max-[374px]:gap-1.5 min-[375px]:gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#contact"
                className="btn-magnetic inline-flex min-h-[44px] items-center justify-center px-4 max-[374px]:px-4 min-[375px]:px-7 py-3 min-[375px]:py-3.5 bg-gold text-ink text-[0.62rem] max-[374px]:tracking-[0.12em] min-[375px]:text-xs font-semibold uppercase tracking-[0.14em] min-[375px]:tracking-[0.18em] hover:bg-cream transition-colors text-center"
                data-cursor-hover
              >
                {t.hero.cta}
              </a>
              <a
                href="#lookbook"
                className="btn-magnetic inline-flex min-h-[44px] items-center justify-center px-4 max-[374px]:px-4 min-[375px]:px-7 py-3 min-[375px]:py-3.5 border border-cream/25 text-cream text-[0.62rem] max-[374px]:tracking-[0.12em] min-[375px]:text-xs uppercase tracking-[0.14em] min-[375px]:tracking-[0.18em] hover:border-gold hover:text-gold transition-colors text-center"
                data-cursor-hover
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      <a
        href="#lookbook"
        className="hero-scroll-hint absolute bottom-5 min-[375px]:bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-cream-muted scroll-indicator min-h-[44px] min-w-[44px] justify-center"
        aria-label="Scroll to lookbook"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  );
}
