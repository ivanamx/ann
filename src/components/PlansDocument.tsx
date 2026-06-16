import { useState } from "react";
import { growthTimelineContent } from "../content/plans/growthTimeline";
import type { PlansContent } from "../content/plans/types";
import { GrowthTimelineModal } from "./GrowthTimelineModal";

type Props = {
  doc: PlansContent;
  locale: "en" | "es";
  labels: {
    perMonth: string;
    minimum: string;
    recommended: string;
    includes: string;
    notIncluded: string;
    schedule: string;
    close: string;
  };
};

function formatUsd(amount: number, locale: string) {
  return new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PlansDocument({ doc, locale, labels }: Props) {
  const [timelineOpen, setTimelineOpen] = useState(false);
  const timeline = growthTimelineContent[locale];

  return (
    <article className="plans-doc">
      <header className="plans-doc__header">
        <p className="plans-doc__eyebrow">{doc.subtitle}</p>
        <h1 className="plans-doc__title">{doc.title}</h1>
        <p className="plans-doc__date">{doc.date}</p>
        <p className="plans-doc__intro">{doc.intro}</p>
      </header>

      <section className="plans-doc__tiers-section" aria-labelledby="plans-tiers-title">
        <h2 id="plans-tiers-title" className="plans-doc__section-title">
          {doc.tiersLabel}
        </h2>

        <div className="plans-doc__tiers">
          {doc.tiers.map((tier) => (
            <article
              key={tier.id}
              className={`plans-tier${tier.recommended ? " plans-tier--featured" : ""}`}
              aria-labelledby={`tier-${tier.id}-name`}
            >
              {tier.recommended ? (
                <span className="plans-tier__badge">{labels.recommended}</span>
              ) : null}

              {tier.id === "growth" ? (
                <button
                  type="button"
                  className="plans-tier__schedule"
                  onClick={() => setTimelineOpen(true)}
                >
                  {labels.schedule}
                </button>
              ) : null}

              <div className="plans-tier__head">
                <h3 id={`tier-${tier.id}-name`} className="plans-tier__name">
                  {tier.name}
                </h3>
                <p className="plans-tier__tagline">{tier.tagline}</p>
              </div>

              <div className="plans-tier__pricing">
                <p className="plans-tier__price">
                  <span className="plans-tier__amount">{formatUsd(tier.price, locale)}</span>
                  <span className="plans-tier__period">{labels.perMonth}</span>
                </p>
                <p className="plans-tier__term">
                  {labels.minimum.replace("{n}", String(tier.minimumMonths))}
                </p>
              </div>

              <div className="plans-tier__features">
                <p className="plans-tier__features-label">{labels.includes}</p>
                <ul>
                  {tier.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-doc__block" aria-labelledby="plans-not-included">
        <h2 id="plans-not-included" className="plans-doc__section-title">
          {doc.notIncluded.title}
        </h2>
        <ul className="plans-doc__list">
          {doc.notIncluded.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="plans-doc__block" aria-labelledby="plans-terms">
        <h2 id="plans-terms" className="plans-doc__section-title">
          {doc.terms.title}
        </h2>
        <ol className="plans-doc__list plans-doc__list--ordered">
          {doc.terms.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </section>

      <footer className="plans-doc__footer">
        <p>{doc.footerNote}</p>
      </footer>

      {timelineOpen ? (
        <GrowthTimelineModal
          timeline={timeline}
          closeLabel={labels.close}
          onClose={() => setTimelineOpen(false)}
        />
      ) : null}
    </article>
  );
}
