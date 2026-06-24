# Go-Live Runbook — The Daily Walk

This site is a Next.js app whose signup form writes to **Beehiiv**. Beehiiv owns the
list, sending, paid tiers, and the Bible-in-a-Year automation. We host the **website**
on **Vercel** and point **thedailywalknewsletter.com** (GoDaddy DNS) at it.

> Nothing below sends real email or changes your domain until you do the steps yourself.
> Do them in order. Secrets (the Beehiiv API key) go straight into Vercel — never into
> the code and never pasted into chat.

---

## Part 1 — Beehiiv keys (you already have the publication)

In Beehiiv:
1. **API key:** Settings → Integrations → API → create a key. Copy it. *(secret)*
2. **Publication ID:** same area / URL — looks like `pub_xxxxxxxx-xxxx-xxxx-...`.
3. **Hosted URLs** (not secret) — copy these from your publication:
   - Subscribe page URL
   - Archive URL
   - Manage-subscription URL
   - (Optional) Premium / Patron upgrade URLs, if paid tiers are set up.

Keep these handy for Part 3. The API key + Publication ID make the on-site form write to
your real list; the URLs power footer/pricing links.

---

## Part 2 — Put the code on GitHub

1. Create a free account at **github.com** (use thedailywalknewsletter@gmail.com).
2. Create a new **empty** repository named `the-daily-walk` (no README/!gitignore — we
   already have them).
3. Get this folder pushed up. Two ways — pick one:
   - **No command line (GitHub Desktop):** install GitHub Desktop → File → Add Local
     Repository → choose this folder → Publish.
   - **Let Claude push for you:** create a GitHub *Personal Access Token* (Settings →
     Developer settings → Tokens) and share it; Claude wires the remote and pushes. After
     that, Claude can deploy changes by pushing — you do nothing.

---

## Part 3 — Deploy on Vercel

1. Go to **vercel.com** → **Sign up** → **Continue with GitHub** (links the accounts).
2. **Add New… → Project** → import the `the-daily-walk` repo. Vercel auto-detects Next.js
   (no build settings to change).
3. **Environment Variables** — add these (paste your real values). Copy them straight
   from your local `.env.local` — same names, same values.

   | Name | Secret? | Value |
   |---|---|---|
   | `BEEHIIV_API_KEY` | 🔒 yes | your Beehiiv API key |
   | `BEEHIIV_PUBLICATION_ID` | no | `pub_…` |
   | `APP_URL` | no | `https://thedailywalknewsletter.com` |
   | `NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL` | no | Beehiiv subscribe URL |
   | `NEXT_PUBLIC_BEEHIIV_ARCHIVE_URL` | no | Beehiiv archive URL |
   | `NEXT_PUBLIC_BEEHIIV_MANAGE_URL` | no | Beehiiv manage URL |
   | `NEXT_PUBLIC_BEEHIIV_PREMIUM_URL` | no | upgrade URL (optional) |
   | `NEXT_PUBLIC_BEEHIIV_PATRON_URL` | no | upgrade URL (optional) |
   | `NEXT_PUBLIC_SUPABASE_URL` | no | Supabase project URL (member sign-in + DB) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no | Supabase publishable/anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | 🔒 yes | Supabase **secret** key (`sb_secret_…`) — powers the Devotional Prep admin saves |
   | `ADMIN_EMAILS` | no | extra admin emails, comma-separated (owner is always admin) — optional |
   | `NEXT_PUBLIC_COMMUNITY_URL` | no | community link (optional) |
   | `COMP_PATRON_EMAILS` | no | emails granted free Patron access, comma-separated — optional |
   | `YOUTUBE_API_KEY` | 🔒 yes | free YouTube Data API key — powers the Weekly Video safety checks |
   | `CRON_SECRET` | 🔒 yes | any long random string — protects the daily/weekly cron jobs |
   | `ANTHROPIC_API_KEY` | 🔒 optional | turns on live AI chat for Pathlight (the member Bible guide); without it Pathlight still gives Scripture-based answers |

   > The 🔒 secret keys must be set, but **never** appear in the code or in chat.
   > Everything `NEXT_PUBLIC_…` is safe to expose.

4. **Database (Supabase).** If your live site uses the **same Supabase project** you set up
   locally (project `makaxugtawmuibdkbjju`), the tables already exist — nothing to do. If you
   ever create a *separate* production project, run **every file in `supabase/` once** in its
   SQL Editor: `devotionals`, `study-journal`, `prayer-wall`, `good-news`, `content-library`,
   `content-library-media`, `weekly-video`, `daily-poll`, `prayer-journal`.

   > **Cron jobs** (in `vercel.json`) run automatically on Vercel: daily devotional
   > auto-draft + auto-publish, daily Good-News refresh, daily Weekly-Video health check,
   > and the Monday Weekly-Video staging. They're protected by `CRON_SECRET`.
   >
   > **Newsletter automation:** once live, the daily devotional publishes itself and is
   > served at `…/devotional/rss.xml`. Point Beehiiv's **RSS-to-Send** (Max/Enterprise plan)
   > at that URL to auto-email each issue.

5. **Deploy.** You get a `the-daily-walk-xxxx.vercel.app` URL. **Test signup there first** —
   submit your own email and confirm it lands in Beehiiv. Then sign in as the owner and open
   **Admin → Devotional Prep** to confirm saving works on the live site.

---

## Part 4 — Connect the domain (GoDaddy)

1. In the Vercel project → **Settings → Domains** → add `thedailywalknewsletter.com` and
   `www.thedailywalknewsletter.com`.
2. Vercel shows the exact records to add. In **GoDaddy → your domain → DNS**, add them —
   typically:
   - `A` record `@` → the IP Vercel gives (often `76.76.21.21`)
   - `CNAME` record `www` → `cname.vercel-dns.com`
3. Back in Vercel, wait for the domains to verify (minutes to a couple hours).

## Part 5 — Beehiiv sending domain (so email lands in inboxes)

In Beehiiv → settings for your custom **sending domain** (e.g. `mail.thedailywalknewsletter.com`),
Beehiiv gives **SPF / DKIM / (DMARC)** DNS records → add those in GoDaddy too. This is
separate from the website domain and protects deliverability.

---

## Final check
- Visit the live domain → pages load, brand looks right.
- Submit a real email → appears in Beehiiv → confirmation/welcome arrives.
- Pricing CTAs deep-link to the correct Beehiiv upgrade pages.
