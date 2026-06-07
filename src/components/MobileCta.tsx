import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";

export function MobileCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#contact"
        className="flex min-h-[44px] items-center justify-center w-full bg-gold text-ink text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-ink/50"
      >
        {t.nav.book}
      </a>
    </div>
  );
}
