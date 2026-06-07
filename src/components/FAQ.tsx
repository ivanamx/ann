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
      className="reveal py-14 min-[375px]:py-16 sm:py-24 bg-ink-soft border-t border-cream/5"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-3 min-[375px]:px-4 sm:px-6">
        <h2 id="faq-title" className="font-display text-[1.625rem] max-[374px]:text-2xl min-[375px]:text-3xl sm:text-4xl text-cream mb-6 max-[374px]:mb-7 min-[375px]:mb-10 text-center">
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
                    className="flex w-full min-h-[44px] items-center justify-between gap-2.5 max-[374px]:gap-2 min-[375px]:gap-4 px-3 min-[375px]:px-4 sm:px-6 py-3 max-[374px]:py-3 min-[375px]:py-4 text-left text-[0.8125rem] max-[374px]:leading-snug min-[375px]:text-sm sm:text-base text-cream hover:text-gold transition-colors"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="min-w-0 pr-1">{item.q}</span>
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
                    <p className="px-3 min-[375px]:px-4 sm:px-6 pb-3.5 min-[375px]:pb-4 text-[0.8125rem] min-[375px]:text-sm text-cream-muted leading-relaxed">
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
