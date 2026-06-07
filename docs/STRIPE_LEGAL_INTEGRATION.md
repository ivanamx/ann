# Integración legal de Stripe — Ann Atelier

Este documento describe **dónde** y **cómo** incorporar el texto legal obligatorio y recomendado cuando active pagos con **Stripe** (depósitos de consulta, hitos de encargo, saldo final, etc.). El sitio ya contempla pagos de forma genérica en la Política de Privacidad y los Términos; al activar Stripe debe **ampliar** esas secciones, no sustituirlas.

> **Nota:** Revise el texto final con un abogado licenciado en Texas antes de cobrar en producción. Este material es una guía de implementación, no asesoría legal.

---

## Resumen de archivos a editar

| Acción | Archivo | Qué hacer |
|--------|---------|-----------|
| Privacidad — datos de pago | `src/content/legal/privacy.ts` | Ampliar secciones **3**, **5**, **6** y (opcional) nueva subsección bajo **6** |
| Términos — pagos y reembolsos | `src/content/legal/terms.ts` | Reemplazar/ampliar sección **6** y añadir sección **6b** (checkout) |
| Checkout / UI | Componente futuro de pago (p. ej. `src/components/Checkout.tsx`) | Enlaces visibles + checkbox de aceptación |
| Pie de página / formulario | `src/components/Footer.tsx`, formulario de consulta | Enlace a Términos y Privacidad junto al botón de pago |
| Emails de recibo | Plantillas de confirmación | Mencionar procesador y enlace a políticas |

---

## 1. Política de Privacidad (`privacy.ts`)

### Sección 3 — «Información que recopilamos» / «Information We Collect»

**Ubicación:** bloque `id: "collect"`, lista con viñetas.

**Añadir** (EN) un ítem explícito:

```text
Payment information processed by Stripe: tokenized card data, last four digits, card brand, billing ZIP, payment intent identifiers, and dispute/chargeback metadata. Ann Atelier does not store full card numbers on our servers.
```

**Añadir** (ES) equivalente en `privacyPolicy.es.sections` → mismo `id: "collect"`.

### Sección 5 — «Cómo usamos» / «How We Use»

**Ubicación:** `id: "use"`, lista.

**Añadir** ítems:

- Procesar depósitos y pagos de encargo autorizados por usted.
- Prevenir fraude, conciliar cuentas y cumplir obligaciones contables y fiscales.

### Sección 6 — «Cuándo compartimos» / «When We Share»

**Ubicación:** `id: "disclose"`, lista.

**Precisar** el ítem del procesador de pagos:

```text
Stripe, Inc. and its affiliates, as our payment processor, subject to Stripe’s Privacy Policy (https://stripe.com/privacy). Stripe may process data in the United States and other countries where it operates infrastructure.
```

### Sección opcional nueva — «Payment processor» (recomendado)

**Ubicación:** insertar **después** de `id: "disclose"` y **antes** de `id: "cookies"`:

