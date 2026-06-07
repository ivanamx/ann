import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { key: "philosophy" as const, href: "#philosophy" },
  { key: "process" as const, href: "#process" },
  { key: "lookbook" as const, href: "#lookbook" },
  { key: "houston" as const, href: "#houston" },
  { key: "faq" as const, href: "#faq" },
];

export function Nav() {
  const { t, locale, toggleLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const hero = document.querySelector("[data-hero]");
      const heroH = hero?.getBoundingClientRect().height ?? window.innerHeight;
      setOnHero(y < heroH * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerClass = scrolled
    ? "bg-ink/95 backdrop-blur-md border-b border-cream/5 shadow-elevated"
    : onHero
      ? "nav-on-hero border-b border-cream/5"
      : "bg-ink/90 backdrop-blur-md border-b border-cream/5";

  const linkClass = `text-xs uppercase tracking-[0.2em] transition-colors nav-link-shadow ${
    scrolled || !onHero
      ? "text-cream-muted hover:text-gold"
      : "text-cream hover:text-gold"
  }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
        aria-label="Main"
      >
        <a
          href="#"
          className="font-display text-xl tracking-wide text-cream sm:text-2xl min-h-[44px] min-w-[44px] flex items-center nav-link-shadow shrink-0"
          data-cursor-hover
        >
          Ann <span className="text-gold italic">Atelier</span>
        </a>

        <ul className="hidden items-center gap-5 xl:gap-6 lg:flex lg:flex-1 lg:justify-center lg:px-4">
          {links.map((l) => (
            <li key={l.key}>
              <a href={l.href} className={linkClass} data-cursor-hover>
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <ThemeToggle
            className={
              onHero && !scrolled ? "text-cream hover:text-gold" : "text-cream-muted hover:text-gold"
            }
          />

          <button
            type="button"
            onClick={toggleLocale}
            className={`min-h-[44px] min-w-[44px] px-2 text-xs uppercase tracking-widest transition-colors nav-link-shadow ${
              onHero && !scrolled ? "text-cream hover:text-gold" : "text-cream-muted hover:text-gold"
            }`}
            aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            data-cursor-hover
          >
            {locale === "en" ? "ES" : "EN"}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex btn-magnetic items-center justify-center min-h-[44px] px-5 py-2.5 bg-gold text-ink text-xs font-semibold uppercase tracking-[0.15em] hover:bg-cream transition-colors shadow-cta"
            data-cursor-hover
          >
            {t.nav.book}
          </a>

          <button
            type="button"
            className="lg:hidden min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            <span
              className={`block h-px w-5 bg-cream transition-transform nav-link-shadow ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span className={`block h-px w-5 bg-cream nav-link-shadow transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-5 bg-cream transition-transform nav-link-shadow ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 top-0 z-40 bg-ink/98 backdrop-blur-xl transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col items-center justify-center min-h-[100dvh] gap-8 pt-20">
          {links.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                className="font-display text-3xl text-cream hover:text-gold transition-colors"
                onClick={() => setOpen(false)}
              >
                {t.nav[l.key]}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center px-8 py-3 bg-gold text-ink text-sm font-semibold uppercase tracking-widest"
              onClick={() => setOpen(false)}
            >
              {t.nav.book}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
