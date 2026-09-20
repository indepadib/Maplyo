-- Guest revenue + engagement events.
-- Additive and safe to apply after 20260920_guest_experience_core.sql.

create table if not exists public.guest_events (
  id uuid primary key default uuid_generate_v4(),
  guide_id uuid references public.guides(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  event_name text not null,
  session_id text,
  service_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_guest_events_guide_created
  on public.guest_events(guide_id, created_at desc);

create index if not exists idx_guest_events_property_created
  on public.guest_events(property_id, created_at desc);

create index if not exists idx_guest_events_name_created
  on public.guest_events(event_name, created_at desc);

create index if not exists idx_guest_events_service_key
  on public.guest_events(service_key);

alter table public.guest_events enable row level security;

drop policy if exists "Hosts can view guest events" on public.guest_events;
create policy "Hosts can view guest events" on public.guest_events
for select using (
  exists (
    select 1
    from public.guides g
    where g.id = guest_events.guide_id
      and g.user_id = auth.uid()
  )
  or (
    guest_events.property_id is not null
    and exists (
      select 1
      from public.properties p
      where p.id = guest_events.property_id
        and public.is_organization_member(p.organization_id)
    )
  )
);

-- Public inserts are intentionally not allowed.
-- Guest-facing tracking is written server-side through the service role.
