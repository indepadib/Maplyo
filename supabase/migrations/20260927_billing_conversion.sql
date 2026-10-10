-- Paid-conversion attribution and billing state.

alter table public.profiles
  add column if not exists billing_cycle text
    check (billing_cycle in ('monthly','annual'));

alter table public.profiles
  add column if not exists stripe_subscription_id text;

alter table public.profiles
  add column if not exists first_paid_at timestamptz;

alter table public.profiles
  add column if not exists last_checkout_ref text;

create index if not exists idx_profiles_stripe_subscription
  on public.profiles(stripe_subscription_id)
  where stripe_subscription_id is not null;
