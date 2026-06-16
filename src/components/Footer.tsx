import { useLocale } from "../i18n/LocaleContext";
import { BUSINESS } from "../data/seo";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="footer border-t border-cream/5 pt-8 max-[374px]:pt-7 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:py-10">
      <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-[374px]:gap-3.5 min-[375px]:gap-6">
        <a
          href="#"
          className="font-display text-base max-[374px]:text-lg text-cream hover:text-accent transition-colors"
          data-cursor-hover
        >
          Ann <span className="text-accent italic">Atelier</span>
        </a>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0 max-[374px]:gap-x-2.5 min-[375px]:gap-4 sm:gap-6 text-[0.62rem] max-[374px]:tracking-[0.1em] min-[375px]:text-xs uppercase tracking-[0.14em] min-[375px]:tracking-widest text-cream-muted"
          aria-label="Footer"
        >
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent min-h-[44px] flex items-center"
          >
            Instagram
          </a>
          <a
            href={BUSINESS.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent min-h-[44px] flex items-center"
          >
            Pinterest
          </a>
          <a href="/privacy" className="hover:text-accent min-h-[44px] flex items-center">
            {t.footer.privacy}
          </a>
          <a href="/terms" className="hover:text-accent min-h-[44px] flex items-center">
            {t.footer.terms}
          </a>
        </nav>

        <p className="footer-copyright text-[0.62rem] max-[374px]:text-[0.58rem] text-cream-muted text-center sm:text-right leading-snug">
          © {year} {BUSINESS.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
