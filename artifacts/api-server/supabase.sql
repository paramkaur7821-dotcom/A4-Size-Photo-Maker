-- FitMyPhotoA4 — Supabase schema (run in Supabase Dashboard → SQL Editor)
-- Admin data tables. The API server (Render) reads/writes these via PostgREST.

create extension if not exists pgcrypto;

-- Single key/value document store. The server keeps the whole admin DB doc
-- here as one JSONB row (id = 1). This keeps the zero-dependency server
-- logic unchanged while persisting all admin data in Supabase Postgres.
create table if not exists public.app_kv (
  id integer primary key check (id = 1),
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Optional granular tables (future use). For now app_kv holds posts, settings,
-- activity, stats, pageOverrides, pageAliases, session/otp/rate state.

alter table public.app_kv enable row level security;

-- The Render API server authenticates with the anon/publishable key, so the
-- anon role needs full read+write on the single document row.
create policy "anon full access" on public.app_kv
  for all to anon using (true) with check (true);

create policy "service_role full access" on public.app_kv
  for all to service_role using (true) with check (true);

create or replace function public.bump_updated()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists trg_app_kv_updated on public.app_kv;
create trigger trg_app_kv_updated
  before update on public.app_kv
  for each row execute function public.bump_updated();