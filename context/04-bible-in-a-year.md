# 04 — The Bible-in-a-Year Plan

## Philosophy: start with Jesus
Most "Bible in a year" plans drop people into Genesis and lose them by February. The Daily Walk
flips it — **start with who Jesus is, then what it means, then how it's lived out**, and only then
walk through the Old Testament with context. Reading order:

1. **Foundation (meet Jesus):** John → Romans → Mark → Acts
2. **The rest of the New Testament:** Matthew, Luke, the letters, Revelation
3. **The Old Testament story:** Genesis → Malachi
4. **Woven through every day:** a Psalm or a Proverb (be honest with God; everyday wisdom)

This mirrors Johnny Chang's beginner advice: *meet Jesus (John 20:31), understand grace (Romans 5:8),
be real with God (Psalm 34:18), get wisdom (Proverbs), see it lived out (Acts).*

## The data (seed file)
- `reading-plan/the-daily-walk-365-plan.json` and `.csv` — **365 days**, covering **all 1,189 chapters
  of the Bible exactly once** (verified: no gaps, no duplicates).
- Each row has: `day`, `week`, `week_theme` (weekly focus), `main` (that day's main reading),
  `companion` (a Psalm/Proverb or a reflection prompt), `prompt` (a "Make It Real" question).
- First ~2 weeks are intentionally lighter (ease-in). No calendar dates — it's Day 1…Day 365.

## How it should behave in the app
- A subscriber's **Day N** = (days since their start date), adjusted for any restarts / pace mode.
- Never tie a reading to a global date. Missing a day costs nothing; they resume at the next unread day.
- Provide: mark-day-complete, restart at Day 1, switch pace, and a progress view (Day N of 365).
- The daily Bible email is generated from the plan row for that subscriber's current day, wrapped in
  the Premium template (breakdown / what-this-shows-about-God / application / question / prayer / audio).

## Content authoring note
The plan provides the *readings and prompts*. The richer per-day devotional copy (breakdown, etc.)
is written by the team over time; build the system so each day's content can be authored/edited and
stored (don't hardcode it). Ship with Day 1–14 authored as examples; author ahead of the earliest subscriber.
