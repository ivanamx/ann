import { useEffect, type ReactNode } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { Footer } from "./Footer";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  children: ReactNode;
  metaTitle: string;
  metaDescription: string;
};

export function LegalLayout({ children, metaTitle, metaDescription }: Props) {
  const { t, locale, toggleLocale } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", metaDescription);
  }, [metaTitle, metaDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <header className="border-b border-cream/5 bg-ink/95 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="font-display text-xl text-cream hover:text-accent transition-colors"
          >
            Ann <span className="text-accent italic">Atelier</span>
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="/"
              className="text-xs uppercase tracking-[0.2em] text-cream-muted hover:text-accent transition-colors min-h-[44px] flex items-center"
            >
              {t.legal.back}
            </a>
            <ThemeToggle className="text-cream-muted hover:text-accent" />
            <button
              type="button"
              onClick={toggleLocale}
              className="text-xs uppercase tracking-[0.2em] text-cream-muted hover:text-accent transition-colors min-h-[44px] min-w-[44px]"
              aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
            >
              {locale === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
