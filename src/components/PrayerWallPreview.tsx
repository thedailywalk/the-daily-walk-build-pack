"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { prayAction } from "@/app/prayer-wall/actions";

export type PreviewPrayer = {
  id: string;
  name: string | null;
  body: string;
  prayCount: number;
};

type Hand = {
  key: number;
  x: number;
  y: number;
  dx: number;
  ty: number;
  dur: number;
  emo: string;
};

const STORE_KEY = "tdw_prayed";

// The ways you can react over a prayer — all count as one "pray"; you just pick
// which one floats up. 🙏 pray · ❤️ love · 🕊️ peace.
const PRAY_EMOJIS = ["🙏", "❤️", "🕊️"] as const;

// Warm, on-brand avatar tints — adds a little color without going loud.
const AVATAR_COLORS = [
  "#1F3A5F", // navy
  "#C9A24B", // gold
  "#3C7A5A", // sage green
  "#B5654A", // terracotta
  "#5A6AA0", // dusty blue
  "#8A6CAB", // muted plum
];

function avatarColor(name: string | null): string {
  if (!name?.trim()) return "#9aa1ad";
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function initial(name: string | null): string {
  return name?.trim() ? name.trim()[0].toUpperCase() : "🙏";
}

function readPrayed(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export default function PrayerWallPreview({
  prayers,
}: {
  prayers: PreviewPrayer[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const handSeq = useRef(0);

  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(prayers.map((p) => [p.id, p.prayCount]))
  );
  const [prayed, setPrayed] = useState<Record<string, boolean>>({});
  const [hands, setHands] = useState<Hand[]>([]);

  useEffect(() => {
    const done = readPrayed();
    if (done.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount
      setPrayed(Object.fromEntries(done.map((id) => [id, true])));
    }
  }, []);

  // Gentle side-to-side auto-drift (pauses on hover/touch).
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let dir = 1;
    let raf = 0;
    let last = 0;
    const speed = 22; // px per second

    const step = (now: number) => {
      if (last === 0) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!pausedRef.current && el.scrollWidth > el.clientWidth + 4) {
        el.scrollLeft += dir * speed * dt;
        if (el.scrollLeft <= 0) dir = 1;
        else if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) dir = -1;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  function pray(e: MouseEvent<HTMLButtonElement>, id: string, emo: string) {
    const rect = e.currentTarget.getBoundingClientRect();
    const baseX = rect.left + rect.width / 2;
    const baseY = rect.top;

    const fresh: Hand[] = Array.from({ length: 6 }, (_, i) => ({
      key: handSeq.current++,
      x: baseX + (i - 2.5) * 7,
      y: baseY,
      dx: (i - 2.5) * 22 + (i % 2 === 0 ? 12 : -12),
      ty: -(baseY - 24) - 20 - i * 6,
      dur: 1.3 + (i % 3) * 0.25,
      emo,
    }));
    setHands((h) => [...h, ...fresh]);
    fresh.forEach((hand) =>
      setTimeout(
        () => setHands((h) => h.filter((x) => x.key !== hand.key)),
        hand.dur * 1000 + 120
      )
    );

    if (!prayed[id]) {
      setPrayed((p) => ({ ...p, [id]: true }));
      setCounts((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
      const list = readPrayed();
      if (!list.includes(id)) {
        list.push(id);
        try {
          localStorage.setItem(STORE_KEY, JSON.stringify(list));
        } catch {
          /* ignore */
        }
      }
      prayAction(id).catch(() => {
        /* optimistic */
      });
    }
  }

  return (
    <div className="pw-panel">
      <div className="pw-panel-head">
        <span className="pw-live">
          <span className="pw-dot" aria-hidden="true" />
          Live
        </span>
        <span className="pw-head-title">Prayers from the community</span>
        <Link href="/prayer-wall" className="pw-head-link">
          Open wall →
        </Link>
      </div>

      <div
        className="pw-rail"
        ref={railRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
      >
        {prayers.map((p) => (
          <article className="pw-tile" key={p.id}>
            <div className="pw-tile-top">
              <span
                className="pw-avatar"
                style={{ background: avatarColor(p.name) }}
                aria-hidden="true"
              >
                {initial(p.name)}
              </span>
              <span className="pw-author">
                {p.name?.trim() ? p.name : "Anonymous"}
              </span>
            </div>
            <p className="pw-body">{p.body}</p>
            <div className={`pray-react${prayed[p.id] ? " is-prayed" : ""}`}>
              {PRAY_EMOJIS.map((emo) => (
                <button
                  key={emo}
                  type="button"
                  className="pray-emoji-btn"
                  onClick={(e) => pray(e, p.id, emo)}
                  aria-label={`Pray for this request with ${emo}`}
                >
                  {emo}
                </button>
              ))}
              <span className="pray-count">{counts[p.id] ?? 0}</span>
              <span className="pray-react-lbl">
                {prayed[p.id] ? "prayed" : "praying"}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Floating prayer hands (fixed to the viewport, drift to the top) */}
      {hands.map((h) => (
        <span
          key={h.key}
          className="pray-hand"
          aria-hidden="true"
          style={
            {
              left: h.x,
              top: h.y,
              "--dx": `${h.dx}px`,
              "--ty": `${h.ty}px`,
              "--dur": `${h.dur}s`,
            } as React.CSSProperties
          }
        >
          {h.emo}
        </span>
      ))}
    </div>
  );
}
