-- Organization invitations + role-enforced write permissions.

create table if not exists public.organization_invitations (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role text not null default 'member'
    check (role in ('admin','manager','member','viewer')),
  token_hash text not null unique,
  invited_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique (organization_id, email)
);

create index if not exists idx_org_invitations_email
  on public.organization_invitations(lower(email), expires_at desc);

alter table public.organization_invitations enable row level security;

create or replace function public.organization_role(target_organization_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select om.role
  from public.organization_members om
  where om.organization_id = target_organization_id
    and om.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_organization_operator(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.organization_role(target_organization_id) in ('owner','admin','manager','member'), false);
$$;

create or replace function public.is_organization_manager(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.organization_role(target_organization_id) in ('owner','admin','manager'), false);
$$;

drop policy if exists "Admins can view organization invitations" on public.organization_invitations;
create policy "Admins can view organization invitations"
on public.organization_invitations
for select
using (public.is_organization_admin(organization_id));

-- Invite creation/claim/revocation is handled by server routes using the service role.

-- PROPERTIES: everyone in the org may read; only owner/admin/manager may mutate.
drop policy if exists "Members can manage properties" on public.properties;
drop policy if exists "Members can view properties" on public.properties;
create policy "Members can view properties"
on public.properties for select
using (public.is_organization_member(organization_id));

drop policy if exists "Managers can insert properties" on public.properties;
create policy "Managers can insert properties"
on public.properties for insert
with check (public.is_organization_manager(organization_id));

drop policy if exists "Managers can update properties" on public.properties;
create policy "Managers can update properties"
on public.properties for update
using (public.is_organization_manager(organization_id))
with check (public.is_organization_manager(organization_id));

drop policy if exists "Admins can delete properties" on public.properties;
create policy "Admins can delete properties"
on public.properties for delete
using (public.is_organization_admin(organization_id));

-- UNITS: read for all members, writes for managers.
drop policy if exists "Members can manage units" on public.units;
drop policy if exists "Members can view units" on public.units;
create policy "Members can view units"
on public.units for select
using (
  exists (
    select 1 from public.properties p
    where p.id = units.property_id
      and public.is_organization_member(p.organization_id)
  )
);

drop policy if exists "Managers can manage units" on public.units;
create policy "Managers can manage units"
on public.units for all
using (
  exists (
    select 1 from public.properties p
    where p.id = units.property_id
      and public.is_organization_manager(p.organization_id)
  )
)
with check (
  exists (
    select 1 from public.properties p
    where p.id = units.property_id
      and public.is_organization_manager(p.organization_id)
  )
);

-- GUESTS / STAYS: viewers read, operational roles write.
drop policy if exists "Members can manage guests" on public.guests;
drop policy if exists "Members can view guests" on public.guests;
create policy "Members can view guests"
on public.guests for select
using (public.is_organization_member(organization_id));

drop policy if exists "Operators can manage guests" on public.guests;
create policy "Operators can manage guests"
on public.guests for all
using (public.is_organization_operator(organization_id))
with check (public.is_organization_operator(organization_id));

drop policy if exists "Members can manage stays" on public.stays;
drop policy if exists "Members can view stays" on public.stays;
create policy "Members can view stays"
on public.stays for select
using (public.is_organization_member(organization_id));

drop policy if exists "Operators can manage stays" on public.stays;
create policy "Operators can manage stays"
on public.stays for all
using (public.is_organization_operator(organization_id))
with check (public.is_organization_operator(organization_id));

-- SERVICES: viewers read; managers own the commercial catalog.
drop policy if exists "Members can manage services" on public.services;
drop policy if exists "Members can view services" on public.services;
create policy "Members can view services"
on public.services for select
using (public.is_organization_member(organization_id));

drop policy if exists "Managers can manage services" on public.services;
create policy "Managers can manage services"
on public.services for all
using (public.is_organization_manager(organization_id))
with check (public.is_organization_manager(organization_id));

-- ORDERS: viewers read; owner/admin/manager can change commercial status.
drop policy if exists "Members can manage orders" on public.orders;
drop policy if exists "Members can view orders" on public.orders;
create policy "Members can view orders"
on public.orders for select
using (public.is_organization_member(organization_id));

drop policy if exists "Managers can manage orders" on public.orders;
create policy "Managers can manage orders"
on public.orders for all
using (public.is_organization_manager(organization_id))
with check (public.is_organization_manager(organization_id));

drop policy if exists "Members can manage order items" on public.order_items;
drop policy if exists "Members can view order items" on public.order_items;
create policy "Members can view order items"
on public.order_items for select
using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and public.is_organization_member(o.organization_id)
  )
);

drop policy if exists "Managers can manage order items" on public.order_items;
create policy "Managers can manage order items"
on public.order_items for all
using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and public.is_organization_manager(o.organization_id)
  )
)
with check (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and public.is_organization_manager(o.organization_id)
  )
);

-- Membership changes remain owner/admin only, but an admin cannot manufacture an owner.
drop policy if exists "Admins can manage memberships" on public.organization_members;
drop policy if exists "Admins can insert memberships" on public.organization_members;
create policy "Admins can insert memberships"
on public.organization_members for insert
with check (
  public.is_organization_admin(organization_id)
  and role <> 'owner'
);

drop policy if exists "Admins can update non-owner memberships" on public.organization_members;
create policy "Admins can update non-owner memberships"
on public.organization_members for update
using (
  public.is_organization_admin(organization_id)
  and role <> 'owner'
)
with check (
  public.is_organization_admin(organization_id)
  and role <> 'owner'
);

drop policy if exists "Admins can delete non-owner memberships" on public.organization_members;
create policy "Admins can delete non-owner memberships"
on public.organization_members for delete
using (
  public.is_organization_admin(organization_id)
  and role <> 'owner'
);
