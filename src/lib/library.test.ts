import { describe, it, expect } from "vitest";
import { getDevotionalReferences } from "@/lib/library";
import { TOPICS, CONTENT_TYPES } from "@/lib/library";

describe("content library — behind the devotional", () => {
  it("derives topics + scriptures + explanation for a date", async () => {
    const r = await getDevotionalReferences("2026-06-23");
    expect(r.topics.length).toBeGreaterThan(0);
    expect(r.topics.every((t) => (TOPICS as readonly string[]).includes(t))).toBe(true);
    expect(r.scriptures.length).toBeGreaterThan(0);
    expect(r.explanation).toContain("Detected themes");
    // with no DB configured in tests, items/sources are empty and topics read as thin
    expect(Array.isArray(r.items)).toBe(true);
    expect(Array.isArray(r.sources)).toBe(true);
  });

  it("exposes the category + content-type vocabularies", () => {
    expect(TOPICS).toContain("Forgiveness");
    expect(TOPICS).toContain("Spiritual Warfare");
    expect(CONTENT_TYPES).toContain("sermon notes");
  });
});
