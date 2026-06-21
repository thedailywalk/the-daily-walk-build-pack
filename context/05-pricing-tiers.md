# 05 — Pricing & Tiers

Three tiers. Gate features by tier. **Community access is free for everyone.**
Annual pricing ~17% off (offer a monthly/annual toggle on the pricing page).

## Free — $0 (always free)
*For anyone who wants daily encouragement, prayer, and hope.*
- Daily devotional (Mon–Fri)
- One honest prayer every day
- 3 uplifting "Good News" stories every day
- Wednesday Pastor's Take
- Sunday Rest & Reflect
- Free community access
- Optional weekly Scripture reading preview

## Premium — $9.99/mo or $99/yr  (≈ 33¢/day)
*For readers who want to be personally guided through the Bible in one year.*
- Everything in Free
- The guided **Bible-in-a-Year journey**, starting on your Day 1
- Daily Scripture reading with **plain-English breakdowns**
- "What this shows us about God" reflection
- Real-life application + daily reflection question & prayer prompt
- **Audio devotional** each day
- Saturday **Weekend Deep-Dive**
- Monthly downloadable **study workbook**
- Full **searchable archive**
- Restart or catch up the plan anytime

## Patron — $19.99/mo or $199/yr  (≈ 66¢/day)
*For supporters who want to help keep The Daily Walk free and grow the community.*
- Everything in Premium
- Help **sponsor free access** for readers who can't pay
- Monthly **Patron-only devotional letter**
- Monthly **live prayer night** + replay
- **Patron Prayer Wall** (submit requests & pray for others)
- **Private Patron room** in the community
- **Submit questions** for future Pastor's Take
- **Vote** on upcoming studies & themes
- **Quarterly mini-study** PDF
- Complete printable **prayer-card library**
- "Founding Supporter" badge

## Implementation notes
- Stripe Products/Prices: Premium (monthly+annual), Patron (monthly+annual); Free = no Stripe object.
- Tier stored on the user; gate Bible-in-a-Year emails + portal features behind `premium` or `patron`.
- Pricing page design reference: `content-samples/pricing-page-reference.html`.
- 30-day refund policy; cancel anytime (access through end of billing period); upgrade immediately,
  downgrade at next period.
