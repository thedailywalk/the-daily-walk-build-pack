-- The Daily Walk — Weekly Featured Video
-- One faith-based video featured each week inside the premium "Daily Wonders" tab.
-- Candidates are inspected against YouTube's official Data API (embeddable flag,
-- license, privacy, channel) so the admin can see what is genuinely safe to use.
--
-- Safe to run more than once.

create extension if not exists pgcrypto;

create table if not exists public.weekly_videos (
  id             uuid primary key default gen_random_uuid(),
  week_start     date not null,                 -- the Monday this entry is for
  provider       text not null default 'youtube',
  video_id       text not null,
  title          text not null default '',
  channel_title  text not null default '',
  channel_id     text not null default '',
  thumbnail_url  text not null default '',
  description    text not null default '',
  published_at   timestamptz,
  duration       text not null default '',
  embeddable     boolean not null default false,
  license        text not null default '',      -- 'youtube' | 'creativeCommon'
  privacy_status text not null default '',       -- 'public' | 'unlisted' | 'private'
  topics         text[] not null default '{}',
  scriptures     text[] not null default '{}',
  summary        text not null default '',
  intro          text not null default '',       -- devotional-style public intro
  theme          text not null default '',
  brand_fit      text not null default '',
  safety_status  text not null default 'review', -- 'safe' | 'review' | 'unsafe'
  safety_notes   text not null default '',
  is_selected    boolean not null default false,
  created_at     timestamptz not null default now()
);

create index if not exists weekly_videos_week_idx
  on public.weekly_videos (week_start desc);

-- Exactly one selected (featured) video per week.
create unique index if not exists weekly_videos_one_selected_per_week
  on public.weekly_videos (week_start) where is_selected;

-- No duplicate candidates of the same video within the same week.
create unique index if not exists weekly_videos_unique_per_week
  on public.weekly_videos (week_start, provider, video_id);

-- RLS on, NO public policy: service-role (verified-admin) access only,
-- matching the Content Library tables. The public page reads it server-side.
alter table public.weekly_videos enable row level security;
