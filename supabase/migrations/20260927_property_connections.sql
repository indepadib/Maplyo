-- Property-level connectivity model.
-- Tuya credentials stay account-level in integrations/integration_secrets.
-- Airbnb calendars and Tuya device assignments belong to properties, not guides.

create table if not exists public.property_connections (
  property_id uuid primary key references public.properties(id) on delete cascade,

  airbnb_ical_url text,
  airbnb_status text not null default 'disconnected'
    check (airbnb_status in ('disconnected','healthy','degraded','error')),
  airbnb_last_validated_at timestamptz,
  airbnb_last_sync_at timestamptz,
  airbnb_last_error text,
  airbnb_reservation_count integer not null default 0,

  tuya_integration_id uuid references public.integrations(id) on delete set null,
  tuya_device_id text,
  tuya_device_name text,
  tuya_code_length integer not null default 6 check (tuya_code_length in (6,7)),
  tuya_assigned_at timestamptz,

  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_property_connections_tuya_integration
  on public.property_connections(tuya_integration_id)
  where tuya_integration_id is not null;

alter table public.property_connections enable row level security;

drop policy if exists "Members can manage property connections" on public.property_connections;
create policy "Members can manage property connections" on public.property_connections
for all using (
  exists (
    select 1
    from public.properties p
    where p.id = property_connections.property_id
      and public.is_organization_member(p.organization_id)
  )
)
with check (
  exists (
    select 1
    from public.properties p
    where p.id = property_connections.property_id
      and public.is_organization_member(p.organization_id)
  )
);

-- Backfill the current guide-level configuration where a guide already belongs to a property.
insert into public.property_connections (
  property_id,
  airbnb_ical_url,
  airbnb_status,
  airbnb_last_validated_at,
  airbnb_last_sync_at,
  airbnb_last_error,
  airbnb_reservation_count,
  tuya_integration_id,
  tuya_device_id,
  tuya_device_name,
  tuya_code_length,
  tuya_assigned_at,
  metadata,
  updated_at
)
select distinct on (g.property_id)
  g.property_id,
  nullif(gi.config->>'icalUrl',''),
  case
    when nullif(gi.config->>'icalUrl','') is null then 'disconnected'
    when gi.config->>'airbnbSyncStatus' in ('healthy','degraded','error') then gi.config->>'airbnbSyncStatus'
    else 'degraded'
  end,
  nullif(gi.config->>'airbnbLastValidatedAt','')::timestamptz,
  nullif(gi.config->>'airbnbLastSyncAt','')::timestamptz,
  nullif(gi.config->>'airbnbLastError',''),
  coalesce(nullif(gi.config->>'airbnbReservationCount','')::integer, 0),
  gi.integration_id,
  nullif(gi.config->>'tuyaDeviceId',''),
  nullif(gi.config->>'tuyaDeviceName',''),
  case when nullif(gi.config->>'tuyaCodeLength','')::integer = 7 then 7 else 6 end,
  nullif(gi.config->>'tuyaAssignedAt','')::timestamptz,
  jsonb_build_object('migrated_from_guide_integration_id', gi.id),
  timezone('utc'::text, now())
from public.guides g
join public.guide_integrations gi on gi.guide_id = g.id
where g.property_id is not null
order by g.property_id, gi.created_at desc
on conflict (property_id) do update set
  airbnb_ical_url = coalesce(excluded.airbnb_ical_url, property_connections.airbnb_ical_url),
  airbnb_status = case when excluded.airbnb_ical_url is not null then excluded.airbnb_status else property_connections.airbnb_status end,
  airbnb_last_validated_at = coalesce(excluded.airbnb_last_validated_at, property_connections.airbnb_last_validated_at),
  airbnb_last_sync_at = coalesce(excluded.airbnb_last_sync_at, property_connections.airbnb_last_sync_at),
  airbnb_last_error = coalesce(excluded.airbnb_last_error, property_connections.airbnb_last_error),
  airbnb_reservation_count = greatest(excluded.airbnb_reservation_count, property_connections.airbnb_reservation_count),
  tuya_integration_id = coalesce(excluded.tuya_integration_id, property_connections.tuya_integration_id),
  tuya_device_id = coalesce(excluded.tuya_device_id, property_connections.tuya_device_id),
  tuya_device_name = coalesce(excluded.tuya_device_name, property_connections.tuya_device_name),
  tuya_code_length = coalesce(excluded.tuya_code_length, property_connections.tuya_code_length),
  tuya_assigned_at = coalesce(excluded.tuya_assigned_at, property_connections.tuya_assigned_at),
  updated_at = timezone('utc'::text, now());

comment on table public.property_connections is
  'Operational connections owned by a property: one Airbnb iCal feed and one Tuya device assignment. Tuya account credentials remain account-level.';
