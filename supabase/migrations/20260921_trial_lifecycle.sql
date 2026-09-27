-- Idempotent lifecycle delivery ledger for the 30-day reverse trial.

create table if not exists public.trial_lifecycle_deliveries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  milestone text not null
    check (milestone in ('activation_day_2','value_day_10','ending_3_days','ending_1_day')),
  recipient text,
  provider_message_id text,
  status text not null default 'pending'
    check (status in ('pending','processing','sent','failed','cancelled')),
  error_message text,
  sent_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (user_id, milestone)
);

create index if not exists idx_trial_lifecycle_status
  on public.trial_lifecycle_deliveries(status, created_at);

alter table public.trial_lifecycle_deliveries enable row level security;

-- Lifecycle delivery is an internal server process only.
comment on table public.trial_lifecycle_deliveries is
  'Idempotent server-side delivery ledger for Maplyo reverse-trial lifecycle emails.';
