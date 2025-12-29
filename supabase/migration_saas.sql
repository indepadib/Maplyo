-- SAFE MIGRATION: adds columns only if they don't exist

-- 1. Update PROFILES table (for Subscription/SaaS)
alter table public.profiles 
add column if not exists subscription_status text default 'free',
add column if not exists plan_variant text default 'demo',
add column if not exists stripe_customer_id text;

-- 2. Update GUIDES table (for Public Access)
alter table public.guides 
add column if not exists is_published boolean default false,
add column if not exists slug text;

-- 3. Ensure SLUG uniqueness (if slug exists)
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'guides_slug_key') then
    alter table public.guides add constraint guides_slug_key unique (slug);
  end if;
end $$;
