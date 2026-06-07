import { useSyncExternalStore } from "react";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { LocaleProvider } from "./i18n/LocaleContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { JsonLd } from "./components/JsonLd";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Philosophy } from "./components/Philosophy";
import { Process } from "./components/Process";
import { Lookbook } from "./components/Lookbook";
import { Testimonials } from "./components/Testimonials";
import { Houston } from "./components/Houston";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MobileCta } from "./components/MobileCta";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { PlansPage } from "./pages/PlansPage";

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
        <Lookbook />
        <Marquee />
        <Philosophy />
        <Process />
        <Testimonials />
        <Houston />
        <FAQ />
        <Contact />
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
        {path === "/privacy" ? (
          <PrivacyPage />
        ) : path === "/terms" ? (
          <TermsPage />
        ) : path === "/plans" ? (
          <PlansPage />
        ) : (
          <HomePage />
        )}
      </LocaleProvider>
    </ThemeProvider>
  );
}
