-- Public B2B sales inquiries captured from Maplyo marketing funnels.

create table if not exists public.sales_inquiries (
  id uuid primary key default uuid_generate_v4(),
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  property_name text,
  website_url text,
  city text,
  country_code text,
  property_type text not null default 'hotel',
  estimated_units integer,
  message text,
  source text not null default 'contact_sales',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  status text not null default 'new'
    check (status in ('new','qualified','converted','closed')),
  converted_prospect_id uuid references public.sales_prospects(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_sales_inquiries_status_created
  on public.sales_inquiries(status, created_at desc);

alter table public.sales_inquiries enable row level security;
-- No browser policies: public submissions go through the validated server endpoint.
