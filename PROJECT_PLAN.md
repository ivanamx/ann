# Ann Atelier — Plan de proyecto (2026)

Landing premium para artista de vestidos de mujer **custom / couture**, mercado **Estados Unidos** con foco local **Houston, Texas**. Bilingüe **EN / ES**, ultra optimizada **desktop + móvil** (incl. iPhone SE 320px).

---

## 1. Visión de producto

| Dimensión | Propuesta |
|-----------|-----------|
| **Posicionamiento** | Alta costura artesanal, no fast fashion. “One-of-one” para eventos, galas, quinceañeras premium, bodas íntimas. |
| **Emoción** | Exclusividad, confianza, transformación personal. El vestido como obra de arte portátil. |
| **Diferenciador** | Proceso visible (sketch → muslin → fitting → final), atelier en Houston, citas privadas. |
| **Audiencia** | Mujeres 28–55, ingreso alto, Houston metro + clientes que viajan a Texas para fittings. |
| **Conversión principal** | Reservar consulta privada (Calendly / formulario). Secundaria: WhatsApp / llamada. |

### Arquitectura de la vista (single-page)

```
┌─────────────────────────────────────────────────────────────┐
│  Nav fija · Logo · EN|ES · CTA "Book Consultation"         │
├─────────────────────────────────────────────────────────────┤
│  HERO · Video/mesh gradient · Headline · Scroll indicator   │
├─────────────────────────────────────────────────────────────┤
│  MARQUEE · Palabras clave couture (sutil, premium)          │
├─────────────────────────────────────────────────────────────┤
│  PHILOSOPHY · 3 pilares (Artistry / Fit / Exclusivity)      │
├─────────────────────────────────────────────────────────────┤
│  PROCESS · Timeline horizontal (mobile: vertical)           │
├─────────────────────────────────────────────────────────────┤
│  LOOKBOOK · Grid asimétrico · hover reveal · lightbox       │
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIALS · Carousel accesible · estrellas schema       │
├─────────────────────────────────────────────────────────────┤
│  HOUSTON · Mapa estilizado · NAP · horarios · estacionam.   │
├─────────────────────────────────────────────────────────────┤
│  FAQ · Acordeón · rich snippets                             │
├─────────────────────────────────────────────────────────────┤
│  CTA FINAL · Formulario mínimo (nombre, email, evento)      │
├─────────────────────────────────────────────────────────────┤
│  FOOTER · Legal · redes · hreflang · ©                      │
└─────────────────────────────────────────────────────────────┘
```

**Micro-interacciones premium (sin saturar):**

- Cursor personalizado solo en `pointer: fine` (desktop).
- Reveal on scroll con `IntersectionObserver` + `prefers-reduced-motion: reduce` → sin animación.
- Botones con “magnetic” ligero (transform ≤ 8px).
- Parallax suave en hero (1 capa, `will-change` controlado).
- Transiciones de idioma sin recarga (i18n en cliente; HTML `lang` dinámico).

---

## 2. Stack recomendado (2026)

### Implementación actual (MVP en este repo)

| Capa | Tecnología | Por qué |
|------|------------|---------|
| Build | **Vite 6** | HMR rápido, bundles pequeños, ESM nativo |
| UI | **React 19** + **TypeScript** | Componentes, ecosistema, hiring |
| Estilos | **Tailwind CSS 4** | Design tokens, responsive, `@container` |
| Motion | **CSS + Intersection Observer** | CWV: menos JS que librerías pesadas en v1 |
| i18n | **Context + JSON** | EN/ES sin dependencia extra en MVP |
| Deploy | **Vercel / Netlify / Cloudflare Pages** | CDN, HTTPS, preview branches |

### Evolución fase 2 (cuando haya backend / blog)

| Necesidad | Upgrade |
|-----------|---------|
| SEO + blog + OG por ruta | **Astro 5** o **Next.js 15** (App Router, `generateMetadata`) |
| CMS lookbook | **Sanity** o **Contentful** |
| Reservas | **Calendly** embed + webhook a CRM |
| Analytics | **Plausible** o **GA4** (consent mode v2) |
| Imágenes | **Cloudinary** / `@astrojs/image` — AVIF + WebP, `sizes` correctos |

### Fuentes y marca visual

- **Display:** Cormorant Garamond (elegancia editorial).
- **UI:** Outfit o DM Sans (legibilidad móvil).
- **Paleta:** `#0a0908` fondo, `#f5f0e8` texto, `#c9a962` acento oro, `#8b7355` bronce.
- **Espaciado:** escala 4px; secciones `py-16` móvil → `py-28` desktop.

---

## 3. SEO — Houston, Texas (Google 2026)

### Objetivos de keywords (prioridad)

1. `custom dresses Houston`
2. `bespoke women's dresses Houston TX`
3. `couture dressmaker Houston`
4. `vestidos a medida Houston` (ES)
5. Long-tail: `private fitting appointment Houston`, `quinceañera custom dress Houston`

### On-page (implementado en `index.html` + componentes)

- `<title>` y `meta description` por idioma (swap vía JS + valores por defecto EN en HTML).
- `canonical` → dominio producción (placeholder: actualizar en deploy).
- `hreflang` `en-US` y `es-US` + `x-default`.
- Geo: `geo.region` US-TX, `geo.placename` Houston.
- **JSON-LD:** `LocalBusiness` + `ProfessionalService` + `FAQPage` + `WebSite`.
- Headings: un solo `h1`, jerarquía `h2` por sección.
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1.

