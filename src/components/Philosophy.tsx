import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";

export function Philosophy() {
  const { t } = useLocale();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="philosophy"
      ref={ref}
      className="reveal py-16 sm:py-24 lg:py-28"
      aria-labelledby="philosophy-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="max-w-2xl mb-12 sm:mb-16">
          <h2
            id="philosophy-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream"
          >
            {t.philosophy.title}
          </h2>
          <p className="mt-3 text-cream-muted text-sm sm:text-base">{t.philosophy.subtitle}</p>
        </header>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {t.philosophy.items.map((item, i) => (
            <article
              key={item.title}
              className="group relative border border-cream/8 bg-ink-soft p-6 sm:p-8 hover:border-gold/30 transition-colors duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-display text-5xl text-gold/20 group-hover:text-gold/40 transition-colors">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl text-cream">{item.title}</h3>
              <p className="mt-3 text-sm text-cream-muted leading-relaxed">{item.body}</p>
              <div
                className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
