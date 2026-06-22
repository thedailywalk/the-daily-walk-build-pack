-- The Daily Walk — daily devotional CMS ("Devotional Prep").
-- One row per calendar date. Drafts are private; a devotional goes "live" on its
-- own date automatically once its status is 'ready' (the reader page queries by
-- today's date, so no scheduled job is needed to publish it).

create table if not exists public.devotionals (
  date       date primary key,
  status     text not null default 'draft' check (status in ('draft', 'ready')),
  title      text not null default '',
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.devotionals enable row level security;

-- Anyone (even logged-out) may read a READY devotional dated today or earlier.
-- Drafts and future-dated issues stay hidden from the public; the admin reads/
-- writes them server-side with the service-role key (bypasses RLS).
drop policy if exists dev_read_public on public.devotionals;
create policy dev_read_public on public.devotionals
  for select using (
    status = 'ready'
    and date <= (now() at time zone 'America/Los_Angeles')::date
  );
