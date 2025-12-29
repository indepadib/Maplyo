-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  subscription_status text default 'free', -- 'free', 'active', 'past_due'
  plan_variant text default 'demo',        -- 'demo', 'basic', 'pro'
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enables Row Level Security
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- GUIDES
create table public.guides (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  slug text unique not null,
  title text not null,
  content jsonb default '{}'::jsonb, -- Stores blocks and theme config
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enables Row Level Security
alter table public.guides enable row level security;

-- Policies for Guides
create policy "Users can view own guides" on guides for select using (auth.uid() = user_id);
create policy "Users can update own guides" on guides for update using (auth.uid() = user_id);
create policy "Users can delete own guides" on guides for delete using (auth.uid() = user_id);
create policy "Public can view published guides" on guides for select using (is_published = true);

-- Trigger to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
