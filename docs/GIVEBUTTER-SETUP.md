# Givebutter donations — setup guide

The website side is **already built**. There's a "Give" button on the homepage
mission section and a dedicated **`/give`** page ready to show your donation
form. All that's left is the part only you can do: create your Givebutter
account, make a campaign, connect your bank, and paste three values in.

Until you do that, the Give button and `/give` page show a friendly
**"Giving opens soon"** message — nothing looks broken, so it's safe to be live.

---

## What you'll do on Givebutter (the "payment part")

Givebutter is free for nonprofits/individuals — no monthly fee. (They take a
small processing fee, and donors can optionally tip Givebutter to cover it.)

1. **Create a free account** at <https://givebutter.com> → *Sign up*.
   Use `thedailywalknewsletter@gmail.com` so it matches everything else.

2. **Create a campaign** (Givebutter calls fundraising pages "campaigns").
   - Dashboard → **Campaigns → New campaign** → choose a **Collect donations**
     (or **Fundraise**) campaign.
   - Give it a title (e.g. *The Daily Walk — Give*), a short story, and a photo.
     You can reuse the mission copy from the site.
   - Publish it. You'll get a public link like `https://givebutter.com/abcd`.

3. **Connect your bank / payout** so you can actually receive money.
   - Dashboard → **Settings → Payouts** (or the campaign's *Get paid* prompt).
   - Verify your identity and add your bank account. This is the step that
     turns on real payments. **← this is the "payment part" you finish.**

4. **Grab your embed details** (so the donation form can show on `/give`):
   - Open your campaign → **Share → Embed** (or **Widgets**).
   - Givebutter shows a snippet that looks like:
     ```html
     <script src="https://widgets.givebutter.com/latest.umd.cjs?acct=XXXXXXXX&p=other" async></script>
     <givebutter-widget id="YYYYYY"></givebutter-widget>
     ```
   - From that snippet, copy:
     - the value after `acct=` → this is your **ACCOUNT_ID** (`XXXXXXXX`)
     - the `id="..."` value → this is your **WIDGET_ID** (`YYYYYY`)
   - Also copy your campaign's public link → this is your **URL**.

---

## What you paste into the site

Open **`.env.local`** (create it by copying `.env.example` if it doesn't exist)
and fill in these three lines:

```bash
NEXT_PUBLIC_GIVEBUTTER_URL=https://givebutter.com/your-slug
NEXT_PUBLIC_GIVEBUTTER_WIDGET_ID=YYYYYY
NEXT_PUBLIC_GIVEBUTTER_ACCOUNT_ID=XXXXXXXX
```

If you're hosting on Vercel, add the same three variables under
**Project → Settings → Environment Variables**, then redeploy.

### What each value turns on

| Value            | Effect                                                              |
| ---------------- | ------------------------------------------------------------------ |
| _(none set)_     | Give button + `/give` show the "Giving opens soon" message.        |
| `URL` only       | Give button + `/give` show a **"Give on Givebutter →"** button.    |
| `WIDGET_ID` (+ `ACCOUNT_ID`) | The full **donation form is embedded right on `/give`** — people give without leaving the site. |

You can set just the `URL` first to go live fast, then add the `WIDGET_ID`
later to upgrade to the embedded form. Nothing else in the code needs to change.

---

## Where it shows up on the site

- **`/give`** — the donation page (embedded form, or the Givebutter button).
- **Homepage → "Our mission" section** — a "Give to the mission" button that
  leads to `/give`.

Want the Give button somewhere else too (footer, nav, the mission page)? Just
say the word — it's a one-line drop-in: `<GiveButton />`.
