import { describe, it, expect } from "vitest";
import { getStudyDay } from "@/lib/studyGuide";

// Every day of the year should have full, original authored content.
describe("study guide content", () => {
  const days = Array.from({ length: 365 }, (_, i) => i + 1);

  it("has an authored entry for all 365 days", () => {
    const notAuthored = days.filter((d) => !getStudyDay(d).authored);
    expect(notAuthored).toEqual([]);
  });

  it("every entry has all 12 fields populated", () => {
    const textFields = [
      "context",
      "plainEnglish",
      "aboutGod",
      "aboutPeople",
      "realLife",
      "verse",
      "reflection",
      "prayer",
      "step",
      "sideReflection",
    ] as const;

    const problems: string[] = [];
    for (const d of days) {
      const e = getStudyDay(d);
      for (const f of textFields) {
        if (!String(e[f] ?? "").trim()) problems.push(`Day ${d}: empty ${f}`);
      }
      if (!Array.isArray(e.keyWords) || e.keyWords.length < 1)
        problems.push(`Day ${d}: no keyWords`);
      if (!Array.isArray(e.verses) || e.verses.length < 1)
        problems.push(`Day ${d}: no verses`);
      e.keyWords?.forEach((k, i) => {
        if (!k.word?.trim() || !k.meaning?.trim())
          problems.push(`Day ${d}: keyWord ${i} incomplete`);
      });
      e.verses?.forEach((v, i) => {
        if (!v.ref?.trim() || !v.text?.trim() || !v.meaning?.trim())
          problems.push(`Day ${d}: verse ${i} incomplete`);
      });
      // the headline "verse" field should carry a reference (em dash + book)
      if (!e.verse.includes("—")) problems.push(`Day ${d}: verse missing reference`);
    }
    expect(problems).toEqual([]);
  });

  it("reading comes through for the bookends", () => {
    expect(getStudyDay(1).reading).toMatch(/John/);
    expect(getStudyDay(365).reading).toMatch(/Revelation/);
  });
});
