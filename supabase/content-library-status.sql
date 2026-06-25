-- The Daily Walk — Content Library: "needs finalizing" flag
-- Lets an item be saved as an unfinished draft (e.g. forwarded from the Workbook
-- inspiration form) so the owner can come back and finish it later.
--
-- Run AFTER content-library.sql + content-library-capture.sql. Safe to re-run.

alter table public.library_items
  add column if not exists needs_finalization boolean not null default false;

-- Surfacing the unfinished items quickly.
create index if not exists library_items_needs_final_idx
  on public.library_items (needs_finalization)
  where needs_finalization = true;
