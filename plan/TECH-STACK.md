# Tech Stack (recommended)

A single Next.js repo handles the website, the member portal, the API, and the cron jobs. Managed
services handle DB, auth, payments, and email so there's little to operate.

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Web + API in one repo; great with Claude Code; SSR/SEO |
| Styling | **Tailwind CSS** | Fast, tokenized brand theme (navy/gold); matches reference HTML |
| UI components | shadcn/ui (optional) | Accessible primitives, easy to theme |
| Database | **PostgreSQL** (Neon or Supabase) | Relational data (users, plans, issues, stories) |
| ORM | **Prisma** | Type-safe schema + migrations |
| Auth | **Clerk** (or Supabase Auth) | Email magic-link, sessions, minimal setup |
| Payments | **Stripe** | Subscriptions + customer portal; Free/Premium/Patron |
| Email | **Resend** + **React Email** | Transactional + broadcasts; React templates that match brand |
| Scheduling | **Vercel Cron** (or a worker/Inngest) | Daily newsletter send + per-subscriber Bible drip |
| Hosting | **Vercel** | Zero-config Next.js deploy; cron; preview envs |
| Domain/DNS | **GoDaddy** (DNS only) | Point `thedailywalknewsletter.com` at Vercel |
| Audio hosting | Object storage / CDN (Supabase Storage, S3, or a podcast host) | Premium daily audio |

### Notes & alternatives
- If the user prefers fewer vendors: **Supabase** can cover Postgres + Auth + Storage together.
- Email volume grows fast (daily × subscribers). Resend/Postmark/SendGrid all work; confirm pricing.
- Scheduling: start with Vercel Cron hitting protected API routes; if drip logic gets heavy, move to
  **Inngest** or a queue. Keep send logic idempotent (don't double-send on retries).
- Keep everything in **test mode** (Stripe test keys, a test email audience) until the user is ready.

### Environment variables (provide a `.env.example`; user fills real values)
```
DATABASE_URL=
NEXTAUTH_/CLERK_KEYS=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PREMIUM_MONTHLY=
STRIPE_PRICE_PREMIUM_ANNUAL=
STRIPE_PRICE_PATRON_MONTHLY=
STRIPE_PRICE_PATRON_ANNUAL=
RESEND_API_KEY=
EMAIL_FROM="The Daily Walk <hello@thedailywalknewsletter.com>"
EMAIL_REPLY_TO=thedailywalknewsletter@gmail.com
CRON_SECRET=
APP_URL=https://thedailywalknewsletter.com
```
