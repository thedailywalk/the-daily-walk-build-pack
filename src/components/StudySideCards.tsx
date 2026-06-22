"use client";

import { useState } from "react";
import type { KeyWord, SideVerse } from "@/lib/studyGuide";
import { toggleFavoriteAction } from "@/app/journey/actions";

// Gentle side cards: key-word depth, healing verses (clickable + savable), a reflection.
export default function StudySideCards({
  title,
  words,
  verses,
  reflection,
  synced = false,
  day = null,
  favRefs = [],
}: {
  title: string;
  words?: KeyWord[];
  verses?: SideVerse[];
  reflection?: string;
  synced?: boolean;
  day?: number | null;
  favRefs?: string[];
}) {
  return (
    <div className="sg-sidegroup">
      <div className="sg-side-title">{title}</div>

      {words?.map((w) => (
        <div className="sg-card sg-card-word" key={w.word}>
          <span className="sg-card-tag">🔑 Key word</span>
          <div className="sg-word">{w.word}</div>
          <p className="sg-card-body">{w.meaning}</p>
        </div>
      ))}

      {verses?.map((v) => (
        <VerseCard
          key={v.ref}
          v={v}
          synced={synced}
          day={day}
          initialFav={favRefs.includes(v.ref)}
        />
      ))}

      {reflection && (
        <div className="sg-card sg-card-reflect">
          <span className="sg-card-tag">🤍 Pause &amp; reflect</span>
          <p className="sg-card-body">{reflection}</p>
        </div>
      )}
    </div>
  );
}

function VerseCard({
  v,
  synced,
  day,
  initialFav,
}: {
  v: SideVerse;
  synced: boolean;
  day: number | null;
  initialFav: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState(initialFav);

  async function toggleFav(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !fav;
    setFav(next); // optimistic
    if (synced) {
      try {
        const now = await toggleFavoriteAction(v.ref, v.text, day);
        setFav(now);
      } catch {
        setFav(!next);
      }
    }
  }

  return (
    <div className={`sg-card sg-card-verse${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="sg-fav"
        aria-pressed={fav}
        aria-label={fav ? "Remove from favorites" : "Save verse"}
        onClick={toggleFav}
      >
        {fav ? "♥" : "♡"}
      </button>
      <button
        type="button"
        className="sg-verse-open"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="sg-card-tag">✨ A verse for today</span>
        <div className="sg-verse-ref">{v.ref}</div>
        <p className="sg-verse-text">&ldquo;{v.text}&rdquo;</p>
        <span className="sg-verse-toggle">
          {open ? "Tap to close" : "What this means →"}
        </span>
      </button>
      {open && <p className="sg-verse-meaning">{v.meaning}</p>}
    </div>
  );
}
