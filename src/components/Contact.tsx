import { useState, type FormEvent } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { useReveal } from "../hooks/useReveal";
import { SectionBackdrop } from "./SectionBackdrop";
import { SECTION_BACKGROUNDS } from "../data/images";

export function Contact() {
  const { t, locale } = useLocale();
  const ref = useReveal<HTMLElement>();
  const [sent, setSent] = useState(false);
  const bg = SECTION_BACKGROUNDS.contact;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="reveal"
      aria-labelledby="contact-title"
    >
      <SectionBackdrop
        imageSrc={bg.src}
        imageAlt={bg.alt[locale]}
        className="py-14 min-[375px]:py-16 sm:py-28 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:pb-28"
        overlay="light"
      >
        <div className="mx-auto max-w-7xl px-3 min-[375px]:px-4 sm:px-6">
          <div className="grid gap-10 min-[375px]:gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <h2 id="contact-title" className="font-display text-2xl min-[375px]:text-3xl sm:text-5xl text-cream">
                {t.cta.title}
              </h2>
              <p className="mt-3 min-[375px]:mt-4 text-cream-muted text-[0.8125rem] min-[375px]:text-sm sm:text-base max-w-md">{t.cta.subtitle}</p>
              <div
                className="mt-10 hidden lg:block w-full max-w-xs h-px bg-gradient-to-r from-gold via-gold-dim to-transparent"
                aria-hidden
              />
            </div>

            {sent ? (
              <p className="text-lg text-gold font-display italic py-8" role="status">
                {t.cta.success}
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="contact-form space-y-3 max-[374px]:space-y-2.5 min-[375px]:space-y-4 rounded-sm border border-cream/10 bg-ink/75 p-3.5 max-[374px]:p-3 min-[375px]:p-5 sm:p-6 backdrop-blur-md shadow-form"
                noValidate
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[0.62rem] max-[374px]:tracking-[0.18em] uppercase tracking-[0.25em] text-cream-muted mb-1.5 max-[374px]:mb-1.5 min-[375px]:mb-2"
                  >
                    {t.cta.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full min-h-[44px] bg-ink/80 border border-cream/15 px-4 text-cream text-sm focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[0.62rem] max-[374px]:tracking-[0.18em] uppercase tracking-[0.25em] text-cream-muted mb-1.5 max-[374px]:mb-1.5 min-[375px]:mb-2"
                  >
                    {t.cta.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full min-h-[44px] bg-ink/80 border border-cream/15 px-4 text-cream text-sm focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="event"
                    className="block text-[0.62rem] max-[374px]:tracking-[0.18em] uppercase tracking-[0.25em] text-cream-muted mb-1.5 max-[374px]:mb-1.5 min-[375px]:mb-2"
                  >
                    {t.cta.event}
                  </label>
                  <input
                    id="event"
                    name="event"
                    type="text"
                    className="w-full min-h-[44px] bg-ink/80 border border-cream/15 px-4 text-cream text-sm focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[0.62rem] max-[374px]:tracking-[0.18em] uppercase tracking-[0.25em] text-cream-muted mb-1.5 max-[374px]:mb-1.5 min-[375px]:mb-2"
                  >
                    {t.cta.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-ink/80 border border-cream/15 px-4 py-3 text-cream text-sm focus:border-gold transition-colors resize-y min-h-[100px]"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-magnetic w-full sm:w-auto min-h-[44px] px-10 py-3.5 bg-gold text-ink text-xs font-semibold uppercase tracking-[0.2em] hover:bg-cream transition-colors"
                  data-cursor-hover
                >
                  {t.cta.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionBackdrop>
    </section>
  );
}
