"use client";

import { useState } from "react";
import type { PopularVerse } from "@/lib/popularVerses";

type Current = { id: string; ref: string; verseText: string } | null;

/**
 * Dashboard memory flashcard. With a current verse it shows a tap-to-flip card
 * (reference ↔ full verse) and a "Change" option. With none, it offers the
 * "＋ Memorize a verse" button that opens popular-verse suggestions plus a
 * custom-entry field. One verse at a time.
 */
export default function MemoryFlashcard({
  current,
  popular,
  setAction,
  clearAction,
}: {
  current: Current;
  popular: PopularVerse[];
  setAction: (fd: FormData) => void | Promise<void>;
  clearAction: (fd: FormData) => void | Promise<void>;
}) {
  const [flipped, setFlipped] = useState(false);
  const [picking, setPicking] = useState(false);

  if (current) {
    const hasText = !!current.verseText?.trim();
    return (
      <div className="m-flash">
        <span className="m-flash-eyebrow">📖 Your memory verse</span>
        <button
          type="button"
          className={`m-flash-card${flipped ? " is-flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          aria-label="Flip flashcard"
        >
          {flipped && hasText ? (
            <span className="m-flash-text">&ldquo;{current.verseText}&rdquo;</span>
          ) : (
            <span className="m-flash-ref">{current.ref}</span>
          )}
          <span className="m-flash-hint">
            {flipped ? "tap for the reference" : hasText ? "tap to reveal the verse" : current.ref}
          </span>
        </button>
        <form action={clearAction} className="m-flash-foot">
          <input type="hidden" name="id" value={current.id} />
          <button type="submit" className="m-flash-change">Change verse</button>
        </form>
      </div>
    );
  }

  if (!picking) {
    return (
      <div className="m-flash">
        <button type="button" className="m-flash-add" onClick={() => setPicking(true)}>
          ＋ Memorize a verse
        </button>
      </div>
    );
  }

  return (
    <div className="m-flash m-flash-picking">
      <span className="m-flash-eyebrow">Pick a verse to hide in your heart</span>
      <div className="m-flash-chips">
        {popular.map((v) => (
          <form action={setAction} key={v.ref}>
            <input type="hidden" name="ref" value={v.ref} />
            <input type="hidden" name="verseText" value={v.text} />
            <button type="submit" className="m-flash-chip" title={v.text}>
              {v.ref}
            </button>
          </form>
        ))}
      </div>
      <form action={setAction} className="m-flash-custom">
        <input name="ref" placeholder="Or your own — e.g. Joshua 1:9" className="m-flash-input" required />
        <input name="verseText" placeholder="Verse text (optional)" className="m-flash-input" />
        <button type="submit" className="btn btn-gold">Add</button>
      </form>
      <button type="button" className="m-flash-change" onClick={() => setPicking(false)}>
        Cancel
      </button>
    </div>
  );
}
