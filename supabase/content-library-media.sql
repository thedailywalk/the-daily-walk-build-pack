-- ============================================================
-- The Daily Walk — Content Library media uploads
-- Run AFTER content-library.sql. Creates a public bucket for uploaded
-- images/audio/artwork and tracks each file's storage path on the item.
-- Uploads happen server-side with the service-role key (which bypasses
-- storage RLS); a public bucket gives stable URLs for previews + newsletters.
-- ============================================================

-- Public bucket for library media (safe to re-run).
insert into storage.buckets (id, name, public)
select 'library-media', 'library-media', true
where not exists (select 1 from storage.buckets where id = 'library-media');

-- Track the uploaded file's storage path so it can be replaced/removed.
alter table public.library_items add column if not exists media_path text;
