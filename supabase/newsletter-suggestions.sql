-- Newsletter "suggested updates" queue.
--
-- As you drop content into the Content Library (routed to "newsletter"), the
-- app proposes edits to the upcoming 7 days of the FREE daily devotional and the
-- PREMIUM edition — so the newsletters keep reading fresher and more relevant to
-- today. You review each one (Approve / Dismiss), exactly like the workbook.
--
-- Idempotent: safe to run more than once.

create table if not exists public.newsletter_suggestions (
  id            uuid primary key default gen_random_uuid(),
  publication   text not null,                    -- 'free' | 'premium'
  issue_date    date not null,
  batch_id      text not null default '',
  source_label  text not null default '',
  source_type   text not null default 'library',
  target_field  text not null,
  current_text  text not null default '',
  proposed_text text not null default '',
  why_fits      text not null default '',
  impact        text not null default '',
  themes        text[] not null default '{}',
  tone          text not null default '',
  status        text not null default 'pending',  -- pending | applied | rejected
  created_at    timestamptz not null default now(),
  decided_at    timestamptz
);

create index if not exists newsletter_suggestions_status_idx
  on public.newsletter_suggestions (status);
create index if not exists newsletter_suggestions_date_idx
  on public.newsletter_suggestions (issue_date);
