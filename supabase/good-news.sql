-- ============================================================
-- The Daily Walk — Featured Good News (owner hand-picks)
-- Run once in Supabase → SQL Editor. Safe to re-run.
-- Holds up to 3 stories the owner has chosen to feature on the homepage.
-- Empty table = the homepage picks the day's stories automatically.
-- ============================================================

create table if not exists public.featured_good_news (
  position   integer primary key check (position between 0 and 2),
  category   text not null,
  headline   text not null,
  href       text not null,
  image      text,
  source     text not null default 'Good News Network',
  updated_at timestamptz not null default now()
);

alter table public.featured_good_news enable row level security;

-- Anyone can read the featured picks (the homepage shows them).
drop policy if exists fgn_read on public.featured_good_news;
create policy fgn_read on public.featured_good_news
  for select using (true);

-- Only the owner can change them.
drop policy if exists fgn_admin_all on public.featured_good_news;
create policy fgn_admin_all on public.featured_good_news
  for all
  using ((auth.jwt() ->> 'email') = 'thedailywalknewsletter@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'thedailywalknewsletter@gmail.com');
