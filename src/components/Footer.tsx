import { useLocale } from "../i18n/LocaleContext";
import { BUSINESS } from "../data/seo";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/5 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg text-cream">
          Ann <span className="text-gold italic">Atelier</span>
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs uppercase tracking-widest text-cream-muted" aria-label="Footer">
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold min-h-[44px] flex items-center">
            Instagram
          </a>
          <a href={BUSINESS.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-gold min-h-[44px] flex items-center">
            Pinterest
          </a>
          <a href="/privacy" className="hover:text-gold min-h-[44px] flex items-center">
            {t.footer.privacy}
          </a>
          <a href="/terms" className="hover:text-gold min-h-[44px] flex items-center">
            {t.footer.terms}
          </a>
        </nav>

        <p className="text-[0.65rem] text-cream-muted text-center sm:text-right">
          © {year} {BUSINESS.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
