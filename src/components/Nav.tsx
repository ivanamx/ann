import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useBooking } from "../booking/BookingContext";
import { useFaq } from "../faq/FAQContext";
import { ThemeToggle } from "./ThemeToggle";

const sectionLinks = [
  { key: "process" as const, href: "#process", sectionId: "process" },
  { key: "lookbook" as const, href: "#lookbook", sectionId: "lookbook" },
  { key: "faq" as const },
] as const;

export function Nav() {
  const { t, locale, toggleLocale } = useLocale();
  const { openBooking } = useBooking();
  const { openFaq } = useFaq();
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  useEffect(() => {
    const targets = sectionLinks
      .filter((l): l is typeof l & { sectionId: string } => "sectionId" in l)
      .map((l) => document.getElementById(l.sectionId))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.15, 0.3, 0.45], rootMargin: "-18% 0px -58% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const headerClass = scrolled
    ? "bg-ink/95 backdrop-blur-md border-b border-cream/5 shadow-elevated"
    : onHero
      ? "nav-on-hero border-b border-cream/5"
      : "bg-ink/90 backdrop-blur-md border-b border-cream/5";

  const linkClass = (sectionId?: string) => {
    const isActive = sectionId !== undefined && activeSection === sectionId;
    return `relative text-xs uppercase tracking-[0.2em] transition-colors nav-link-shadow ${
      isActive
        ? "text-accent nav-link--active"
        : scrolled || !onHero
          ? "text-cream-muted hover:text-accent"
          : "text-cream hover:text-accent"
    }`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 max-[374px]:gap-1 min-[375px]:gap-3 px-3 py-2.5 max-[374px]:py-2 min-[375px]:px-4 min-[375px]:py-3 sm:px-6 sm:py-4"
        aria-label="Main"
      >
        <a
          href="#"
          className="font-display text-base max-[374px]:text-[1.0625rem] min-[375px]:text-xl tracking-wide text-cream sm:text-2xl min-h-[44px] min-w-[44px] flex items-center nav-link-shadow shrink-0"
          data-cursor-hover
        >
          Ann <span className="text-accent italic">Atelier</span>
        </a>

        <ul className="hidden items-center gap-5 xl:gap-6 lg:flex lg:flex-1 lg:justify-center lg:px-4">
          {sectionLinks.map((l) => (
            <li key={l.key}>
              {"href" in l ? (
                <a
                  href={l.href}
                  className={linkClass(l.sectionId)}
                  aria-current={activeSection === l.sectionId ? "true" : undefined}
                  data-cursor-hover
                >
                  {t.nav[l.key]}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={openFaq}
                  className={`${linkClass()} bg-transparent border-0 p-0 cursor-pointer`}
                  data-cursor-hover
                >
                  {t.nav[l.key]}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-0.5 min-[375px]:gap-1 sm:gap-2 shrink-0">
          <ThemeToggle
            className={
              onHero && !scrolled ? "text-cream hover:text-accent" : "text-cream-muted hover:text-accent"
            }
          />

          <button
            type="button"
            onClick={toggleLocale}
            className={`min-h-[44px] min-w-[44px] px-2 text-xs uppercase tracking-widest transition-colors nav-link-shadow ${
              onHero && !scrolled ? "text-cream hover:text-accent" : "text-cream-muted hover:text-accent"
            }`}
            aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            data-cursor-hover
          >
            {locale === "en" ? "ES" : "EN"}
          </button>

          <button
            type="button"
            onClick={openBooking}
            className="hidden sm:inline-flex atelier-btn-primary btn-magnetic items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em]"
            data-cursor-hover
          >
            {t.nav.book}
          </button>

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
        <ul className="flex flex-col items-center justify-center min-h-[100dvh] gap-5 max-[374px]:gap-4 min-[375px]:gap-8 pt-[max(5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] px-4">
          {sectionLinks.map((l) => (
            <li key={l.key}>
              {"href" in l ? (
                <a
                  href={l.href}
                  className={`font-display text-[1.625rem] max-[374px]:text-2xl min-[375px]:text-3xl transition-colors text-center ${
                    activeSection === l.sectionId ? "text-accent" : "text-cream hover:text-accent"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {t.nav[l.key]}
                </a>
              ) : (
                <button
                  type="button"
                  className="font-display text-[1.625rem] max-[374px]:text-2xl min-[375px]:text-3xl text-cream hover:text-accent transition-colors text-center bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    openFaq();
                  }}
                >
                  {t.nav[l.key]}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="atelier-btn-primary inline-flex min-h-[44px] items-center px-8 py-3 text-sm font-semibold uppercase tracking-widest"
            >
              {t.nav.book}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
