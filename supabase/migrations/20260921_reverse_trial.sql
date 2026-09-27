-- Reverse trial: 30 days Pro, then permanent Free with one published guide.
-- Existing profiles receive the launch trial when this migration is first applied.

alter table public.profiles
  add column if not exists trial_started_at timestamptz;

alter table public.profiles
  add column if not exists trial_ends_at timestamptz;

update public.profiles
set
  trial_started_at = coalesce(trial_started_at, timezone('utc'::text, now())),
  trial_ends_at = coalesce(trial_ends_at, timezone('utc'::text, now()) + interval '30 days')
where trial_started_at is null
   or trial_ends_at is null;

alter table public.profiles
  alter column trial_started_at set default timezone('utc'::text, now());

alter table public.profiles
  alter column trial_ends_at set default (timezone('utc'::text, now()) + interval '30 days');

comment on column public.profiles.trial_ends_at is
  'Maplyo reverse-trial expiry. After expiry, unpaid accounts fall back to the permanent Free plan.';
