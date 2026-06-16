import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useBooking } from "../booking/BookingContext";

export function MobileCta() {
  const { t } = useLocale();
  const { openBooking } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 sm:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mobile-cta-bar bg-gradient-to-t from-ink via-ink/95 to-transparent px-3 max-[374px]:px-2.5 pt-3 max-[374px]:pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={openBooking}
          className="mobile-cta-bar__link atelier-btn-primary flex min-h-[44px] items-center justify-center w-full text-[0.65rem] min-[375px]:text-xs font-semibold uppercase tracking-[0.14em] min-[375px]:tracking-[0.18em]"
        >
          {t.nav.book}
        </button>
      </div>
    </div>
  );
}
