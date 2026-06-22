"use client";
/* eslint-disable react-hooks/set-state-in-effect -- loads passage text after fetch resolves */

import { useEffect, useState } from "react";
import type { StudyDay } from "@/lib/studyGuide";

type Mode = "web" | "kjv" | "own";
type Verse = { ref: string; text: string };

const TABS: { key: Mode; label: string }[] = [
  { key: "web", label: "WEB" },
  { key: "kjv", label: "KJV" },
  { key: "own", label: "My own Bible" },
];

export default function StudyGuide({ entry }: { entry: StudyDay }) {
  // Nothing is selected at first — the reader chooses how to read.
  const [mode, setMode] = useState<Mode | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (mode !== "web" && mode !== "kjv") return;
    let alive = true;
    setLoading(true);
    setErr(false);
    setVerses([]);
    fetch(`/api/passage?ref=${encodeURIComponent(entry.reading)}&t=${mode}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { verses: Verse[] }) => {
        if (alive) setVerses(data.verses ?? []);
      })
      .catch(() => alive && setErr(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [mode, entry.reading]);

  return (
    <div className="sg">
      <header className="sg-head">
        <div className="sg-kicker">{entry.arc}</div>
        <h1>
          Day {entry.day}
          <span className="sg-reading"> · {entry.reading}</span>
        </h1>
      </header>

      {/* Bring your own Bible note + translation chooser */}
      <div className="sg-bible">
        <p className="sg-bible-note">
          <strong>Bring your preferred Bible.</strong> Read{" "}
          <strong>{entry.reading}</strong> in the translation you already love,
          or open one of the included public-domain options here — WEB for
          modern, easy wording, KJV for the classic traditional feel.
        </p>
        <div className="sg-toggle" role="tablist" aria-label="How to read">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={mode === t.key}
              className={`sg-tab${mode === t.key ? " is-on" : ""}`}
              onClick={() => setMode(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="sg-passage">
          {mode === null ? (
            <p className="sg-choose">
              Choose how you&apos;d like to read{" "}
              <strong>{entry.reading}</strong> above. 📖
            </p>
          ) : mode === "own" ? (
            <p className="sg-own">
              Open <strong>{entry.reading}</strong> in your own Bible or app and
              read it slowly, then come back to the guide below.
            </p>
          ) : loading ? (
            <p className="muted">Loading {entry.reading}…</p>
          ) : err ? (
            <p className="muted">
              Couldn&apos;t load the text right now — read{" "}
              <strong>{entry.reading}</strong> in your own Bible, or try again.
            </p>
          ) : (
            <div className="sg-verses">
              {verses.map((v) => (
                <p key={v.ref} className="sg-verse">
                  <sup className="sg-vnum">{v.ref.split(":")[1]}</sup>
                  {v.text}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The study guide */}
      <div className="sg-grid">
        <Block label="Quick context" body={entry.context} />
        <Block label="What's happening (plain English)" body={entry.plainEnglish} />
        <Block label="What it shows about God" body={entry.aboutGod} />
        <Block label="What it shows about people" body={entry.aboutPeople} />
        <Block label="Real life" body={entry.realLife} />
        <Block label="Verse to carry today" body={entry.verse} accent />
        <Block label="Reflection" body={entry.reflection} />
        <Block label="A short prayer" body={entry.prayer} accent />
        <Block label="One small step" body={entry.step} />
      </div>
    </div>
  );
}

function Block({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  const paras = body.split(/\n\n+/);
  return (
    <div className={`sg-block${accent ? " sg-accent" : ""}`}>
      <div className="sg-block-label">{label}</div>
      {paras.map((p, i) => (
        <p className="sg-block-body" key={i}>
          {p}
        </p>
      ))}
    </div>
  );
}
