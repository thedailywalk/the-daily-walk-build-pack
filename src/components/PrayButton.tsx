"use client";

import { useEffect, useState } from "react";
import { prayAction } from "@/app/prayer-wall/actions";

const STORE_KEY = "tdw_prayed";

function readPrayed(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
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
  const [prayed, setPrayed] = useState(false);

  // Remember which prayers this person already prayed for (across reloads).
  // Reads localStorage after mount, so it can't run during SSR (avoids a
  // hydration mismatch) — a one-time sync from an external store.
  useEffect(() => {
    if (readPrayed().includes(id)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount
      setPrayed(true);
    }
  }, [id]);

  async function pray() {
    if (prayed) return;
    setPrayed(true);
    setN((v) => v + 1);
    const list = readPrayed();
    if (!list.includes(id)) {
      list.push(id);
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(list));
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

  return (
    <button
      type="button"
      onClick={pray}
      disabled={prayed}
      className={`pray-btn${prayed ? " is-prayed" : ""}`}
      aria-label={prayed ? "You prayed for this" : "I prayed for this"}
    >
      <span className="pray-emoji" aria-hidden="true">
        🙏
      </span>
      <span>{prayed ? "Prayed" : "Pray"}</span>
      <span className="pray-count">{n}</span>
    </button>
  );
}
