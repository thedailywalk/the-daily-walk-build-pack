# Initial Setup Plan (phased)

Build incrementally; keep the app runnable at every step. Confirm the stack with the user, then go
phase by phase. Use sample/seed data and test mode until told otherwise.

## Phase 0 — Foundations
- [ ] Init Next.js (App Router, TS) + Tailwind; add brand tokens (navy/gold/cream) and fonts.
- [ ] Add `CLAUDE.md` at repo root; commit this whole context pack.
- [ ] Set up linting/formatting, `.env.example`, basic CI (typecheck + build).
- [ ] App shell: header (THE DAILY WALK), footer, theme.

## Phase 1 — Marketing site (no backend yet)
- [ ] Recreate the homepage from `content-samples/landing-page-reference.html`:
      hero → "Two rhythms, one walk" → "What you get" → "Good news" preview → pricing →
      mission (verse) → final CTA → footer.
- [ ] Pricing page from `content-samples/pricing-page-reference.html` (monthly/annual toggle).
- [ ] About page; basic SEO + Open Graph; mobile responsive; calm sunrise hero imagery.
- [ ] Subscribe form (captures email; wire to backend in Phase 3).

## Phase 2 — Data + Auth
- [ ] Postgres + Prisma; implement the schema in `plan/DATA-MODEL.md`.
- [ ] Auth (Clerk/Supabase): sign up, log in, sessions, account page.
- [ ] Seed the Bible plan from `reading-plan/the-daily-walk-365-plan.json`.

## Phase 3 — Subscriptions (Stripe)
- [ ] Stripe products/prices: Premium (mo/yr), Patron (mo/yr); Free = default.
- [ ] Checkout + Stripe Customer Portal; webhooks to sync tier/status to the user.
- [ ] Tier gating helpers (free / premium / patron).

## Phase 4 — Email engine (the core)
- [ ] Resend + React Email templates matching the brand (newsletter + Bible-journey).
- [ ] **Daily newsletter (calendar):** compose an issue (reading, prayer, Good News, etc.); cron
      sends to all subscribers at the scheduled time; Sunday Rest & Reflect; Wednesday Pastor's Take.
- [ ] **Bible-in-a-Year drip (per-subscriber):** cron computes each Premium subscriber's current
      Day N from their start date (restart/pace aware) and sends that day's email. Idempotent; logged.
- [ ] Start options at signup: Day 1 / community pace / restart. Mark-complete + resume.
- [ ] Tests for day-index math and "don't double-send" logic.

## Phase 5 — Member portal ("My Journey")
- [ ] Dashboard: progress (Day N of 365), today's reading, continue/listen, this-week strip.
- [ ] Searchable archive; manage plan (restart/pace); manage subscription (Stripe portal).
- [ ] (Reference the member-portal concept; keep it simple first.)

## Phase 6 — Admin / authoring
- [ ] Compose & schedule daily issues; author Bible-in-a-Year day content (1–14 to start, then ahead).
- [ ] Curate Good News (3/day): title, summary, category, image, source link.
- [ ] View subscribers/tiers; basic metrics.

## Phase 7 — Launch
- [ ] Deploy to Vercel; set env vars; run migrations; seed.
- [ ] **Connect domain:** in GoDaddy DNS, point `thedailywalknewsletter.com` to Vercel
      (A/ALIAS + CNAME `www`), verify in Vercel.
- [ ] Email domain auth (SPF/DKIM/DMARC for sending domain via Resend).
- [ ] Switch Stripe to live; final QA: subscribe → receive Day 1 → next-day drip → cancel.
- [ ] Soft-launch to friends/family, then open it up.

## Guardrails
- Never hardcode secrets. Don't deploy, change DNS, send real emails, or go live on Stripe without
  explicit user confirmation. Default to test mode + seed data.
