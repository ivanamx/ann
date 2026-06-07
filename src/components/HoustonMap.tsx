import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { BUSINESS } from "../data/seo";
import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../theme/ThemeContext";
import "leaflet/dist/leaflet.css";

const HOUSTON_CENTER: L.LatLngExpression = [BUSINESS.lat, BUSINESS.lng];

const atelierIcon = L.divIcon({
  className: "houston-marker",
  html: '<span class="houston-marker__ring" aria-hidden="true"></span><span class="houston-marker__dot" aria-hidden="true"></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const MAP_TILES = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
} as const;

export function HoustonMap() {
  const { t } = useLocale();
  const { theme } = useTheme();

  return (
    <div className="houston-map relative aspect-[4/3] min-h-[240px] w-full overflow-hidden">
      <MapContainer
        key={theme}
        center={HOUSTON_CENTER}
        zoom={13}
        scrollWheelZoom={false}
        className="houston-map__canvas h-full w-full z-0"
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url={MAP_TILES[theme]}
          subdomains="abcd"
          maxZoom={19}
        />
        <Marker position={HOUSTON_CENTER} icon={atelierIcon}>
          <Popup>
            <strong>{BUSINESS.name}</strong>
            <br />
            {t.houston.address}
            <br />
            {t.houston.city}
          </Popup>
        </Marker>
      </MapContainer>
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/5"
        aria-hidden
      />
    </div>
  );
}
