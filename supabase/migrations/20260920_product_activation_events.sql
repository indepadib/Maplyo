-- Host/product activation funnel events.

create table if not exists public.product_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  guide_id uuid references public.guides(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_product_events_user_created
  on public.product_events(user_id, created_at desc);

create index if not exists idx_product_events_name_created
  on public.product_events(event_name, created_at desc);

alter table public.product_events enable row level security;

drop policy if exists "Users can view own product events" on public.product_events;
create policy "Users can view own product events" on public.product_events
for select using (auth.uid() = user_id);

-- Product events are written server-side after token validation.
