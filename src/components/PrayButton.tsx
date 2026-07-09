"use client";

import { useEffect, useState } from "react";
import { prayAction } from "@/app/prayer-wall/actions";

const STORE_KEY = "tdw_prayed";

// One reaction: 🙏 — tap the praying hands to say "I prayed for this."
const PRAY_EMOJIS = ["🙏"] as const;

// Which prayers this person prayed for, and with which emoji, across reloads.
// Stored as { [id]: emoji }. Migrates the old array-of-ids format on read.
function readPrayedMap(): Record<string, string> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (Array.isArray(raw)) {
      const m: Record<string, string> = {};
      for (const id of raw) if (typeof id === "string") m[id] = "🙏";
      return m;
    }
    return raw && typeof raw === "object" ? (raw as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export default function PrayButton({
  id,
  count,
}: {
  id: string;
  count: number;
}) {
  const [n, setN] = useState(count);
  // The emoji this person chose for this prayer — null until they pick one.
  const [chosen, setChosen] = useState<string | null>(null);

  // Restore a prior choice after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    const emo = readPrayedMap()[id];
    if (emo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount
      setChosen(emo);
    }
  }, [id]);

  async function pray(emo: string) {
    if (chosen) return; // already prayed — one choice per prayer
    setChosen(emo);
    setN((v) => v + 1);
    const map = readPrayedMap();
    if (!map[id]) {
      map[id] = emo;
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(map));
      } catch {
        /* ignore storage errors */
      }
    }
    try {
      await prayAction(id);
    } catch {
      /* optimistic — keep the count even if the bump fails */
    }
  }

  const prayed = chosen !== null;

  return (
    <div className={`pray-react${prayed ? " is-prayed" : ""}`}>
      {prayed ? (
        // Once you pick one, the other options fall away — just your choice remains.
        <button
          type="button"
          className="pray-emoji-btn is-chosen"
          disabled
          aria-label="You prayed for this"
        >
          {chosen}
        </button>
      ) : (
        PRAY_EMOJIS.map((emo) => (
          <button
            key={emo}
            type="button"
            onClick={() => pray(emo)}
            className="pray-emoji-btn"
            aria-label={`Pray for this with ${emo}`}
          >
            {emo}
          </button>
        ))
      )}
      <span className="pray-count">{n}</span>
      <span className="pray-react-lbl">{prayed ? "prayed" : "praying"}</span>
    </div>
  );
}
