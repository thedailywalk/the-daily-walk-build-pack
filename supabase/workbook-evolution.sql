-- The Daily Walk — Workbook Evolution System
-- Turns the 365-day study library into a "living workbook": each study day
-- carries a status (draft / under review / approved / locked) and can hold
-- approved overrides. New inspiration (reel/sermon transcripts, notes) is
-- analyzed and lands in a review queue as suggested, targeted updates — only
-- where there's a real thematic fit, and never on a LOCKED day.
--
-- Both tables are admin-only (service-role). Safe to run more than once.

create extension if not exists pgcrypto;

-- One row per study day that has been touched. Days with no row are treated as
-- 'draft' with no overrides (the auto-generated content shows as-is).
create table if not exists public.workbook_days (
  day_index   int primary key check (day_index between 1 and 365),
  status      text not null default 'draft',  -- 'draft' | 'review' | 'approved' | 'locked'
  overrides   jsonb not null default '{}',    -- { field: "approved revised text", ... }
  notes       text not null default '',
  locked_at   timestamptz,
  updated_at  timestamptz not null default now()
);

-- The review queue. One row = one suggested, targeted update to one study day.
create table if not exists public.workbook_suggestions (
  id             uuid primary key default gen_random_uuid(),
  day_index      int not null check (day_index between 1 and 365),
  batch_id       uuid not null,                 -- groups all suggestions from one submission
  source_label   text not null default '',      -- e.g. "Johnny Chang reel — anxiety"
  source_type    text not null default 'transcript', -- reel | sermon | transcript | note | newsletter | other
  source_link    text not null default '',      -- optional reference link (not auto-fetched)
  source_excerpt text not null default '',       -- the submitted inspiration text
  themes         text[] not null default '{}',   -- detected themes shared with the day
  tone           text not null default '',       -- detected teaching tone/style
  techniques     text[] not null default '{}',   -- storytelling / humor / etc. cues
  target_field   text not null default 'realLife', -- which study-day field it strengthens
  why_fits       text not null default '',
  proposed_text  text not null default '',       -- the full revised field value (existing + woven-in enhancement)
  impact         text not null default '',
  status         text not null default 'pending', -- 'pending' | 'applied' | 'rejected'
  created_at     timestamptz not null default now(),
  decided_at     timestamptz
);

create index if not exists workbook_suggestions_day_idx
  on public.workbook_suggestions (day_index);
create index if not exists workbook_suggestions_status_idx
  on public.workbook_suggestions (status, created_at desc);
create index if not exists workbook_suggestions_batch_idx
  on public.workbook_suggestions (batch_id);

-- RLS on, NO public policy: service-role (verified-admin) access only, matching
-- the Content Library / Weekly Video tables.
alter table public.workbook_days enable row level security;
alter table public.workbook_suggestions enable row level security;
