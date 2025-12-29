-- Add Flexible Add-ons support
alter table public.profiles 
add column if not exists addons jsonb default '{}'::jsonb, -- e.g. {"themes": true, "extra_guides": 1}
add column if not exists subscription_id text; -- To map to Stripe Subscription ID for updates

-- Index for faster lookups
create index if not exists idx_profiles_sub_status on profiles(subscription_status);
