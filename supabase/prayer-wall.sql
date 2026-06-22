-- ============================================================
-- The Daily Walk — Prayer Wall
-- Run this once in Supabase → SQL Editor (New query → paste → Run).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE.
-- ============================================================

create table if not exists public.prayer_requests (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null,
  name        text,
  body        text not null,
  status      text not null default 'pending',  -- pending | approved | rejected
  pray_count  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists prayer_requests_status_created_idx
  on public.prayer_requests (status, created_at desc);

alter table public.prayer_requests enable row level security;

-- Anyone (including signed-out visitors) can read APPROVED prayers.
drop policy if exists pr_read_approved on public.prayer_requests;
create policy pr_read_approved on public.prayer_requests
  for select using (status = 'approved');

-- A signed-in member can submit their OWN request, and only as 'pending'.
drop policy if exists pr_insert_own on public.prayer_requests;
create policy pr_insert_own on public.prayer_requests
  for insert with check (auth.uid() = user_id and status = 'pending');

-- The owner can read every request (to moderate the queue).
drop policy if exists pr_admin_read on public.prayer_requests;
create policy pr_admin_read on public.prayer_requests
  for select using (
    (auth.jwt() ->> 'email') = 'thedailywalknewsletter@gmail.com'
  );

-- The owner can approve / hide requests.
drop policy if exists pr_admin_update on public.prayer_requests;
create policy pr_admin_update on public.prayer_requests
  for update using (
    (auth.jwt() ->> 'email') = 'thedailywalknewsletter@gmail.com'
  ) with check (true);

-- "Pray" counter: a SECURITY DEFINER function so anyone can bump the count
-- on APPROVED rows only, without being able to edit anything else.
create or replace function public.pray_for(request_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.prayer_requests
     set pray_count = pray_count + 1
   where id = request_id
     and status = 'approved';
$$;

grant execute on function public.pray_for(uuid) to anon, authenticated;
