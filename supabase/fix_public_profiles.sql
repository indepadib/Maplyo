-- SECURITY HARDENING
-- Historical versions of Maplyo temporarily allowed public profile reads so a public
-- guide could inspect the owner's plan. That is no longer required.
--
-- Public guide visibility is enforced directly on guides.is_published.

drop policy if exists "Public can view profiles" on public.profiles;
