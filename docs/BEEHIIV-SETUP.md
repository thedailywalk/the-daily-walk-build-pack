# Beehiiv setup — free daily, premium (Deeper Walk) & Spiritual Wellness

Goal: the **free daily devotional** goes to **everyone**, while **The Deeper Walk**
(premium) and the **Spiritual Wellness Guide** go **only to paying members** — and
new paying members start receiving them automatically the moment they subscribe.

> **What premium is now:** The Deeper Walk isn't just a longer devotional — it's a
> daily discipleship rhythm. Each issue includes the main devotional plus **Deeper
> Walk** (Bible teaching), **The Bible Thread** (how the reading points to Jesus),
> **Heart Check**, **Journal With God**, a **Spiritual Wellness Guide** practice,
> **Pray the Word**, **Walk It Out**, a **Save This Line** quote, one **Glimpse of
> Goodness** story, and **Tomorrow's Thread**. That's the value paying members get
> every day — keep the upgrade copy in Beehiiv aligned to it.

Beehiiv is the **source of truth for who paid**. This app reads each subscriber's
Beehiiv tier and unlocks member features when the tier name contains
**"founding"**, **"premium"**, or **"patron"** — so as long as your paid tiers are
named with one of those words (they are: *Founding Member*, *Founding Partner*),
everything lines up automatically.

---

## Part 1 — One-time setup (do this once)

### 1. Turn on paid subscriptions
- Beehiiv → **Settings → Monetize → Paid Subscriptions** (or **Grow → Subscriptions**).
- Connect **Stripe** when prompted (this is your payout account).

### 2. Create your two paid tiers
Create these exactly (keep the word **"Founding"** in each name — that's what the
site uses to recognize a paying member):
- **Founding Member** — $5.99/mo and $59/yr
- **Founding Partner** — $19.99/mo and $199/yr

> Both tiers unlock the same content. Founding Partner is the pay-it-forward tier;
> it gets everything Founding Member does. The site treats either as "paid."

### 3. Make a "Paying members" segment
This is the audience your premium + wellness emails will go to.
- Beehiiv → **Audience → Segments → New segment**.
- Condition: **Subscription tier → is → (any active paid tier)** — i.e. Founding
  Member **or** Founding Partner. (In Beehiiv this is often "Premium subscription
  is active.")
- Name it **Paying members** and save.

That's it for setup. You now have:
- **All active subscribers** → the free daily audience.
- **Paying members** (the segment) → the premium + wellness audience.

---

## Part 2 — Your three streams

You don't need three separate publications. Keep one publication and **choose the
audience per email**:

| Stream | Send audience | Cadence |
|---|---|---|
| **The Daily Walk** (free devotional) | All active subscribers | Mon · Wed · Fri (free), or daily |
| **The Deeper Walk** (premium) | **Paying members** segment | Daily |
| **The Spiritual Wellness Guide** | **Paying members** segment | Mon · Wed · Fri |

Because premium + wellness always target the **Paying members** segment, only
paying subscribers ever receive them — automatically.

> Optional polish: Beehiiv also supports multiple "newsletters" that subscribers
> can opt into and manage in their preferences. You can add that later for choice,
> but the **paid-segment gating above is what actually enforces** "premium content
> to paying members only." Start with the segment.

---

## Part 3 — Publishing an issue (repeat for each one)

The app writes and previews each issue; Beehiiv sends it.

1. In the app admin, open the issue:
   - Free daily → `/admin/devotionals`
   - Premium → `/admin/premium`
   - Wellness → `/admin/wellness`
2. Click **Copy email HTML** (bottom of the editor).
3. In Beehiiv: **New Post**, then paste the HTML (use the post's **HTML / code**
   option, or "import HTML").
4. Set the **email audience**:
   - Free daily → **All active subscribers**
   - Premium / Wellness → **Paying members** segment
5. Add the **subject line** and **preview text**.
6. **Schedule** for your send time (e.g. 6:30 AM PT) — or send now.

> Tip: send yourself a **test email** first every time, and keep subject lines
> short and specific (the reading + the hook).

---

## Part 4 — "So they start going out once someone signs up"

This is the best part — it's automatic:

- **Free subscribers**: anyone who joins is in *All active subscribers*, so they get
  the next free daily automatically.
- **Paying members**: the moment someone subscribes to Founding Member or Partner,
  Beehiiv puts them in the **Paying members** segment — so they receive the **next
  scheduled** Deeper Walk and Wellness issue with no action from you.

### Optional: instant welcome emails (Automations / Journeys)
Beehiiv → **Automations → New automation**:
- **Trigger: new subscriber** → send a warm free welcome (what to expect, when it
  lands).
- **Trigger: upgrades to a paid tier** → send a "Welcome to the membership" email,
  and (optionally) the current week's Deeper Walk so they don't wait.

---

## Part 5 — One thing to plan separately: Bible-in-a-Year

The guided **Bible-in-a-Year** journey starts on **each person's own Day 1** (the day
they subscribe), not a shared calendar. That's a personalized, 365-step drip.
Beehiiv Automations can do timed sequences, but a full personalized year is
usually better handled by the **app's own drip engine** (it already tracks each
member's Day N). Treat this as its own project — the premium + wellness sends
above don't depend on it.

---

## Quick checklist
- [ ] Paid subscriptions on, Stripe connected
- [ ] Tiers created: **Founding Member**, **Founding Partner** (keep "Founding" in the name)
- [ ] **Paying members** segment created
- [ ] First premium + wellness issues pasted in, audience = Paying members, scheduled
- [ ] (Optional) Welcome automations for new + upgraded subscribers
- [ ] Send yourself a test of each before the first real send
