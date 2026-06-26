# PROJECT-LOG — The Daily Walk: Decisions, State & "Why"

> **Purpose.** This is the project's shared memory across machines and sessions. Claude Code chat
> history does **not** sync between a local (desktop) session and a remote (cloud) session — but this
> file does, because it lives in the repo. Read it at the start of a session to pick up exactly where
> things left off.
>
> **How to maintain it.** When a session makes a real decision or ships a feature, update the relevant
> section and add a dated entry to the **Decision Log**. Commit + push so it's available everywhere.
>
> **Source.** Built from the full desktop build transcript (project inception → 2026-06-25, the
> member-home gamification ship). If something here conflicts with `CLAUDE.md`, this file reflects the
> *later* live decision (e.g. pricing changed from the original spec — see below).

---

## Current State (read me first)

- **Last updated:** 2026-06-25 — folded in the full desktop transcript.
- **Active branch:** `claude/gallant-rubin-wbqejh`
- **Live:** deployed on Vercel at **thedailywalknewsletter.com** (+ `www` + `the-daily-walk-build-pack.vercel.app`), GitHub-connected, DB connected, daily auto-publish running.
- **Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · React 19 · Tailwind v4 (`src/app/globals.css`) · Supabase (Postgres + Auth + Storage) · Beehiiv (email list) · Resend SMTP (auth emails) · Vercel (hosting + cron) · Vitest.
- **Owner:** Lulu Jimenez (non-technical) · thedailywalknewsletter@gmail.com · domain DNS at GoDaddy. Owner email is comped to **Patron** via `COMP_PATRON_EMAILS`.

### The product in one breath
A daily Christian devotional with a marketing site, member portal, paid tiers, and a content engine, built on **two rhythms**:
1. **Daily newsletter = calendar-based** — same issue to everyone each morning (free).
2. **Bible-in-a-Year = per-subscriber** — personalized 365-day study starting on *each person's own Day 1* (restart/pace aware; Premium).

### Pricing (NOTE: differs from CLAUDE.md; pricing is HIDDEN live behind a flag until Stripe is set up)
- **Free $0** — daily devotional, prayer, community/prayer wall (read + react).
- **Premium $5.99/mo ($59/yr)** — Bible-in-a-Year + study tools + portal extras. *(Was $9.99 in original spec; owner changed to $5.99.)*
- **Patron $19.99/mo ($199/yr)** — Premium + sponsor-a-membership, Ask a Pastor, quarterly mini-studies, impact updates, early access, topic votes, Testimony Wall, mission support.

### Brand
Navy `#1F3A5F` (headings) · Gold `#C9A24B` / `#B8902E` (accents/buttons) · Cream `#FAF6EE` (soft bg) · Ink `#22262B` (body). Headings = Playfair Display (warm serif); body = Inter. Signature = sunrise hero (navy sky → gold horizon). Voice: clear, honest, no church jargon, no guilt.

---

## Member Portal — LOCKED style anchors (do not lose these)

> Owner (Lulu) is choosing a portal redesign via mockups at `/designs/portal`. She named these as **fixed anchors** — keep them; only minor adjustments unless she asks for a redesign. Overall style she wants everywhere: **soft, faith-based, elevated, warm, interactive, peaceful, meaningful**; dark "Inner Circle" base + constellation; **faith-rooted, NOT astrological**; **not too girly/feminine** (men should feel at home). Gentle animations, never overwhelming (reduced-motion safe).

- **Hero** (Constellation style): dark navy, gold kicker date, serif "Good afternoon, Lulu.", subtitle "The sun is up and so is your faithfulness…", faint twinkling stars + soft glow. Refine/polish, keep the feel.
- **Star-Path journey** woven INTO the hero block (not separate) — Day 1→365 with Day-47 glowing "you are here"; "walking the year with God one glowing star at a time."
- **Time-of-day sky**: hero subtly shifts morning/noon/night (elegant "wow", classy).
- **Streak relocated** from a plain chip to either an animated **dove carrying it** (ribbon/badge) OR the **North Star** (guidance/faithfulness, subtle cross-glint — faith not astrology). Dove stays animated.
- **Daily Devotional card** — KEEP layout/size/shape as-is: dark rounded card, "Today's Devotional" + time tag, gold scripture ref kicker, serif title, body, solid gold "Read … walk →" button. Minor polish only; do NOT overhaul.
- **Encouragement Wall** — KEEP the style (dark card, colored initial avatars, quoted note, reaction chips), make it **compact**, add **subtle** animation (gentle float/glow/fade-in).
- Secondary/compact: weekly chart + slim Inner-Circle leaderboard (avatar rings + faith stat chips) + badges row (incl. locked secret).
- **Mockups** (static, public, scoped CSS, no real data) live under `/designs/portal/*`. Front-runners: `ic2-northstar`, `ic2-dove`, `ic2-path`, `ic2-daylight`, `ic2-sanctuary`. Once she picks (or mixes), rebuild the REAL `/portal` in that style wired to live data.
- **Process rule:** end every design change with a refreshed "locked elements" list for her.

## What's built and live

**Public site:** `/` (sunrise hero + capture, two-rhythms cards, tier cards, "Why read the Bible?" navy band, "Arm yourself" tips, prayer-wall preview, mission band) · `/pricing` ("Subscriptions on the way" coming-soon, pricing hidden) · `/about` · `/subscribe` (→ Beehiiv) · `/devotional` (public reader, auto-publishes daily) · `/devotional/rss.xml` (full inline-styled feed for Beehiiv RSS-to-Send) · SEO/sitemap/robots, mobile hamburger nav · `/designs/*` (early alternates — remove before wide promotion).

**Auth:** magic 8-digit OTP **or** email+password (code as fallback/forgot-password). `/login`, `/auth/callback`, `/auth/signout`. Session-aware header.

