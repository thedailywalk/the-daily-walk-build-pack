import { describe, it, expect } from "vitest";
import { fullDevotionalFor } from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";

describe("devotional full-content generation", () => {
  const required = [
    "weekFocus",
    "readingHeading",
    "readingRef",
    "readingIntro",
    "verseText",
    "verseRef",
    "readingAfter",
    "makeItRealHeading",
    "makeItRealBody",
    "question",
    "prayer",
    "communityText",
    "ctaLabel",
    "closingLine",
  ] as const;

  it("fills every section for a range of dates", () => {
    const dates = ["2026-01-01", "2026-06-23", "2026-09-15", "2026-12-31"];
    for (const date of dates) {
      const d = fullDevotionalFor(date);
      for (const f of required) {
        expect(String(d[f] ?? "").trim(), `${date} ${f}`).not.toBe("");
      }
      // verse should have real text + a reference
      expect(d.verseText!.length).toBeGreaterThan(8);
      expect(d.verseRef!).toMatch(/\d/);
    }
  });

  it("adds a Pastor's Take on Wednesdays", () => {
    // 2026-06-24 is a Wednesday
    expect(fullDevotionalFor("2026-06-24").pastorTake?.trim()).toBeTruthy();
    // 2026-06-23 (Tuesday) has none
    expect(fullDevotionalFor("2026-06-23").pastorTake).toBeUndefined();
  });

  it("renders a full issue (not a snippet)", () => {
    const data = fullDevotionalFor("2026-06-23");
    const html = renderDevotionalHtml({ date: "2026-06-23", status: "draft", title: "", data });
    expect(html).toContain("DAILY DEVOTIONAL");
    expect(html).toContain("Today's Reading");
    expect(html).toContain("A Prayer for Today");
    expect(html.length).toBeGreaterThan(2000);
  });
});
