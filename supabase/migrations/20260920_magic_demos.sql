-- Sales Magic Demo workspace.
-- Commercial demos are intentionally separated from customer guides and do not count toward plan limits.

create table if not exists public.magic_demos (
  id uuid primary key default uuid_generate_v4(),
  created_by uuid references auth.users(id) on delete set null,
  slug text not null unique,
  prospect_name text,
  prospect_email text,
  property_name text not null,
  property_type text not null default 'hotel',
  source_url text,
  city text,
  theme_id text not null default 'minimal-white',
  content jsonb not null default '{}'::jsonb,
  status text not null default 'active' check (status in ('draft','active','claimed','expired','archived')),
  view_count integer not null default 0,
  last_viewed_at timestamptz,
  claimed_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_magic_demos_created_by on public.magic_demos(created_by, created_at desc);
create index if not exists idx_magic_demos_status on public.magic_demos(status, created_at desc);

alter table public.magic_demos enable row level security;

drop policy if exists "Creators can view own magic demos" on public.magic_demos;
create policy "Creators can view own magic demos"
on public.magic_demos for select
using (auth.uid() = created_by);

-- Creation, public rendering, counters and claims are handled server-side using the service role.
