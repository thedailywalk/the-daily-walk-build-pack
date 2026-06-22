/** Shared "Arm yourself" how-to-study tips — used on the homepage and in the
 *  member portal (as a compact carousel). Plain data, safe in client or server. */
export type StudyTip = {
  icon: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
};

export const studyTips: StudyTip[] = [
  {
    icon: "🌅",
    title: "Start in the morning",
    body: "Arm yourself before the day comes at you — first thing, before the noise. Mornings full? Night works too. Just find a window that's yours.",
  },
  {
    icon: "🙏",
    title: "Pray before you read",
    body: "Ask God for two things: understanding, so your eyes open to it — and discernment, so you can tell real teaching from someone's own opinion.",
  },
  {
    icon: "✍️",
    title: "Take notes as you go",
    body: "A journaling Bible or a simple notebook works. Highlight in colors that contrast ideas — Proverbs is full of wise vs. foolish. Writing it down makes it stick.",
  },
  {
    icon: "🎧",
    title: "Get the context",
    body: "A good teacher makes it click. We love David Guzik's Enduring Word — free, chapter-by-chapter and verse-by-verse, with the history behind every passage:",
    link: { label: "Enduring Word", href: "https://enduringword.com" },
  },
  {
    icon: "📖",
    title: "Compare translations",
    body: "Stuck on a verse? Read it in another version — ESV, KJV, NLT side by side — and the meaning often opens right up.",
  },
  {
    icon: "🕊️",
    title: "Keep a prayer journal",
    body: "Write your prayers out, don't just say them. It helps you process what you're feeling — and remember what God has done.",
  },
];