**Member portal** (`/portal`, gated, warm aesthetic, day/night toggle):
- `/portal` — dashboard: "Good morning" hero, grace-based **streak strip**, **badges** (Consistency + Spiritual-practices), **weekly Scripture-Memory leaderboard** (first names, Monday reset), **Encouragement Wall** (milestones + Faith-set reactions 🙏❤️🔥🕊️, no comments), **Question of the Day** poll, **Bible Parallels** card, Today's Walk, Continue-where-you-left-off.
- `/portal/guide` — **Pathlight** Bible assistant (Anthropic API when keyed, else Scripture-grounded fallback; guardrails, crisis → 988).
- `/portal/memory` — Scripture Memory (add verses → leaderboard + badge).
- `/portal/prayer` — private Prayer Journal.
- `/portal/archive` (+ `/[date]`) — member archive of past devotionals + weekly videos.
- `/journey` — **Bible-in-a-Year Study Guide** (tabs: Today's Reading, My Progress, Reading Plan, Saved Notes, Favorite Verses, Workbook); check-off cards + cheers, auto-saving notes, Key Word cards, favoritable healing Verse cards, Day N of 365, restart, jump-to-book.
- `/wonders` — **Daily Wonders**: Word of the Day (Hebrew/Greek), This Day in His Story (church history), Wonder of His Creation (sunrise design), Watch of the Week (weekly video).
- `/account` — tier badge, billing, set password, admin links.
- Member **Workbook PDFs** — 12 monthly downloadable PDFs (`/api/workbook/[month]`, gated, `@react-pdf/renderer`).

**Bible-in-a-Year content:** ALL **365 days fully authored** (original voice). Arc: John 1–21 → Romans 22–37 → Psalms 38–87 → Proverbs 88–118 → Acts 119–146 → whole-Bible 147–365. 12 study fields/day + Key Word + healing Verse cards (public-domain WEB text). Protected by a regression test.

**Admin "content command center"** (`/admin`, owner/`ADMIN_EMAILS`-gated, light teal/mint theme):
- `/admin/devotionals` — **Devotional Prep** CMS (auto-drafts per date, edit/preview/approve, archive, Copy-email-HTML, "Behind the Devotional" refs, "How Healing Works" neuroscience field).
- `/admin/library` — **Content Library** (tabbed: Library / Add new / Your Voices; smart auto-fill, media uploads, transcript/personal-take/sources fields, 21-topic coverage dashboard).
- `/admin/inspiration` — redirects into Library "Your Voices".
- `/admin/weekly-video` — Weekly Video studio (auto-fill verified picks, YouTube Data API Safe/Review/Unsafe verdicts, schedule to Monday, auto-hidden-video alert).
- `/admin/good-news` — Good News curator (public Good News currently retired via flag).
- `/admin/prayers` — Prayer Wall moderation queue.
- `/admin/workbook` (+ `/submit`, `/[day]`) — **Workbook Evolution System** (paste inspiration → theme-matched suggested study-day revisions → Update Review → Draft/Under Review/Approved/Locked).
  - **Day editor live preview** (added 2026-06-25): `/admin/workbook/[day]` shows the full study page as readers see it, with each pending suggestion rendered inline as a **tracked-changes diff** (struck "before" + highlighted "after") and **Accept change / Dismiss** in context. Word-diff engine: `src/lib/textDiff.ts`; preview component: `src/components/WorkbookDayPreview.tsx`.
  - **Forward to Content Library** (added 2026-06-25): the `/admin/workbook/submit` form has an "Also save to my Content Library" checkbox (default on) → creates a `library_items` row marked `needs_finalization=true`, auto-tagged with detected themes, so research entered once feeds both the workbook and the newsletter. Library shows a "drafts to finish" banner + `?final=1` filter + per-card badge; the edit form has a "still a draft" toggle to finalize.

**Prayer Wall** (`/prayer-wall`) — public read + 🙏; Premium/Patron-only posting; owner approval queue.

**Other files:** `DEPLOY.md`, `DAILY-SEND-CHECKLIST.md`, `content-samples/influencer-outreach-template.md`, `content-samples/devotional-email-template.html`, Desktop xlsx cost tracker (~$18/mo).

---

## In progress / half-done / known issues

1. **Workbook Evolution walkthrough — #1 standing TODO.** Code/routes built & deployed, but `supabase/workbook-evolution.sql` (`workbook_days` + `workbook_suggestions`) **has NOT been run** → `/admin/workbook` shows a "connect Supabase" placeholder. After running it, owner wants a live demo (paste sample transcript → see review queue). Assistant agreed to keep reminding each session.
2. **Email auto-send NOT live.** Devotionals auto-write/publish + serve RSS, but the *email* still needs a **manual ~2-min Beehiiv send** (Copy email HTML → new post → HTML Snippet → hide title/byline via eye icons → send). Full automation = Beehiiv **RSS-to-Send** on a **paid plan** (confirm which tier; owner is on free "Launch", had a Max trial).
3. **Member-home gamification** just shipped — verify streak/badges/leaderboard/wall render live (and that `community.sql` ran; it errored once on a truncated paste, then was re-run — **explicit "Success" not confirmed in transcript**).
4. **Beehiiv adds its own title/byline** per email (no global toggle — hide per-post with eye icons). Decorative email footer has a placeholder unsubscribe link → trim before public (Beehiiv adds the compliant one).
5. **CAN-SPAM physical address** not yet set in Beehiiv footer (owner has a USPS PO Box, renews 2026-09-30) — required before emailing real subscribers.
6. **Operational friction:** owner often forgets to **Push origin** (changes sit committed locally) and to **redeploy** after adding Vercel env vars; CSS needs **hard refresh** (Cmd+Shift+R); dev hits stale Turbopack cache → `rm -rf .next` + restart.

---

## Architecture & key decisions (with WHY)

- **Pivot 1 — "Beehiiv for everything" → hybrid.** Beehiiv handles list/sending/payments, but can't do on-site sign-in or per-user progress → added **Supabase auth + DB** for the portal and Bible-in-a-Year progress. Beehiiv stays source of truth for "who paid" (queried by email via API).
- **Pivot 2 — website became system of record for devotionals.** Drafted/edited/approved/archived in admin, stored in Supabase; Beehiiv is just delivery. Path: site auto-writes → auto-publishes → RSS feed → Beehiiv RSS-to-Send (when paid). WHY: owner keeps content, members re-read past issues, avoids Enterprise-only Send API.
- **Data access pattern:** service-role client (`createServiceClient`, bypasses RLS) for admin writes behind `requireAdmin()`; user-context RLS client (`auth.uid() = user_id`) for member data. Everything **degrades gracefully** (DB reads in try/catch → empty) so pages render before tables/keys exist.
- **Dates:** anchored to **America/Los_Angeles**. Deterministic day-of-year rotation for Word/History/Wonder; Monday math for weekly video.
- **Integrations:** Beehiiv (signup + entitlement) · Resend SMTP (auth emails, sending domain `auth.thedailywalknewsletter.com`, DKIM/SPF via GoDaddy) · YouTube Data API v3 (verify `embeddable`/`license`/`privacyStatus`; trusted channels: BibleProject, Spoken Gospel, Johnny Chang, David Guzik/Enduring Word, Celebration Church/Tim Timberlake — note `@ttimberlake` was wrong; Justin Owens `@newageceo` ≈ empty, use for Instagram) · Anthropic API (optional, Pathlight + workbook suggestions, both have fallbacks) · RSS/Good News Network (headline + link + credit only).

**"Tried X → switched to Y":**
- 6-digit OTP → **8-digit** (Supabase generates 8).
- Magic-link → **code** (Gmail scanners pre-expire links).
- `<style>` email → **fully inline styles** (Beehiiv strips `<style>`).
- Good News real photos → removed (licensing risk) → SVG tiles → public Good News **retired** (replaced by Weekly Video + Word/History/Wonder).
- Amplified Bible backend → **deferred** (needs Lockman license even backend-only).
- Instagram auto-scrape → **manual paste-in** (no legal API).
- Pure ranked leaderboard → **memory leaderboard + encouragement wall** (grace, not competition).
- Admin near-black theme → **light dashboard**.

**Legal posture (owner is careful):** all devotional/study content original; public verse text **public-domain WEB/KJV only**; embed videos, never re-host; credit ≠ license; fact-check research (esp. the neuroscience "How Healing Works" blurb). Creator inspiration used for tone/themes only, never copied.

---

## Environment & secrets (names only — never put values here)

`.env.local` (local) + Vercel (prod; set BEFORE build since `NEXT_PUBLIC_*` are inlined; redeploy after adding):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public/safe.
- `SUPABASE_SERVICE_ROLE_KEY` 🔒 — admin saves, portal, auto-publish (`sb_secret_…`).
- `BEEHIIV_API_KEY` 🔒, `BEEHIIV_PUBLICATION_ID` (`pub_5f190d2d-b861-4c08-a421-9e30af531e41`).
- `NEXT_PUBLIC_BEEHIIV_*` — hosted archive/manage/upgrade URLs (optional).
- `APP_URL` = `https://thedailywalknewsletter.com`.
- `YOUTUBE_API_KEY` 🔒 · `CRON_SECRET` 🔒 · `ANTHROPIC_API_KEY` 🔒 (optional) · `ADMIN_EMAILS` · `COMP_PATRON_EMAILS`.
- (Resend API key lives in Supabase SMTP settings, not app env.)

**Rule:** never accept secrets in chat — owner pastes them into `.env.local`/Vercel. Assistant does not log into accounts, make purchases, send live emails, or run SQL itself; it provides copy-paste SQL + the Supabase link.

---

## Database / SQL

SQL files in `supabase/`: `prayer-wall.sql`, `good-news.sql`, `study-journal.sql`, `devotionals.sql`, `content-library.sql`, `content-library-media.sql`, `content-library-capture.sql`, `weekly-video.sql`, `daily-poll.sql`, `prayer-journal.sql`, `community.sql`, `workbook-evolution.sql`, `premium-issues.sql` *(run for the premium newsletter)*, `wellness-issues.sql` *(run for the Spiritual Wellness Guide)*, `dashboard-lab.sql` *(run for the Design Studio layout config)*, `library-workbook-link.sql` *(adds `library_items.wb_batch_id`)*, `library-destinations.sql` *(NEW — adds `destinations` + `wellness_draft`)*.

- **Run/confirmed:** `plan_progress`, `prayer_requests`, `featured_good_news`, `study_notes`+`study_favorites`, `devotionals`, `library_items`+`inspiration_sources`+media bucket+capture columns, `weekly_videos`, `poll_votes`, `prayer_journal`, `community.sql` (member_checkins/memory_verses/achievements/achievement_reactions).
- ~~**STILL NEEDS RUNNING:** `supabase/workbook-evolution.sql`~~ → **RUN 2026-06-25** ("Success. No rows returned"). Workbook Evolution tables (`workbook_days`, `workbook_suggestions`) now live; review queue active.
- **STILL NEEDS RUNNING:** `supabase/content-library-status.sql` (adds `needs_finalization` column to `library_items`) — required for the Workbook→Content Library forwarding + "drafts to finish" view. Until run, forwarded items won't save.

**SQL handoff format (owner preference):** Supabase SQL editor `https://supabase.com/dashboard/project/makaxugtawmuibdkbjju/sql/new` → New query → paste one clean block → Run → "destructive operation" warning is expected/safe → success = "Success. No rows returned." Project ref: **makaxugtawmuibdkbjju**.

---

## Deployment

- **GitHub:** `the-daily-walk-build-pack` under `thedailywalk`. Desktop pushes via **GitHub Desktop** (CLI has no cached creds): assistant commits → owner clicks **Push origin** → Vercel rebuilds (~1–2 min). *(Remote/cloud sessions push directly once the Claude GitHub App has write access — granted 2026-06-25.)*
- **Vercel:** Hobby plan, linked to `main`, auto-deploy on push. Env vars before build; redeploy after adding.
- **Domain:** GoDaddy → Vercel. A `@` → `76.76.21.21`; CNAME `www` → `cname.vercel-dns.com`. Apex + www live.
- **Crons (`vercel.json`, ≤5/day on Hobby, Bearer-protected by `CRON_SECRET`):** prepare-devotionals (daily auto-publish), refresh-good-news (midnight PT), stage-weekly-video (Mondays), recheck-weekly-video (daily, auto-hides pulled videos).
- **Before emailing real subscribers:** SPF/DKIM/DMARC for Beehiiv sending domain in GoDaddy + physical address (PO Box) in Beehiiv footer.

---

## Open TODO (priority order)

1. **Run `workbook-evolution.sql`** → Workbook Evolution walkthrough demo (standing reminder).
2. **Beehiiv plan / email automation** — confirm paid tier for RSS-to-Send, point at `/devotional/rss.xml` for hands-off email. Until then, manual daily send (checklist exists).
3. **Payments** — Stripe → Beehiiv, create Premium ($5.99) / Patron ($19.99), flip `PRICING_ENABLED`, wire checkout.
4. **Verify member-home** (streak/badges/leaderboard/wall) renders live + `community.sql` confirmed.
5. **Pre-public cleanup:** Beehiiv physical address; trim email footer; remove `/designs/*`; hide Beehiiv title/byline.
6. **Deferred/optional:** admin poll studio; wrap My Journey / Daily Wonders in portal shell; example "How Healing Works" blurbs; Spanish (Phase 2); Amplified Bible (if Lockman license); YouTube-caption auto-transcript; smarter Content Library AI; more trusted video channels; creator outreach (esp. Justin Owens on Instagram).

---

## Glossary

- **The two rhythms** — daily calendar newsletter vs per-subscriber Bible-in-a-Year (personal Day 1).
- **My Journey / Study Guide** (`/journey`) — gated tabbed 365-day interactive study.
- **Pathlight** — branded Bible assistant in the portal (guardrails; Psalm 119:105).
- **Daily Wonders** (`/wonders`) — Word of the Day, This Day in His Story, Wonder of His Creation, Watch of the Week.
- **Wonder of His Creation** — creation/science awe pointing to God (sunrise design; redesigned away from a starfield "astrology" look).
- **Watch of the Week** — one verified embeddable faith video, updated Mondays.
- **Encouragement Wall** — member-home milestone feed with reactions (no comments).
- **Scripture Memory / weekly leaderboard** — log memorized verses; ranked weekly, grace-framed.
- **Streak** — grace-based daily "showed up" counter.
- **Badges** — Consistency (First Step 👣, Faithful Week, Steadfast, Hundredfold, One-Year Walk) + Spiritual practices (Hidden in My Heart 💛, Word-Filled, First Prayer, Prayer Warrior, Treasured Word).
- **Devotional Prep** (`/admin/devotionals`) — daily-issue CMS (auto-drafts, archive, Copy-email-HTML, "Behind the Devotional").
- **How Healing Works** — neuroscience devotional section anchored by Romans 12:2; fact-checked, neuroscience-grounded only.
- **Content Library** (`/admin/library`) — tagged store of inspiration (notes, transcripts, "My Personal Take · The Science Behind It," sources, media) + coverage dashboard.
- **Your Voices / Inspiration Sources** — creators the system draws tone from (in Library "Your Voices").
- **Workbook Evolution System** (`/admin/workbook`) — paste inspiration → theme-matched study-day revisions with review + Draft/Under Review/Approved/Locked workflow. **Workbook walkthrough** = the pending demo (run SQL first).
- **Workbook (PDF)** — 12 downloadable monthly study-guide PDFs for paid members.
- **Bible Parallels** — member culture card connecting relatable archetypes to Scripture (original art).
- **Question of the Day** — daily faith reflection poll on the dashboard.
- **Comp / Patron allowlist** (`COMP_PATRON_EMAILS`) — owner email auto-granted Patron for testing.

---

## Decision Log (newest at top)

### 2026-06-26 — Library: auto-title + destination routing (Newsletter / Workbook / Wellness)
- **Auto-title:** if Title is left blank, the Library now generates one from chosen topics ("Notes on …") or the first line. Title field relabeled "leave blank and we'll name it."
- **Destinations:** the old single "Type" dropdown is now **Format** (kept), plus a new **"Use this for"** checkbox group — **📰 Newsletter / 📖 Workbook / 🕊 Wellness Guide** — all checked by default ("all 3"). Stored as `library_items.destinations text[]`. Cards show destination tags; the save routes by what's checked.
- **Routing on save:** workbook feed only runs if "workbook" is checked; if "wellness" is checked, an AI **"Science Behind It" draft** is generated from the inspiration (inspiration-only, never verbatim) and cached on the item (`wellness_draft`). `src/lib/wellnessAnalysis.ts` (`draftWellnessScience`, AI + heuristic).
- **Wellness pulls from the Library:** the Wellness Guide editor (`/admin/wellness`) shows a **"Science inspiration from your Library"** panel (wellness-tagged items + their drafts) to pull from for The Science Behind It. `listWellnessInspiration()` in library.ts.
- **Owner must run** `supabase/library-destinations.sql` (adds `destinations` + `wellness_draft`).
- **Status:** TSC/build green, committed + merged to `main`.

### 2026-06-26 — Content Library is now the single inbox; auto-feeds the Workbook Evolution engine
- **Owner decision:** retire the standalone Workbook "+ Add inspiration" page; the **Content Library is the one place** to add inspiration/transcripts/notes. Every saved item becomes BOTH newsletter inspiration AND workbook inspiration.
- **Auto-feed:** `saveLibraryItemAction` now runs `analyzeInspiration` on each saved item (skips "Your Voices") → inserts suggested workbook edits as a batch → stamps the item with `wb_batch_id`. New `feedWorkbook()` helper; `upsertLibraryItem` now returns the id; added `setLibraryItemBatch`.
- **Deep link:** each Library card shows "📖 See suggested workbook edits from this →" → `/admin/workbook#batch-<id>` (batch blocks now have `id`/scroll-margin). Saved-flash also links to the new suggestions.
- **Retired the tab:** sidebar workbook child → "Add inspiration (Library)" (points to Library Add); workbook dashboard CTA + empty-state link point to the Library; `/admin/workbook/submit` now redirects to `/admin/library?tab=add`.
- **Quality upgrade (inspiration-only, whole-day):** rewrote the AI prompt in `workbookAnalysis.ts` — never verbatim; organic/personal/warm/Scripture-grounded/practical/relatable; and it can now elevate the **whole day** (1–4 fields: reflection, prayer, application, examples, side reflection, step, plain-English) when the inspiration shifts tone/direction, not just add a paragraph. AI now returns `days[].edits[]` (multi-field) → multiple suggestion cards per day in the batch.
- **Owner must run** `supabase/library-workbook-link.sql` (adds `library_items.wb_batch_id`). Deeper, more personal suggestions require `ANTHROPIC_API_KEY` set (otherwise the heuristic fallback is used).
- **Status:** TSC/build green, committed + merged to `main`.

### 2026-06-26 — Live dashboard matched to ic2-northstar composition (2-col grid)
- Owner: make the live member dashboard the ic2-northstar design. The live `/portal` already used the ic2 *styling* (dark, north star, journey, time-of-day, chips, Inner Circle); now its *layout* matches too: `.m-modules` is a 2-column grid, and **Today's Devotional | Encouragement Wall** pair side-by-side (the signature ic2 composition), with the Inner Circle + rest below. Default module order reordered to lead with today + wall; module labels renamed (Today's Devotional, Encouragement Wall, The Inner Circle).
- The **Studio mock** reflects these same sections (canvas labels/mocks updated via the registry), so reordering/editing in `/admin/studio` mirrors the real dash.
- **Note:** if a saved Studio config exists from earlier dragging, the old order persists — click **Reset layout** in the Studio to get the new ic2 default.
- **Status:** TSC/build green, committed + merged to `main`. (Members access it live at /portal after login.)

