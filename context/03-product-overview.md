# 03 — Product Overview: The Two Rhythms

The whole product is built on two delivery rhythms. Keep them separate in the architecture.

## Rhythm 1 — The Daily Walk newsletter (calendar-based, free)
Goes out to everyone on the calendar (same content per day). Sections:
1. **Today's Reading** — short passage + plain-English context.
2. **Make It Real** — 3–5 sentences of application ending in one honest question.
3. **A Prayer for Today** — a short, honest prayer.
4. **Pastor's Take** — Wednesdays only; a short quote/encouragement from a pastor (with attribution + link).
5. **Good News** — 3 uplifting, real, sourced stories from around the world.
6. **Walk With Us** — community invitation.
- Schedule: Daily Mon–Fri ~6:30 AM PT; **Sunday Rest & Reflect** ~7:00 AM PT; Wednesday includes Pastor's Take.

## Rhythm 2 — The Bible-in-a-Year journey (subscriber-based, Premium)
A personalized track that **starts on each subscriber's Day 1** (the day they join Premium), not on a
global calendar. Each day's email includes:
- The day's reading (from the 365-day plan)
- A **plain-English breakdown** of the passage
- **"What this shows us about God"**
- **Real-life application**
- A **reflection question** + prayer prompt
- An **audio devotional** (Premium)
- Saturdays: a **Weekend Deep-Dive** on the week's theme
- Monthly: a downloadable **study workbook**; **full searchable archive**
- Catch-up friendly: restart at Day 1 or resume where you left off, anytime.

### Start options offered at signup
- **Start from Day 1** (default).
- **Join the community pace** (jump to whatever day the group is on).
- **Restart anytime** (reset to Day 1 or resume).

## Why this matters for the build
- Subscribers have a **plan progress** record (current day index, start date, pace mode, status).
- The drip scheduler computes "today's day N" per subscriber from their start date (skip/restart aware).
- The daily newsletter is a normal scheduled broadcast; the Bible journey is a per-user drip.

See `content-samples/sample-daily-issue.html` (newsletter) and
`content-samples/premium-day1-example.html` (Bible journey Day 1) for the exact format & copy.
