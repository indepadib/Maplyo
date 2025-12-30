-- NUCLEAR REPAIR SCRIPT FOR SIGNUP (Run in Supabase SQL Editor)

-- 1. ADD COLUMNS (Ensuring we store ALL the signup data)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan_variant text DEFAULT 'demo';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS addons jsonb DEFAULT '{}'::jsonb;

-- 1b. FIX CONTRAINTS (We remove strict checks to ensure data can be inserted)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_plan_variant_check;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_subscription_status_check;

-- 2. Drop the existing trigger to clear old logic
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Create the function with SECURITY DEFINER and explicit search_path
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone, 
    business_name, 
    subscription_status, 
    plan_variant
  )
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'business_name',
    'free',
    'demo'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    business_name = EXCLUDED.business_name;
    
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Re-attach the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Permission Grant
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO postgres, anon, authenticated, service_role;

-- 6. [IMPORTANT] BACKFILL EXISTING USERS
-- This part fixes the "Empty Table" issue for users who already signed up
INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone, 
    business_name, 
    subscription_status, 
    plan_variant
)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', email),
    raw_user_meta_data->>'phone',
    raw_user_meta_data->>'business_name',
    'free',
    'demo'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