### 2026-06-26 — Dash → ic2 (Inner Circle surfaced) + Studio rebuilt as a VISUAL canvas
- **Dash:** surfaced the **Inner Circle** leaderboards (was collapsed in "Iron sharpens iron") as an always-visible section to match ic2-northstar. Confirmed base = ic2-northstar.
- **Studio rebuilt (owner request):** `/admin/studio` is now a **visual mock of the real dashboard** (`StudioCanvas.tsx`, client). Owner can **drag sections to reorder** (saves order to live portal), and **click or right-click any section** to open an inspector to (a) write what to change, (b) **paste an inspiration image URL** (preview shown), (c) set status (Keep/Refine/Archive/Delete), (d) show/hide. Persists via `saveOrderAction`/`saveModuleMetaAction`; config extended with per-module `inspoUrl`. Each section renders a small mock resembling the real one.
- **Honest scope:** image inspiration is via URL paste (file-upload to storage = next phase); reorder is real drag-and-drop. Per-component version history/compare still a future phase.
- **Owner must run** `supabase/dashboard-lab.sql` (done) for persistence.
- **Status:** TSC/build green, committed + merged to `main`.

### 2026-06-26 — A+B+C: hero polish + Design Studio (Lab + Builder), config-driven portal
- **A · hero polish:** added the ic2 signature touches to the live `/portal` hero — Day/Walk-Score/streak **chips** and the **time-of-day sky indicator** (morning/noon/night swatches, shifts with arrival time).
- **B+C · Design Studio** (`/admin/studio`, admin-only, new sidebar "Design Studio" item): one workspace that is both the **Design Lab** (per-module status Keep/Refine/Archive/Delete + notes) and the **Dashboard Builder** (reorder ↑↓, show/hide). Writes a shared config the **live portal reads**.
- **Config layer:** `src/lib/dashboardConfig.ts` (module registry of the 6 movable dashboard modules: today, continue, pace, accountability, wall, more; order + per-module status/visible/notes; graceful defaults). `supabase/dashboard-lab.sql` — new `dashboard_config` singleton jsonb table (**owner must run it** to persist; previews/edits work without it but won't save).
- **Live portal is now config-driven:** the 6 modules are wrapped in `.m-mod` and ordered via CSS `order` + hidden via `display:none` from `modStyle()` — so the Studio rearranges/hides the real dashboard with no layout surgery. Hero stays fixed (core).
- **Honest scope:** phase one delivers reorder/show-hide/status/notes live. Per-component *versions + side-by-side compare* and *true drag-and-drop* are the proposed next phases (noted in the Studio footer).
- **Status:** TSC/build green, committed + merged to `main`.

### 2026-06-26 — BASE LOCKED: ic2-northstar is the member-dashboard design direction
- After reviewing 5 fresh full-dashboard concepts (`/designs/dashboard/*`: Observatory, Club, Command Deck, Trailhead, Atrium), owner chose **`/designs/portal/ic2-northstar`** as the base ("keep this one for now"). The live `/portal` is already built on that language (dark night default: north-star streak, journey star-path, starfield, glass cards, gold nav pills). Sidebar brand tag → "Inner Circle" to match.
- The 5 concept pages stay under `/designs/dashboard` as an idea bank to pull from while polishing.
- **Next step (owner's described workflow):** a **Design Lab** to refine each dashboard component piece-by-piece (Keep / Refine / Archive / Delete, notes, versions, Approve → master) + a drag-and-drop **Dashboard Builder**. Build in phases on top of the ic2 base.

### 2026-06-26 — Retired the /wonders page entirely; re-pointed all references
- Deleted `src/app/wonders/page.tsx` (Daily Wonders content now lives on the dashboard: Word of the Day + This Day in His Story + Wonder of His Creation, plus the weekly video embed).
- Re-pointed references: removed the "✦ Daily Wonders" tab link in `/journey`; weekly-video `revalidatePath("/wonders")` → `"/portal"` (admin actions ×3 + recheck cron); admin dashboard Weekly Video card sub → "Members' dashboard"; flags.ts comment updated. No live `/wonders` references remain. (Unused `.wondersec/.word-card/.hist-card` CSS left in place — harmless.)
- **Status:** clean build + TSC green, committed + merged to `main`.

### 2026-06-26 — Portal re-skinned to the Inner Circle (dark) look as the DEFAULT
- Owner wants the portal's main vibe to be the `ic2-northstar` dark inner-circle look — elevated, masculine-but-classy, tech-forward, Duolingo-clean, subtle animations — while keeping every feature (weekly video on dash, sidebar nav, top greeting, memory flashcard, rotating subtitle).
- **Approach (low-risk, leverages existing infra):** the portal already had a `night` theme + Day/Night toggle. Made **night the DEFAULT** (`portal/layout.tsx` data-theme="night"; `ThemeToggle` default state "night") and **elevated the night theme** into the inner-circle aesthetic: deep navy radial-gradient page bg (fixed), glassy translucent surfaces w/ backdrop-blur + soft elevation, gold-tinted hairlines, gold section labels, solid gold "inner circle" active-nav pills, ic2 hero gradient + brighter starfield. Day toggle still gives the clean light look.
- **Dark-surface patches** for spots that assumed a light/navy bg under the overloaded `--m-navy` var: `.m-word-side`, `.m-weekly-thumb/.arc-vid-thumb/.m-weekly-embed`, `.m-flash-card/.m-flash-add/.m-flash-chip/.m-flash-input`, `.m-walkscore`.
- Confirmed prior fixes are in code (admin weekly-video copy = "on the members' dashboard"; Daily Wonders removed from sidebar) — owner's screenshots were pre-redeploy cache.
- **Status:** built, TSC/build green, committed + merged to `main`.

### 2026-06-26 — Removed "Daily Wonders" from portal nav; Word of the Day moved into the dashboard
- Owner: remove the **Daily Wonders** portal entry since the content now lives on the dashboard. Removed it from `MemberSidebar.tsx` (nav) and the dashboard Quick-access grid + the "Open Daily Wonders →" button.
- To avoid losing content, **moved Word of the Day onto the dashboard** ("A little more wonder today" now shows Word of the Day + This Day in His Story + Wonder of His Creation). `getWordOfTheDay()` in `portal/page.tsx`; new `.m-word*` styles (navy term panel + reflection).
- The `/wonders` page file is left intact (still reachable directly, e.g. weekly-video health), just unlinked from the member portal.
- **Status:** built, TSC/build green, committed + merged to `main`.

### 2026-06-26 — Admin "Newsletters" hub: all editions in one place (List / Calendar / One of each)
- **Built `/admin/newsletters`** (admin-only) — a unified ops view of every edition across all publications, modeled on the TradeAlgo "Signal" admin the owner shared. Three tabs:
  - **List** — every edition in a ~10-week window (newest first), Date · Type · Tier · Status, filter by publication, edition count, Preview + Edit links.
  - **Calendar** — month grid (prev/next/this-month) with each edition as a clickable chip (color-coded per publication, F/P tier marker), today highlighted.
  - **One of each** — renders a live example of every newsletter inline (Free daily, Premium weekday, Premium Thursday w/ World, Premium Saturday w/ Weekend Study, Wellness Guide). Answers "generate an example of each."
  - **Preview mode** (`?preview=<pub>&date=`) renders the actual email HTML (saved data if present, else generated) with an "Edit this edition →" link.
- **Schedule source:** `src/lib/newsletterSchedule.ts` — `editionsForRange()` merges the three issue tables + generation: Free daily (every day), Premium daily (every day; +World Thu, +Weekend Study Sat), Wellness (Mon/Wed/Fri). Status = ready/draft (saved) or "generated".
- **Sidebar:** new **Newsletters** item (layers icon) at the top with List/Calendar/One-of-each children.
- **Note:** no "Subscribers" tab — subscribers live in **Beehiiv** (the site only reads entitlement by email), so that view would need the Beehiiv API. Flagged to owner.
- **Status:** built, TSC/build green, committed + merged to `main`.

### 2026-06-26 — Portal dashboard elevated (inner-circle feel, kept light) + memory flashcard + weekly video on dash
- **Hero elevated** (`/portal`): combined the live portal with the `ic2-northstar` design while staying LIGHT (cream, not dark). Added a gold **North Star streak cluster** (glowing star w/ streak number + dove), a **journey star-path** strip (Day 1→365 with a live "you are here" marker at the member's %), a faint gold **starfield**, and refined shadows. Kept all existing info (avatar, date, greeting, "Walking since", tier badge, Walk Score). Reduced-motion safe.
- **Rotating welcome line**: the hero subtitle now rotates daily (10 calming lines, picked by day-of-year) — `dailySub()` in `portal/page.tsx`. The "Take a breath…" line is #1 in the rotation.
- **Memory flashcard** (`MemoryFlashcard.tsx`, client): replaces the old "＋ Memorize a verse" link. Tap **＋ Memorize** → popular-verse suggestion chips (`src/lib/popularVerses.ts`, 12 WEB/public-domain verses) + a custom ref/text field. Selecting/adding shows a **tap-to-flip flashcard** (reference ↔ full verse) right in the hero. **One verse at a time** — `setSingleMemoryVerse()` in community.ts clears any other in-progress verse first. "Change verse" clears it. Actions `setDashVerseAction`/`clearDashVerseAction` in `portal/memory/actions.ts` (reuses the existing `memory_verses` table — no new SQL).
- **Weekly video → main dash**: the "This week's video" card now **embeds the player inline** (youtube-nocookie iframe when embeddable) instead of linking to Daily Wonders. Admin Weekly Video description updated ("on the members' dashboard," no longer "Daily Wonders tab").
- **Status:** built, TSC/build green, committed + merged to `main`.

### 2026-06-26 — Admin polish: sidebar flyout closes on nav + workbook orphan-review cleanup
- **Sidebar flyout** (`AdminSidebar.tsx`): after clicking a sub-link the link kept focus, so the hover flyout lingered over the page via `:focus-within`. Added a `useEffect` on pathname/qs change that blurs the active element if it's inside `.aside-flyout`/`.aside-parent`. Flyout now closes once you're on the page.
- **Workbook "Study days in motion"**: days stuck at "Under Review" with no pending suggestions + no overrides (orphans from before the dismiss→reset logic) now auto-heal. New `resetOrphanReviewDays()` in `workbookEvolution.ts`, called at the top of `/admin/workbook` render; reverts those days to Draft so they leave the list and the counts. Dismissing a suggestion already reverts its day via `maybeResetDay`.

### 2026-06-26 — Premium restructured into two products: Discipleship Newsletter + Spiritual Wellness Guide
- **Owner product decision (final):** keep Premium *clear, not overwhelming*. **Premium = the Discipleship Newsletter** (main paid offer); **The Spiritual Wellness Guide** = a Founding-Member **bonus, 3×/week (Mon/Wed/Fri)** that can later become its own paid add-on.
- **Premium · The Deeper Walk (`/admin/premium`, table `premium_issues`):** Main Premium Devotional (daily, deeper than free) + **The World Through God's Lens** (Thursdays — moved back from daily; 2–3 events, What Happened / How We See It Through Faith / How We Can Pray + "Light Still Breaking Through" uplifting close) + **The Weekend Study** (Saturdays) + **Inside the Circle** (live therapist + guest pastors). Science was REMOVED from here.
- **Spiritual Wellness Guide (`/admin/wellness`, NEW table `wellness_issues`):** sent Mon/Wed/Fri. Segments: **The Science Behind It** (faith+neuroscience), **The Peace Practice** (60-sec reset: Release/Receive/Respond), **The Pattern Breaker** (old→new→note), **The Prayer Lab** (Start/Name/Surrender/Ask/Listen), **A Question Worth Sitting With**. Sage-green masthead to feel distinct/restful. Rotating content libraries in `wellness.ts` (7 science angles, 3 peace, 5 patterns, 5 prayer-lab situations, 6 questions).
- **Files:** new `src/lib/wellness.ts` + `wellnessHtml.ts`, `src/app/admin/wellness/{page.tsx,actions.ts}`, `supabase/wellness-issues.sql`, `/designs/wellness-sample`. Rewrote `premium.ts`/`premiumHtml.ts`/premium admin for the devotional structure. Sidebar adds **Wellness Guide** (leaf icon). `/designs/premium-sample` now 3 days (regular / Thu / Sat). Pricing reworded: Premium = Discipleship Newsletter + 1 yr Wellness Guide free; added the "premium promise" lead; free devotional upsell block updated.
- **Positioning copy (owner's words):** "Founding Members receive the Premium Discipleship Newsletter plus one full year of The Spiritual Wellness Guide included free." Premium promise: "for the reader who wants to go deeper — not just read a devotional, but learn how to live it…"
- **Owner action:** run **`supabase/wellness-issues.sql`** (premium-issues.sql still needed too). **Live note:** the World section auto-generates a calm *template with example headlines* — no live news feed wired; swap in real stories before sending (owner previously open to a real news-source add-on later).
- **Status:** built, TSC/build green, committed + merged to `main`.

### 2026-06-26 — "The World Today" reshaped: DAILY, 3 events through God's lens (+ uplifting close)
- *(superseded same day — World moved back to Thursdays under "The World Through God's Lens"; see entry above.)*
- **Changed by owner request:** the premium world segment is no longer a weekly "The World This Week" (Thursdays). It's now **daily**, called **"The World Today"** (editable; subtitle *through God's lens*).
- **Structure (per day, 3 stories):** each story has **What Happened** → **How to See It Through Faith** → **How We Can Pray**. Then a smaller uplifting close, **"Light Still Breaking Through"** (editable name; options offered: Signs of Hope / Grace in the Headlines / Where We Still See God Moving / Good News Worth Noticing) with 2–3 positive items.
- **Heart/tone (locked):** informed without overwhelmed; aware without fear leading; care deeply without carrying what only God can carry; compassion + wisdom + prayer, never dramatic/partisan/sensational. Points back to a sovereign, near, still-moving God.
- **Files:** `premium.ts` (new `PremiumData` world fields: `worldHeading/worldIntro/world{1,2,3}{What,Faith,Pray}/brightHeading/brightBody`; `fullPremiumFor` generates a calm template daily with example headlines to swap out), `premiumHtml.ts` (story cards + navy prayer chips + cream "bright" box), `admin/premium/page.tsx` (`WorldStory` editor blocks ×3 + uplifting field; week-ahead taglines now show World daily), `designs/premium-sample` (2 samples now). Old `worldBody/worldPrayer` removed.
- **Status:** built, TSC/build green, committed + merged to `main` (live).

### 2026-06-26 — Premium Prep workspace + sample issues (the actual premium newsletter)
- **Built:** a full **Premium (Founding Member) newsletter** prep workspace at `/admin/premium`, mirroring the free Devotional Prep exactly (week-ahead cards → open & edit → live preview → mark **Ready** → it publishes on its date → Archive → **Copy email HTML**). New sidebar items: **Daily · Free** (was "Devotionals") and **Premium ★**.
- **Premium segments (auto-generated complete on every date):** **The Science Behind It** (daily, neuroscience-grounded, rotates through 7 brain-research angles each paired with Scripture + a "Try this today" practice), **The World This Week** (Thursdays — faith-lens world items, never partisan, + a prayer), **The Weekend Study** (Saturdays — deeper study seeded from the study library: context, key word, study verse, reflection), plus a recurring **Inside the Circle** live-sessions block (guest pastor + licensed Christian therapist). Founder's note at top; gratitude closing.
- **Files:** `src/lib/premium.ts` (model + DB + `fullPremiumFor(date)` generation), `src/lib/premiumHtml.ts` (`renderPremiumHtml` — distinct gold "★ Founding Member / The Deeper Walk" masthead, email-safe inline styles), `src/app/admin/premium/{page.tsx,actions.ts}`, sidebar `star` icon, `.adm-tier-pill`/`.adm-day-tagline` CSS.
- **Shareable sample (no login):** `/designs/premium-sample` renders 3 sample issues (Fri daily-only, Thu = World This Week, Sat = Weekend Study). Under `/designs` so it's viewable while the site is hidden.
- **DB:** new table — **owner must run `supabase/premium-issues.sql`** (same shape/RLS as `devotionals`). Until then the workspace still previews/edits every issue (generated), it just won't persist saves.
- **Status:** committed + merged to `main` (live). Premium *delivery* is still gated to paying members in Beehiiv (see prior entry: connect Stripe, create the $5.99/$59 tier, send the checkout URL to wire `NEXT_PUBLIC_BEEHIIV_PREMIUM_URL`).

### 2026-06-25 — Pre-launch "coming soon" gate (site hidden from public)
- **Built:** `src/middleware.ts` shows a branded "coming soon" splash to the public while the site is hidden. **Unlock:** visit `/unlock?key=founding` (sets a year-long `tdw_preview` cookie) → see the real site. Key is `process.env.PREVIEW_KEY` (default `founding`).
- **Stays reachable while hidden:** `/designs/*` (shareable popup/portal drafts), `/api/*`, `/auth/*`, `/admin`, `/portal`, `/account`, `/login`, the RSS feed `/devotional/rss.xml`, robots/sitemap/static.
- **To take the site fully public:** set env `SITE_PUBLIC=true` (or remove the gate) and redeploy.
- **Why:** owner wants the site private (just her) until ready, but still wants to share the `/designs` popup samples with a friend.


### 2026-06-25 — Welcome "Join free" modal on landing
- **Built:** `JoinModal` (client) shown shortly after landing on public pages — tailored to the newsletter (brand header, "free every morning" eyebrow, headline, a Psalm 118:24 verse panel, the reusable `SignupForm`, 3 benefit bullets, "Free forever · No spam" footer, subtle Founding-Member link). Reuses `/api/subscribe` (Beehiiv). Remembers dismissal in localStorage (re-shows after 3 days); excluded on /admin, /portal, /login, /subscribe, /auth, /designs; Esc/backdrop/X to close; reduced-motion safe. Mounted in root `layout.tsx`; styles `.jm-*` in globals.css.
- **Why:** capture signups immediately (modeled on a popup the owner liked), tailored to The Daily Walk's calm/faith tone.

### 2026-06-25 — Newsletter monetization funnel built (Free + Premium $5.99 Founding Member)
- **Decided & built:** the website funnel to launch paid newsletters while the platform is in build. `/pricing` (when `PRICING_ENABLED` is false) now shows a **Founding Member offer** instead of "coming soon": Free vs Premium ($5.99/mo or $59/yr), the three premium segments (**The Science Behind It** daily, **The World This Week** Thu, **The Weekend Study** Sat), the **"grandfathered into the full platform"** promise, and a "platform coming soon" panel. Subscribe page teaser updated to founding language. Header has an always-visible gold **Premium** link. The devotional **email HTML** (`devotionalHtml.ts`, used for "Copy email HTML" + RSS) now ends with a **Founding-Member upgrade block**.
- **Premium CTA wiring:** the "Become a Founding Member" button uses `site.beehiiv.upgradePremiumUrl` (env `NEXT_PUBLIC_BEEHIIV_PREMIUM_URL`). Until that env is set it gracefully falls back to "Join free — be first in line." **Owner action:** in Beehiiv, move to the plan that allows paid subscriptions, connect Stripe, create Premium $5.99/mo (+ $59/yr), then set `NEXT_PUBLIC_BEEHIIV_PREMIUM_URL` to the Beehiiv premium-upgrade/checkout URL and redeploy.
- **Why:** start revenue in ~2 days without waiting on the full platform; founding/grandfather framing drives urgency.
- **Affects:** `pricing/page.tsx`, `subscribe/page.tsx`, `devotionalHtml.ts`, `Header.tsx`, `globals.css`. Pricing stays gated by `PRICING_ENABLED` (still false) so the full 3-tier Stripe page stays off; the founding offer shows in its place.

### 2026-06-25 — Condensed "focused & calm" dashboard + badge redesign with secret badges
- **Decided:** (1) Condensed `/portal` to lead with Today's devotional → Continue journey → Community, with the streak merged as a slim line into the hero, and momentum/badges/Question-of-Day/Bible-Parallels/Wonder/Quick-access tucked into one collapsible **"A little more for today"** `<details>`. (2) Redesigned badges into six families — Showing up, The Word, Prayer, Community, Milestones, and **Hidden blessings (secret)**. Secret badges (Quiet Comeback, Hidden Gem, Well-Rounded Walk) never appear in the "next up" preview — only revealed when earned, with a "✨ hidden" accent.
- **Why:** Lulu chose "Focused & calm" + essentials = devotional/continue/community, and said yes to surprise badges.
- **New stats/lib:** `currentStreak`, `reactionsGiven`, `sharesPosted` added to `BadgeStats`; `reactionsGivenCount` + `sharesPostedCount` in community.ts; `BADGE_GROUP_LABEL` + `secret` on Badge. Updated `refreshBadges` (memory/actions) to feed the new stats.
- **Also this turn (already live):** Daily Wonders button removed from account card; `delatorre.ucla@gmail.com` comped as Patron test member; in-portal **My Settings** tab; portal is the post-login landing page; `content-library-status.sql` was run by Lulu (library-forwarding drafts now save).
- **Affects:** `portal/page.tsx`, `community.ts`, `memory/actions.ts`, `globals.css`.

### 2026-06-25 — Portal dashboard is now the post-login landing + big "Walk together" upgrade
- **Decided:** (1) After sign-in, members land on `/portal` (not `/account`) — login page + `auth/callback` default changed. Root cause of "I don't see the portal": it existed but sign-in dropped users on `/account` and there was no nav link (now "My Journey"). (2) Added to the `/portal` dashboard: **Walk Score** (transparent engagement number + level, in the hero) with a profile strip (avatar initial, "walking since", tier); **weekly momentum chart** (this vs last week — days walked + verses); **"Where everyone's at"** community-pace card (your day vs community avg + walking-together count + invite link); an optional collapsible **"Iron sharpens iron"** accountability board (longest-streak leaders + verses-this-week leaders); and a **share-to-wall** box so members can post praises (kind `share`).
- **Why:** Lulu's design choices — Walk Score up top, dual leaderboard (showing-up + where-everyone's-at), grace-first + optional friendly ranked, all four add-ons. Goal: feel like sitting 1:1 with Jesus, welcoming + motivating on login.
- **New lib:** `walkScore`, `streakLeaderboard`, `communityPace`, `weeklyActivity`, `shareToWall` (community.ts); `shareToWallAction` (memory/actions.ts). **Badges:** Lulu chose "redesign together" — NOT built yet; pending a design pass.
- **Affects:** `portal/page.tsx`, `community.ts`, `memory/actions.ts`, `login/page.tsx`, `auth/callback/route.ts`, `globals.css`.

### 2026-06-25 — Admin/portal polish batch
- **Decided:** (1) Restyled **The Living Workbook** (`/admin/workbook` dashboard + submit + day editor) to the warm cream/navy/gold Content-Library look via a `wb-warm` class that remaps `--a-*` theme vars (library page untouched). (2) Dismissing a suggestion now reverts an empty day to **Draft** so it leaves "Study days in motion" (`maybeResetDay` in workbookEvolution.ts). (3) The public **header stays visible inside `/admin`** (hidden only on `/portal`); footer hidden on both; added a **"My Journey" → `/portal`** link for signed-in users (this is how to reach the member portal — there was no link before). (4) Added **This Day in His Story** + **Wonder of His Creation** cards to the `/portal` dashboard (reusing `getHistoryMoment`/`getWonderOfTheDay`).
- **Why:** Lulu's requests — consistent warm admin look, no stale day clutter, always-reachable nav/portal, and more "wonder" on the member home. Root cause of "I can't see the portal": no nav link existed.
- **Affects:** `HideOnAdmin.tsx`, root `layout.tsx`, `Header.tsx`, `workbookEvolution.ts` (rejectSuggestion), portal `page.tsx`, workbook `page/submit/[day]`, `globals.css`.

### 2026-06-25 — Warmed the ENTIRE admin to the cream/navy/gold theme
- **Decided:** Per Lulu, re-skinned all of admin (not just the workbook) to the Content-Library warm look by swapping the active `.admin-shell` theme variables from teal/slate to cream/navy/gold, and sweeping hardcoded teal/blue tint washes (active states, dashboard hero gradient) to gold/navy in `globals.css`.
- **Why:** "Tie the entire admin to this similar type" — one cohesive warm aesthetic across Devotional Prep, Content Library, Weekly Video, Good News, Prayers, Workbook, and the dashboard.
- **Affects:** `globals.css` admin theme block (~line 6530) + tint sweep. The per-page `wb-warm` class is now redundant but harmless. Admin accent = gold (`#b8902e`), secondary = navy (`#1f3a5f`).

### 2026-06-25 — Workbook day-editor preview + Workbook→Library forwarding
- **Decided:** (1) The day editor renders the whole study page with suggestions as inline tracked-change diffs (Accept/Dismiss in context); (2) the Workbook inspiration form can forward the same input to the Content Library as an unfinished draft.
- **Why:** Lulu wanted to *see* the full page and what's changing before approving (like a doc editor), and to avoid re-entering the same research separately for the workbook and the newsletter.
- **Affects:** New `src/lib/textDiff.ts`, `src/components/WorkbookDayPreview.tsx`; edits to workbook `[day]`/`submit`/`actions`, library `page`/`actions`/`SmartLibraryForm`/`lib/library.ts`. **Run `supabase/content-library-status.sql`** before the forwarding works.

### 2026-06-25 — Imported full project history into PROJECT-LOG.md
- **Decided:** Digest the entire desktop build transcript (inception → member-home ship) into this file as the canonical cross-session memory.
- **Why:** Local desktop session chat history doesn't sync to remote/cloud sessions; the repo does. This makes the project's full context available from any machine/session.
- **Affects:** Read this file at the start of new sessions; keep it updated as work continues.

### 2026-06-25 — Adopted PROJECT-LOG.md + granted Claude GitHub App write access
- **Decided:** Use a repo file for shared memory; granted the Claude GitHub App read-write on the `thedailywalk` org repo so remote sessions can push.
- **Why:** Enables the desktop↔laptop "work from either machine via Remote sessions" workflow.
- **Affects:** Remote sessions now push directly; commits get verified on push through the relay.
