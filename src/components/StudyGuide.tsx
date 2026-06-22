"use client";
/* eslint-disable react-hooks/set-state-in-effect -- restores saved state + loads passage after async work */

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { StudyDay } from "@/lib/studyGuide";
import type { NotesData } from "@/lib/studyData";
import { saveStudyNotesAction } from "@/app/journey/actions";

type Mode = "web" | "kjv" | "own";
type Verse = { ref: string; text: string };
type Cheer = { id: number; x: number; y: number; emoji: string; dx: number; ty: number; dur: number };

const TABS: { key: Mode; label: string }[] = [
  { key: "web", label: "WEB" },
  { key: "kjv", label: "KJV" },
  { key: "own", label: "My own Bible" },
];

function sectionsOf(e: StudyDay) {
  return [
    { key: "context", icon: "🧭", label: "Quick Context", body: e.context, cheer: ["✨", "💫", "✨"] },
    { key: "plain", icon: "💬", label: "What's Happening, in Plain English", body: e.plainEnglish, cheer: ["💡", "✨", "💫"] },
    { key: "god", icon: "✨", label: "What This Shows About God", body: e.aboutGod, cheer: ["🕊️", "✨", "🕊️"] },
    { key: "people", icon: "❤️", label: "What This Shows About People", body: e.aboutPeople, cheer: ["❤️", "💛", "❤️"] },
    { key: "reflect", icon: "🤔", label: "Personal Reflection", body: e.reflection, cheer: ["🌿", "✨", "🌿"] },
    { key: "prayer", icon: "🙏", label: "Prayer Prompt", body: e.prayer, accent: true, cheer: ["🙏", "🕊️", "✨"] },
    { key: "challenge", icon: "👣", label: "Daily Challenge", body: e.step, cheer: ["🎉", "✨", "🎊"] },
  ];
}

