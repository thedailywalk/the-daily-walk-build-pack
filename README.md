# The Daily Walk — Build Pack

This folder is the complete context for building **The Daily Walk** — a daily Christian
devotional newsletter with a website and backend — using **Claude Code**.
GoDaddy hosts the domain (`thedailywalknewsletter.com`); everything else you build and host yourself.

## How to use this pack
1. Put this whole folder at the root of a new, empty git repo (or copy `CLAUDE.md` to the repo root).
2. Open the repo in **Claude Code**.
3. Paste the kickoff prompt from `plan/CLAUDE-CODE-KICKOFF-PROMPT.md`.
4. Claude Code will read `CLAUDE.md` automatically and the `context/` + `plan/` files as directed.

## What's inside
- **`CLAUDE.md`** — master project brief Claude Code reads first (brand, product, rules).
- **`context/`** — the "what we're building and why" (vision, brand, product, newsletter, Bible plan, pricing, good news, community).
- **`plan/`** — the "how to build it" (setup plan, tech stack, data model, kickoff prompt).
- **`content-samples/`** — real HTML mockups to match the look/feel & content:
  - `landing-page-reference.html` — the homepage design to recreate
  - `pricing-page-reference.html` — the pricing page design
  - `sample-daily-issue.html` — a full daily newsletter email
  - `premium-day1-example.html` — a Premium Bible-in-a-Year "Day 1" email
- **`reading-plan/`** — the full 365-day Bible-in-a-Year plan as **JSON and CSV** (seed data).

## The one-paragraph summary
The Daily Walk runs on **two rhythms**: (1) a free **daily newsletter** (devotional, prayer,
3 "Good News" stories, Wednesday Pastor's Take, Sunday Rest & Reflect) sent on the calendar to
everyone, and (2) a **Bible-in-a-Year journey** (paid) that is *personalized* — it starts on each
subscriber's own Day 1 and walks them through Scripture starting with Jesus. Tiers: **Free $0**,
**Premium $9.99/mo**, **Patron $19.99/mo**. Brand is navy + gold, warm and welcoming, built to help
people find and follow Jesus.
