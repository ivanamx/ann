import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { SectionBackdrop } from "./SectionBackdrop";
import { SECTION_BACKGROUNDS } from "../data/images";

export function Process() {
  const { t, locale } = useLocale();
  const ref = useReveal<HTMLElement>();
  const bg = SECTION_BACKGROUNDS.process;

  return (
    <section
      id="process"
      ref={ref}
      className="reveal border-y border-cream/5"
      aria-labelledby="process-title"
    >
      <SectionBackdrop
        imageSrc={bg.src}
        imageAlt={bg.alt[locale]}
        className="py-14 min-[375px]:py-16 sm:py-24"
        overlay="medium"
      >
        <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6">
          <header className="mb-8 min-[375px]:mb-10 sm:mb-14">
            <h2 id="process-title" className="font-display text-2xl min-[375px]:text-3xl sm:text-4xl text-cream">
              {t.process.title}
            </h2>
            <p className="mt-1.5 min-[375px]:mt-2 text-cream-muted text-[0.8125rem] min-[375px]:text-sm sm:text-base">{t.process.subtitle}</p>
          </header>

          <ol className="relative flex flex-col gap-0 md:flex-row md:gap-0">
            <div
              className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              aria-hidden
            />
            {t.process.steps.map((step, i) => (
              <li
                key={step.title}
                className="relative flex-1 py-4 max-[374px]:py-3.5 min-[375px]:py-6 md:py-0 md:px-3 border-l border-cream/10 md:border-l-0 pl-4 max-[374px]:pl-4 min-[375px]:pl-6 md:pl-0 md:text-center"
              >
                <div className="md:flex md:flex-col md:items-center">
                  <span
                    className="inline-flex h-9 w-9 min-[375px]:h-10 min-[375px]:w-10 items-center justify-center rounded-full border border-gold/50 text-gold text-sm font-medium bg-ink/80 backdrop-blur-sm md:mx-auto"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-2.5 min-[375px]:mt-3 font-display text-lg min-[375px]:text-xl text-cream">{step.title}</h3>
                  <p className="mt-1.5 min-[375px]:mt-2 text-xs sm:text-sm text-cream-muted max-w-none md:max-w-[220px] md:mx-auto">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionBackdrop>
    </section>
  );
}
