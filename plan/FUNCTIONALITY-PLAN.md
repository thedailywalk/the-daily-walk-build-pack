# Functionality Plan — making The Daily Walk concrete

> Goal: turn the live marketing site into the full product — sign-up, payments to the right
> accounts, paywalls, and a signed-in member area with progress + billing. This plan marks each
> piece **[Beehiiv]** (config, no code) vs **[Custom]** (we build it on the Next.js site).

## A. Verified Beehiiv capabilities (sources at bottom)
- **Paid subscriptions / multiple tiers** via **your own Stripe** account; monthly / annual / pay-what-you-want; 0% to Beehiiv (Stripe fees only).
- **Subscription status by email** through the API: `GET /v2/publications/{id}/subscriptions/by_email/{email}?expand[]=subscription_premium_tiers` → returns `subscription_premium_tier_names` + `status` (active / inactive / …). **This is our entitlement check.**
- **Login + paywall** exist, but **only on Beehiiv-hosted pages** (the publication website / gated posts), which can live on a subdomain like `read.thedailywalknewsletter.com`. They do **not** drop into our custom Next.js routes, and Beehiiv offers **no SSO/OAuth** for our app.
- **No progress tracking** (Day N of 365, mark-complete, restart, pace) and **no member dashboard** — not a Beehiiv feature.
- **Refunds/cancellations** are performed in the **Stripe dashboard**, not automated by Beehiiv.

## B. The core decision (pick one)
**Path A — Beehiiv-hosted member experience (near-zero custom code).**
Members sign in / pay / manage / read gated content on a Beehiiv subdomain. Our Next.js stays
marketing-only. **No progress dashboard.** Fast, cheap, but the member experience lives on Beehiiv's
skin and the "Day N / My Journey" feature is dropped.

**Path B — Custom member layer on our domain (recommended for your goals).**
Add **auth + a database** to the Next.js site so paid users sign in at `thedailywalknewsletter.com`,
see **their progress**, today's reading, archive, and billing. Beehiiv remains billing + list +
email; our site asks Beehiiv's API "is this email Premium/Patron?" to gate features. This is the
"My Journey" experience the product is built around — and the only way to satisfy "see it on the
website" + "track progress."

**Recommendation:** Launch revenue now on Beehiiv (Path A pieces that already work — checkout), then
build Path B as the next project. They are not mutually exclusive; B adds onto A.

## C. Phased build

### E1 — Payments live  [Beehiiv]
Connect Stripe in Beehiiv → create **Premium** ($9.99/mo, $99/yr) and **Patron** ($19.99/mo,
$199/yr) tiers → grab the hosted **checkout/upgrade URLs** → set them as `NEXT_PUBLIC_BEEHIIV_PREMIUM_URL`
/ `NEXT_PUBLIC_BEEHIIV_PATRON_URL` in Vercel so the pricing CTAs go to real checkout. Test a live
purchase in Stripe test mode first.

### E2 — Email deliverability  [Beehiiv + GoDaddy]
Add Beehiiv's sending-domain **SPF / DKIM / DMARC** records in GoDaddy (reconcile with the existing
`_dmarc`). Required before sending real newsletters at volume.

### E3 — Authentication (sign in)  [Custom]
Add email **magic-link / OTP auth** to the Next.js app (Auth.js, Clerk, or Supabase Auth). One front
door at `/login`. The signed-in user's **verified email** is the join key to Beehiiv.

### E4 — Entitlements + paywall  [Custom + Beehiiv API]
On login (and on a schedule/webhook), call Beehiiv `by_email` → read `subscription_premium_tier_names`
+ status → store `tier` (free/premium/patron) on the user. Gate routes (`/journey`, `/archive`) with a
helper. Source of truth for "paid" = Beehiiv; our DB caches it.

### E5 — Member portal "My Journey"  [Custom + seed data]
Database stores per-user **progress**: `startDate` (their Day 1), `currentDay`, `paceMode`,
completed days, `status`. Seed the **365-day plan** from `reading-plan/the-daily-walk-365-plan.json`.
Screens: dashboard (Day N of 365), today's reading, mark-complete / restart / switch pace, searchable
archive. **Anchor Day-N math to America/Los_Angeles** and unit-test it (this is the logic the original
plan flagged for tests — it re-enters scope here).

### E6 — Billing visibility  [Custom reads Beehiiv]
On the account page, show current plan + status (from Beehiiv API) and a **"Manage billing"** button
linking to the Beehiiv/Stripe customer portal. Cancellations/refunds still happen in Stripe.

### E7 — Bible-in-a-Year delivery  [Beehiiv + content]
Build the signup-triggered **automation** in Beehiiv (relative daily waits = each person's Day 1).
**Author Day 1–14 first**, then stay ahead. Note: the email drip (Beehiiv) and the on-site progress
(our DB) must agree on Day N — both derive from the start date.

### E8 — Community / audio / legal / analytics  [mixed]
Community space (Discord/Circle, free for all, Patron private room); **audio hosting** for Premium
daily audio (Supabase Storage / S3 / podcast host); legal pages; analytics.

## D. Tricky bits & risks
- **Identity matching:** the site-login email **must equal** the Beehiiv subscriber email (the
  entitlement key). Plan for mismatches (someone pays with a different email than they log in with).
- **Two logins problem:** Beehiiv has its own OTP login for hosted content; if we add custom auth,
  pick **one** front door (recommend custom on-site) to avoid confusing users.
- **Payment→access latency:** after paying in Beehiiv/Stripe, how fast does the API show the tier?
  Use Beehiiv **webhooks** to sync on change; fall back to re-checking on login.
- **Manual refunds/cancels** in Stripe = operational overhead; document a process.
- **Progress lives in our DB**, not Beehiiv — keep it consistent with the drip's Day N.

## E. What else you're missing (gaps checklist)
- **Stripe business setup:** bank/payout details, identity verification, **Stripe Tax** if needed.
- **Legal pages:** Privacy Policy, Terms, Refund policy (30-day per `context/05`), and a **physical
  mailing address + unsubscribe** (CAN-SPAM — Beehiiv adds unsubscribe; you must supply an address).
- **Data rights:** GDPR/CCPA export & delete; consent record.
- **Welcome email** + decide single vs double opt-in (currently single).
- **Bible-in-a-Year content pipeline:** 365 days of authored devotional copy **+ daily audio** — a
  large, ongoing content lift, not a code task. Decide who writes/records and the lead time.
- **Good News workflow:** sourcing 3 real, attributed stories/day — an editorial process.
- **Community** platform choice + moderation + Patron room.
- **Analytics** (privacy-friendly, e.g. Plausible), **error monitoring**, **uptime**, **DB backups**.
- **Brand assets:** real **logo**, **OG share image**, favicon, sunrise hero photo.
- **SEO/accessibility** passes; structured data.
- **Wire pricing CTAs** to real Beehiiv checkout URLs (placeholder today).
- **Remove the internal `/designs`** pages before wide launch.
- **Tests** for the Day-index/idempotency logic (returns to scope with E5).

## F. Suggested order
Design now (your call). Functional critical path: **E1 (paid tiers live) → E2 (deliverability) →**
then the bigger build **E3–E6 (auth + paywall + My Journey + billing) → E7 (journey content)**.
You can take real money via Beehiiv after E1–E2; the signed-in on-site experience needs E3+.

## Sources
- Paid tiers / Stripe: beehiiv.com/support — "set up multiple premium tiers", "set up Stripe".
- API status by email: developers.beehiiv.com — "Get subscription by email" (expand `subscription_premium_tiers`).
- Login/paywall scope: beehiiv.com/support — "Subscriber login FAQs".
