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

## Pricing (three tiers — updated model)
- **Free $0** — the devotional **3× a week (Mon·Wed·Fri)**: devotional, prayer, 3 Good News stories, Wed Pastor's Take, community.
- **Founding Member $5.99/mo ($59/yr)** — **everything, one membership**: the devotional every day + guided Bible-in-a-Year (from your Day 1) + **The Deeper Walk** (premium) + **The Spiritual Wellness Guide** + audio + Weekend Study + monthly workbook + full archive + all perks. Founding price locked in for life.
- **Founding Partner $19.99/mo ($199/yr)** — a **pay-it-forward supporter tier**: everything in Founding Member, plus it keeps a licensed Christian counselor free for everyone, sponsors free access for readers who can't pay, funds pastors/perspectives from hard-to-reach places, and comes with live Givebutter transparency. (The old $9.99 Premium tier stays retired; Founding Partner reuses the Beehiiv "patron" upgrade mapping.)
- Community access is free for every tier.
- Free newsletter cadence is Mon/Wed/Fri (`isFreeDay` in `newsletterSchedule.ts`).

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
