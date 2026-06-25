-- The Daily Walk — Member Home: streak, Scripture-memory leaderboard, and the
-- encouragement (achievements) wall with reactions. All member-facing.
--
-- Privacy by design: members can only read/write their OWN check-ins and memory
-- verses (RLS). The weekly leaderboard and the wall are built SERVER-SIDE with
-- the service role, exposing only first names + counts — never anyone's private
-- prayers, notes, or email. Safe to run more than once.

create extension if not exists pgcrypto;

-- Daily "I showed up" check-ins (powers the grace-based streak).
create table if not exists public.member_checkins (
  user_id  uuid not null references auth.users(id) on delete cascade,
  day      date not null,
  primary key (user_id, day)
);

-- Verses a member is memorizing / has memorized (powers the leaderboard).
create table if not exists public.memory_verses (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  name         text not null default '',          -- denormalized first name (for the leaderboard)
  ref          text not null default '',           -- e.g. "John 3:16"
  verse_text   text not null default '',
  status       text not null default 'memorizing', -- 'memorizing' | 'memorized'
  memorized_at timestamptz,
  created_at   timestamptz not null default now()
);
create index if not exists memory_verses_user_idx on public.memory_verses (user_id);
create index if not exists memory_verses_lb_idx
  on public.memory_verses (status, memorized_at desc);

-- The encouragement wall: a milestone someone reached (others react, no comments).
create table if not exists public.achievements (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null default '',             -- denormalized first name
  kind       text not null default 'milestone',     -- 'memorized' | 'badge' | 'milestone' | 'streak'
  label      text not null default '',
  detail     text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists achievements_recent_idx on public.achievements (created_at desc);
create index if not exists achievements_user_label_idx on public.achievements (user_id, label);

-- One reaction per member per achievement (the "react & support" piece).
create table if not exists public.achievement_reactions (
  id             uuid primary key default gen_random_uuid(),
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  kind           text not null default 'amen',      -- 'amen' | 'love' | 'fire' | 'pray'
  created_at     timestamptz not null default now(),
  unique (achievement_id, user_id)
);
create index if not exists achievement_reactions_ach_idx on public.achievement_reactions (achievement_id);

-- ----------------------------- Row Level Security -----------------------------
alter table public.member_checkins        enable row level security;
alter table public.memory_verses          enable row level security;
alter table public.achievements           enable row level security;
alter table public.achievement_reactions  enable row level security;

-- Members read/write only their OWN check-ins.
drop policy if exists checkins_own on public.member_checkins;
create policy checkins_own on public.member_checkins
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Members read/write only their OWN memory verses. (Leaderboard is server-side.)
drop policy if exists memory_own on public.memory_verses;
create policy memory_own on public.memory_verses
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Any signed-in member can SEE the wall; inserts happen server-side (service role).
drop policy if exists achievements_read on public.achievements;
create policy achievements_read on public.achievements
  for select to authenticated using (true);

-- Reactions: anyone signed in can see counts; you may only add/remove your own.
drop policy if exists reactions_read on public.achievement_reactions;
create policy reactions_read on public.achievement_reactions
  for select to authenticated using (true);
drop policy if exists reactions_write on public.achievement_reactions;
create policy reactions_write on public.achievement_reactions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
