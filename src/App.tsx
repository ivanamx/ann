import { useSyncExternalStore } from "react";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { LocaleProvider } from "./i18n/LocaleContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { JsonLd } from "./components/JsonLd";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { QuinceCarousel } from "./components/QuinceCarousel";
import { Process } from "./components/Process";
import { Lookbook } from "./components/Lookbook";
import { BookingProvider } from "./booking/BookingContext";
import { FAQProvider } from "./faq/FAQContext";
import { Instagram } from "./components/Instagram";
import { Footer } from "./components/Footer";
import { MobileCta } from "./components/MobileCta";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { PlansPage } from "./pages/PlansPage";
import { AdminPage } from "./pages/AdminPage";

function getPathname() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return path;
}

function subscribePath(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

function HomePage() {
  useCustomCursor();

  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <QuinceCarousel />
        <Lookbook />
        <Process />
        <Instagram />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

export default function App() {
  const path = useSyncExternalStore(subscribePath, getPathname, () => "/");

  return (
    <ThemeProvider>
      <LocaleProvider>
        <BookingProvider>
          <FAQProvider>
            {path === "/privacy" ? (
              <PrivacyPage />
            ) : path === "/terms" ? (
              <TermsPage />
            ) : path === "/plans" ? (
              <PlansPage />
            ) : path.startsWith("/admin") ? (
              <AdminPage />
            ) : (
              <HomePage />
            )}
          </FAQProvider>
        </BookingProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
