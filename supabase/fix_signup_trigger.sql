-- NUCLEAR REPAIR SCRIPT FOR SIGNUP (Run in Supabase SQL Editor)

-- 1. Ensure the profiles table has all necessary columns with defaults
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan_variant text DEFAULT 'demo';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS addons jsonb DEFAULT '{}'::jsonb;

-- 2. Drop the existing trigger to clear old logic
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Create the function with SECURITY DEFINER and explicit search_path
-- Using SECURITY DEFINER allows it to bypass RLS during insertion
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    subscription_status, 
    plan_variant
  )
  VALUES (
    new.id, 
    new.email, 
    -- Fallback to metadata, then email if name is missing
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'first_name' || ' ' || new.raw_user_meta_data->>'last_name', new.email),
    'free',
    'demo'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;
    
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Re-attach the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Permission Grant (Just in case)
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO postgres, anon, authenticated, service_role;
