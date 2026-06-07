import { useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";

export function FAQ() {
  const { t } = useLocale();
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      className="reveal py-16 sm:py-24 bg-ink-soft border-t border-cream/5"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-title" className="font-display text-3xl sm:text-4xl text-cream mb-10 text-center">
          {t.faq.title}
        </h2>

        <div className="space-y-2">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border border-cream/8">
                <h3>
                  <button
                    type="button"
                    className="flex w-full min-h-[44px] items-center justify-between gap-4 px-4 sm:px-6 py-4 text-left text-sm sm:text-base text-cream hover:text-gold transition-colors"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    {item.q}
                    <span
                      className={`shrink-0 text-gold transition-transform ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-6 pb-4 text-sm text-cream-muted leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
