"use client";

import { useEffect, useState } from "react";
import type { MagazineItem } from "@/lib/goodNews";

type Filter = "all" | "faith" | "heroes" | "animals" | "wholesome";

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "Today" },
  { key: "faith", label: "Faith" },
  { key: "heroes", label: "Heroes" },
  { key: "animals", label: "Animals" },
  { key: "wholesome", label: "Uplifting" },
];

const MOODS: { key: Filter; label: string; blurb: string; emoji: string }[] = [
  { key: "faith", label: "Faith & hope", blurb: "Stories of God at work", emoji: "🙏" },
  { key: "heroes", label: "Heroes & kindness", blurb: "Everyday good samaritans", emoji: "🦸" },
  { key: "animals", label: "Animals & nature", blurb: "Furry, wild & wonderful", emoji: "🐾" },
  { key: "all", label: "A little of everything", blurb: "Surprise me with it all", emoji: "✨" },
];

function matches(item: MagazineItem, f: Filter): boolean {
  if (f === "all") return true;
  return item.mood === f;
}

export default function GoodNewsReader({
  items,
  todayKey,
  todayLabel,
}: {
  items: MagazineItem[];
  todayKey: string;
  todayLabel: string;
}) {
  const [active, setActive] = useState<Filter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [picked, setPicked] = useState<Filter | null>(null);

  const storeKey = `tdw_gn_${todayKey}`;

  // Show the daily "mood" prompt the first time they open it each day.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(storeKey);
    } catch {
      /* ignore */
    }
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore today's saved choice
      setActive(saved as Filter);
    } else {
      setModalOpen(true);
    }
  }, [storeKey]);

  function choose(f: Filter) {
    try {
      localStorage.setItem(storeKey, f);
    } catch {
      /* ignore */
    }
    setActive(f);
    setModalOpen(false);
  }

  let shown = items.filter((i) => matches(i, active));
  if (shown.length < 3) shown = items; // never look empty
  const [lead, ...rest] = shown;
  const secondary = rest.slice(0, 2);
  const more = rest.slice(2, 22);

  return (
    <div className="gnr">
      <header className="gnr-masthead">
        <div className="gnr-kicker">The Daily Walk · Good News</div>
        <h1>Good News</h1>
        <p className="gnr-tagline">
          {todayLabel} — uplifting, real stories from around the world.
        </p>
        <nav className="gnr-tabs" aria-label="Good News categories">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`gnr-tab${active === t.key ? " is-on" : ""}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            className="gnr-mood-btn"
            onClick={() => {
              setPicked(active);
              setModalOpen(true);
            }}
          >
            ✨ Set today&apos;s mood
          </button>
        </nav>
      </header>

      {lead && (
        <section className="gnr-hero">
          <div className="gnr-hero-text">
            <span className="gnr-cat">{lead.category}</span>
            <a className="gnr-lead-head" href={lead.href} target="_blank" rel="noopener noreferrer">
              {lead.headline}
            </a>
            <span className="gnr-date">{lead.dateLabel}</span>
          </div>
          <a className="gnr-hero-img" href={lead.href} target="_blank" rel="noopener noreferrer">
            <Thumb item={lead} />
          </a>
          <div className="gnr-hero-side">
            {secondary.map((it) => (
              <a key={it.href} className="gnr-side-item" href={it.href} target="_blank" rel="noopener noreferrer">
                <div className="gnr-side-thumb">
                  <Thumb item={it} />
                </div>
                <span className="gnr-side-head">{it.headline}</span>
                <span className="gnr-date">{it.dateLabel}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="gnr-more">
          <h2 className="gnr-more-title">More Good News</h2>
          {more.map((it) => (
            <a key={it.href} className="gnr-row" href={it.href} target="_blank" rel="noopener noreferrer">
              <div className="gnr-row-text">
                <span className="gnr-date">{it.dateLabel}</span>
                <span className="gnr-row-head">{it.headline}</span>
              </div>
              <div className="gnr-row-thumb">
                <Thumb item={it} />
              </div>
            </a>
          ))}
        </section>
      )}

      {modalOpen && (
        <div className="gnr-modal-overlay" role="dialog" aria-modal="true">
          <div className="gnr-modal">
            <div className="gnr-modal-top">
              <span>{todayLabel}</span>
              <button
                type="button"
                aria-label="Close"
                className="gnr-modal-x"
                onClick={() => choose(active)}
              >
                ✕
              </button>
            </div>
            <h2 className="gnr-modal-title">Let&apos;s set today&apos;s Good News</h2>
            <p className="gnr-modal-sub">What kind of stories are you in the mood for today?</p>
            <div className="gnr-mood-grid">
              {MOODS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={`gnr-mood-card mood-${m.key}${picked === m.key ? " is-on" : ""}`}
                  onClick={() => setPicked(m.key)}
                >
                  <span className="gnr-mood-emoji" aria-hidden="true">
                    {m.emoji}
                  </span>
                  <span className="gnr-mood-label">{m.label}</span>
                  <span className="gnr-mood-blurb">{m.blurb}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-gold btn-block"
              disabled={!picked}
              onClick={() => picked && choose(picked)}
            >
              Show me today&apos;s good news
            </button>
            <button type="button" className="gnr-modal-skip" onClick={() => choose("all")}>
              Surprise me with everything
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Thumb({ item }: { item: MagazineItem }) {
  // Branded tile — no third-party photo.
  return (
    <div className="gnr-thumb gntile" aria-hidden="true">
      <span className="gntile-mark">🌅</span>
      {item.faith && <span className="gnr-faith-tag">✝</span>}
    </div>
  );
}
