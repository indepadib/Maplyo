-- ============================================================
-- MAPLYO INTEGRATIONS SCHEMA (PHASE 2)
-- ============================================================

-- Table to store third-party integration credentials
CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'tuya', 'airbnb_ical', 'stripe'
    credentials JSONB NOT NULL, -- Encrypted keys/tokens
    settings JSONB DEFAULT '{}',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table to link guides to specific integrations
CREATE TABLE IF NOT EXISTS public.guide_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID REFERENCES public.guides(id) ON DELETE CASCADE,
    integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE,
    external_id TEXT, -- e.g., Tuya Device ID or Airbnb Listing ID
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for automated access codes (Tuya logs)
CREATE TABLE IF NOT EXISTS public.access_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID REFERENCES public.guides(id) ON DELETE CASCADE,
    guest_name TEXT,
    code TEXT, -- Nullable for basic booking sync without smart lock
    valid_from TIMESTAMP WITH TIME ZONE,
    valid_until TIMESTAMP WITH TIME ZONE,
    source TEXT DEFAULT 'manual', -- 'manual', 'airbnb', 'tuya'
    external_uid TEXT, -- UID from iCal or external system
    status TEXT DEFAULT 'pending', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own integrations" ON public.integrations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their guide integrations" ON public.guide_integrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.guides 
            WHERE guides.id = guide_integrations.guide_id 
            AND guides.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage access codes for their guides" ON public.access_codes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.guides 
            WHERE guides.id = access_codes.guide_id 
            AND guides.user_id = auth.uid()
        )
    );
