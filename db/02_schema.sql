-- =============================================================================
-- Ann Atelier — Esquema PostgreSQL
--
-- Ejecutar conectado a la base ann_atelier:
--   psql -U postgres -d ann_atelier -f db/02_schema.sql
--
-- O como usuario de la app:
--   psql -U ann_atelier -d ann_atelier -f db/02_schema.sql
-- =============================================================================

BEGIN;

-- ─── Extensiones ─────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- ─── Función updated_at ──────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- FASE 1 — Booking y configuración (MVP)
-- =============================================================================

-- ─── Contactos ───────────────────────────────────────────────────────────────

CREATE TABLE contacts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  email       CITEXT NOT NULL,
  phone       TEXT,
  locale      TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'es')),
  source      TEXT NOT NULL DEFAULT 'website',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contacts_email ON contacts (email);
CREATE INDEX idx_contacts_created_at ON contacts (created_at DESC);

CREATE TRIGGER contacts_set_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- ─── Citas ───────────────────────────────────────────────────────────────────

CREATE TYPE appointment_status AS ENUM (
  'pending',
  'confirmed',
  'cancelled',
  'completed',
  'no_show'
);

CREATE TABLE appointments (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id         UUID NOT NULL REFERENCES contacts (id) ON DELETE CASCADE,
  starts_at          TIMESTAMPTZ NOT NULL,
  ends_at            TIMESTAMPTZ NOT NULL,
  occasion           TEXT,
  notes              TEXT,
  status             appointment_status NOT NULL DEFAULT 'pending',
  confirmation_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  confirmed_at       TIMESTAMPTZ,
  cancelled_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT appointments_ends_after_start CHECK (ends_at > starts_at),
  CONSTRAINT appointments_unique_slot UNIQUE (starts_at)
);

CREATE INDEX idx_appointments_contact_id ON appointments (contact_id);
CREATE INDEX idx_appointments_starts_at ON appointments (starts_at);
CREATE INDEX idx_appointments_status ON appointments (status);

CREATE TRIGGER appointments_set_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- ─── Bloqueos de agenda (vacaciones, eventos, fittings largos) ──────────────

CREATE TABLE schedule_blocks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  starts_at   TIMESTAMPTZ NOT NULL,
  ends_at     TIMESTAMPTZ NOT NULL,
  reason      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT schedule_blocks_ends_after_start CHECK (ends_at > starts_at)
);

CREATE INDEX idx_schedule_blocks_range ON schedule_blocks (starts_at, ends_at);

-- ─── Configuración del atelier ───────────────────────────────────────────────

CREATE TABLE business_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER business_settings_set_updated_at
  BEFORE UPDATE ON business_settings
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- =============================================================================
-- FASE 2 — CRM y contenido administrable
-- =============================================================================

-- ─── Leads ───────────────────────────────────────────────────────────────────

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'qualified',
  'booked',
  'lost',
  'archived'
);

CREATE TABLE leads (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id     UUID NOT NULL REFERENCES contacts (id) ON DELETE CASCADE,
  status         lead_status NOT NULL DEFAULT 'new',
  occasion       TEXT,
  event_date     DATE,
  message        TEXT,
  dress_interest TEXT,
  assigned_to    UUID,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_contact_id ON leads (contact_id);
CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);

CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- ─── Historial de actividades del lead ────────────────────────────────────────

CREATE TABLE lead_activities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id     UUID NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  payload     JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lead_activities_lead_id ON lead_activities (lead_id);

-- ─── Lookbook ────────────────────────────────────────────────────────────────

CREATE TABLE dresses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  sort_order    INT NOT NULL DEFAULT 0,
  silhouette    TEXT NOT NULL CHECK (
    silhouette IN ('sheath', 'aline', 'ballgown', 'mermaid', 'architectural')
  ),
  is_published  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dresses_sort_order ON dresses (sort_order);
CREATE INDEX idx_dresses_published ON dresses (is_published) WHERE is_published = true;

CREATE TRIGGER dresses_set_updated_at
  BEFORE UPDATE ON dresses
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TABLE dress_translations (
  dress_id       UUID NOT NULL REFERENCES dresses (id) ON DELETE CASCADE,
  locale         TEXT NOT NULL CHECK (locale IN ('en', 'es')),
  title          TEXT NOT NULL,
  description    TEXT,
  neckline       TEXT,
  fabric         TEXT,
  color          TEXT,
  embellishment  TEXT,
  lead_time      TEXT,
  PRIMARY KEY (dress_id, locale)
);

