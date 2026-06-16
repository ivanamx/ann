import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "../i18n/LocaleContext";

type FAQModalProps = {
  onClose: () => void;
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function FAQModal({ onClose }: FAQModalProps) {
  const { t } = useLocale();
  const f = t.faq;
  const dialogRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("faq-modal-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("faq-modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const filteredItems = useMemo(() => {
    const needle = normalizeSearch(query);
    if (!needle) return f.items.map((item, index) => ({ item, index }));

    return f.items
      .map((item, index) => ({ item, index }))
      .filter(
        ({ item }) =>
          normalizeSearch(item.q).includes(needle) ||
          normalizeSearch(item.a).includes(needle),
      );
  }, [f.items, query]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setOpenIndex(null);
      return;
    }
    if (openIndex === null || !filteredItems.some(({ index }) => index === openIndex)) {
      setOpenIndex(filteredItems[0].index);
    }
  }, [filteredItems, openIndex]);

  const content = (
    <div className="faq-modal__backdrop" role="presentation" onClick={handleClose}>
      <div
        ref={dialogRef}
        className="faq-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="faq-modal__close"
          onClick={handleClose}
          aria-label={f.close}
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

        <div className="faq-modal__scroll">
          <header className="faq-modal__header">
            <h2 id="faq-modal-title" className="faq-modal__title">
              {f.title}
            </h2>
            <p className="faq-modal__subtitle">{f.subtitle}</p>
          </header>

          <label className="faq-modal__search-wrap">
            <span className="sr-only">{f.searchLabel}</span>
            <svg
              className="faq-modal__search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className="faq-modal__search"
              placeholder={f.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>

          {filteredItems.length === 0 ? (
            <p className="faq-modal__empty">{f.noResults}</p>
          ) : (
            <div className="faq-modal__list">
              {filteredItems.map(({ item, index }) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.q} className="faq-modal__item">
                    <h3>
                      <button
                        type="button"
                        className="faq-modal__question"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <span
                          className={`faq-modal__toggle ${isOpen ? "faq-modal__toggle--open" : ""}`}
                          aria-hidden
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <div
                      className={`faq-modal__answer-wrap ${
                        isOpen ? "faq-modal__answer-wrap--open" : ""
                      }`}
                    >
                      <div className="faq-modal__answer-inner">
                        <p className="faq-modal__answer">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