### Local SEO (acciones fuera del código)

1. **Google Business Profile** — categoría “Custom tailor” / “Fashion designer”, área Houston, fotos atelier.
2. **NAP consistente** — Nombre, dirección, teléfono idénticos en web, GBP, Yelp, Bing Places.
3. **Reseñas** — pedir reseñas post-entrega; responder en EN/ES.
4. **Enlaces locales** — Houston Wedding Network, bridal boutiques (colaboraciones).
5. **Contenido** — 1 artículo/mes: “How long does a custom gown take in Houston?” (EN + ES URL o toggle).

### Técnico

- `robots.txt`, `sitemap.xml` en `/public`.
- `llms.txt` (opcional 2026) para crawlers IA — resumen marca y servicios.
- Imágenes: `width`/`height`, `loading="lazy"`, `fetchpriority="high"` solo en hero.
- **Security headers** en hosting: CSP, HSTS, `X-Content-Type-Options`.

### iPhone SE y móviles pequeños

- Breakpoint crítico: **320px** (no solo 375).
- Tipografía fluida: `clamp(2rem, 8vw, 4.5rem)` en hero.
- Touch targets ≥ **44×44px**.
- `100dvh` / `svh` para hero (barra Safari).
- Sin hover-only: todo accionable con tap.
- Menú fullscreen overlay; CTA sticky bottom opcional en scroll > 50%.

---

## 4. Plan de ejecución

### Fase 0 — Fundación (✅ este entregable)

- [x] Repo Vite + React + TS + Tailwind
- [x] Landing single-page bilingüe
- [x] SEO base Houston + schema
- [x] Responsive 320px → 4K
- [x] `PROJECT_PLAN.md`

### Fase 1 — Contenido real (1–2 semanas)

- [ ] Fotografía profesional lookbook (WebP/AVIF, 1200px y 2400px)
- [ ] Copy final EN/ES con tono validado por la artista
- [ ] Dominio + SSL + deploy producción
- [ ] Reemplazar placeholders NAP (dirección, teléfono real)
- [ ] Integrar Calendly o TidyCal

### Fase 2 — Conversión y medición (2–3 semanas)

- [ ] GA4 o Plausible + eventos: `cta_consultation`, `lang_switch`, `form_submit`
- [ ] Formulario → Email (Resend) o CRM (HubSpot free)
- [ ] A/B headline en hero (opcional)

### Fase 3 — Escala SEO (mes 2+)

- [ ] Migrar a Astro/Next si blog > 5 páginas
- [ ] Páginas `/services/quinceanera`, `/services/wedding` (EN) + ES mirror
- [ ] Link building local Houston
- [ ] Video hero 15s loop (compresión H.264 + poster)

### Fase 4 — Premium+ (opcional)

- [ ] WebGL shader sutil en hero (Three.js lazy)
- [ ] Configurador 3D tela (alto costo)
- [ ] Portal cliente estado del pedido

---

## 5. Mejores prácticas web 2026 (checklist)

### Performance

- [ ] Bundle inicial < 80 KB gzip (JS crítico)
- [ ] Fuentes: `font-display: swap`, subset latin
- [ ] Preconnect a Google Fonts (o self-host en fase 2)
- [ ] Route-level code splitting si crece el sitio

### Accesibilidad (WCAG 2.2 AA)

- [ ] Contraste texto ≥ 4.5:1
- [ ] Focus visible en todos los interactivos
- [ ] `aria-expanded` en acordeón FAQ
- [ ] Skip link “Skip to content”
- [ ] Respeto `prefers-reduced-motion`

### Privacidad (US)

- [ ] Banner cookies si GA4 + ads
- [ ] Privacy Policy (Texas no exige estatal único, pero sí FTC truth in advertising)
- [ ] No almacenar PII en `localStorage` sin consentimiento

### Mantenimiento

- [ ] Dependabot / `npm audit` mensual
- [ ] Lighthouse CI en PR (score ≥ 90 mobile)
- [ ] Preview deploy por branch

---

## 6. Comandos del proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ para producción
npm run preview  # previsualizar build
```

### Variables antes de producción

Editar en `index.html` y `src/data/seo.ts`:

- `SITE_URL` — dominio final
- Teléfono, dirección, coordenadas GPS reales
- Enlaces Instagram / Pinterest

---

## 7. Métricas de éxito (90 días)

| KPI | Meta |
|-----|------|
| Lighthouse Performance (mobile) | ≥ 90 |
| Consultas vía formulario / mes | Baseline + 20% |
| Posición GBP “custom dresses near me” | Top 3 map pack Houston |
| Bounce rate | < 45% |
| Tiempo en página | > 2 min |

---

## 8. Notas de marca (Ann Atelier)

Nombre ficticio **Ann Atelier** para el MVP — reemplazar por nombre legal de la artista antes de lanzamiento público y registrar marca si aplica.

**Tagline EN:** *Where fabric becomes legacy.*  
**Tagline ES:** *Donde la tela se vuelve legado.*

---

*Documento generado como guía viva. Actualizar tras cada fase del plan.*
