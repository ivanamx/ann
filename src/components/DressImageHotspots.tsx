import type { PhotoHotspotLayout } from "../data/lookbookDresses";

type HotspotContent = {
  id: string;
  label: string;
  body: string;
};

type DressImageHotspotsProps = {
  layouts: readonly PhotoHotspotLayout[];
  hotspots: readonly HotspotContent[];
  activeId: string | null;
};

export function DressImageHotspots({
  layouts,
  hotspots,
  activeId,
}: DressImageHotspotsProps) {
  if (!activeId) return null;

  const hotspot = hotspots.find((h) => h.id === activeId);
  const layout = layouts.find((l) => l.id === activeId);
  if (!hotspot || !layout) return null;

  return (
    <div className="dress-hotspots">
      <svg className="dress-hotspots__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <line
          x1={layout.x}
          y1={layout.y}
          x2={layout.labelX}
          y2={layout.labelY}
          className="dress-hotspots__stem is-active"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="dress-hotspots__group">
        <span
          className="dress-hotspots__root is-active"
          style={{ left: `${layout.x}%`, top: `${layout.y}%` }}
          aria-hidden
        >
          <span className="dress-hotspots__pulse" />
          <span className="dress-hotspots__dot" />
        </span>

        <div
          className={`dress-hotspots__card dress-hotspots__card--${layout.align} is-active`}
          style={{ left: `${layout.labelX}%`, top: `${layout.labelY}%` }}
        >
          <span className="dress-hotspots__card-label">{hotspot.label}</span>
          <p className="dress-hotspots__card-body">{hotspot.body}</p>
        </div>
      </div>
    </div>
  );
}
