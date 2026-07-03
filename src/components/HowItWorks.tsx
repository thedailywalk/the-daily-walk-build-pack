"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Interactive "How it works" — built on the habit-loop research (cue → routine
 * → reward) and Fogg's B=MAP: keep the action tiny and doable, motivating, and
 * clearly prompted. A 3-step "how a morning works" flow makes the routine feel
 * effortless; a click-to-switch tab lets people choose their rhythm without the
 * page feeling spread out.
 */

const STEPS = [
  {
    n: "1",
    label: "It comes to you",
    icon: "🌅",
    body: "Before the world gets loud — around 6:30am — a short devotional lands in your inbox. No app to open, no streak to chase.",
  },
  {
    n: "2",
    label: "Ten honest minutes",
    icon: "📖",
    body: "A 2-minute devotional, one real prayer, and a next step you can actually take. Small enough to do on your busiest morning.",
  },
  {
    n: "3",
    label: "You walk in ready",
    icon: "🛡️",
    body: "You carry something real into your day — and it quietly compounds. Miss a day? Nothing resets. You just pick back up.",
  },
];

type Feature = { icon: string; title: string; body: string };

const RHYTHMS: Record<
  "free" | "member",
  {
    tag: string;
    title: string;
    pitch: string;
    who: string;
    features: Feature[];
    cta: { label: string; href: string };
  }
> = {
  free: {
    tag: "Mon · Wed · Fri · Free",
    title: "The daily newsletter",
    pitch:
      "A 2-minute devotional, one honest prayer, three uplifting Good News stories, and the Wednesday Pastor's Take — three mornings a week. Encouragement that meets you in real life.",
    who: "For anyone who wants encouragement, prayer, and hope.",
    features: [
      {
        icon: "🙏",
        title: "A prayer with each issue",
        body: "Short, honest, ready to pray — real words for a real day.",
      },
      {
        icon: "🌍",
        title: "Good News briefing",
        body: "Three uplifting, real stories every issue — proof good is still happening.",
      },
      {
        icon: "✦",
        title: "Wednesday Pastor's Take",
        body: "A midweek word of encouragement to keep you steady.",
      },
    ],
    cta: { label: "Start free →", href: "/subscribe" },
  },
  member: {
    tag: "Your Day 1 · Founding Member",
    title: "The Bible-in-a-Year journey",
    pitch:
      "Read the whole Bible in a year — starting with Jesus, not Genesis. Each day: the reading, a plain-English breakdown, what it shows about God, real-life application, a question, and audio. Begins the day you join.",
    who: "For readers who want to be personally guided through the Bible.",
    features: [
      {
        icon: "📖",
        title: "Start with Jesus",
        body: "Opens with John, Romans & Acts — so Scripture clicks before the hard parts.",
      },
      {
        icon: "🗓️",
        title: "Never feel behind",
        body: "Starts on your Day 1. Miss a day? Pick up where you left off — nothing resets.",
      },
      {
        icon: "🎧",
        title: "Listen or read",
        body: "An audio devotional each day — perfect for the commute or morning coffee.",
      },
    ],
    cta: { label: "See membership →", href: "/pricing" },
  },
};

export default function HowItWorks() {
  const [tab, setTab] = useState<"free" | "member">("free");
  const r = RHYTHMS[tab];

  return (
    <div className="hiw">
      {/* How a morning works — the habit loop, made effortless */}
      <div className="hiw-flow">
        {STEPS.map((s) => (
          <div className="hiw-step" key={s.n}>
            <div className="hiw-step-top">
              <span className="hiw-step-n">{s.n}</span>
              <span className="hiw-step-ic" aria-hidden="true">
                {s.icon}
              </span>
            </div>
            <h4>{s.label}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      {/* Choose your rhythm — click to switch */}
      <div className="hiw-tabs" role="tablist" aria-label="Choose your rhythm">
        {(["free", "member"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`hiw-tab${tab === key ? " on" : ""}`}
            onClick={() => setTab(key)}
          >
            <span className="hiw-tab-k">
              {key === "free" ? "Free · 3× a week" : "Founding Member · every day"}
            </span>
            <span className="hiw-tab-t">
              {key === "free" ? "The daily newsletter" : "The guided journey"}
            </span>
          </button>
        ))}
      </div>

      {/* The active rhythm — one clean panel at a time */}
      <div className="hiw-panel" key={tab}>
        <div className="hiw-panel-main">
          <div className="hiw-panel-tag">{r.tag}</div>
          <h3>{r.title}</h3>
          <p className="hiw-panel-pitch">{r.pitch}</p>
          <div className="hiw-who">{r.who}</div>
          <Link href={r.cta.href} className="btn btn-gold hiw-cta">
            {r.cta.label}
          </Link>
        </div>
        <div className="hiw-panel-feats">
          {r.features.map((f) => (
            <div className="hiw-feat" key={f.title}>
              <div className="hiw-feat-ic" aria-hidden="true">
                {f.icon}
              </div>
              <div className="hiw-feat-tx">
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
