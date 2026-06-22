"use client";

import { useState } from "react";
import type { KeyWord, SideVerse } from "@/lib/studyGuide";

// Gentle side cards: key-word depth, healing verses (clickable), a reflection.
export default function StudySideCards({
  title,
  words,
  verses,
  reflection,
}: {
  title: string;
  words?: KeyWord[];
  verses?: SideVerse[];
  reflection?: string;
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
        <VerseCard key={v.ref} v={v} />
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

function VerseCard({ v }: { v: SideVerse }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`sg-card sg-card-verse${open ? " is-open" : ""}`}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
    >
      <span className="sg-card-tag">✨ A verse for today</span>
      <div className="sg-verse-ref">{v.ref}</div>
      <p className="sg-verse-text">&ldquo;{v.text}&rdquo;</p>
      <span className="sg-verse-toggle">
        {open ? "Tap to close" : "What this means →"}
      </span>
      {open && <p className="sg-verse-meaning">{v.meaning}</p>}
    </button>
  );
}
