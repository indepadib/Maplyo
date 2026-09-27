-- Server-side AI concierge usage metering / abuse protection.
create table if not exists public.ai_chat_usage (
  id uuid primary key default uuid_generate_v4(),
  context_key text not null,
  visitor_hash text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_ai_chat_usage_visitor
  on public.ai_chat_usage(visitor_hash, context_key, created_at desc);

create index if not exists idx_ai_chat_usage_context
  on public.ai_chat_usage(context_key, created_at desc);

alter table public.ai_chat_usage enable row level security;
-- No client policies: only server/service-role may read or write usage rows.
