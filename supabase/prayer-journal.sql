-- The Daily Walk — Prayer Journal (private, per-member)
-- Each member's own prayers. Private by design: row-level security limits every
-- row to its owner, so no one (not even other members) can read another's.
--
-- Safe to run more than once.

create extension if not exists pgcrypto;

create table if not exists public.prayer_journal (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  title      text not null default '',
  body       text not null default '',
  answered   boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prayer_journal_user_idx
  on public.prayer_journal (user_id, created_at desc);

alter table public.prayer_journal enable row level security;
drop policy if exists pj_own on public.prayer_journal;
create policy pj_own on public.prayer_journal
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
