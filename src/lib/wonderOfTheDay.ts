/**
 * "Wonder of the Day" — a daily awe-moment from creation/science that points
 * back to God, with a public-domain (WEB) verse and an original reflection.
 * Rotates automatically by date. Facts only (not copyrightable) + original
 * writing + public-domain Scripture — fully legal to publish.
 */
export type Wonder = {
  title: string; // the short, punchy wonder
  body: string;
  verseRef: string;
  verseText: string; // WEB
  reflection: string;
};

export const WONDERS: Wonder[] = [
  { title: "Two trillion galaxies.", body: "The observable universe holds an estimated two trillion galaxies — each with hundreds of billions of stars. Light from some has been traveling toward you for over 13 billion years. And the God who set every one in place knows your name too.", verseRef: "Psalm 8:3-4", verseText: "When I consider your heavens, the work of your fingers… what is man, that you think of him?", reflection: "The God of the galaxies is also the God who is mindful of you." },
  { title: "Millions of new cells, every second.", body: "Right now, without a single thought from you, your body is building millions of brand-new cells every second — quietly repairing and renewing the person you are. You are not static. You are being remade.", verseRef: "Lamentations 3:23", verseText: "They are new every morning. Great is your faithfulness.", reflection: "The God who renews your body every morning can renew your heart too." },
  { title: "More trees than stars in our galaxy.", body: "Earth carries an estimated three trillion trees — more than the stars in the entire Milky Way. The same God who scattered the galaxies also numbers every leaf, every sparrow, every hair on your head.", verseRef: "Matthew 10:29", verseText: "Aren't two sparrows sold for an assarion coin? Not one of them falls to the ground apart from your Father's will.", reflection: "Nothing in your life is too small for God to notice." },
  { title: "Sunlight took 8 minutes to find you.", body: "The warmth on your face this morning left the sun about eight minutes ago and traveled 93 million miles to reach you. Even light has to journey to find you — and so did God's love.", verseRef: "Psalm 19:1", verseText: "The heavens declare the glory of God. The expanse shows his handiwork.", reflection: "Creation is always preaching — if you'll look up long enough to listen." },
  { title: "A teaspoon of soil, teeming with life.", body: "One teaspoon of healthy soil holds more living organisms than there are people on Earth. The God who fills the unseen dirt with life delights to fill empty, hidden places — including the ones in you.", verseRef: "Genesis 2:7", verseText: "Yahweh God formed man from the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.", reflection: "God has always been in the business of breathing life into dust." },
  { title: "Birds navigate by a sense we can't feel.", body: "Migrating birds find their way across thousands of miles using the Earth's magnetic field — a guidance system woven into them before they ever needed it. God has been guiding His creation home since the beginning.", verseRef: "Proverbs 3:6", verseText: "In all your ways acknowledge him, and he will make your paths straight.", reflection: "If He guides the smallest wings home, He can guide your next step." },
  { title: "Your heart beats 100,000 times a day.", body: "Roughly a hundred thousand times today, your heart will beat — never once asking your permission, never taking a day off. You are sustained every moment by a grace you didn't earn and rarely notice.", verseRef: "Psalm 139:14", verseText: "I will give thanks to you, for I am fearfully and wonderfully made.", reflection: "You were held together by God before you ever thought to thank Him." },
  { title: "Your DNA would stretch to the sun and back.", body: "The DNA coiled inside a single one of your cells, stretched out, is about two meters long. Unwound from all your cells, it would reach the sun and back many times over — a handwritten code, knit together on purpose.", verseRef: "Psalm 139:13", verseText: "For you formed my inmost being. You knitted me together in my mother's womb.", reflection: "You are not an accident. You are authored." },
  { title: "You're racing 67,000 mph — and feel still.", body: "Earth is hurtling around the sun at about 67,000 miles per hour, yet you sit perfectly still, sipping your coffee. The whole thing is held in a stability you never have to maintain.", verseRef: "Colossians 1:17", verseText: "He is before all things, and in him all things are held together.", reflection: "What feels out of control to you is still being held by Him." },
  { title: "86 billion neurons between your ears.", body: "Your brain holds around 86 billion neurons, making more connections than there are stars in the galaxy — and we've barely begun to understand it. The mind that made yours has good things prepared that you can't yet imagine.", verseRef: "1 Corinthians 2:9", verseText: "Things which an eye didn't see, and an ear didn't hear… God has prepared for those who love him.", reflection: "The best of what God has for you, you haven't even imagined yet." },
  { title: "Ice floats — and that's why we're here.", body: "Almost every substance sinks when it freezes. Water doesn't — ice floats, so lakes freeze on top and life survives beneath through the winter. A tiny design choice, and life goes on. Nothing about creation is careless.", verseRef: "Psalm 104:24", verseText: "Yahweh, how many are your works! In wisdom you have made them all. The earth is full of your riches.", reflection: "The God who designed every detail didn't overlook a single one of yours." },
  { title: "The sun burns 4 million tons a second.", body: "Every second, the sun converts about four million tons of itself into the light and warmth that sustain life on Earth — and it's just one star among uncountable billions, each one named by God.", verseRef: "Isaiah 40:26", verseText: "Lift up your eyes on high, and see who has created these… he calls them all by name.", reflection: "The One who names the stars certainly knows yours." },
  { title: "An octopus has three hearts.", body: "Octopuses have three hearts and blue blood; some fish glow; some birds migrate by starlight. Creation is wildly, almost playfully diverse — the fingerprint of a Maker who loves variety and beauty for its own sake.", verseRef: "Psalm 104:24", verseText: "Yahweh, how many are your works! In wisdom you have made them all.", reflection: "A God this creative did not make you generic." },
  { title: "Life thrives in the deepest dark.", body: "The Mariana Trench is deeper than Mount Everest is tall — crushing, pitch-black, miles down — and creatures still live there, glowing in the dark. There is no place so deep that God's reach runs out.", verseRef: "Psalm 139:8", verseText: "If I make my bed in Sheol, behold, you are there!", reflection: "Wherever you've gone, however deep, He is already there." },
  { title: "A butterfly migrates a journey it's never made.", body: "Monarch butterflies travel thousands of miles to a forest they've never seen — a trip so long it spans several generations. Something in them knows the way home before they ever set out.", verseRef: "Job 12:7", verseText: "But ask the animals, now, and they will teach you; the birds of the sky, and they will tell you.", reflection: "God wrote a way home into His creation — and into you." },
  { title: "Your days were written before one began.", body: "Long before your first heartbeat, the One forming you in secret already saw every day ahead. You were not a surprise to be managed — you were a story being written with care.", verseRef: "Psalm 139:16", verseText: "Your eyes saw my body. In your book they were all written, the days that were ordained for me.", reflection: "Today was known and held by God before you woke into it." },
  { title: "No two snowflakes are alike.", body: "Of the countless snowflakes that have ever fallen, no two have shared the same design. The God who never repeats a snowflake certainly never made a spare, interchangeable you.", verseRef: "Matthew 10:30", verseText: "But the very hairs of your head are all numbered.", reflection: "You are not one of many to God. You are one of a kind." },
  { title: "The sky lights up from an invisible wind.", body: "The northern lights happen when particles streaming from the sun collide with our atmosphere — an invisible wind painting color across the night. So much of God's glory shows up in what we can't see directly.", verseRef: "Psalm 97:6", verseText: "The heavens declare his righteousness. All the peoples have seen his glory.", reflection: "God is often most at work in the things you can't see yet." },
];

function dayOfYearPT(): number {
  const d = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

/** Today's wonder (rotates daily, deterministic by date; offset from the others). */
export function getWonderOfTheDay(): Wonder {
  const n = WONDERS.length;
  return WONDERS[(dayOfYearPT() - 1 + n * 999 + 13) % n];
}
