/**
 * "Word of the Day" — one Hebrew/Greek/Aramaic Bible word a day, with its deeper
 * meaning, a verse it appears in (World English Bible, public domain), and a short
 * original reflection. Rotates automatically by date. All original writing — no
 * copyrighted translations or third-party content.
 */
export type BibleWord = {
  term: string; // original script
  translit: string;
  lang: "Hebrew" | "Greek" | "Aramaic";
  gloss: string; // the quick "you think it means X…"
  meaning: string; // the fuller, original explanation
  verseRef: string;
  verseText: string; // WEB (public domain)
  reflection: string;
};

export const BIBLE_WORDS: BibleWord[] = [
  { term: "שָׁלוֹם", translit: "shalom", lang: "Hebrew", gloss: "We translate it “peace.”", meaning: "It's far bigger than calm — it means wholeness, completeness, nothing missing and nothing broken. Shalom is everything set right.", verseRef: "Numbers 6:26", verseText: "Yahweh lift up his face toward you, and give you peace.", reflection: "God doesn't just want you calm; He wants you whole." },
  { term: "חֶסֶד", translit: "hesed", lang: "Hebrew", gloss: "Often “lovingkindness.”", meaning: "Loyal, covenant love that refuses to quit — the love that keeps showing up when you've given it every reason to leave.", verseRef: "Lamentations 3:22", verseText: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail.", reflection: "His love for you isn't a mood. It's a covenant." },
  { term: "ἀγάπη", translit: "agapē", lang: "Greek", gloss: "The Bible's word for “love.”", meaning: "Not a feeling you fall into — a chosen, self-giving love that seeks the good of the other no matter the cost. The love that went to a cross.", verseRef: "1 John 4:8", verseText: "He who doesn't love doesn't know God, for God is love.", reflection: "You were loved like this before you did a single thing right." },
  { term: "χάρις", translit: "charis", lang: "Greek", gloss: "“Grace.”", meaning: "Undeserved favor — a gift you could never earn and never repay, given freely anyway. The whole gospel in one word.", verseRef: "Ephesians 2:8", verseText: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God.", reflection: "Stop trying to earn what was always meant to be a gift." },
  { term: "רוּחַ", translit: "ruach", lang: "Hebrew", gloss: "“Spirit” — but also…", meaning: "Breath, wind, and Spirit all at once. The same word for the wind in the trees, the breath in your lungs, and the Spirit of God hovering over creation.", verseRef: "Genesis 1:2", verseText: "God's Spirit was hovering over the surface of the waters.", reflection: "The breath in your chest right now is on loan from God." },
  { term: "אַבָּא", translit: "abba", lang: "Aramaic", gloss: "“Father” — but closer.", meaning: "The intimate, tender word a child uses — closer to “Daddy” than “Father.” It's the name Jesus prayed, and the one He hands to you.", verseRef: "Romans 8:15", verseText: "you received the Spirit of adoption, by whom we cry, “Abba! Father!”", reflection: "You don't approach God as a stranger. You come as a child." },
  { term: "נֶפֶשׁ", translit: "nephesh", lang: "Hebrew", gloss: "Usually “soul.”", meaning: "Your whole living self — not a ghost trapped in a body, but the entire you: breath, desire, life. God cares about all of you, not just a religious part.", verseRef: "Psalm 103:1", verseText: "Praise Yahweh, my soul! All that is within me, praise his holy name!", reflection: "God wants the whole you — not a tidied-up version." },
  { term: "אֱמוּנָה", translit: "emunah", lang: "Hebrew", gloss: "“Faithfulness.”", meaning: "Firmness, steadiness, something you can lean your full weight on. Faith isn't a feeling here — it's the reliability of the One you're trusting.", verseRef: "Lamentations 3:23", verseText: "They are new every morning. Great is your faithfulness.", reflection: "Your faith is only as steady as the One it rests on — and He's unshakable." },
  { term: "תִּקְוָה", translit: "tikvah", lang: "Hebrew", gloss: "“Hope.”", meaning: "The same word as a cord or rope — hope is the lifeline you hold when you can't see the shore. Not wishful thinking; a tether to God.", verseRef: "Jeremiah 29:11", verseText: "thoughts of peace, and not of evil, to give you hope and a future.", reflection: "Hope isn't a feeling you muster. It's a rope you hold." },
  { term: "σῴζω", translit: "sōzō", lang: "Greek", gloss: "“To save.”", meaning: "One word that means to rescue, to heal, and to make whole — all at once. When Jesus saves, He's not just forgiving; He's restoring everything.", verseRef: "Luke 7:50", verseText: "He said to the woman, “Your faith has saved you. Go in peace.”", reflection: "Salvation isn't only forgiveness — it's being made whole." },
  { term: "יָדַע", translit: "yada", lang: "Hebrew", gloss: "“To know.”", meaning: "Not facts-in-your-head knowing — deep, personal, experiential knowing. To truly know God, and stunningly, to be fully known by Him.", verseRef: "Psalm 46:10", verseText: "Be still, and know that I am God.", reflection: "God doesn't want to be studied from a distance. He wants to be known." },
  { term: "κοινωνία", translit: "koinōnia", lang: "Greek", gloss: "“Fellowship.”", meaning: "Deep sharing-in-common — real life shared, not polite small talk. It's what the early church had: everything held in common, hearts wide open.", verseRef: "Acts 2:42", verseText: "They continued steadfastly in the apostles' teaching and fellowship, in the breaking of bread, and prayer.", reflection: "You were never meant to walk this road alone." },
  { term: "μετάνοια", translit: "metanoia", lang: "Greek", gloss: "“Repentance.”", meaning: "Not groveling or shame — literally a changed mind, a turn in direction. Less “feel terrible,” more “come home.”", verseRef: "Acts 3:19", verseText: "Repent therefore, and turn again, that your sins may be blotted out.", reflection: "Repentance isn't punishment. It's a U-turn toward home." },
  { term: "καιρός", translit: "kairos", lang: "Greek", gloss: "“Time” — a special kind.", meaning: "Not clock-time (that's chronos) — the right moment, the appointed opportunity. God's timing isn't slow; it's exact.", verseRef: "Galatians 6:9", verseText: "for we will reap in due season, if we don't give up.", reflection: "You're not behind. You're in God's timing." },
  { term: "ζωή", translit: "zōē", lang: "Greek", gloss: "“Life.”", meaning: "Not mere existence — the abundant, overflowing, eternal kind of life that comes from God Himself. The life you were actually made for.", verseRef: "John 10:10", verseText: "I came that they may have life, and may have it abundantly.", reflection: "Jesus didn't come to make you religious. He came to make you alive." },
  { term: "עִמָּנוּאֵל", translit: "immanuel", lang: "Hebrew", gloss: "A name.", meaning: "Literally “God with us.” Not God watching from a distance — God who moved in, stepped into the mess, and stayed.", verseRef: "Isaiah 7:14", verseText: "Behold, the virgin will conceive, and bear a son, and shall call his name Immanuel.", reflection: "Whatever today holds, the headline is still: God is with you." },
  { term: "שְׁמַע", translit: "shema", lang: "Hebrew", gloss: "“Hear.”", meaning: "To hear in a way that leads to doing — listening that changes how you live. For Israel it was the daily call to remember who God is.", verseRef: "Deuteronomy 6:4", verseText: "Hear, Israel: Yahweh is our God. Yahweh is one.", reflection: "Hearing God and obeying Him were never two separate things." },
  { term: "מַכָּרִיוֹס", translit: "makarios", lang: "Greek", gloss: "“Blessed” / “happy.”", meaning: "A deep, settled flourishing that doesn't depend on circumstances — the kind Jesus pronounced over the poor, the mourning, the meek.", verseRef: "Matthew 5:3", verseText: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven.", reflection: "God's idea of a blessed life looks nothing like the world's." },
];

function dayOfYearPT(): number {
  const d = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

/** Today's word (rotates daily, deterministic by date). */
export function getWordOfTheDay(): BibleWord {
  return BIBLE_WORDS[(dayOfYearPT() - 1 + BIBLE_WORDS.length * 999) % BIBLE_WORDS.length];
}
