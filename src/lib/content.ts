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
    body: "A 2-minute devotional with a simple Scripture breakdown, one honest prayer, an uplifting Good News story, the Wednesday Pastor's Take, and a Sunday Rest & Reflect. Encouragement that meets you in real life.",
    who: "For anyone who wants daily encouragement, prayer, and hope.",
  },
  {
    tag: "Your Day 1 · Founding Member",
    title: "The Bible-in-a-Year journey",
    body: "Read the whole Bible in a year — starting with Jesus, not Genesis. Each day: the reading, a clear breakdown made simple, what it shows us about God, real-life application, and a question. Begins the day you join — coming with the full platform at launch.",
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
    body: "One uplifting, real story each day — proof that even when the world feels heavy, good is still happening.",
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
  {
    category: "Inspiring",
    headline:
      "England Fan Who Spent Life Savings on World Cup Trip with Granddad Gets Money Gifted Back",
    summary:
      "He emptied his savings to take his granddad to the World Cup — then strangers heard the story and gifted every penny back.",
    image: "", // filled from the article's own photo at send time
    href: "https://www.goodnewsnetwork.org/england-fan-who-spent-life-savings-on-world-cup-trip-with-granddad-gets-money-gifted-back/",
    source: "Good News Network",
  },
  // To pin a different story: swap the entry above (image "" auto-uses the
  // article's own photo). Empty this list ([]) for fully automatic again.
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
      "A Scripture breakdown made simple",
      "A Good News story",
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
      "The Deeper Walk: daily Scripture breakdown & deeper Bible teaching",
      "The Bible Thread — how each reading points to Jesus",
      "Heart Check + Journal With God for real formation",
      "A daily Spiritual Wellness Guide practice + Pray the Word",
      "A Walk It Out step + guided Scripture to live it",
      "The guided Bible-in-a-Year journey, from your own Day 1 (at launch)",
      "Monthly workbook, full archive & price locked in for life",
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
      "Gift the full membership to 2 loved ones — or someone who really needs it",
      "Keeps a licensed Christian counselor within reach of everyone",
      "Keeps The Daily Walk free for readers who can't pay",
      "Brings you pastors & perspectives from across the world",
      "Live updates on every project — see the lives your giving changes",
      "Monthly founder notes — always in the loop on what we're building",
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
