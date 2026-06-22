// Generates the Jesus-first "Bible in a Year" reading plan (365 days, all 66 books)
// in The Daily Walk's order: John -> Romans -> Psalms -> Proverbs -> Acts -> whole Bible.
// Output: reading-plan/bible-in-a-year.json   (run: node scripts/build-bible-plan.mjs)
import { writeFileSync } from "node:fs";

const CH = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36,
  Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
  Ecclesiastes: 12, "Song of Solomon": 8, Isaiah: 66, Jeremiah: 52,
  Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9,
  Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3,
  Haggai: 2, Zechariah: 14, Malachi: 4, Matthew: 28, Mark: 16, Luke: 24,
  John: 21, Acts: 28, Romans: 16, "1 Corinthians": 16, "2 Corinthians": 13,
  Galatians: 6, Ephesians: 6, Philippians: 4, Colossians: 4,
  "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6, "2 Timothy": 4,
  Titus: 3, Philemon: 1, Hebrews: 13, James: 5, "1 Peter": 5, "2 Peter": 3,
  "1 John": 5, "2 John": 1, "3 John": 1, Jude: 1, Revelation: 22,
};

// ["Book", chapter] tuples for a whole book
const book = (name) =>
  Array.from({ length: CH[name] }, (_, i) => [name, i + 1]);

// Compress a run of [book,ch] into "Book a-c" ranges, joined by ", "
function label(tuples) {
  const parts = [];
  let i = 0;
  while (i < tuples.length) {
    const [b] = tuples[i];
    let j = i;
    while (j + 1 < tuples.length && tuples[j + 1][0] === b) j++;
    const from = tuples[i][1];
    const to = tuples[j][1];
    parts.push(from === to ? `${b} ${from}` : `${b} ${from}-${to}`);
    i = j + 1;
  }
  return parts.join(", ");
}

const days = [];
const push = (arc, theme, tuples) =>
  days.push({ day: days.length + 1, arc, theme, reading: label(tuples) });

// Arc 1 — John (days 1–21), one chapter a day
for (let c = 1; c <= 21; c++)
  push("John", "Start with Jesus", [["John", c]]);

// Arc 2 — Romans (days 22–37)
for (let c = 1; c <= 16; c++)
  push("Romans", "Why Jesus came — grace, not performance", [["Romans", c]]);

// Arc 3 — Psalms (days 38–87), three psalms a day = all 150
for (let c = 1; c <= 150; c += 3)
  push("Psalms", "Honest prayer", [
    ["Psalms", c], ["Psalms", c + 1], ["Psalms", c + 2],
  ].filter(([, n]) => n <= 150));

// Arc 4 — Proverbs (days 88–118)
for (let c = 1; c <= 31; c++)
  push("Proverbs", "Everyday wisdom", [["Proverbs", c]]);

// Arc 5 — Acts (days 119–146)
for (let c = 1; c <= 28; c++)
  push("Acts", "The church in action", [["Acts", c]]);

// Arc 6 — the whole story (days 147–365): blend OT + NT each day
const OT_BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges",
  "Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles",
  "Ezra","Nehemiah","Esther","Job","Ecclesiastes","Song of Solomon","Isaiah",
  "Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah",
  "Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
]; // Psalms + Proverbs already done
const NT_BOOKS = [
  "Matthew","Mark","Luke","1 Corinthians","2 Corinthians","Galatians",
  "Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians",
  "1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter",
  "2 Peter","1 John","2 John","3 John","Jude","Revelation",
]; // John, Romans, Acts already done
const ot = OT_BOOKS.flatMap(book);
const nt = NT_BOOKS.flatMap(book);

const REMAIN = 365 - days.length; // 219
const otRate = ot.length / REMAIN;
const ntRate = nt.length / REMAIN;
let otAcc = 0, ntAcc = 0, oi = 0, ni = 0;

for (let d = 0; d < REMAIN; d++) {
  otAcc += otRate;
  ntAcc += ntRate;
  const last = d === REMAIN - 1;
  let otTake = last ? ot.length - oi : Math.round(otAcc);
  let ntTake = last ? nt.length - ni : Math.round(ntAcc);
  const otSlice = ot.slice(oi, oi + otTake);
  const ntSlice = nt.slice(ni, ni + ntTake);
  oi += otSlice.length; otAcc -= otSlice.length;
  ni += ntSlice.length; ntAcc -= ntSlice.length;
  const reading = [label(otSlice), label(ntSlice)].filter(Boolean).join(" · ");
  push("The whole story", "The whole story, start to finish", [])
  days[days.length - 1].reading = reading;
}

// ---- verify ----
if (days.length !== 365) throw new Error(`expected 365 days, got ${days.length}`);
const allText = days.map((d) => d.reading).join(" | ");
const missing = Object.keys(CH).filter((b) => !allText.includes(b));
// "Song of Solomon" etc are substrings safe; check book coverage by token
if (missing.length) throw new Error("missing books: " + missing.join(", "));
if (oi !== ot.length) throw new Error(`OT not fully covered: ${oi}/${ot.length}`);
if (ni !== nt.length) throw new Error(`NT not fully covered: ${ni}/${nt.length}`);

writeFileSync(
  new URL("../reading-plan/bible-in-a-year.json", import.meta.url),
  JSON.stringify(days, null, 2)
);
console.log(`✓ wrote 365 days; all 66 books covered; OT ${oi} ch, NT ${ni} ch`);
console.log("Day 1:", days[0].reading, "| Day 147:", days[146].reading, "| Day 365:", days[364].reading);
