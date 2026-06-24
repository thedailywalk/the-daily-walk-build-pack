/**
 * Bible Parallels — a warm, relatable "the Bible shows up in patterns you already
 * recognize" card for the member dashboard. Helps younger readers and new
 * believers see Scripture connect to everyday story patterns.
 *
 * TONE RULES (important): respectful, never mocking, never turning Scripture into
 * a punchline. We use familiar STORY PATTERNS / archetypes (the underdog, the
 * comeback, the mentor) — not trademarked characters or copyrighted images. The
 * card art is original/symbolic. Each entry ends by pointing back to the text.
 */

export type Parallel = {
  pattern: string; // the familiar archetype
  parallel: string; // "If this were a ___, ___ would be ___"
  truth: string; // the biblical truth it points to
  verseText: string; // public-domain (WEB)
  verseRef: string;
  emoji: string; // simple, non-trademarked symbol
};

export const FRAMING =
  "Faith can feel easier to understand when we notice how God's truth shows up in the stories and patterns we already recognize.";

export const PARALLELS: Parallel[] = [
  {
    pattern: "The overlooked underdog",
    parallel:
      "If this were an underdog sports story, David would be the rookie everyone benched — until the giant fell.",
    truth: "God often picks the person the world counts out. Your résumé isn't the limit of His plan.",
    verseText: "Yahweh doesn't see as man sees; for man looks at the outward appearance, but Yahweh looks at the heart.",
    verseRef: "1 Samuel 16:7",
    emoji: "🪨",
  },
  {
    pattern: "The trail of clues",
    parallel:
      "If this were a mystery you solve clue-by-clue, Proverbs would be the trail — each verse a small hint that grows into wisdom.",
    truth: "Wisdom isn't downloaded all at once. It's gathered one honest step at a time.",
    verseText: "The fear of Yahweh is the beginning of knowledge; but the foolish despise wisdom and instruction.",
    verseRef: "Proverbs 1:7",
    emoji: "🧭",
  },
  {
    pattern: "The coming-of-age comeback",
    parallel:
      "If this were a coming-of-age movie, Joseph would be the one who learns the pit wasn't the end of his story.",
    truth: "What looked like the worst chapter was the setup for rescue — for him and for thousands.",
    verseText: "You meant evil against me, but God meant it for good, to save many people alive.",
    verseRef: "Genesis 50:20",
    emoji: "🌅",
  },
  {
    pattern: "The reluctant hero",
    parallel:
      "If this were an epic quest, Moses would be the guy who kept listing reasons he wasn't the right pick.",
    truth: "God doesn't need you qualified. He just needs you willing — He brings the rest.",
    verseText: "Certainly I will be with you.",
    verseRef: "Exodus 3:12",
    emoji: "🔥",
  },
  {
    pattern: "The prodigal's return",
    parallel:
      "If this were a redemption arc, the lost son would be the one who hit rock bottom and found the door still open.",
    truth: "You can't out-run the Father's welcome. He's already watching the road for you.",
    verseText: "While he was still far off, his father saw him, and was moved with compassion, and ran.",
    verseRef: "Luke 15:20",
    emoji: "🏃",
  },
  {
    pattern: "The unlikely team",
    parallel:
      "If this were a ragtag-crew story, the disciples would be the mismatched group nobody would've drafted.",
    truth: "Jesus built His movement out of ordinary people. Belonging comes before being impressive.",
    verseText: "He appointed twelve, that they might be with him.",
    verseRef: "Mark 3:14",
    emoji: "⚓",
  },
  {
    pattern: "The plot twist",
    parallel:
      "If this were the twist that changes everything, the empty tomb would be the moment the whole story flips.",
    truth: "The cross looked like the end. Sunday proved it was the turning point of history.",
    verseText: "He isn't here, for he has risen, just like he said.",
    verseRef: "Matthew 28:6",
    emoji: "🌄",
  },
  {
    pattern: "The mentor and the apprentice",
    parallel:
      "If this were a passing-the-torch story, Elijah and Elisha would be the master and the student who asks for a double portion.",
    truth: "Faith is meant to be handed down. Someone poured into you so you could pour into someone else.",
    verseText: "Please let a double portion of your spirit be on me.",
    verseRef: "2 Kings 2:9",
    emoji: "🕯️",
  },
  {
    pattern: "The quiet courage",
    parallel:
      "If this were a 'for such a time as this' moment, Esther would be the one who risked everything by simply showing up.",
    truth: "Sometimes faith isn't loud. It's choosing to step forward when it would be easier to stay hidden.",
    verseText: "If I perish, I perish.",
    verseRef: "Esther 4:16",
    emoji: "👑",
  },
  {
    pattern: "The second chance",
    parallel:
      "If this were a redemption story, Peter would be the one who blew it badly — and got recommissioned anyway.",
    truth: "Failing Jesus isn't the final word. He restores people the world would've written off.",
    verseText: "Feed my sheep.",
    verseRef: "John 21:17",
    emoji: "🌊",
  },
  {
    pattern: "The night-shift wrestler",
    parallel:
      "If this were a story about wrestling your doubts, Jacob would be the one who held on through the dark and limped out blessed.",
    truth: "God can meet you in the struggle itself. Holding on honestly is its own kind of faith.",
    verseText: "I won't let you go unless you bless me.",
    verseRef: "Genesis 32:26",
    emoji: "🌙",
  },
  {
    pattern: "The small thing that mattered",
    parallel:
      "If this were a story where the little guy saves the day, it would be the boy's five loaves feeding thousands.",
    truth: "What feels too small to matter is exactly what Jesus multiplies. Bring what you have.",
    verseText: "There is a boy here who has five barley loaves and two fish.",
    verseRef: "John 6:9",
    emoji: "🍞",
  },
];

function dayOfYearPT(): number {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

/** Today's parallel — rotates deterministically by Pacific day. */
export function getParallel(): Parallel {
  return PARALLELS[(dayOfYearPT() + 5) % PARALLELS.length];
}
