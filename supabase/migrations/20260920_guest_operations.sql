-- Guest operations / service desk.
-- Separate operational requests from revenue orders.

create table if not exists public.guest_requests (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  guide_id uuid references public.guides(id) on delete set null,
  stay_id uuid references public.stays(id) on delete set null,
  guest_id uuid references public.guests(id) on delete set null,
  category text not null default 'other'
    check (category in ('housekeeping','maintenance','information','complaint','lost_found','transport','food_beverage','other')),
  priority text not null default 'normal'
    check (priority in ('low','normal','high','urgent')),
  status text not null default 'new'
    check (status in ('new','acknowledged','in_progress','resolved','closed','cancelled')),
  title text not null,
  message text,
  guest_name text,
  guest_email text,
  guest_phone text,
  assigned_to uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_guest_requests_property_status
  on public.guest_requests(property_id, status, created_at desc);

create index if not exists idx_guest_requests_org_created
  on public.guest_requests(organization_id, created_at desc);

alter table public.guest_requests enable row level security;

drop policy if exists "Members can view guest requests" on public.guest_requests;
create policy "Members can view guest requests"
on public.guest_requests
for select
using (public.is_organization_member(organization_id));

drop policy if exists "Operators can update guest requests" on public.guest_requests;
create policy "Operators can update guest requests"
on public.guest_requests
for update
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = guest_requests.organization_id
      and om.user_id = auth.uid()
      and om.role in ('owner','admin','manager','member')
  )
)
with check (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = guest_requests.organization_id
      and om.user_id = auth.uid()
      and om.role in ('owner','admin','manager','member')
  )
);

-- Guest-facing inserts are performed by a validated server route with the service role.
