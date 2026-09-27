-- Provider-agnostic payment orchestration for guest-service orders.
-- No raw API secrets or banking credentials are stored here.

create table if not exists public.property_payment_settings (
  property_id uuid primary key references public.properties(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  payment_mode text not null default 'request_only'
    check (payment_mode in ('request_only','pay_at_property','external_link','provider_checkout')),
  provider text not null default 'none'
    check (provider in ('none','stripe_connect','cmi','payzone','naps','other')),
  provider_account_id text,
  provider_status text not null default 'not_connected'
    check (provider_status in ('not_connected','pending','active','restricted','disabled')),
  settlement_model text not null default 'property_direct'
    check (settlement_model in ('property_direct','platform_split','platform_merchant')),
  default_currency text not null default 'MAD',
  platform_commission_rate numeric(6,3) not null default 0,
  public_config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_payment_settings_org
  on public.property_payment_settings(organization_id);

alter table public.property_payment_settings enable row level security;

drop policy if exists "Members can view payment settings" on public.property_payment_settings;
create policy "Members can view payment settings"
on public.property_payment_settings
for select
using (public.is_organization_member(organization_id));

drop policy if exists "Admins can create payment settings" on public.property_payment_settings;
create policy "Admins can create payment settings"
on public.property_payment_settings
for insert
with check (public.is_organization_admin(organization_id));

drop policy if exists "Admins can update payment settings" on public.property_payment_settings;
create policy "Admins can update payment settings"
on public.property_payment_settings
for update
using (public.is_organization_admin(organization_id))
with check (public.is_organization_admin(organization_id));

-- Secrets must live in provider vaults / environment variables / a dedicated encrypted secret store.
comment on table public.property_payment_settings is
  'Non-secret payment orchestration configuration. Never store API keys, card data or bank credentials here.';
