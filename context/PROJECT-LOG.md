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

SQL files in `supabase/`: `prayer-wall.sql`, `good-news.sql`, `study-journal.sql`, `devotionals.sql`, `content-library.sql`, `content-library-media.sql`, `content-library-capture.sql`, `weekly-video.sql`, `daily-poll.sql`, `prayer-journal.sql`, `community.sql`, `workbook-evolution.sql`.

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
