import "server-only";

/**
 * Topic → fitting scriptures, used to SUGGEST verses for a day's theme.
 * Text here is World English Bible (public domain) — safe to publish. The
 * Amplified Bible is used only as a private study lens via the owner's own
 * saved notes (see library.ts / getDevotionalReferences); its text is never
 * stored or published here.
 */
export type SuggestedVerse = { ref: string; text: string };

export const SUGGESTED_VERSES: Record<string, SuggestedVerse[]> = {
  Anxiety: [
    { ref: "Philippians 4:6-7", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God will guard your hearts and minds in Christ Jesus." },
    { ref: "1 Peter 5:7", text: "casting all your worries on him, because he cares for you." },
    { ref: "Matthew 6:34", text: "Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself." },
  ],
  Forgiveness: [
    { ref: "Ephesians 4:32", text: "And be kind to one another, tender hearted, forgiving each other, just as God also in Christ forgave you." },
    { ref: "Colossians 3:13", text: "bearing with one another, and forgiving each other... as Christ forgave you, so you also do." },
    { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness." },
  ],
  Discipline: [
    { ref: "Hebrews 12:11", text: "All chastening seems for the present to be not joyous but grievous; yet afterward it yields the peaceful fruit of righteousness to those who have been trained by it." },
    { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control." },
    { ref: "Proverbs 25:28", text: "Like a city that is broken down and without walls is a man whose spirit is without restraint." },
  ],
  Obedience: [
    { ref: "John 14:15", text: "If you love me, keep my commandments." },
    { ref: "James 1:22", text: "But be doers of the word, and not only hearers, deluding your own selves." },
    { ref: "1 Samuel 15:22", text: "Behold, to obey is better than sacrifice, and to listen than the fat of rams." },
  ],
  "Spiritual Warfare": [
    { ref: "Ephesians 6:11", text: "Put on the whole armor of God, that you may be able to stand against the wiles of the devil." },
    { ref: "James 4:7", text: "Be subject therefore to God. Resist the devil, and he will flee from you." },
    { ref: "1 Peter 5:8", text: "Be sober and self-controlled. Be watchful. Your adversary, the devil, walks around like a roaring lion, seeking whom he may devour." },
  ],
  Love: [
    { ref: "1 John 4:19", text: "We love him, because he first loved us." },
    { ref: "1 Corinthians 13:4", text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud." },
    { ref: "Romans 5:8", text: "But God commends his own love toward us, in that while we were yet sinners, Christ died for us." },
  ],
  Healing: [
    { ref: "Psalm 147:3", text: "He heals the broken in heart, and binds up their wounds." },
    { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit." },
    { ref: "Jeremiah 17:14", text: "Heal me, O Yahweh, and I will be healed. Save me, and I will be saved." },
  ],
  Grief: [
    { ref: "Matthew 5:4", text: "Blessed are those who mourn, for they shall be comforted." },
    { ref: "Psalm 30:5", text: "Weeping may stay for the night, but joy comes in the morning." },
    { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes. Death will be no more." },
  ],
  Identity: [
    { ref: "Psalm 139:14", text: "I will give thanks to you, for I am fearfully and wonderfully made." },
    { ref: "2 Corinthians 5:17", text: "Therefore if anyone is in Christ, he is a new creation. The old things have passed away." },
    { ref: "1 Peter 2:9", text: "But you are a chosen race, a royal priesthood, a holy nation, a people for God's own possession." },
  ],
  Purpose: [
    { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future." },
    { ref: "Ephesians 2:10", text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared before that we would walk in them." },
    { ref: "Romans 8:28", text: "We know that all things work together for good for those who love God, for those who are called according to his purpose." },
  ],
  Confidence: [
    { ref: "Joshua 1:9", text: "Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go." },
    { ref: "Philippians 4:13", text: "I can do all things through Christ, who strengthens me." },
    { ref: "Isaiah 41:10", text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you." },
  ],
  Wisdom: [
    { ref: "James 1:5", text: "But if any of you lacks wisdom, let him ask of God, who gives to all liberally without reproach, and it will be given to him." },
    { ref: "Proverbs 3:5-6", text: "Trust in Yahweh with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight." },
    { ref: "Proverbs 9:10", text: "The fear of Yahweh is the beginning of wisdom." },
  ],
  Prayer: [
    { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
    { ref: "Philippians 4:6", text: "In everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
    { ref: "James 5:16", text: "The insistent prayer of a righteous person is powerfully effective." },
  ],
  Faith: [
    { ref: "Hebrews 11:1", text: "Now faith is assurance of things hoped for, proof of things not seen." },
    { ref: "Romans 10:17", text: "So faith comes by hearing, and hearing by the word of God." },
    { ref: "Mark 9:24", text: "I believe. Help my unbelief!" },
  ],
  Relationships: [
    { ref: "Proverbs 27:17", text: "Iron sharpens iron; so a man sharpens his friend's countenance." },
    { ref: "Ephesians 4:2-3", text: "with all lowliness and humility, with patience, bearing with one another in love." },
    { ref: "Colossians 3:14", text: "Above all these things, walk in love, which is the bond of perfection." },
  ],
  Anger: [
    { ref: "James 1:19-20", text: "let every man be swift to hear, slow to speak, and slow to anger; for the anger of man doesn't produce the righteousness of God." },
    { ref: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    { ref: "Ephesians 4:26", text: "Be angry, and don't sin. Don't let the sun go down on your wrath." },
  ],
};

/** Suggested verses for a set of topics (deduped by reference). */
export function suggestVersesForTopics(topics: string[], limit = 6): SuggestedVerse[] {
  const out: SuggestedVerse[] = [];
  const seen = new Set<string>();
  for (const t of topics) {
    for (const v of SUGGESTED_VERSES[t] ?? []) {
      if (seen.has(v.ref)) continue;
      seen.add(v.ref);
      out.push(v);
      if (out.length >= limit) return out;
    }
  }
  return out;
}
