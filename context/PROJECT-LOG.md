# PROJECT-LOG — Decisions, State & "Why"

> **Purpose.** This is the project's shared memory across machines and sessions. Claude Code chat
> history does **not** sync between a local session and a remote (cloud) session — but this file does,
> because it lives in the repo. Capture decisions here so any session on any computer can pick up
> exactly where the last one left off.
>
> **How to use it.**
> - When a session makes a real decision (architecture, naming, a tradeoff, a "we tried X, it didn't
>   work, so we did Y"), add a dated entry under **Decision Log**.
> - Keep the **Current State** section at the top up to date — it's the first thing the next session reads.
> - Commit + push after updating, so it's available everywhere.
> - In a new session you can say: *"Read context/PROJECT-LOG.md before we start."*

---

## Current State (keep this current — read me first)

- **Last updated:** _YYYY-MM-DD by <session/machine>_
- **Active branch:** `claude/gallant-rubin-wbqejh`
- **Deployed at:** _e.g. thedailywalknewsletter.com (Vercel) — note if portal is login-gated_
- **What works right now:**
  - _e.g. Marketing site (home, pricing, about, subscribe)_
  - _e.g. Member portal `/portal` — streak strip, First Step badge, Scripture Memory leaderboard + encouragement wall_
  - _..._
- **What's in progress / half-done:**
  - _e.g. Workbook walkthrough — needs SQL run + review-queue UI_
- **Known issues / gotchas:**
  - _e.g. Some pages need a hard refresh (Cmd+Shift+R) after deploy_
  - _e.g. Certain features need their Supabase tables created via SQL before they work_

---

## Environment & Secrets (what's needed, not the values)

> Never put real keys here. List **what** env vars exist and where the real values live.

| Variable | Purpose | Where the real value lives |
|----------|---------|----------------------------|
| _e.g. DATABASE_URL_ | _Postgres / Supabase connection_ | _Vercel env / .env.local_ |
| _e.g. STRIPE_SECRET_KEY_ | _Payments_ | _Vercel env_ |
| _e.g. RESEND_API_KEY_ | _Email_ | _Vercel env_ |
| _..._ | | |

- **DB / SQL:** _Which tables must exist? Where's the SQL kept (e.g. `supabase/`)? What still needs running?_
- **Cron / scheduling:** _What runs, when, and where it's configured (e.g. `vercel.json`)._

---

## Architecture Notes (the "why", not just the "what")

- **The two rhythms:** Daily newsletter = calendar-based (same to everyone). Bible-in-a-Year = per-subscriber Day N (starts on their Day 1). _Note anything about how this is implemented._
- **Tier gating:** _How Free / Premium / Patron are enforced in code._
- **Key directories:**
  - `src/app/portal` — _member home_
  - `src/app/admin` — _admin studio_
  - `src/app/api` — _..._
  - `supabase/` — _SQL / schema_
  - `reading-plan/` — _365-day plan seed_
- _Add other load-bearing decisions a new session would otherwise have to rediscover._

---

## Decision Log (newest at top)

> One entry per real decision. Format: date — what we decided — why — anything it affects.

### YYYY-MM-DD — <short title>
- **Decided:** _..._
- **Why:** _..._
- **Affects / follow-ups:** _..._

### 2026-06-25 — Adopted PROJECT-LOG.md as cross-session memory
- **Decided:** Capture decisions and current state in this repo file instead of relying on chat history.
- **Why:** Local Claude Code sessions don't sync their conversation to remote/cloud sessions; the repo does. This keeps desktop + laptop + remote sessions in sync.
- **Affects / follow-ups:** Update this file when decisions are made; read it at the start of new sessions.

---

## Open Questions / TODO

- [ ] _e.g. Run the SQL for streak/leaderboard/wall tables and confirm "Success. No rows returned"_
- [ ] _e.g. Workbook walkthrough — review queue UI + sample transcript_
- [ ] _..._
