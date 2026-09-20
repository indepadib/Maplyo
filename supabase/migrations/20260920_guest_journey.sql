-- Automated guest journey rules and idempotent deliveries.

create table if not exists public.journey_rules (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  anchor text not null check (anchor in ('check_in','check_out')),
  offset_minutes integer not null default 0,
  channel text not null default 'email' check (channel in ('email')),
  subject_template text,
  body_template text not null,
  status text not null default 'active' check (status in ('active','paused','archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_journey_rules_property_status
  on public.journey_rules(property_id, status);

create table if not exists public.journey_deliveries (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  stay_id uuid not null references public.stays(id) on delete cascade,
  rule_id uuid not null references public.journey_rules(id) on delete cascade,
  channel text not null,
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending','processing','sent','failed','cancelled')),
  recipient text,
  provider_message_id text,
  error_message text,
  sent_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (stay_id, rule_id)
);

create index if not exists idx_journey_deliveries_due
  on public.journey_deliveries(status, scheduled_for);

alter table public.journey_rules enable row level security;
alter table public.journey_deliveries enable row level security;

drop policy if exists "Members can view journey rules" on public.journey_rules;
create policy "Members can view journey rules"
on public.journey_rules for select
using (public.is_organization_member(organization_id));

drop policy if exists "Admins can manage journey rules" on public.journey_rules;
create policy "Admins can manage journey rules"
on public.journey_rules for all
using (public.is_organization_admin(organization_id))
with check (public.is_organization_admin(organization_id));

drop policy if exists "Members can view journey deliveries" on public.journey_deliveries;
create policy "Members can view journey deliveries"
on public.journey_deliveries for select
using (public.is_organization_member(organization_id));
