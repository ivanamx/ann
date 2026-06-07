import { useState } from "react";
import type { Locale } from "../i18n/translations";

type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

type DressPhotoGalleryProps = {
  images: readonly GalleryImage[];
  locale: Locale;
};

export function DressPhotoGallery({ images, locale }: DressPhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className="dress-photo-gallery">
      <div className="dress-photo-gallery__main">
        <img
          key={active.src}
          src={active.src}
          alt={active.alt[locale]}
          width={active.width}
          height={active.height}
          className="dress-photo-gallery__img"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {images.length > 1 && (
        <div className="dress-photo-gallery__thumbs" role="tablist" aria-label="Gallery">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              className={`dress-photo-gallery__thumb ${i === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={img.src} alt="" width={img.width} height={img.height} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
