/**
 * Question of the Day — a short, encouraging, faith-based reflection poll for the
 * member dashboard. One question a day, a few quick choices. Meant to make
 * someone pause and reflect, never cheesy or preachy.
 *
 * Rotates deterministically by Pacific day. (An admin pick/schedule studio can
 * later override the daily choice — this bank is the default rotation.)
 */

export type Poll = { question: string; options: string[] };

export const QUESTIONS: Poll[] = [
  { question: "What helps you feel closest to God in the morning?", options: ["Prayer", "Worship", "Scripture", "Quiet & coffee", "A walk"] },
  { question: "Which area are you asking God to grow you in right now?", options: ["Patience", "Trust", "Self-control", "Courage", "Love for others"] },
  { question: "What part of your faith walk feels hardest this week?", options: ["Consistency", "Waiting on God", "Forgiving someone", "Doubt", "Staying hopeful"] },
  { question: "Which practice keeps you most grounded?", options: ["Prayer", "Worship", "Journaling", "Scripture", "Serving"] },
  { question: "What do you need most from God today?", options: ["Peace", "Courage", "Patience", "Clarity", "Rest"] },
  { question: "Where did you notice God this week?", options: ["In a person", "In nature", "In Scripture", "In a hard moment", "In an answered prayer"] },
  { question: "What's the truest thing about you right now?", options: ["Loved", "Forgiven", "Held", "Being made new", "Not alone"] },
  { question: "How do you most want to grow as a friend of God?", options: ["Listen more", "Worry less", "Pray bolder", "Obey sooner", "Rest deeper"] },
  { question: "What's stealing your peace lately?", options: ["The future", "A relationship", "Money", "Comparison", "My own thoughts"] },
  { question: "Which name of God do you need to remember today?", options: ["Provider", "Healer", "Shepherd", "Comforter", "Father"] },
  { question: "What would 'trusting God' actually look like for you today?", options: ["Letting go of control", "Forgiving", "Taking a risk", "Resting", "Asking for help"] },
  { question: "When do you find it easiest to pray?", options: ["Morning", "On a walk", "At night", "In a crisis", "While driving"] },
  { question: "What are you most grateful for right now?", options: ["People I love", "A second chance", "Small mercies", "My health", "God's patience"] },
  { question: "Which fruit of the Spirit do you want more of?", options: ["Love", "Joy", "Peace", "Patience", "Kindness"] },
  { question: "How is your heart, honestly, today?", options: ["Hopeful", "Tired", "Anxious", "Peaceful", "Searching"] },
  { question: "What helps you remember God is near?", options: ["A verse", "Worship music", "A friend", "Nature", "Looking back at His help"] },
];

function dayOfYearPT(): number {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

/** Today's question (deterministic by Pacific day). */
export function getTodayQuestion(): Poll {
  return QUESTIONS[dayOfYearPT() % QUESTIONS.length];
}

/** YYYY-MM-DD for today in Pacific time — the poll's storage key. */
export function pollDate(): string {
  const pt = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const y = pt.getFullYear();
  const m = String(pt.getMonth() + 1).padStart(2, "0");
  const d = String(pt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
