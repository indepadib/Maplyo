-- Human/session-level Magic Demo view tracking.
-- Keeps email security scanners and server-side previews from becoming sales signals.

create table if not exists public.magic_demo_views (
  id uuid primary key default uuid_generate_v4(),
  magic_demo_id uuid not null references public.magic_demos(id) on delete cascade,
  session_hash text not null,
  first_viewed_at timestamptz not null default timezone('utc'::text, now()),
  last_viewed_at timestamptz not null default timezone('utc'::text, now()),
  view_count integer not null default 1,
  unique (magic_demo_id, session_hash)
);

create index if not exists idx_magic_demo_views_demo
  on public.magic_demo_views(magic_demo_id, last_viewed_at desc);

alter table public.magic_demo_views enable row level security;
-- No public table policies. Writes and internal reads are server-side only.
