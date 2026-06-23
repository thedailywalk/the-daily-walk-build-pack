-- ============================================================
-- The Daily Walk — Content Library + Inspiration Sources
-- A private research base the devotional generator pulls from.
-- Admin-only: read/written server-side with the service-role key;
-- RLS is ON with NO public policy, so subscribers can never see it.
-- ============================================================

create table if not exists public.library_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default '',
  kind        text not null default 'note',   -- content type
  body        text not null default '',        -- the note / quote / paste / thoughts
  url         text,                            -- optional link or media URL
  source      text,                            -- where it came from
  why         text,                            -- why I saved it
  topics      text[] not null default '{}',    -- topic tags
  scriptures  text[] not null default '{}',    -- scripture references
  holiday     text,
  emotion     text,
  is_original boolean not null default false,  -- "my own words, ok to use directly"
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.library_items enable row level security;
-- (intentionally no policy → only the service-role key can touch it)

create table if not exists public.inspiration_sources (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  handle     text,                              -- social handle or website
  kind       text,                              -- pastor, speaker, writer, creator, artist…
  topics     text[] not null default '{}',      -- topics they speak on
  notes      text,                              -- what I like about their tone/message
  frequency  text not null default 'occasionally', -- often | occasionally | certain topics
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.inspiration_sources enable row level security;

-- Seed the starting inspiration voices (safe to re-run).
insert into public.inspiration_sources (name, handle, kind, topics, notes, frequency)
select 'Johnny Chang', '@johnnychanglive', 'Pastor / speaker',
  array['Faith','Testimonies','Identity']::text[],
  'Ex-gangster turned pastor — clear, direct, relevant to real life.', 'often'
where not exists (select 1 from public.inspiration_sources where name = 'Johnny Chang');

insert into public.inspiration_sources (name, handle, kind, topics, notes, frequency)
select 'Pastor David Guzik', 'enduringword.com', 'Bible teacher',
  array['Bible Study','Wisdom','Faith']::text[],
  'Verse-by-verse, historical context, pastoral and clear.', 'often'
where not exists (select 1 from public.inspiration_sources where name = 'Pastor David Guzik');

insert into public.inspiration_sources (name, handle, kind, topics, notes, frequency)
select 'Tim Timberlake', '@ttimberlake', 'Pastor / speaker',
  array['Healing','Confidence','Purpose']::text[],
  'Encouraging, healing, momentum.', 'occasionally'
where not exists (select 1 from public.inspiration_sources where name = 'Tim Timberlake');

insert into public.inspiration_sources (name, handle, kind, topics, notes, frequency)
select 'Justin Owens', '@newageceo', 'Speaker / creator',
  array['Discipline','Identity','Purpose']::text[],
  'Practical, honest, faith for real life.', 'occasionally'
where not exists (select 1 from public.inspiration_sources where name = 'Justin Owens');
