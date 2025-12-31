-- Migration to allow public read access to profiles (needed for public guide page to check plan)
-- We only need to check the plan, but RLS policies apply to the row.

-- OPTION 1: Allow public select on profiles
create policy "Public can view profiles" on profiles for select using (true);
