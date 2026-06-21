# Claude Code — Kickoff Prompt

> Copy everything in the box below and paste it as your first message to Claude Code, after you've
> put this `the-daily-walk-build-pack/` folder in the repo (and copied `CLAUDE.md` to the repo root).

---

You are helping me build **The Daily Walk**, a daily Christian devotional newsletter with a website
and backend. GoDaddy hosts my domain (`thedailywalknewsletter.com`); we build and host everything else.

Before writing any code, do this:
1. Read `CLAUDE.md`, then everything in `context/` and `plan/`, and skim the four files in
   `content-samples/` and `reading-plan/`. These define the brand, product, pricing, the two delivery
   rhythms, the data model, and the phased setup plan.
2. Give me a short summary of your understanding and the proposed architecture (stack from
   `plan/TECH-STACK.md`), and flag anything you'd change or any decision you need from me.
3. Propose a concrete Phase 0 + Phase 1 task list (foundations + marketing site) and wait for my OK
   before generating large amounts of code.

Then we'll build phase by phase following `plan/SETUP-PLAN.md`:
- Keep the app runnable at every step and commit in small, reviewable increments.
- Match the brand (navy `#1F3A5F` / gold `#C9A24B`, warm serif headings, clean sans body) and the
  designs in `content-samples/landing-page-reference.html` and `pricing-page-reference.html`.
- Treat the **two rhythms** as separate systems: the daily newsletter is calendar-based; the
  Bible-in-a-Year journey is **per-subscriber**, starting on each person's Day 1 (restart/pace aware).
  Seed the plan from `reading-plan/the-daily-walk-365-plan.json`.
- Tiers: Free $0 / Premium $9.99/mo / Patron $19.99/mo — gate features accordingly.

Rules:
- Never hardcode secrets; create `.env.example` and let me add real keys.
- Do NOT deploy, change DNS, send real emails, or use live Stripe without my explicit confirmation —
  default to test mode and seed/sample data.
- Write tests for the email scheduling / day-index logic.

Start with step 1 (read the pack) and step 2 (summary + architecture + questions). Don't build yet.

---

## After the build is working, to go live (do these with Claude Code's guidance):
1. Deploy to Vercel; set env vars; run DB migrations; seed the plan.
2. In **GoDaddy DNS**, point `thedailywalknewsletter.com` at Vercel (A/ALIAS + `www` CNAME), verify in Vercel.
3. Set up email sending domain auth (SPF/DKIM/DMARC) in Resend for your sending domain.
4. Switch Stripe to live keys; do a full end-to-end test (subscribe → Day 1 email → next-day drip → cancel).
