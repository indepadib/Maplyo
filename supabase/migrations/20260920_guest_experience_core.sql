-- Maplyo Guest Experience OS core model
-- Additive migration: existing guides remain valid and usable.

create extension if not exists "uuid-ossp";

-- ORGANIZATIONS
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique,
  billing_email text,
  country_code text,
  default_currency text not null default 'MAD',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','admin','manager','member','viewer')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  primary key (organization_id, user_id)
);

-- PROPERTIES / UNITS
create table if not exists public.properties (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  property_type text not null default 'vacation_rental'
    check (property_type in ('vacation_rental','riad','guest_house','hotel','aparthotel','serviced_apartment','hostel','resort','other')),
  status text not null default 'active' check (status in ('draft','active','paused','archived')),
  address_line1 text,
  address_line2 text,
  city text,
  region text,
  postal_code text,
  country_code text,
  latitude numeric,
  longitude numeric,
  timezone text,
  phone text,
  email text,
  website_url text,
  source_type text,
  source_url text,
  source_external_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_properties_organization on public.properties(organization_id);
create index if not exists idx_properties_source on public.properties(source_type, source_external_id);

create table if not exists public.units (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  code text,
  unit_type text,
  capacity integer,
  status text not null default 'active' check (status in ('active','inactive','maintenance')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_units_property on public.units(property_id);

-- GUESTS / STAYS
create table if not exists public.guests (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  phone text,
  preferred_language text,
  marketing_consent boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_guests_organization on public.guests(organization_id);
create index if not exists idx_guests_email on public.guests(email);

create table if not exists public.stays (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  unit_id uuid references public.units(id) on delete set null,
  primary_guest_id uuid references public.guests(id) on delete set null,
  source text not null default 'manual',
  external_reservation_id text,
  check_in_at timestamptz not null,
  check_out_at timestamptz not null,
  status text not null default 'confirmed'
    check (status in ('inquiry','confirmed','checked_in','checked_out','cancelled','no_show')),
  guest_count integer,
  reservation_value numeric(12,2),
  currency text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  check (check_out_at > check_in_at)
);

create index if not exists idx_stays_property_dates on public.stays(property_id, check_in_at, check_out_at);
create index if not exists idx_stays_external on public.stays(source, external_reservation_id);

-- SERVICES / ORDERS
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  name text not null,
  description text,
  category text not null default 'other',
  status text not null default 'active' check (status in ('draft','active','paused','archived')),
  price_amount numeric(12,2),
  currency text not null default 'MAD',
  pricing_type text not null default 'fixed' check (pricing_type in ('fixed','per_guest','per_night','quote')),
  fulfillment_type text not null default 'property' check (fulfillment_type in ('property','partner','maplyo_marketplace')),
  provider_name text,
  commission_rate numeric(6,3) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_services_property on public.services(property_id, status);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  stay_id uuid references public.stays(id) on delete set null,
  guest_id uuid references public.guests(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','paid','fulfilled','cancelled','refunded','failed')),
  subtotal_amount numeric(12,2) not null default 0,
  commission_amount numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  currency text not null default 'MAD',
  payment_provider text,
  payment_reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_orders_property_created on public.orders(property_id, created_at desc);
create index if not exists idx_orders_stay on public.orders(stay_id);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  service_id uuid references public.services(id) on delete set null,
  title text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  commission_amount numeric(12,2) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_order_items_order on public.order_items(order_id);

-- Existing guide compatibility: a guide can now belong to a property.
alter table public.guides
  add column if not exists property_id uuid references public.properties(id) on delete set null;

create index if not exists idx_guides_property on public.guides(property_id);

-- RLS
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.properties enable row level security;
alter table public.units enable row level security;
alter table public.guests enable row level security;
alter table public.stays enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create or replace function public.is_organization_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_organization_id
      and om.user_id = auth.uid()
  );
$$;

create or replace function public.is_organization_admin(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_organization_id
      and om.user_id = auth.uid()
      and om.role in ('owner','admin')
  );
$$;

drop policy if exists "Members can view organizations" on public.organizations;
create policy "Members can view organizations" on public.organizations
for select using (public.is_organization_member(id));

drop policy if exists "Users can create organizations" on public.organizations;
create policy "Users can create organizations" on public.organizations
for insert with check (auth.uid() = created_by);

drop policy if exists "Admins can update organizations" on public.organizations;
create policy "Admins can update organizations" on public.organizations
for update using (public.is_organization_admin(id));

drop policy if exists "Members can view memberships" on public.organization_members;
create policy "Members can view memberships" on public.organization_members
for select using (public.is_organization_member(organization_id));

drop policy if exists "Users can create own first membership" on public.organization_members;
create policy "Users can create own first membership" on public.organization_members
for insert with check (
  user_id = auth.uid()
  and (
    public.is_organization_admin(organization_id)
    or exists (
      select 1 from public.organizations o
      where o.id = organization_id and o.created_by = auth.uid()
    )
  )
);

drop policy if exists "Admins can manage memberships" on public.organization_members;
create policy "Admins can manage memberships" on public.organization_members
for all using (public.is_organization_admin(organization_id))
with check (public.is_organization_admin(organization_id));

drop policy if exists "Members can manage properties" on public.properties;
create policy "Members can manage properties" on public.properties
for all using (public.is_organization_member(organization_id))
with check (public.is_organization_member(organization_id));

drop policy if exists "Members can manage units" on public.units;
create policy "Members can manage units" on public.units
for all using (
  exists (
    select 1 from public.properties p
    where p.id = units.property_id
      and public.is_organization_member(p.organization_id)
  )
)
with check (
  exists (
    select 1 from public.properties p
    where p.id = units.property_id
      and public.is_organization_member(p.organization_id)
  )
);

drop policy if exists "Members can manage guests" on public.guests;
create policy "Members can manage guests" on public.guests
for all using (public.is_organization_member(organization_id))
with check (public.is_organization_member(organization_id));

drop policy if exists "Members can manage stays" on public.stays;
create policy "Members can manage stays" on public.stays
for all using (public.is_organization_member(organization_id))
with check (public.is_organization_member(organization_id));

drop policy if exists "Members can manage services" on public.services;
create policy "Members can manage services" on public.services
for all using (public.is_organization_member(organization_id))
with check (public.is_organization_member(organization_id));

drop policy if exists "Members can manage orders" on public.orders;
create policy "Members can manage orders" on public.orders
for all using (public.is_organization_member(organization_id))
with check (public.is_organization_member(organization_id));

drop policy if exists "Members can manage order items" on public.order_items;
create policy "Members can manage order items" on public.order_items
for all using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and public.is_organization_member(o.organization_id)
  )
)
with check (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and public.is_organization_member(o.organization_id)
  )
);
