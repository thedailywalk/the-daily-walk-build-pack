import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Original Daily Walk study-guide content (12 fields per day). Authored entries
 * live in AUTHORED; any day without one falls back to a warm template built from
 * the reading plan, so every day renders. All wording is original to The Daily Walk.
 */
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
      "John doesn't start with a manger — it starts before time itself, written by one of Jesus' closest friends. It's the clearest “here's who Jesus actually is” in the whole Bible. Best possible place to begin.",
    plainEnglish:
      "John calls Jesus “the Word” — God's own voice that spoke the universe into being, now showing up as a real person you could share a meal with. Light walks into a dark room. Most people miss it. Some don't.",
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
  };
}
