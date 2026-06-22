import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Original Daily Walk study-guide content (12 fields per day). Authored entries
 * live in AUTHORED; any day without one falls back to a warm template built from
 * the reading plan, so every day renders. All wording is original to The Daily Walk.
 */
export type KeyWord = { word: string; meaning: string };
export type SideVerse = { ref: string; text: string; meaning: string };

export type StudyDay = {
  day: number;
  reading: string;
  arc: string;
  context: string;
  plainEnglish: string;
  aboutGod: string;
  aboutPeople: string;
  realLife: string;
  verse: string;
  reflection: string;
  prayer: string;
  step: string;
  /** side cards: 1–2 key words explained, 1–2 healing verses, a gentle reflection */
  keyWords: KeyWord[];
  verses: SideVerse[];
  sideReflection: string;
  authored: boolean;
};

type PlanRow = { day: number; arc: string; theme: string; reading: string };

let planCache: PlanRow[] | null = null;
function plan(): PlanRow[] {
  if (!planCache) {
    const file = path.join(
      process.cwd(),
      "reading-plan",
      "bible-in-a-year.json"
    );
    planCache = JSON.parse(fs.readFileSync(file, "utf8")) as PlanRow[];
  }
  return planCache;
}

const AUTHORED: Record<number, Omit<StudyDay, "day" | "reading" | "arc" | "authored">> = {
  1: {
    context:
      "Most stories about Jesus start with a baby in a manger. John doesn't. He rewinds all the way past the manger, past history, past the very first sunrise — back to before there was a “before.”\n\nThis was written by John: one of Jesus' closest friends, the guy who literally leaned on Him at dinner. He's not handing you a rulebook or a religion. He's introducing you to a Person — like a friend grabbing your shoulder and saying, “Before you decide what you think about Jesus, let me actually show you who He is.”\n\nThat's why we start here. Not with rules. Not with “try harder.” With Him.",
    plainEnglish:
      "John reaches for the biggest word he can find and calls Jesus “the Word” — the voice behind everything. The same voice that said “let there be light” and a whole universe showed up. Now picture that voice… in sandals. Getting tired. Eating breakfast with fishermen. The God who spoke galaxies into existence didn't stay safely far away — He stepped into the room.\n\nAnd John keeps using one picture: light. Not a lecture about light — light itself, walking into a pitch-black room. Here's the thing about a dark room: you don't have to fix the dark, argue with it, or tidy up before the light comes. You just stop blocking the window.\n\nJohn says most people kept the curtains shut and walked right past Him. But some didn't. Some let the light in — and it rewrote who they were allowed to become: not God's employees earning a paycheck, but God's actual kids who already belong.",
    aboutGod: "He didn't stay distant. He moved into the neighborhood.",
    aboutPeople:
      "We're prone to miss God even when He's standing right in front of us — and grace comes looking anyway.",
    realLife:
      "You don't have to clean yourself up first. Day 1 isn't “try harder.” It's “come closer.”",
    verse:
      "“The light shines in the darkness, and the darkness hasn't overcome it.” — John 1:5",
    reflection:
      "Which part of your life feels most like a dark room right now — and what would letting a little light in look like?",
    prayer:
      "Jesus, before I try to be good enough, just meet me here. Be the light in the rooms I keep shut. Amen.",
    step: "Tell one person, “I started reading about Jesus today.” Naming it makes it real.",
    keyWords: [
      {
        word: "The Word",
        meaning:
          "When John calls Jesus “the Word,” he means God making Himself known — the invisible God you can finally see and hear. Jesus isn't a message about God; He is God, speaking, close enough to know.",
      },
      {
        word: "Light",
        meaning:
          "Not a soft glow you admire from far away — the kind that fills a room and changes what you can see. Light here means God's nearness and truth, showing up in the very places fear told you to keep dark.",
      },
    ],
    verses: [
      {
        ref: "Isaiah 9:2",
        text: "The people who walked in darkness have seen a great light.",
        meaning:
          "You don't have to manufacture your own hope. The light comes to you. However dark this season feels, God has a way of finding people right where they are.",
      },
      {
        ref: "Matthew 11:28",
        text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
        meaning:
          "Notice He doesn't say “fix yourself first.” The invitation is to come tired, come heavy, come as you are — and let Him carry what you can't.",
      },
    ],
    sideReflection:
      "Where am I keeping the curtains shut — trying to handle life in my own strength — and what would it look like to let a little of God's light in there today?",
  },
};

export function getStudyDay(day: number): StudyDay {
  const row = plan().find((r) => r.day === day) ?? plan()[0];
  const a = AUTHORED[day];
  if (a) {
    return { day: row.day, reading: row.reading, arc: row.arc, authored: true, ...a };
  }
  // Graceful, original fallback until this day is hand-written.
  return {
    day: row.day,
    reading: row.reading,
    arc: row.arc,
    authored: false,
    context: `Today we're in ${row.reading}. Theme for this stretch: ${row.theme}.`,
    plainEnglish:
      "A plain-English walk-through for this reading is on its way. For now, read slowly and notice one thing that stands out.",
    aboutGod: "Watch for what today's reading reveals about who God is.",
    aboutPeople: "Watch for what it reveals about people — including you.",
    realLife: "Ask: what's one way this could change how I live today?",
    verse: "Pick one verse from today's reading to carry with you.",
    reflection: "What's one thing God might be saying to you here?",
    prayer: "God, open my eyes to see You in what I read today. Amen.",
    step: "Do one small thing today that puts this reading into practice.",
    keyWords: [
      {
        word: "Grace",
        meaning:
          "Not a reward you earn by being good enough, but a gift God keeps giving before you've cleaned anything up. You're met as you are.",
      },
    ],
    verses: [
      {
        ref: "Matthew 11:28",
        text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
        meaning:
          "He doesn't ask you to fix yourself first. Come tired, come heavy, come as you are — and let Him carry what you can't.",
      },
    ],
    sideReflection: "Where do I most need God to meet me today?",
  };
}
