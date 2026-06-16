import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { Footer } from "./Footer";
import { ThemeToggle } from "./ThemeToggle";
import { downloadPlansPdf } from "../utils/downloadPlansPdf";

type Props = {
  children: ReactNode;
  metaTitle: string;
  metaDescription: string;
};

export function PlansLayout({ children, metaTitle, metaDescription }: Props) {
  const { t, locale, toggleLocale } = useLocale();
  const docRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", metaDescription);

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      robots?.setAttribute("content", "index, follow, max-image-preview:large");
    };
  }, [metaTitle, metaDescription]);

  const onDownloadPdf = useCallback(async () => {
    const root = docRef.current;
    if (!root || exporting) return;

    setExporting(true);
    try {
      const filename =
        locale === "es"
          ? "Ann-Atelier-Planes-Digital.pdf"
          : "Ann-Atelier-Digital-Plans.pdf";
      await downloadPlansPdf(root, filename);
    } catch {
      window.print();
    } finally {
      setExporting(false);
    }
  }, [exporting, locale]);

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <header className="border-b border-cream/5 bg-ink/95 backdrop-blur-md sticky top-0 z-50 print:hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
          <a
            href="/"
            className="font-display text-xl text-cream hover:text-accent transition-colors shrink-0"
          >
            Ann <span className="text-accent italic">Atelier</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={exporting}
              className="plans-layout__pdf-btn min-h-[44px] px-4 sm:px-5 text-[0.6rem] uppercase tracking-[0.16em] font-medium text-ink bg-accent border border-accent hover:bg-transparent hover:text-accent transition-colors disabled:opacity-60"
            >
              {exporting ? t.plans.downloading : t.plans.downloadPdf}
            </button>
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

      <main id="main" className="flex-1 py-10 sm:py-16 print:py-0">
        <div ref={docRef} className="mx-auto max-w-6xl px-4 sm:px-6 print:max-w-none print:px-0">
          {children}
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
