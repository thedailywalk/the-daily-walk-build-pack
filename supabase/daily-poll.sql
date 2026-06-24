-- The Daily Walk — Question of the Day votes
-- Anonymous tally of how members answered each day's reflection poll. We store
-- only the date and the chosen option index (no who-voted-what), so the card can
-- show "here's how the community answered."
--
-- Safe to run more than once.

create table if not exists public.poll_votes (
  id         uuid primary key default gen_random_uuid(),
  poll_date  date not null,
  choice     int not null,
  created_at timestamptz not null default now()
);

create index if not exists poll_votes_date_idx on public.poll_votes (poll_date);

-- RLS on, no public policy: writes/reads go through the verified server only.
alter table public.poll_votes enable row level security;
