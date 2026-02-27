-- SCRIPT SQL COMPLETO PARA HUB CONEXÃO DIGITAL
-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. TABELA DE CONFIGURAÇÕES DE BRANDING
CREATE TABLE IF NOT EXISTS public.branding_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    primary_blue TEXT DEFAULT '#004a8e',
    primary_gold TEXT DEFAULT '#b38e5d',
    description TEXT,
    pdf_name TEXT,
    system_prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 2. TABELA DE CHAVES DE API
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL, -- 'gemini', 'openai', 'claude', 'groq'
    key_value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, service_name)
);

-- 3. TABELA DE MATERIAIS GERADOS
CREATE TABLE IF NOT EXISTS public.generated_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    html_content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABELA DE BIBLIOTECA DE PROMPTS
CREATE TABLE IF NOT EXISTS public.prompt_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONFIGURAÇÃO DE SEGURANÇA (RLS)
-- Habilitar RLS em todas as tabelas
ALTER TABLE public.branding_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_library ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA BRANDING_CONFIGS
DROP POLICY IF EXISTS "Usuários podem gerenciar seu próprio branding" ON public.branding_configs;
CREATE POLICY "Usuários podem gerenciar seu próprio branding" 
ON public.branding_configs FOR ALL 
USING (auth.uid() = user_id);

-- POLÍTICAS PARA API_KEYS
DROP POLICY IF EXISTS "Usuários podem gerenciar suas próprias chaves" ON public.api_keys;
CREATE POLICY "Usuários podem gerenciar suas próprias chaves" 
ON public.api_keys FOR ALL 
USING (auth.uid() = user_id);

-- POLÍTICAS PARA GENERATED_MATERIALS
DROP POLICY IF EXISTS "Usuários podem gerenciar seus próprios materiais" ON public.generated_materials;
CREATE POLICY "Usuários podem gerenciar seus próprios materiais" 
ON public.generated_materials FOR ALL 
USING (auth.uid() = user_id);

-- POLÍTICAS PARA PROMPT_LIBRARY
DROP POLICY IF EXISTS "Usuários podem gerenciar sua própria biblioteca" ON public.prompt_library;
CREATE POLICY "Usuários podem gerenciar sua própria biblioteca" 
ON public.prompt_library FOR ALL 
USING (auth.uid() = user_id);

-- 6. ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_materials_user_id ON public.generated_materials(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON public.prompt_library(user_id);
