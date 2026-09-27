-- Secure personalized stay links.
create table if not exists public.stay_links (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  stay_id uuid not null references public.stays(id) on delete cascade,
  guide_id uuid not null references public.guides(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  last_accessed_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_stay_links_stay
  on public.stay_links(stay_id, created_at desc);

create index if not exists idx_stay_links_property
  on public.stay_links(property_id, created_at desc);

alter table public.stay_links enable row level security;

drop policy if exists "Members can view stay links" on public.stay_links;
create policy "Members can view stay links"
on public.stay_links
for select
using (public.is_organization_member(organization_id));

-- Creation/revocation is done through server routes so plaintext tokens never enter the database.
