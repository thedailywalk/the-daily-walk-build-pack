/**
 * Shared homepage copy — used by the current design and the alternate designs
 * under /designs so they differ only in layout/style, not words.
 */

export const hero = {
  eyebrow: "A daily devotional newsletter",
  title: "Walk with God in real life.",
  lead: "You'll never grow close to someone you never talk to — not even God. His Word is the one weapon He gave you: wisdom when you're lost, strength when you're empty, an anchor when you've forgotten who you are. Ten honest minutes a morning, and nothing meets you unarmed.",
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
  imageCredit?: string; // attribution when the photo is a free Wikimedia Commons image
  summary?: string; // short "in our own words" blurb (newsletter only), paraphrased not copied
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
    note: "Always free · Mon · Wed · Fri",
    features: [
      "The devotional 3× a week + prayer",
      "3 Good News stories",
      "Wednesday Pastor's Take",
      "Free community access",
    ],
    cta: "Start free",
    href: "/subscribe",
  },
  {
    name: "Founding Member",
    price: "$5.99",
    per: "/mo",
    note: "Just 20¢ a day · or $59/yr · everything",
    features: [
      "Everything in Free — plus the devotional every day",
      "The guided Bible-in-a-Year journey, from your own Day 1",
      "The Deeper Walk — the premium discipleship newsletter",
      "The Spiritual Wellness Guide (Mon · Wed · Fri)",
      "Daily study guide — plain-English context, application, reflection & prayer + audio",
      "Saturday Weekend Study + monthly workbook PDF",
      "Progress, streaks, notes, favorite verses & full archive",
      "Founding Member price locked in for life",
    ],
    cta: "Become a Founding Member",
    href: "/pricing",
    highlighted: true,
  },
  {
    name: "Founding Partner",
    price: "$19.99",
    per: "/mo",
    note: "For those who can give a little more",
    features: [
      "Everything in Founding Member",
      "Keeps a licensed Christian counselor within reach of everyone",
      "Keeps The Daily Walk free for readers who can't pay",
      "Brings you pastors & perspectives from across the world",
      "Live updates on every project — see the lives your giving changes",
      "Monthly founder notes — always in the loop on what we're building",
      "Meets kids where they are, then points them back to the real world",
    ],
    cta: "Become a Founding Partner",
    href: "/pricing",
  },
];

export const mission = {
  heading: "A daily guide for walking with God in real life.",
  body: "The Daily Walk exists to help people find Jesus — and learn how to build and grow that relationship into a peace that passes all understanding. You're welcome the moment you come, whether you've followed Him for forty years or have never opened a Bible. Every morning: real Scripture in plain words, an honest prayer, and good news to remind you God is still moving — a few honest minutes that meet you right where you are.",
  verse: "“Your word is a lamp to my feet and a light to my path.” — Psalm 119:105",
};
