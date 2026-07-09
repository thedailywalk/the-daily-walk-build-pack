/**
 * Make prose always state chapter numbers with book names.
 *
 * Readers asked that a passage is never referred to by book alone — so given
 * the day's reading reference (e.g. "Numbers 34–36, Deuteronomy 1 · Mark 12"),
 * a bare mention of one of those books in the prose ("Numbers wraps up…")
 * becomes the full reference ("Numbers 34–36 wraps up…"). Mentions that
 * already carry a chapter ("Mark 12", "Numbers 34–36") are left untouched,
 * and books not in the day's reading are never altered.
 */
export function stateChapters(
  text: string | undefined,
  readingRef: string | undefined
): string {
  const t = text ?? "";
  const ref = readingRef ?? "";
  if (!t.trim() || !ref.trim()) return t;

  // Pull "Book chapters" pairs out of the reference:
  // "Numbers 34–36" · "Deuteronomy 1" · "1 Corinthians 3" · "Song of Songs 2".
  const books = new Map<string, string>();
  const pair =
    /((?:[1-3]\s+)?[A-Z][A-Za-z]+(?:\s+of\s+[A-Z][A-Za-z]+)?)\s+(\d[\d–\-—:]*(?:\d|\b))/g;
  let m: RegExpExecArray | null;
  while ((m = pair.exec(ref))) {
    const book = m[1].trim();
    if (!books.has(book)) books.set(book, `${book} ${m[2].trim()}`);
  }

  let out = t;
  for (const [book, full] of books) {
    // Replace the bare book name only when it is NOT already followed by a
    // chapter number (or verse reference like "11:24").
    const bare = new RegExp(
      `\\b${book.replace(/\s+/g, "\\s+")}\\b(?!\\s*[\\d:])`,
      "g"
    );
    out = out.replace(bare, full);
  }
  return out;
}
