-- The Daily Walk — member-dashboard Studio (Design Lab + Dashboard Builder).
-- One row (id = 1) holds the whole dashboard layout config as jsonb: module
-- order, visibility, design status (keep/refine/archived/deleted), and notes.
-- The admin Studio writes it; the live /portal reads it (server-side, service
-- role). Falls back to defaults in code when this table is absent.

create table if not exists public.dashboard_config (
  id         int primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint dashboard_config_singleton check (id = 1)
);

alter table public.dashboard_config enable row level security;
-- No public policy: only the server (service-role key) reads/writes this.
