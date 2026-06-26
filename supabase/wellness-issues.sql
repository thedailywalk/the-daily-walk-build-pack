-- The Daily Walk — THE SPIRITUAL WELLNESS GUIDE ("Wellness Guide Prep").
-- A Founding-Member bonus track sent 3×/week (Mon/Wed/Fri). Mirrors the other
-- issue tables: one row per calendar date, drafts private, goes live on its date
-- once status is 'ready'. Delivery is gated to members in Beehiiv; the public
-- read policy is narrow (ready + on/before today) for the site's own preview.

create table if not exists public.wellness_issues (
  date       date primary key,
  status     text not null default 'draft' check (status in ('draft', 'ready')),
  title      text not null default '',
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.wellness_issues enable row level security;

drop policy if exists wellness_read_public on public.wellness_issues;
create policy wellness_read_public on public.wellness_issues
  for select using (
    status = 'ready'
    and date <= (now() at time zone 'America/Los_Angeles')::date
  );
