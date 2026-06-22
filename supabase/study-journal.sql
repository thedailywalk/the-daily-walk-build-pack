-- ============================================================
-- The Daily Walk — Bible study journal (account-synced)
-- Run once in Supabase → SQL Editor. Safe to re-run.
-- Per-member notes/check-offs per day + favorite verses.
-- ============================================================

-- One row per member per day: { checked:{...}, stood, takeaway, notes }
create table if not exists public.study_notes (
  user_id    uuid not null references auth.users (id) on delete cascade,
  day        integer not null check (day between 1 and 365),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);
alter table public.study_notes enable row level security;
drop policy if exists sn_own on public.study_notes;
create policy sn_own on public.study_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Favorite verses a member saves from the study cards
create table if not exists public.study_favorites (
  user_id    uuid not null references auth.users (id) on delete cascade,
  ref        text not null,
  verse_text text not null,
  day        integer,
  created_at timestamptz not null default now(),
  primary key (user_id, ref)
);
alter table public.study_favorites enable row level security;
drop policy if exists sf_own on public.study_favorites;
create policy sf_own on public.study_favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
