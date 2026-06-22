"use client";
/* eslint-disable react-hooks/set-state-in-effect -- loads passage text after fetch resolves */

import { useEffect, useState } from "react";
import type { StudyDay } from "@/lib/studyGuide";

type Mode = "web" | "kjv" | "own";
type Verse = { ref: string; text: string };

const LABELS: Record<Mode, string> = {
  web: "WEB",
  kjv: "KJV",
  own: "My own Bible",
};

export default function StudyGuide({ entry }: { entry: StudyDay }) {
  const [mode, setMode] = useState<Mode>("web");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (mode === "own") return;
    let alive = true;
    setLoading(true);
    setErr(false);
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

      {/* Bring your own Bible note + translation toggle */}
      <div className="sg-bible">
        <p className="sg-bible-note">
          <strong>Bring your preferred Bible.</strong> Use the translation you
          already love, or read one of the included public-domain options below.
          We recommend <strong>WEB</strong> for modern, easy wording and{" "}
          <strong>KJV</strong> for the classic traditional feel.
        </p>
        <div className="sg-toggle" role="tablist" aria-label="Bible translation">
          {(["web", "kjv", "own"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              className={`sg-tab${mode === m ? " is-on" : ""}`}
              onClick={() => setMode(m)}
            >
              {LABELS[m]}
            </button>
          ))}
        </div>

        <div className="sg-passage">
          {mode === "own" ? (
            <p className="sg-own">
              Open <strong>{entry.reading}</strong> in your own Bible or app, and
              read it slowly before the guide below.
            </p>
          ) : loading ? (
            <p className="muted">Loading {entry.reading}…</p>
          ) : err ? (
            <p className="muted">
              Couldn&apos;t load the text right now — read <strong>{entry.reading}</strong>{" "}
              in your own Bible, or try again.
            </p>
          ) : (
            <p className="sg-verses">
              {verses.map((v) => (
                <span key={v.ref}>
                  <sup className="sg-vnum">{v.ref.split(":")[1]}</sup>
                  {v.text}{" "}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      {/* The 12-field study guide */}
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
  return (
    <div className={`sg-block${accent ? " sg-accent" : ""}`}>
      <div className="sg-block-label">{label}</div>
      <p className="sg-block-body">{body}</p>
    </div>
  );
}
