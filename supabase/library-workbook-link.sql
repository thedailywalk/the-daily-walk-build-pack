-- The Daily Walk — link Content Library items to the Workbook Evolution engine.
-- When something is saved to the Library it also becomes workbook inspiration:
-- we generate suggested workbook edits and stamp the item with their batch id so
-- the item can deep-link to "its" suggestions.

alter table public.library_items
  add column if not exists wb_batch_id text;
