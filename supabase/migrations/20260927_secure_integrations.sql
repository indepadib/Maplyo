-- Secure integration storage and operational health.
-- Secrets are never exposed through browser RLS policies.

create table if not exists public.integration_secrets (
  integration_id uuid primary key references public.integrations(id) on delete cascade,
  ciphertext text not null,
  iv text not null,
  auth_tag text not null,
  key_version integer not null default 1,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.integration_secrets enable row level security;

alter table public.integrations
  add column if not exists health_status text not null default 'disconnected'
    check (health_status in ('disconnected','healthy','degraded','error'));

alter table public.integrations
  add column if not exists last_tested_at timestamptz;

alter table public.integrations
  add column if not exists last_sync_at timestamptz;

alter table public.integrations
  add column if not exists last_error text;

alter table public.access_codes
  add column if not exists provider_password_id text;

create index if not exists idx_integrations_user_type
  on public.integrations(user_id, type);

create index if not exists idx_access_codes_guide_external
  on public.access_codes(guide_id, external_uid);

comment on table public.integration_secrets is
  'Server-only encrypted credentials for third-party integrations. No browser RLS policies are intentionally defined.';
