# Data Model (starting sketch)

A starting Prisma-style schema. Refine as needed; the key idea is that **Bible-in-a-Year progress is
per-subscriber** (day index from their start date), separate from the calendar newsletter.

```prisma
// Users & subscriptions
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  tier              Tier     @default(FREE)        // FREE | PREMIUM | PATRON
  stripeCustomerId  String?
  subStatus         String?                        // active, canceled, past_due...
  createdAt         DateTime @default(now())
  planProgress      PlanProgress?
  prayerRequests    PrayerRequest[]
}

enum Tier { FREE PREMIUM PATRON }

// Bible-in-a-Year personal progress (the heart of rhythm 2)
model PlanProgress {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  startDate     DateTime @default(now())  // their "Day 1"
  currentDay    Int      @default(1)      // 1..365, advances as they read/skip
  paceMode      String   @default("self") // "self" | "community"
  lastSentDay   Int      @default(0)      // last drip day emailed (idempotency)
  status        String   @default("active") // active | paused | completed
  updatedAt     DateTime @updatedAt
}

// The 365-day plan (seed from reading-plan/the-daily-walk-365-plan.json)
model PlanDay {
  day         Int     @id            // 1..365
  week        Int
  weekTheme   String
  mainReading String                 // e.g. "John 1-2"
  companion   String                 // Psalm/Proverb or reflection prompt
  prompt      String                 // "Make It Real" question
  // Authored Premium content (filled over time):
  breakdown   String?                // plain-English explanation
  aboutGod    String?                // "What this shows us about God"
  application String?                // real-life application
  prayer      String?
  audioUrl    String?
}

// The daily newsletter (calendar-based broadcasts)
model NewsletterIssue {
  id           String   @id @default(cuid())
  sendDate     DateTime
  type         String   // "daily" | "rest_and_reflect" | etc.
  subject      String
  reading      String?
  makeItReal   String?
  prayer       String?
  pastorsTake  String?  // Wednesdays
  status       String   @default("draft") // draft | scheduled | sent
  goodNews     GoodNewsStory[]
}

// Good News stories (3/day)
model GoodNewsStory {
  id          String   @id @default(cuid())
  title       String
  summary     String
  category    String   // Generosity, Community, Restoration, Healing, Hope...
  imageUrl    String?
  sourceUrl   String
  date        DateTime
  issueId     String?
  issue       NewsletterIssue? @relation(fields: [issueId], references: [id])
}

// Patron community bits (phase 2+)
model PrayerRequest {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  body      String
  createdAt DateTime @default(now())
  prayingCount Int   @default(0)
}
```

## Send-tracking & idempotency
- Keep a `SendLog` (userId, kind, dayOrDate, sentAt) so cron retries never double-send.
- Daily newsletter: send once per issue per subscriber. Bible drip: send once per (user, day).
