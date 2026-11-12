-- ============================================================================
-- DYNAMIND STUDIOS — HARDENING DE CIBERSEGURIDAD SUPABASE / POSTGRESQL
-- Script de Activación de Row Level Security (RLS) & Principio de Mínimos Privilegios
-- ============================================================================

-- 1. Asegurar extensión pgcrypto
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLA: leads (Captura de Diagnósticos de Negocio)
-- Habilitar RLS obligatorio
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;

-- Revocar permisos destructivos al rol público / anon
REVOKE UPDATE, DELETE, TRUNCATE ON public.leads FROM anon;
REVOKE SELECT ON public.leads FROM anon; -- Solo administradores autenticados leen leads

-- Conceder únicamente inserción al rol anónimo para agendamiento desde la web
GRANT INSERT ON public.leads TO anon;

-- Política 1: Permitir inserción anónima de leads con campos válidos y cotas estrictas
DROP POLICY IF EXISTS "anon_can_insert_leads" ON public.leads;
CREATE POLICY "anon_can_insert_leads" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (
  char_length(trim(coalesce(client_name, ''))) >= 2 AND
  char_length(client_name) <= 120 AND
  char_length(coalesce(business_name, '')) <= 160 AND
  char_length(coalesce(phone, '')) <= 40 AND
  char_length(coalesce(bottleneck, '')) <= 1200 AND
  (friction_score IS NULL OR (friction_score >= 0 AND friction_score <= 100))
);

-- Política 2: Permitir lectura, actualización y borrado solo a usuarios autenticados (Admin Master)
DROP POLICY IF EXISTS "authenticated_full_access_leads" ON public.leads;
CREATE POLICY "authenticated_full_access_leads" 
ON public.leads 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- 3. TABLA: cabins / system_settings (Configuraciones de Sistema)
ALTER TABLE IF EXISTS public.system_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_system_settings" ON public.system_settings;
CREATE POLICY "public_read_system_settings" 
ON public.system_settings 
FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "admin_mutate_system_settings" ON public.system_settings;
CREATE POLICY "admin_mutate_system_settings" 
ON public.system_settings 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- 4. TABLA: objections (Matriz de Objeciones y Respuestas Tácticas)
ALTER TABLE IF EXISTS public.objections ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.objections FROM anon;

DROP POLICY IF EXISTS "authenticated_full_access_objections" ON public.objections;
CREATE POLICY "authenticated_full_access_objections"
ON public.objections
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);


-- 5. TABLA: audit_logs (Registro Inmutable de Auditoría y Arqueos Ciegos)
ALTER TABLE IF EXISTS public.audit_logs ENABLE ROW LEVEL SECURITY;
REVOKE UPDATE, DELETE, TRUNCATE ON public.audit_logs FROM anon, authenticated;

DROP POLICY IF EXISTS "authenticated_insert_select_audit_logs" ON public.audit_logs;
CREATE POLICY "authenticated_insert_select_audit_logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "authenticated_append_audit_logs" ON public.audit_logs;
CREATE POLICY "authenticated_append_audit_logs"
ON public.audit_logs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================================================
-- FIN DEL HARDENING RLS SUPABASE
-- ============================================================================
