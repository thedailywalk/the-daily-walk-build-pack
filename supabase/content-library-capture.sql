-- The Daily Walk — Content Library: combined-capture fields
-- Adds the fields for the unified capture form: verbatim caption + transcript,
-- the owner's rewritten "personal take / the science behind it," the sources
-- cited for that take, and a flag to mark a source as one of "Your Voices."
--
-- Run AFTER content-library.sql. Safe to run more than once.

alter table public.library_items
  add column if not exists caption       text,
  add column if not exists transcript    text,
  add column if not exists personal_take text,
  add column if not exists sources       text,
  add column if not exists is_voice      boolean not null default false;
