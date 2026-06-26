-- The Daily Walk — PREMIUM (Founding Member) newsletter CMS ("Premium Prep").
-- Mirrors the free `devotionals` table: one row per calendar date, drafts are
-- private, and an issue goes live on its own date once status is 'ready'.
-- Premium delivery itself is gated to paying members in Beehiiv; this table
-- holds the issue content you write/preview/copy and the public read policy is
-- intentionally narrow (ready + on/before today) for the site's own preview.

create table if not exists public.premium_issues (
  date       date primary key,
  status     text not null default 'draft' check (status in ('draft', 'ready')),
  title      text not null default '',
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.premium_issues enable row level security;

-- Public/site read: only READY issues dated today or earlier. Drafts and future
-- issues stay hidden; the admin reads/writes them with the service-role key.
drop policy if exists premium_read_public on public.premium_issues;
create policy premium_read_public on public.premium_issues
  for select using (
    status = 'ready'
    and date <= (now() at time zone 'America/Los_Angeles')::date
  );