export default function StudyGuide({
  entry,
  synced = false,
  initial,
}: {
  entry: StudyDay;
  /** When true, journal + check-offs save to the member's account. */
  synced?: boolean;
  initial?: NotesData;
}) {
  const dayKey = `tdw_sg_${entry.day}`;
  const sections = sectionsOf(entry);
  const loadedRef = useRef(false);

  // Bible chooser
  const [mode, setMode] = useState<Mode | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  // Journal state (persists per day in the browser)
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [stood, setStood] = useState("");
  const [takeaway, setTakeaway] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  // Cheer animations
  const [cheers, setCheers] = useState<Cheer[]>([]);
  const seq = useRef(0);

  // Load: prefer the account copy when signed in; else the browser copy.
  useEffect(() => {
    if (synced && initial) {
      setDone(initial.checked ?? {});
      setStood(initial.stood ?? "");
      setTakeaway(initial.takeaway ?? "");
      setNotes(initial.notes ?? "");
    } else {
      try {
        setDone(JSON.parse(localStorage.getItem(`${dayKey}_done`) || "{}"));
        setStood(localStorage.getItem(`${dayKey}_stood`) || "");
        setTakeaway(localStorage.getItem(`${dayKey}_take`) || "");
        setNotes(localStorage.getItem(`${dayKey}_notes`) || "");
      } catch {
        /* ignore */
      }
    }
    loadedRef.current = true;
  }, [dayKey, synced, initial]);

  // Sync to the account (debounced) whenever the journal changes.
  useEffect(() => {
    if (!synced || !loadedRef.current) return;
    const t = setTimeout(() => {
      saveStudyNotesAction(entry.day, { checked: done, stood, takeaway, notes })
        .then(() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1400);
        })
        .catch(() => {});
    }, 700);
    return () => clearTimeout(t);
  }, [synced, entry.day, done, stood, takeaway, notes]);

  useEffect(() => {
    if (mode !== "web" && mode !== "kjv") return;
    let alive = true;
    setLoading(true);
    setErr(false);
    setVerses([]);
    fetch(`/api/passage?ref=${encodeURIComponent(entry.reading)}&t=${mode}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { verses: Verse[] }) => alive && setVerses(d.verses ?? []))
      .catch(() => alive && setErr(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [mode, entry.reading]);

  function save(suffix: string, val: string) {
    try {
      localStorage.setItem(`${dayKey}_${suffix}`, val);
      setSaved(true);
      window.clearTimeout((save as unknown as { t?: number }).t);
      (save as unknown as { t?: number }).t = window.setTimeout(
        () => setSaved(false),
        1400
      );
    } catch {
      /* ignore */
    }
  }

  function burst(emojis: string[], e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const bx = r.left + r.width / 2;
    const by = r.top;
    const fresh: Cheer[] = emojis.map((emoji, i) => ({
      id: seq.current++,
      x: bx + (i - 1) * 10,
      y: by,
      emoji,
      dx: (i - 1) * 26 + (i % 2 ? 10 : -10),
      ty: -90 - i * 10,
      dur: 1.1 + (i % 3) * 0.2,
    }));
    setCheers((c) => [...c, ...fresh]);
    fresh.forEach((f) =>
      setTimeout(
        () => setCheers((c) => c.filter((x) => x.id !== f.id)),
        f.dur * 1000 + 160
      )
    );
  }

  function toggle(key: string, cheer: string[], e: MouseEvent<HTMLElement>) {
    const turningOn = !done[key];
    const next = { ...done, [key]: turningOn };
    setDone(next);
    try {
      localStorage.setItem(`${dayKey}_done`, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    if (turningOn) burst(cheer, e);
  }

  const doneCount = sections.filter((s) => done[s.key]).length;
  const allDone = doneCount === sections.length;

  return (
    <div className="sg">
      <header className="sg-head">
        <div className="sg-kicker">{entry.arc}</div>
        <h1>
          Day {entry.day}
          <span className="sg-reading"> · {entry.reading}</span>
        </h1>
        <div className="sg-progress">
          <span className="sg-progress-track">
            <span
              className="sg-progress-fill"
              style={{ width: `${(doneCount / sections.length) * 100}%` }}
            />
          </span>
          <span className="sg-progress-num">
            {doneCount}/{sections.length} done
          </span>
        </div>
      </header>

      {/* Key verse */}
      <div className="sg-keyverse">
        <span className="sg-keyverse-tag">📌 Key verse</span>
        <p>{entry.verse}</p>
      </div>

      {/* Bible chooser */}
      <div className="sg-bible">
        <p className="sg-bible-note">
          <strong>Bring your preferred Bible.</strong> Read{" "}
          <strong>{entry.reading}</strong> in the translation you love, or open
          one of the included public-domain options — WEB for modern wording,
          KJV for the classic feel.
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
              Open <strong>{entry.reading}</strong> in your own Bible and read it
              slowly, then come back to walk through it below.
            </p>
          ) : loading ? (
            <p className="muted">Loading {entry.reading}…</p>
          ) : err ? (
            <p className="muted">
              Couldn&apos;t load it right now — read{" "}
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

      <p className="sg-walk">Walk through it ↓ — tap the circle to check off each step.</p>

      {/* Check-off study sections */}
      <div className="sg-grid">
        {sections.map((s) => (
          <div
            key={s.key}
            className={`sg-block${s.accent ? " sg-accent" : ""}${done[s.key] ? " is-done" : ""}`}
          >
            <div className="sg-block-head">
              <span className="sg-ic" aria-hidden="true">
                {s.icon}
              </span>
              <div className="sg-block-label">{s.label}</div>
              <button
                type="button"
                className="sg-check"
                aria-pressed={!!done[s.key]}
                aria-label={done[s.key] ? "Mark not done" : "Mark done"}
                onClick={(e) => toggle(s.key, s.cheer, e)}
              >
                {done[s.key] ? "✓" : ""}
              </button>
            </div>
            {s.body.split(/\n\n+/).map((p, i) => (
              <p className="sg-block-body" key={i}>
                {p}
              </p>
            ))}
            {s.key === "prayer" && (
              <p className="sg-pause">🕊️ Pause here. Read it again — slowly — and make it your own.</p>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <div className="sg-complete">
          🎉 You walked through all of Day {entry.day}. Amen — see you tomorrow.
        </div>
      )}

      {/* Journal */}
      <div className="sg-journal">
        <div className="sg-journal-title">
          Your journal{" "}
          <span className={`sg-saved${saved ? " show" : ""}`}>saved ✓</span>
        </div>

        <JournalLine
          label="✍️ What stood out?"
          placeholder="One line, one phrase, one feeling…"
          value={stood}
          onChange={(v) => {
            setStood(v);
            save("stood", v);
          }}
        />
        <JournalLine
          label="🌟 My takeaway"
          placeholder="If I remember one thing from today…"
          value={takeaway}
          onChange={(v) => {
            setTakeaway(v);
            save("take", v);
          }}
        />

        <div className="sg-notes-wrap">
          <label className="sg-journal-label" htmlFor="sg-notes">
            📓 Notes, prayers &amp; thoughts
          </label>
          <textarea
            id="sg-notes"
            className="sg-notes"
            rows={5}
            placeholder="Write freely — this saves automatically and will be here when you come back."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              save("notes", e.target.value);
            }}
          />
        </div>

        {entry.realLife && (
          <div className="sg-reminder">
            <span className="sg-reminder-tag">🌅 Today&apos;s reminder</span>
            <p>{entry.realLife}</p>
          </div>
        )}
      </div>

      {/* Floating cheers */}
      {cheers.map((c) => (
        <span
          key={c.id}
          className="sg-cheer"
          aria-hidden="true"
          style={
            {
              left: c.x,
              top: c.y,
              "--dx": `${c.dx}px`,
              "--ty": `${c.ty}px`,
              "--dur": `${c.dur}s`,
            } as React.CSSProperties
          }
        >
          {c.emoji}
        </span>
      ))}
    </div>
  );
}

function JournalLine({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="sg-journal-line">
      <label className="sg-journal-label">{label}</label>
      <input
        type="text"
        className="sg-journal-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
