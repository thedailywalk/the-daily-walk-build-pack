/**
 * Content Library smart-assist: detect topics + scriptures from pasted text,
 * suggest related verses (public-domain WEB), and draft a brand-voice "why I
 * saved it" note. Plain module (client + server safe). No external AI.
 *
 * Voice for any generated note: faith-filled, direct, practical, emotionally
 * compelling, beginner-friendly — inspired by Johnny Chang / David Guzik / Tim
 * Timberlake in tone only; always original and legally safe.
 */

export type SuggestedVerse = { ref: string; text: string };

/** Topic → fitting verses (World English Bible, public domain — safe to publish). */
export const SUGGESTED_VERSES: Record<string, SuggestedVerse[]> = {
  Faith: [
    { ref: "Hebrews 11:1", text: "Now faith is assurance of things hoped for, proof of things not seen." },
    { ref: "Romans 10:17", text: "So faith comes by hearing, and hearing by the word of God." },
    { ref: "2 Corinthians 5:7", text: "for we walk by faith, not by sight." },
    { ref: "Mark 9:24", text: "I believe. Help my unbelief!" },
  ],
  Prayer: [
    { ref: "Philippians 4:6", text: "In everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
    { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
    { ref: "James 5:16", text: "The insistent prayer of a righteous person is powerfully effective." },
  ],
  Healing: [
    { ref: "Psalm 147:3", text: "He heals the broken in heart, and binds up their wounds." },
    { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit." },
    { ref: "Jeremiah 17:14", text: "Heal me, O Yahweh, and I will be healed." },
  ],
  Anger: [
    { ref: "James 1:19-20", text: "let every man be swift to hear, slow to speak, and slow to anger." },
    { ref: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    { ref: "Ephesians 4:26", text: "Be angry, and don't sin. Don't let the sun go down on your wrath." },
  ],
  Love: [
    { ref: "1 John 4:19", text: "We love him, because he first loved us." },
    { ref: "1 Corinthians 13:4", text: "Love is patient and is kind. Love doesn't envy." },
    { ref: "Romans 5:8", text: "while we were yet sinners, Christ died for us." },
  ],
  Forgiveness: [
    { ref: "Ephesians 4:32", text: "be kind to one another… forgiving each other, just as God also in Christ forgave you." },
    { ref: "Colossians 3:13", text: "forgiving each other… as Christ forgave you, so you also do." },
    { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us." },
  ],
  Discipline: [
    { ref: "Hebrews 12:11", text: "afterward it yields the peaceful fruit of righteousness to those who have been trained by it." },
    { ref: "1 Corinthians 9:27", text: "but I beat my body and bring it into submission." },
    { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control." },
  ],
  Identity: [
    { ref: "Psalm 139:14", text: "I will give thanks to you, for I am fearfully and wonderfully made." },
    { ref: "2 Corinthians 5:17", text: "if anyone is in Christ, he is a new creation." },
    { ref: "1 Peter 2:9", text: "you are a chosen race, a royal priesthood, a holy nation." },
  ],
  "Spiritual Warfare": [
    { ref: "Ephesians 6:11", text: "Put on the whole armor of God, that you may be able to stand against the wiles of the devil." },
    { ref: "James 4:7", text: "Be subject therefore to God. Resist the devil, and he will flee from you." },
    { ref: "1 Peter 5:8", text: "Your adversary, the devil, walks around like a roaring lion." },
  ],
  Wisdom: [
    { ref: "James 1:5", text: "if any of you lacks wisdom, let him ask of God, who gives to all liberally." },
    { ref: "Proverbs 3:5-6", text: "Trust in Yahweh with all your heart, and don't lean on your own understanding." },
    { ref: "Proverbs 9:10", text: "The fear of Yahweh is the beginning of wisdom." },
  ],
  Relationships: [
    { ref: "Proverbs 27:17", text: "Iron sharpens iron; so a man sharpens his friend's countenance." },
    { ref: "Ephesians 4:2", text: "with all lowliness and humility, with patience, bearing with one another in love." },
    { ref: "Colossians 3:14", text: "Above all these things, walk in love." },
  ],
  Anxiety: [
    { ref: "Philippians 4:6-7", text: "In nothing be anxious… and the peace of God will guard your hearts and minds." },
    { ref: "1 Peter 5:7", text: "casting all your worries on him, because he cares for you." },
    { ref: "Matthew 6:34", text: "don't be anxious for tomorrow, for tomorrow will be anxious for itself." },
  ],
  Grief: [
    { ref: "Matthew 5:4", text: "Blessed are those who mourn, for they shall be comforted." },
    { ref: "Psalm 30:5", text: "Weeping may stay for the night, but joy comes in the morning." },
    { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes." },
  ],
  Purpose: [
    { ref: "Jeremiah 29:11", text: "thoughts of peace, and not of evil, to give you hope and a future." },
    { ref: "Ephesians 2:10", text: "we are his workmanship, created in Christ Jesus for good works." },
    { ref: "Romans 8:28", text: "all things work together for good for those who love God." },
  ],
  Obedience: [
    { ref: "John 14:15", text: "If you love me, keep my commandments." },
    { ref: "James 1:22", text: "be doers of the word, and not only hearers." },
    { ref: "1 Samuel 15:22", text: "to obey is better than sacrifice." },
  ],
  Confidence: [
    { ref: "Joshua 1:9", text: "Be strong and courageous… for Yahweh your God is with you wherever you go." },
    { ref: "Philippians 4:13", text: "I can do all things through Christ, who strengthens me." },
    { ref: "Isaiah 41:10", text: "Don't be afraid, for I am with you… I will strengthen you." },
  ],
  "Bible Study": [
    { ref: "2 Timothy 3:16", text: "Every Scripture is God-breathed and profitable for teaching, for reproof, for correction." },
    { ref: "Psalm 119:105", text: "Your word is a lamp to my feet, and a light for my path." },
    { ref: "Joshua 1:8", text: "This book of the law shall not depart out of your mouth, but you shall meditate on it day and night." },
  ],
  Testimonies: [
    { ref: "Revelation 12:11", text: "They overcame him because of the Lamb's blood, and because of the word of their testimony." },
    { ref: "Psalm 107:2", text: "Let the redeemed by Yahweh say so." },
    { ref: "Mark 5:19", text: "Tell them what great things the Lord has done for you." },
  ],
  Holidays: [
    { ref: "Isaiah 9:6", text: "For a child is born to us, a son is given to us." },
    { ref: "Luke 24:6", text: "He isn't here, but is risen." },
    { ref: "1 Thessalonians 5:18", text: "In everything give thanks, for this is the will of God." },
  ],
};

/** Topic detection keywords. */
const TOPIC_KEYWORDS: [string, RegExp][] = [
  ["Prayer", /\bpray(?:er|ing|ed)?\b|interced/i],
  ["Forgiveness", /\bforgiv|mercy|pardon\b/i],
  ["Healing", /\bheal(?:ing|ed)?\b|wound|broken|restore\b/i],
  ["Anger", /\banger|angry|rage|wrath|bitter\b/i],
  ["Love", /\blove(?:d|s|ing)?\b|beloved\b/i],
  ["Anxiety", /\banxi|worry|worried|afraid|fear|panic|stress|peace\b/i],
  ["Grief", /\bgrief|griev|mourn|loss|lost|weep|sorrow|tears\b/i],
  ["Identity", /\bidentity|who you are|child of god|image of god|worth|enough\b/i],
  ["Spiritual Warfare", /\barmor|the enemy|devil|satan|temptation|warfare|attack|battle\b/i],
  ["Wisdom", /\bwisdom|wise|discern|foolish|decision\b/i],
  ["Relationships", /\bfriend|marriage|relationship|family|community|neighbor\b/i],
  ["Purpose", /\bpurpose|calling|called|mission|destiny|why am i\b/i],
  ["Obedience", /\bobey|obedience|surrender|submit|will of god\b/i],
  ["Confidence", /\bconfidence|courage|bold|fearless|strength|brave\b/i],
  ["Discipline", /\bdiscipline|self-control|habit|consistent|routine\b/i],
  ["Testimonies", /\btestimony|my story|saved me|set me free|turned my life|delivered|addiction\b/i],
  ["Bible Study", /\bverse|scripture|chapter|passage|study the word|the bible\b/i],
  ["Holidays", /\bchristmas|easter|thanksgiving|good friday|advent|lent|resurrection\b/i],
  ["Faith", /\bfaith|believe|trust(?:ing)?\b|doubt\b/i],
];

const EMOTION_WORDS: [string, RegExp][] = [
  ["hope", /\bhope|hopeful\b/i],
  ["comfort", /\bcomfort|peace|rest|calm\b/i],
  ["conviction", /\brepent|conviction|surrender|change\b/i],
  ["courage", /\bcourage|bold|brave|fearless\b/i],
  ["grief", /\bgrief|loss|mourn|sorrow\b/i],
  ["joy", /\bjoy|joyful|celebrate|grateful\b/i],
];

/** Short, original, brand-voice angle for each topic (for the "why" note). */
const WHY_ANGLES: Record<string, string> = {
  Faith: "what it looks like to trust God when you can't see the next step",
  Prayer: "praying like it actually changes things — honest, not polished",
  Healing: "letting God near the wound you've been carrying alone",
  Anger: "what to do with anger before it does something with you",
  Love: "loving people the way you've already been loved by God",
  Forgiveness: "the freedom of letting go even when they don't deserve it",
  Discipline: "small, daily obedience that quietly rebuilds a life",
  Identity: "who you are when God — not your worst day — gets the final word",
  "Spiritual Warfare": "fighting the battles no one else can see, and not alone",
  Wisdom: "making the wise call when the easy one is right in front of you",
  Relationships: "showing up for people the way God shows up for you",
  Anxiety: "trading the 3 a.m. spiral for a peace that doesn't make sense",
  Grief: "how God meets you in the loss instead of rushing you past it",
  Purpose: "your ordinary life is not too small for God's plan",
  Obedience: "saying yes to God before you can see how it works out",
  Confidence: "courage that comes from whose you are, not how you feel",
  "Bible Study": "making Scripture finally click for real life",
  Testimonies: "the before-and-after that proves God still changes people",
  Holidays: "meeting God in the season, not just the celebration",
  "Visual Inspiration": "an image that preaches before a single word is said",
  "Newsletter Ideas": "a thread worth pulling into a full devotional",
};

export const SCRIPTURE_RE =
  /\b(?:[1-3]\s)?[A-Z][a-z]+(?:\sof\s[A-Z][a-z]+)?\s\d{1,3}:\d{1,3}(?:[-–]\d{1,3})?\b/g;

export function detectTopics(text: string, topics: readonly string[]): string[] {
  const t = (text || "").toLowerCase();
  const found: string[] = [];
  for (const [topic, re] of TOPIC_KEYWORDS) {
    if (topics.includes(topic) && re.test(t) && !found.includes(topic)) {
      found.push(topic);
    }
  }
  return found;
}

export function detectScriptures(text: string): string[] {
  return Array.from(new Set((text || "").match(SCRIPTURE_RE) ?? []));
}

export function detectEmotion(text: string): string {
  const t = (text || "").toLowerCase();
  for (const [emo, re] of EMOTION_WORDS) if (re.test(t)) return emo;
  return "";
}

/** Up to `limit` related verses for the detected topics (deduped). */
export function suggestVersesForTopics(topics: string[], limit = 10): SuggestedVerse[] {
  const out: SuggestedVerse[] = [];
  const seen = new Set<string>();
  for (const t of topics.length ? topics : ["Faith"]) {
    for (const v of SUGGESTED_VERSES[t] ?? []) {
      if (seen.has(v.ref)) continue;
      seen.add(v.ref);
      out.push(v);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

/** Draft a short, brand-voice "why I saved it" note from detected topics. */
export function composeWhy(topics: string[]): string {
  if (!topics.length) {
    return "Saved as inspiration. Jot a line on the spiritual theme it touches and how it could shape a future devotional — in your own words.";
  }
  const [a, b] = topics;
  const angleA = WHY_ANGLES[a] ?? a.toLowerCase();
  let note = `Saved for the theme of ${a}. This could anchor a devotional on ${angleA}.`;
  if (b) {
    const angleB = WHY_ANGLES[b] ?? b.toLowerCase();
    note += ` There's also a thread of ${b} here — ${angleB}.`;
  }
  note += " Write it the way you'd say it to a friend: honest, hopeful, and real.";
  return note;
}

/** Suggested tags/angles for display (topics + emotion + a newsletter angle). */
export function suggestTags(topics: string[], emotion: string): string[] {
  const tags = [...topics];
  if (emotion) tags.push(`emotion: ${emotion}`);
  if (topics[0]) tags.push(`angle: ${WHY_ANGLES[topics[0]] ?? topics[0]}`);
  return tags;
}