- `id: "stripe"`
- Título EN: `6a. Payment Processing (Stripe)` / ES: `6a. Procesamiento de Pagos (Stripe)`
- Párrafos: rol de Stripe como encargado/procesador, datos que Stripe recopila directamente en su iframe/Elements, enlaces a [Stripe Privacy](https://stripe.com/privacy) y [Stripe Services Agreement](https://stripe.com/legal/ssa) cuando aplique al comercio.

---

## 2. Términos de Servicio (`terms.ts`)

### Sección 6 — «Precios, depósitos y pago» / «Pricing, Deposits, and Payment»

**Ubicación:** `id: "pricing"`.

**Reemplazar** el párrafo genérico sobre Stripe por bloques detallados:

#### Texto sugerido (EN) — pegar como nuevos bloques `type: "p"` y `type: "ul"`

**6.1 Online payments**

When you pay through our Site, you authorize Ann Atelier and Stripe to charge your selected payment method for the amount shown at checkout (deposit, milestone, or balance due). Prices are quoted in U.S. dollars unless otherwise stated in your Commission Agreement.

**6.2 Stripe**

Card payments are processed by Stripe. You agree to Stripe’s terms applicable to payers. We are not responsible for Stripe outages; if a payment fails, work may be paused until successful settlement.

**6.3 Deposits and refunds**

Deposit and refund rules are defined in your signed Commission Agreement. Unless stated there or required by law, deposits are non-refundable once design work and materials sourcing begin. Chargebacks initiated without contacting us first may result in suspension of fittings and collection of amounts owed under your Commission Agreement.

**6.4 Taxes**

Applicable Texas sales tax and other governmental charges will be calculated and displayed before you complete payment where required.

**6.5 Receipts**

You will receive an email receipt for each successful Stripe charge to the address associated with your account or checkout session.

Repetir la misma estructura en **ES** en `termsOfService.es`.

### Nueva sección 6b — Checkout y consentimiento (recomendado)

**Ubicación:** nueva sección después de `id: "pricing"`:

- `id: "checkout"`
- Título: `6b. Checkout Terms` / `6b. Condiciones del Checkout`
- Contenido: al hacer clic en «Pay» / «Pagar», el cliente confirma que (i) revisó el resumen del pedido, (ii) acepta estos Términos y la Política de Privacidad, (iii) autoriza el cargo, (iv) entiende que el pago no sustituye el Commission Agreement para el alcance del diseño.

---

## 3. Interfaz de usuario (cuando exista el checkout)

Colocar **encima o debajo** del botón de pago de Stripe (Payment Element / Checkout Session):

```text
By paying, you agree to our Terms of Service and Privacy Policy.
Los pagos son procesados de forma segura por Stripe.
```

Enlaces:

- `/terms`
- `/privacy`

**Checkbox obligatorio** (recomendado para depósitos > umbral interno):

```text
[ ] I have read and agree to the Terms of Service and Privacy Policy, and I authorize this charge.
```

Archivo sugerido al crear el flujo: `src/components/StripeCheckout.tsx` o página `src/pages/CheckoutPage.tsx`.

---

## 4. Commission Agreement (documento fuera del sitio)

El contrato firmado en el atelier debe **alinear** con el sitio:

| Tema | Debe coincidir con |
|------|-------------------|
| Monto del depósito | Lo mostrado en Stripe Checkout |
| Calendario de hitos | Productos/precios de Stripe (Price IDs) |
| Política de reembolso | Sección 6 de `terms.ts` |
| Moneda | USD |

No duplicar todo el contrato en la web; basta con que el checkout muestre **descripción del cargo** (p. ej. «Commission deposit — Midnight Gala, 40%»).

---

## 5. Requisitos de Stripe (cumplimiento del comercio)

Stripe exige que el sitio del comercio incluya, como mínimo:

1. **Descripción clara del negocio** — ya cubierto en la home (couture a medida, Houston).
2. **Política de devoluciones/reembolsos** — sección 6 de Términos + Commission Agreement.
3. **Política de privacidad** — `/privacy`.
4. **Términos de servicio o condiciones de venta** — `/terms`.
5. **Datos de contacto** — sección 15–16 de ambas políticas y `src/data/seo.ts` (`BUSINESS`).

Opcional pero recomendable para disputas:

- Página o sección «Shipping & Delivery» (entrega en atelier / pickup Houston) — puede añadirse como sección `id: "delivery"` en `terms.ts` cuando envíen fuera del atelier.

---

## 6. Metadatos y despliegue

Tras publicar pagos:

1. Actualizar `effectiveDate` en `privacy.ts` y `terms.ts` (EN y ES).
2. Añadir en `index.html` o en el host canónicos para `/privacy` y `/terms` si aún no existen.
3. Configurar **rewrite SPA** en el host (todas las rutas → `index.html`) para que `/privacy` y `/terms` no devuelvan 404 al recargar.

Ejemplo Netlify `_redirects`:

```text
/*    /index.html   200
```

---

## 7. Checklist antes de activar Stripe en producción

- [ ] Texto EN/ES añadido en `privacy.ts` (secciones 3, 5, 6 + opcional 6a Stripe).
- [ ] Texto EN/ES ampliado en `terms.ts` (sección 6 y opcional 6b checkout).
- [ ] Enlaces en UI de pago a `/terms` y `/privacy`.
- [ ] Commission Agreement alineado con montos y reembolsos.
- [ ] Cuenta Stripe en modo live con categoría de negocio correcta (apparel / custom services).
- [ ] Revisión por abogado en Texas (Harris County / Houston).

---

## 8. Contacto para dudas de implementación

Datos del negocio centralizados en `src/data/seo.ts` → `BUSINESS`. Cualquier cambio de dirección, teléfono o correo debe reflejarse **también** en las listas de contacto de `privacy.ts` y `terms.ts` (secciones finales).
