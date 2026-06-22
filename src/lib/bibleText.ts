import "server-only";

/**
 * Public-domain Scripture text (WEB / KJV) for a day's reading, via the free
 * bible-api.com. Cached 30 days (the text never changes). Used to show the
 * passage in-app; "use my own Bible" shows only the reference (no fetch).
 */
export type Passage = {
  reference: string;
  verses: { ref: string; text: string }[];
};

export type Translation = "web" | "kjv";

export async function fetchPassage(
  reference: string,
  translation: Translation
): Promise<Passage | null> {
  try {
    const url = `https://bible-api.com/${encodeURIComponent(
      reference
    )}?translation=${translation}`;
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 * 30 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      reference: string;
      verses?: { chapter: number; verse: number; text: string }[];
    };
    return {
      reference: data.reference,
      verses: (data.verses ?? []).map((v) => ({
        ref: `${v.chapter}:${v.verse}`,
        text: (v.text ?? "").replace(/\s+/g, " ").trim(),
      })),
    };
  } catch {
    return null;
  }
}
