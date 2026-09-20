-- Make externally sourced stays idempotent.
create unique index if not exists uq_stays_source_external_reservation
  on public.stays(source, external_reservation_id)
  where external_reservation_id is not null;
