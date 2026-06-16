import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GrowthTimelineContent } from "../content/plans/growthTimeline";

type Props = {
  timeline: GrowthTimelineContent;
  closeLabel: string;
  onClose: () => void;
};

export function GrowthTimelineModal({ timeline, closeLabel, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const content = (
    <div className="growth-timeline__backdrop" role="presentation" onClick={handleClose}>
      <div
        ref={dialogRef}
        className="growth-timeline"
        role="dialog"
        aria-modal="true"
        aria-labelledby="growth-timeline-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="growth-timeline__close"
          onClick={handleClose}
          aria-label={closeLabel}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="growth-timeline__scroll">
          <header className="growth-timeline__header">
            <p className="growth-timeline__eyebrow">{timeline.subtitle}</p>
            <h2 id="growth-timeline-title" className="growth-timeline__title">
              {timeline.title}
            </h2>
            <p className="growth-timeline__intro">{timeline.intro}</p>
          </header>

          <div className="growth-timeline__months">
            {timeline.months.map((month) => (
              <section key={month.label} className="growth-timeline__month">
                <div className="growth-timeline__month-head">
                  <h3 className="growth-timeline__month-label">{month.label}</h3>
                  <p className="growth-timeline__month-period">{month.period}</p>
                  <p className="growth-timeline__month-goal">
                    <span className="growth-timeline__goal-tag">{timeline.goalTag}</span>
                    {month.goal}
                  </p>
                </div>

                <ol className="growth-timeline__weeks">
                  {month.weeks.map((week) => (
                    <li key={`${month.label}-${week.dates}`} className="growth-timeline__week">
                      <div className="growth-timeline__week-head">
                        <span className="growth-timeline__week-number">{week.week}</span>
                        <span className="growth-timeline__week-dates">{week.dates}</span>
                        <span className="growth-timeline__week-title">{week.title}</span>
                      </div>
                      <p className="growth-timeline__section-label">{timeline.workTag}</p>
                      <ul className="growth-timeline__tasks">
                        {week.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                      <p className="growth-timeline__measure">
                        <span className="growth-timeline__measure-tag">{timeline.measureTag}</span>
                        {week.measure}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <footer className="growth-timeline__outcome">
            <p className="growth-timeline__outcome-label">{timeline.outcomeLabel}</p>
            <p className="growth-timeline__outcome-text">{timeline.outcome}</p>
          </footer>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
