-- =============================================================================
-- Ann Atelier — Crear base de datos y rol (ejecutar como superusuario postgres)
--
-- Desde PowerShell / CMD:
--   psql -U postgres -f db/01_create_database.sql
--
-- Luego aplicar el esquema:
--   psql -U postgres -d ann_atelier -f db/02_schema.sql
-- =============================================================================

-- Rol de aplicación (cambia la contraseña en local)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'ann_atelier') THEN
    CREATE ROLE ann_atelier WITH LOGIN PASSWORD 'ann_atelier_dev';
  END IF;
END
$$;

-- Base de datos
-- Sin LC_COLLATE explícito para compatibilidad con Windows
SELECT 'CREATE DATABASE ann_atelier OWNER ann_atelier ENCODING ''UTF8'''
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ann_atelier')\gexec

GRANT ALL PRIVILEGES ON DATABASE ann_atelier TO ann_atelier;
