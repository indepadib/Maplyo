-- Critical Supabase hardening for profiles, billing state and admin stats.
-- This migration is intentionally additive/reversible at the SQL level.

-- 1) Profiles must never be publicly readable.
drop policy if exists "Public can view profiles" on public.profiles;

-- Users can still read their own profile via the existing own-profile policy.

-- 2) Billing/subscription fields are server-managed only.
-- RLS restricts rows; column privileges restrict which fields the authenticated role may mutate.
revoke update on table public.profiles from anon;
revoke update on table public.profiles from authenticated;

grant update (full_name, avatar_url) on table public.profiles to authenticated;

-- Keep the own-row RLS constraint for the safe editable columns.
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- 3) Public guide access depends only on publication state, never on private plan data.
drop policy if exists "Public can view published or paid guides" on public.guides;
drop policy if exists "Public can view published guides" on public.guides;

create policy "Public can view published guides"
on public.guides
for select
using (is_published = true);

-- 4) Admin aggregate view contains customer emails and subscription information.
-- It must not be exposed to regular authenticated users.
do $$
begin
  if to_regclass('public.admin_users_stats') is not null then
    revoke all on public.admin_users_stats from anon;
    revoke all on public.admin_users_stats from authenticated;
    grant select on public.admin_users_stats to service_role;
  end if;
end $$;
