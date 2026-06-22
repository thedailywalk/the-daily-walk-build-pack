/**
 * Shared homepage copy — used by the current design and the alternate designs
 * under /designs so they differ only in layout/style, not words.
 */

export const hero = {
  eyebrow: "A daily devotional newsletter",
  title: "Walk with God in real life.",
  lead: "Every morning: a short, honest devotional, a real prayer, and good news from around the world — free. And when you're ready, be guided through the whole Bible in a year, starting on your Day 1.",
  reassure: "Free forever · No card required · Welcoming wherever you are on the journey.",
};

export const rhythms = [
  {
    tag: "Every day · Free",
    title: "The Daily Walk newsletter",
    body: "A 2-minute devotional, one honest prayer, three uplifting Good News stories, the Wednesday Pastor's Take, and a Sunday Rest & Reflect. Encouragement that meets you in real life.",
    who: "For anyone who wants daily encouragement, prayer, and hope.",
  },
  {
    tag: "Your Day 1 · Premium",
    title: "The Bible-in-a-Year journey",
    body: "Read the whole Bible in a year — starting with Jesus, not Genesis. Each day: the reading, a plain-English breakdown, what it shows us about God, real-life application, a question, and audio. Begins the day you join.",
    who: "For readers who want to be personally guided through the Bible.",
  },
];

export const features = [
  {
    icon: "📖",
    title: "Start with Jesus",
    body: "The plan opens with John, Romans, and Acts — so Scripture clicks before you ever hit the hard parts.",
  },
  {
    icon: "🙏",
    title: "A prayer every day",
    body: "Short, honest, ready to pray. No performance, no pretending — just real words for a real day.",
  },
  {
    icon: "🌍",
    title: "Good News briefing",
    body: "Three uplifting, real stories each day — proof that even when the world feels heavy, good is still happening.",
  },
  {
    icon: "🎧",
    title: "Listen or read",
    body: "Premium includes an audio devotional each day — perfect for the commute or the morning coffee.",
  },
  {
    icon: "🗓️",
    title: "Never feel behind",
    body: "Your plan starts on your Day 1. Miss a day? Just pick up where you left off — nothing resets on you.",
  },
  {
    icon: "🤝",
    title: "Walk together",
    body: "A free, welcoming community to share, ask questions, and encourage each other along the way.",
  },
];

export type GoodNewsItem = {
  category: string;
  headline: string;
  image: string;
  href: string;
  source: string;
};

/**
 * PINNED Good News — manually feature a story (e.g. for a holiday).
 * Anything in this list shows FIRST, ahead of the auto-pulled daily stories.
 * Leave it empty ([]) for fully automatic. To pin: add an item with a headline,
 * href, source, a category label, and an image URL (or "" to auto-fetch one).
 */
export const pinnedGoodNews: GoodNewsItem[] = [
  // Example (remove the leading // to activate):
  // {
  //   category: "Christmas",
  //   headline: "A whole town showed up to keep a struggling diner open",
  //   image: "https://…/photo.jpg",
  //   href: "https://…/full-article",
  //   source: "Good News Network",
  // },
];

/** Curated fallback — shown only if the live feed can't be reached. */
export const goodNews: GoodNewsItem[] = [
  {
    category: "Generosity",
    headline:
      "A cab driver lost everything in a riot — then strangers gave back $75,000",
    image:
      "https://www.goodnewsnetwork.org/wp-content/uploads/2026/06/Cab-driver-French-Montana-GoFundMe-page-by-New-York-Taxi-Workers-Alliance-1024x547.jpg",
    href: "https://www.goodnewsnetwork.org/nyc-taxi-driver-gets-75000-helping-hand-after-knicks-fans-destroyed-his-car/",
    source: "Good News Network",
  },
  {
    category: "Community",
    headline:
      "A man mowed a widow's lawn for free — viewers turned it into $685,000",
    image:
      "https://www.goodnewsnetwork.org/wp-content/uploads/2026/06/Debbie-and-Spencer-in-the-overgrown-lawn-credit-SB-Mowing-via-GoFundMe.jpg",
    href: "https://www.goodnewsnetwork.org/just-by-mowing-a-lawn-social-media-star-raises-685000-for-bereaved-senior-who-fell-behind-on-rent/",
    source: "Good News Network",
  },
  {
    category: "Restoration",
    headline:
      "After a 2-year wait, an orangutan crossed a rope bridge — a world first",
    image:
      "https://www.goodnewsnetwork.org/wp-content/uploads/2026/04/Screenshot-2026-04-28-171546-1024x545.jpg",
    href: "https://www.goodnewsnetwork.org/celebrations-as-sumatran-orangutan-uses-rope-bridge-to-cross-road-for-the-first-time-ever/",
    source: "Good News Network",
  },
];

export type Tier = {
  name: string;
  price: string;
  per: string;
  note: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    per: "",
    note: "Always free",
    features: [
      "Daily devotional + prayer",
      "3 Good News stories daily",
      "Wednesday Pastor's Take",
      "Sunday Rest & Reflect",
      "Free community access",
    ],
    cta: "Start free",
    href: "/subscribe",
  },
  {
    name: "Premium",
    price: "$5.99",
    per: "/mo",
    note: "Just 20¢ a day · or $59/yr",
    features: [
      "Everything in Free",
      "The guided Bible-in-a-Year journey, from your own Day 1",
      "Start-with-Jesus order: John → Romans → Psalms → Proverbs → Acts → the whole Bible",
      "Read in-app: WEB & KJV included (or use your own Bible)",
      "Daily study guide — plain-English context, real-life application, reflection & prayer",
      "Progress, streaks, notes & favorite verses",
      "Monthly workbook PDF",
    ],
    cta: "Get Premium",
    href: "/pricing",
    highlighted: true,
  },
  {
    name: "Patron",
    price: "$19.99",
    per: "/mo",
    note: "Just 66¢ a day · or $199/yr",
    features: [
      "Everything in Premium",
      "Help Someone Walk for Free — sponsor memberships for those who can't pay",
      "Ask a Pastor — submit faith questions for Pastor's Take",
      "Quarterly deep-dive mini-studies",
      "Monthly mission & impact updates",
      "Early access to new features",
      "Vote on upcoming topics & themes",
      "Testimony Wall — share your story",
    ],
    cta: "Become a Patron",
    href: "/pricing",
  },
];

export const mission = {
  heading: "A daily guide for walking with God in real life.",
  body: "The Daily Walk exists to make faith feel clear, honest, and close — whether you've followed Jesus for decades or you're just curious. No jargon. No guilt. Just Scripture, prayer, and hope, one day at a time.",
  verse: "“Your word is a lamp to my feet and a light to my path.” — Psalm 119:105",
};
