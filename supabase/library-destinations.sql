-- The Daily Walk — Content Library routing.
-- Each item can be tagged for where it should be used (newsletter / workbook /
-- wellness), and we cache an AI-drafted "Science Behind It" angle for items
-- routed to the Wellness Guide.

alter table public.library_items
  add column if not exists destinations text[] not null default '{newsletter,workbook,wellness}',
  add column if not exists wellness_draft text;
