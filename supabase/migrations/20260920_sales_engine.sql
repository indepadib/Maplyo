-- Maplyo internal sales engine linked to Magic Demos.

create table if not exists public.sales_prospects (
  id uuid primary key default uuid_generate_v4(),
  created_by uuid not null references auth.users(id) on delete cascade,
  property_name text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  website_url text,
  city text,
  country_code text,
  property_type text not null default 'hotel',
  estimated_units integer,
  source text not null default 'manual',
  score integer not null default 50 check (score between 0 and 100),
  stage text not null default 'new'
    check (stage in ('new','demo_ready','contacted','engaged','meeting','trial','claimed','paid','lost')),
  next_action_at timestamptz,
  last_contacted_at timestamptz,
  last_activity_at timestamptz,
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_sales_prospects_creator_stage
  on public.sales_prospects(created_by, stage, updated_at desc);

create index if not exists idx_sales_prospects_next_action
  on public.sales_prospects(created_by, next_action_at);

create table if not exists public.sales_activities (
  id uuid primary key default uuid_generate_v4(),
  prospect_id uuid not null references public.sales_prospects(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  activity_type text not null
    check (activity_type in ('prospect_created','demo_created','demo_viewed','email_sent','reply','call','meeting','trial_started','claimed','paid','note','lost')),
  channel text,
  metadata jsonb not null default '{}'::jsonb,
  happened_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_sales_activities_prospect
  on public.sales_activities(prospect_id, happened_at desc);

alter table public.magic_demos
  add column if not exists prospect_id uuid references public.sales_prospects(id) on delete set null;

create index if not exists idx_magic_demos_prospect on public.magic_demos(prospect_id);

alter table public.sales_prospects enable row level security;
alter table public.sales_activities enable row level security;

drop policy if exists "Sales users can manage own prospects" on public.sales_prospects;
create policy "Sales users can manage own prospects"
on public.sales_prospects
for all
using (auth.uid() = created_by)
with check (auth.uid() = created_by);

drop policy if exists "Sales users can view own activities" on public.sales_activities;
create policy "Sales users can view own activities"
on public.sales_activities
for select
using (
  exists (
    select 1 from public.sales_prospects p
    where p.id = sales_activities.prospect_id
      and p.created_by = auth.uid()
  )
);

-- Activity writes from public demo views and automations are server/service-role only.
