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
3. **Environment Variables** — add these (paste your real values):

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

4. **Deploy.** You get a `the-daily-walk-xxxx.vercel.app` URL. **Test signup there first** —
   submit your own email and confirm it lands in Beehiiv.

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