CREATE TABLE dress_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dress_id    UUID NOT NULL REFERENCES dresses (id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt         TEXT,
  sort_order  INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_dress_images_dress_id ON dress_images (dress_id, sort_order);

CREATE TABLE dress_hotspots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dress_id    UUID NOT NULL REFERENCES dresses (id) ON DELETE CASCADE,
  hotspot_id  TEXT NOT NULL,
  x           NUMERIC(5, 2) NOT NULL,
  y           NUMERIC(5, 2) NOT NULL,
  label_x     NUMERIC(5, 2) NOT NULL,
  label_y     NUMERIC(5, 2) NOT NULL,
  align       TEXT NOT NULL CHECK (align IN ('tl', 'tr', 'bl', 'br')),
  UNIQUE (dress_id, hotspot_id)
);

-- ─── Testimonios ─────────────────────────────────────────────────────────────

CREATE TABLE testimonials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name   TEXT NOT NULL,
  rating        SMALLINT CHECK (rating BETWEEN 1 AND 5),
  sort_order    INT NOT NULL DEFAULT 0,
  is_published  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_testimonials_sort_order ON testimonials (sort_order);

CREATE TABLE testimonial_translations (
  testimonial_id UUID NOT NULL REFERENCES testimonials (id) ON DELETE CASCADE,
  locale         TEXT NOT NULL CHECK (locale IN ('en', 'es')),
  quote          TEXT NOT NULL,
  PRIMARY KEY (testimonial_id, locale)
);

-- =============================================================================
-- FASE 3 — Admin, encargos y pagos (futuro)
-- =============================================================================

CREATE TABLE admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         CITEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('owner', 'staff')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FK diferida: leads.assigned_to → admin_users
ALTER TABLE leads
  ADD CONSTRAINT leads_assigned_to_fkey
  FOREIGN KEY (assigned_to) REFERENCES admin_users (id) ON DELETE SET NULL;

CREATE TYPE order_status AS ENUM (
  'consultation',
  'sketch',
  'muslin',
  'fitting',
  'construction',
  'delivered',
  'cancelled'
);

CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id      UUID NOT NULL REFERENCES contacts (id) ON DELETE RESTRICT,
  appointment_id  UUID REFERENCES appointments (id) ON DELETE SET NULL,
  status          order_status NOT NULL DEFAULT 'consultation',
  occasion        TEXT,
  event_date      DATE,
  deposit_cents   INT CHECK (deposit_cents IS NULL OR deposit_cents >= 0),
  total_cents     INT CHECK (total_cents IS NULL OR total_cents >= 0),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_contact_id ON orders (contact_id);
CREATE INDEX idx_orders_status ON orders (status);

CREATE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TABLE order_milestones (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  status       order_status NOT NULL,
  notes        TEXT,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_milestones_order_id ON order_milestones (order_id);

CREATE TABLE payments (
  id                         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id                   UUID REFERENCES orders (id) ON DELETE SET NULL,
  stripe_payment_intent_id   TEXT UNIQUE,
  stripe_checkout_session_id TEXT UNIQUE,
  amount_cents               INT NOT NULL CHECK (amount_cents > 0),
  currency                   TEXT NOT NULL DEFAULT 'usd',
  status                     TEXT NOT NULL CHECK (
    status IN ('pending', 'succeeded', 'failed', 'refunded')
  ),
  created_at                 TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_order_id ON payments (order_id);

CREATE TABLE audit_log (
  id          BIGSERIAL PRIMARY KEY,
  actor_id    UUID REFERENCES admin_users (id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_log_created_at ON audit_log (created_at DESC);
CREATE INDEX idx_audit_log_entity ON audit_log (entity_type, entity_id);

-- =============================================================================
-- Datos iniciales
-- =============================================================================

-- Horarios alineados con src/booking/calendar.ts (Mar–Sáb, 10:00–18:00, Houston)
INSERT INTO business_settings (key, value) VALUES
  (
    'hours',
    '{
      "timezone": "America/Chicago",
      "weekdays": [2, 3, 4, 5, 6],
      "slot_hours": [10, 11, 12, 13, 14, 15, 16, 17],
      "slot_duration_minutes": 60,
      "appointment_only": true
    }'::jsonb
  ),
  (
    'nap',
    '{
      "name": "Ann Atelier",
      "phone": "+1-713-555-0142",
      "email": "atelier@annatelier.com",
      "address": "Houston, TX",
      "instagram": "https://instagram.com/annatelier",
      "pinterest": "https://pinterest.com/annatelier"
    }'::jsonb
  )
ON CONFLICT (key) DO NOTHING;

-- =============================================================================
-- Permisos para el rol de aplicación
-- =============================================================================

GRANT USAGE ON SCHEMA public TO ann_atelier;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ann_atelier;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ann_atelier;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ann_atelier;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO ann_atelier;

COMMIT;
