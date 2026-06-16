import { useLocale } from "../i18n/LocaleContext";

export function Marquee() {
  const { t } = useLocale();
  const items = [...t.marquee, ...t.marquee];

  return (
    <section
      className="border-y border-cream/5 bg-ink-soft py-3 max-[374px]:py-2.5 sm:py-4 overflow-hidden"
      aria-label="Brand highlights"
    >
      <div className="flex whitespace-nowrap marquee-track">
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mx-3 max-[374px]:mx-2.5 min-[375px]:mx-6 sm:mx-10 font-display text-lg max-[374px]:text-xl min-[375px]:text-2xl sm:text-3xl text-cream/20 italic"
          >
            {word}
            <span className="mx-3 max-[374px]:mx-2.5 min-[375px]:mx-6 sm:mx-10 text-accent/40 not-italic">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
