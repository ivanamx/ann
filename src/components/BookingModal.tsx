import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ApiError, createAppointment, fetchAvailability } from "../api/booking";
import { useLocale } from "../i18n/LocaleContext";
import {
  BOOKING_SLOT_HOURS,
  formatSelectedDateTime,
  formatSlotTime,
  getMonthMatrix,
  isDateSelectable,
  isSameDay,
  startOfDay,
} from "../booking/calendar";

type BookingModalProps = {
  onClose: () => void;
};

const WEEKDAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function BookingModal({ onClose }: BookingModalProps) {
  const { t, locale } = useLocale();
  const b = t.booking;
  const today = useMemo(() => startOfDay(new Date()), []);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [viewMonth, setViewMonth] = useState(() => {
    const n = new Date();
    return { year: n.getFullYear(), month: n.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [availableHours, setAvailableHours] = useState<number[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(viewMonth.year, viewMonth.month, 1)),
    [viewMonth.year, viewMonth.month, locale],
  );

  const monthCells = useMemo(
    () => getMonthMatrix(viewMonth.year, viewMonth.month),
    [viewMonth.year, viewMonth.month],
  );

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("booking-modal-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("booking-modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableHours([]);
      return;
    }

    let cancelled = false;
    setSlotsLoading(true);
    setError(null);

    fetchAvailability(selectedDate)
      .then((data) => {
        if (cancelled) return;
        setAvailableHours(data.slots);
        setSelectedHour((current) =>
          current !== null && data.slots.includes(current) ? current : null,
        );
      })
      .catch(() => {
        if (cancelled) return;
        setAvailableHours([]);
        setError(b.errorGeneric);
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, b.errorGeneric]);

  const shiftMonth = (delta: number) => {
    setViewMonth((prev) => {
      const d = new Date(prev.year, prev.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || selectedHour === null || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await createAppointment({
        name: name.trim(),
        email: email.trim(),
        occasion: occasion.trim() || undefined,
        locale,
        date: toDateKey(selectedDate),
        hour: selectedHour,
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError && err.code === "SLOT_UNAVAILABLE") {
        setError(b.errorSlotTaken);
        const data = await fetchAvailability(selectedDate);
        setAvailableHours(data.slots);
        setSelectedHour(null);
      } else {
        setError(b.errorGeneric);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    selectedDate !== null &&
    selectedHour !== null &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    !submitting;

  const content = (
    <div className="booking-modal__backdrop" role="presentation" onClick={handleClose}>
      <div
        ref={dialogRef}
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="booking-modal__close"
          onClick={handleClose}
          aria-label={b.close}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        <div className="booking-modal__scroll">
          <header className="booking-modal__header">
            <h2 id="booking-modal-title" className="booking-modal__title font-display">
              {b.title}
            </h2>
            <p className="booking-modal__subtitle">{b.subtitle}</p>
            <p className="booking-modal__hours">{b.hours}</p>
          </header>

          {submitted && selectedDate && selectedHour !== null ? (
            <div className="booking-modal__success" role="status">
              <p className="font-display text-xl sm:text-2xl text-cream">{b.successTitle}</p>
              <p className="mt-3 text-sm text-cream-muted leading-relaxed">{b.successBody}</p>
              <p className="mt-4 text-sm text-accent font-medium">
                {formatSelectedDateTime(selectedDate, selectedHour, locale)}
              </p>
              <button
                type="button"
                className="booking-modal__submit mt-8"
                onClick={handleClose}
              >
                {b.close}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="booking-modal__form" noValidate>
              <div className="booking-modal__grid">
                <div className="booking-modal__calendar">
                  <div className="booking-calendar__nav">
                    <button
                      type="button"
                      className="booking-calendar__nav-btn"
                      onClick={() => shiftMonth(-1)}
                      aria-label={b.prevMonth}
                    >
                      ‹
                    </button>
                    <p className="booking-calendar__month capitalize">{monthLabel}</p>
                    <button
                      type="button"
                      className="booking-calendar__nav-btn"
                      onClick={() => shiftMonth(1)}
                      aria-label={b.nextMonth}
                    >
                      ›
                    </button>
                  </div>

                  <div className="booking-calendar__weekdays" aria-hidden>
                    {WEEKDAY_KEYS.map((key) => (
                      <span key={key} className="booking-calendar__weekday">
                        {b.weekdays[key]}
                      </span>
                    ))}
                  </div>

                  <div className="booking-calendar__days" role="grid" aria-label={b.selectDate}>
                    {monthCells.map((date, i) => {
                      if (!date) {
                        return <span key={`empty-${i}`} className="booking-calendar__day is-empty" />;
                      }

                      const selectable = isDateSelectable(date, today);
                      const selected = selectedDate ? isSameDay(date, selectedDate) : false;

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          role="gridcell"
                          disabled={!selectable}
                          aria-selected={selected}
                          aria-label={new Intl.DateTimeFormat(
                            locale === "es" ? "es-US" : "en-US",
                            { weekday: "long", month: "long", day: "numeric" },
                          ).format(date)}
                          className={`booking-calendar__day ${selected ? "is-selected" : ""} ${
                            !selectable ? "is-disabled" : ""
                          }`}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedHour(null);
                            setError(null);
                          }}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="booking-modal__times">
                  <p className="booking-modal__section-label">{b.selectTime}</p>
                  {!selectedDate ? (
                    <p className="booking-modal__hint">{b.pickDateFirst}</p>
                  ) : slotsLoading ? (
                    <p className="booking-modal__hint">{b.loadingSlots}</p>
                  ) : availableHours.length === 0 ? (
                    <p className="booking-modal__hint">{b.noSlots}</p>
                  ) : (
                    <div className="booking-times__grid">
                      {BOOKING_SLOT_HOURS.map((hour) => {
                        const available = availableHours.includes(hour);
                        const active = selectedHour === hour;
                        return (
                          <button
                            key={hour}
                            type="button"
                            className={`booking-times__slot ${active ? "is-selected" : ""}`}
                            aria-pressed={active}
                            disabled={!available}
                            onClick={() => setSelectedHour(hour)}
                          >
                            {formatSlotTime(hour, locale)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="booking-modal__fields">
                <div>
                  <label htmlFor="booking-name" className="booking-modal__label">
                    {b.name}
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="booking-modal__input"
                  />
                </div>
                <div>
                  <label htmlFor="booking-email" className="booking-modal__label">
                    {b.email}
                  </label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="booking-modal__input"
                  />
                </div>
                <div>
                  <label htmlFor="booking-occasion" className="booking-modal__label">
                    {b.occasion}
                  </label>
                  <input
                    id="booking-occasion"
                    name="occasion"
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="booking-modal__input"
                  />
                </div>
              </div>

              {error ? (
                <p className="booking-modal__note text-red-300/90" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="booking-modal__submit"
                disabled={!canSubmit}
              >
                {submitting ? b.submitting : b.submit}
              </button>
              <p className="booking-modal__note">{b.note}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
