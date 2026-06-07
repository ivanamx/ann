import { useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";

export function Testimonials() {
  const { t } = useLocale();
  const ref = useReveal<HTMLElement>();
  const [index, setIndex] = useState(0);
  const items = t.testimonials.items;

  return (
    <section
      ref={ref}
      className="testimonials-section reveal py-16 sm:py-24 bg-ink-soft border-y border-cream/5"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="testimonials-title" className="font-display text-3xl sm:text-4xl text-cream mb-10">
          {t.testimonials.title}
        </h2>

        <div className="relative max-w-3xl">
          <blockquote className="font-display text-2xl sm:text-3xl leading-snug text-cream italic">
            “{items[index].quote}”
          </blockquote>
          <footer className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <cite className="not-italic text-sm font-medium text-gold">{items[index].name}</cite>
              <p className="text-xs text-cream-muted mt-0.5">{items[index].event}</p>
            </div>
            <div className="flex gap-2" role="group" aria-label="Testimonial navigation">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    i === index ? "text-gold" : "text-cream-muted hover:text-cream"
                  }`}
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-gold" : "w-3 bg-cream/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
