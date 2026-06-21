# CLAUDE.md — The Daily Walk

> Read this first. Then read `context/` (what & why) and `plan/` (how). Confirm the plan with the
> user before generating large amounts of code.

## What we're building
**The Daily Walk** — a daily Christian devotional newsletter with a marketing **website**, a
**subscriber backend**, **paid subscriptions**, and an automated **email engine** that sends:
1. A **daily newsletter** to everyone (calendar-based).
2. A **personalized Bible-in-a-Year journey** to paying subscribers (starts on each person's Day 1).

- Product name: **The Daily Walk**
- Tagline: *Walking with God in real life*
- Domain (DNS at GoDaddy): **thedailywalknewsletter.com**
- Owner: Lulu Jimenez · thedailywalknewsletter@gmail.com
- Mission: help people **find and follow Jesus** in a way that feels real, practical, and welcoming
  to believers and non-believers alike.

## Recommended stack (see `plan/TECH-STACK.md` for rationale)
- **Next.js (App Router) + TypeScript + Tailwind CSS** (single repo, web + API).
- **PostgreSQL** (Neon or Supabase) + **Prisma** ORM.
- **Auth**: Clerk or Supabase Auth (email magic-link friendly).
- **Payments**: **Stripe** (subscriptions; Free / Premium $9.99 / Patron $19.99).
- **Email**: **Resend** (transactional + broadcasts) with React Email templates.
- **Scheduling**: cron (Vercel Cron or a worker) for daily send + per-subscriber drip.
- **Hosting**: Vercel (app) + managed Postgres. Point GoDaddy DNS at Vercel.
- Confirm these with the user before locking them in.

## Brand (use everywhere)
- Navy `#1F3A5F` (primary, headings), Gold `#C9A24B` / darker gold `#B8902E` (accent, buttons),
  Cream `#FAF6EE` (soft backgrounds), Ink `#22262B` (body text), White `#FFFFFF`.
- Headings: a warm serif (Instrument Serif / Playfair Display / Georgia). Body: clean sans (Inter).
- Voice: clear, direct, encouraging, no church jargon, no guilt, welcoming to everyone.
- Match the look of `content-samples/landing-page-reference.html` and `pricing-page-reference.html`.

## The two rhythms (most important architectural idea)
- **Daily newsletter = calendar-based.** Same content to everyone each morning.
- **Bible-in-a-Year = subscriber-based.** Day index = days since that subscriber started (their Day 1).
  Never tie reading to a global calendar. Support: start at Day 1, join community pace, or restart anytime.
- Seed the plan from `reading-plan/the-daily-walk-365-plan.json` (365 rows; all 1,189 Bible chapters).

## Pricing (gate features by tier)
- **Free $0** — daily devotional, prayer, 3 Good News stories, Wed Pastor's Take, Sun Rest & Reflect, community.
- **Premium $9.99/mo ($99/yr)** — the guided Bible-in-a-Year journey + audio + weekend deep-dive + workbook + archive.
- **Patron $19.99/mo ($199/yr)** — everything in Premium + community/mission perks (see `context/06-pricing-tiers.md`).
- Community access is free for every tier.

## Working rules for Claude Code
- **Plan before building.** Propose architecture + a phased TODO; get the user's OK first.
- **Secrets**: never hardcode keys. Use `.env.local`; provide a `.env.example`. The user adds real keys.
- **Don't do anything irreversible** (deploys, DNS changes, live Stripe, sending real emails) without explicit confirmation; use test mode and seed/sample data by default.
- Build incrementally and keep it runnable at every step. Write tests for the email/drip scheduling logic.
- Keep copy and theme consistent with the brand and the sample files.
- Accessibility + mobile-first. Email templates must render in major clients (use React Email / tables).

## Build order (high level — details in `plan/SETUP-PLAN.md`)
1. Repo + Next.js + Tailwind theme + brand tokens.
2. Marketing site (home, pricing, about, subscribe) from the reference HTML.
3. Data model + DB + auth.
4. Stripe subscriptions (Free/Premium/Patron) + tier gating.
5. Email engine: daily newsletter (calendar) + Bible-in-a-Year drip (per-subscriber Day N).
6. Member portal ("My Journey": progress, today's reading, archive, manage plan).
7. Admin: compose/schedule issues, manage Good News, view subscribers.
8. Deploy to Vercel; connect GoDaddy domain via DNS.
