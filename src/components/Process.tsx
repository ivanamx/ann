import type { CSSProperties } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { SectionHeader } from "./SectionHeader";

export function Process() {
  const { t } = useLocale();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={ref}
      className="reveal process-section section-pad border-y border-cream/5"
      aria-labelledby="process-title"
    >
      <div className="process-section__ambient" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          subtitle={t.process.subtitle}
          titleId="process-title"
          align="center"
          className="process-section__header mx-auto max-w-2xl"
        />

        <div className="process-section__track hidden md:block" aria-hidden>
          <span className="process-section__track-line" />
        </div>

        <ol className="process-section__grid">
          {t.process.steps.map((step, i) => (
            <li
              key={step.title}
              className="process-card"
              style={{ "--step-index": i } as CSSProperties}
            >
              <article className="process-card__inner atelier-card">
                <span className="atelier-card__shine" aria-hidden />
                <div className="process-card__badge-wrap">
                  <span className="process-card__ring" aria-hidden />
                  <span className="process-card__badge" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="process-card__title">{step.title}</h3>
                <p className="process-card__body">{step.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
