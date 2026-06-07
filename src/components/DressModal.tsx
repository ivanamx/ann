import { useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "../i18n/LocaleContext";
import { LOOKBOOK_3D_ENABLED } from "../config/env";
import { getLookbookGallery } from "../data/images";
import { DRESS_VISUALS, DRESS_HOTSPOTS, PHOTO_HOTSPOT_LAYOUTS } from "../data/lookbookDresses";
import { DressPhotoGallery } from "./DressPhotoGallery";
import { DressImageHotspots } from "./DressImageHotspots";
import type { Translation } from "../i18n/translations";

const DressViewer3D = lazy(() =>
  import("./DressViewer3D").then((m) => ({ default: m.DressViewer3D })),
);

type LookbookItem = Translation["lookbook"]["items"][number];

type DressModalProps = {
  index: number;
  item: LookbookItem;
  onClose: () => void;
};

export function DressModal({ index, item, onClose }: DressModalProps) {
  const { t, locale } = useLocale();
  const modal = t.lookbook.modal;
  const visual = DRESS_VISUALS[index];
  const anchors = DRESS_HOTSPOTS[index];
  const photoLayouts = PHOTO_HOTSPOT_LAYOUTS[index] ?? [];
  const galleryImages = getLookbookGallery(index);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const activeDetail = activeHotspot
    ? item.hotspots.find((h) => h.id === activeHotspot)
    : undefined;

  const handleChipClick = (id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("dress-modal-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("dress-modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const scrollToContact = () => {
    handleClose();
    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const content = (
    <div className="dress-modal__backdrop" role="presentation" onClick={handleClose}>
      <div
        ref={dialogRef}
        className="dress-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dress-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="dress-modal__close"
          onClick={handleClose}
          aria-label={modal.close}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        <div className="dress-modal__scroll">
          <div className="dress-modal__layout">
            <div className="dress-modal__hero">
              <div className={`dress-viewer ${LOOKBOOK_3D_ENABLED ? "" : "dress-viewer--photos"}`}>
                {LOOKBOOK_3D_ENABLED ? (
                  <>
                    <div className="dress-viewer__grid" aria-hidden />
                    <Suspense
                      fallback={
                        <div className="dress-viewer__loading">
                          <span className="dress-viewer__loading-pulse" />
                        </div>
                      }
                    >
                      <DressViewer3D
                        visual={visual}
                        hotspots={anchors}
                        activeHotspot={activeHotspot}
                        onHotspotChange={setActiveHotspot}
                      />
                    </Suspense>
                    <p className="dress-viewer__hint">{modal.drag}</p>
                  </>
                ) : (
                  <DressPhotoGallery images={galleryImages} locale={locale} />
                )}
              </div>

              <div className="dress-modal__hero-shade" aria-hidden />

              <DressImageHotspots
                layouts={photoLayouts}
                hotspots={item.hotspots}
                activeId={activeHotspot}
              />

              <div className="dress-modal__hero-caption">
                <span className="dress-modal__ref">
                  {modal.codename} · {item.codename}
                </span>
                <p className="dress-modal__tag">{item.tag}</p>
                <h2 id="dress-modal-title" className="dress-modal__title">
                  {item.title}
                  <span className="dress-modal__event">· {item.event}</span>
                </h2>
              </div>
            </div>

            <aside className="dress-modal__panel">
              <div className="dress-modal__copy">
                <p className="dress-modal__headline">{item.headline}</p>
                <p className="dress-modal__description">{item.description}</p>
              </div>

              <div className="dress-modal__chip-nav" role="tablist" aria-label={modal.specs}>
                {item.hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    type="button"
                    role="tab"
                    aria-selected={activeHotspot === hotspot.id}
                    className={`dress-modal__chip ${activeHotspot === hotspot.id ? "is-active" : ""}`}
                    onClick={() => handleChipClick(hotspot.id)}
                  >
                    {hotspot.label}
                  </button>
                ))}
              </div>

              {activeDetail && (
                <p className="dress-modal__mobile-detail lg:hidden">{activeDetail.body}</p>
              )}

              <ul className="dress-modal__spec-list">
                {item.specs.map((spec) => (
                  <li key={spec.k} className="dress-modal__spec-item">
                    <span className="dress-modal__spec-k">{spec.k}</span>
                    <span className="dress-modal__spec-v">{spec.v}</span>
                  </li>
                ))}
              </ul>

              <div className="dress-modal__panel-foot">
                <div className="dress-modal__metrics">
                  <div className="dress-modal__metric">
                    <span className="dress-modal__metric-label">{modal.investment}</span>
                    <span className="dress-modal__metric-value">{item.investment}</span>
                  </div>
                  <div className="dress-modal__metric">
                    <span className="dress-modal__metric-label">{modal.leadTime}</span>
                    <span className="dress-modal__metric-value">{item.leadTime}</span>
                  </div>
                </div>

                <div className="dress-modal__cta-block">
                  <button type="button" className="dress-modal__cta" onClick={scrollToContact}>
                    {modal.cta}
                  </button>
                  <p className="dress-modal__cta-note">{modal.ctaNote}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
