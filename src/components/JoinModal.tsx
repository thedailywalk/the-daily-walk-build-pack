"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignupForm from "@/components/SignupForm";

/**
 * A gentle welcome modal that invites first-time visitors to join the free
 * newsletter. Appears shortly after landing on a public page, remembers
 * dismissal, and never shows inside the member portal / admin / auth / subscribe.
 */
const KEY = "tdw_join_v1";
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000; // re-show after 3 days if not joined
const EXCLUDE = ["/admin", "/portal", "/login", "/subscribe", "/auth", "/designs"];

export default function JoinModal() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  const excluded = EXCLUDE.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (excluded) return;
    let seen = 0;
    try {
      seen = Number(localStorage.getItem(KEY) || 0);
    } catch {
      /* ignore */
    }
    if (seen && Date.now() - seen < SNOOZE_MS) return;
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, [excluded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="jm-backdrop" role="dialog" aria-modal="true" aria-label="Join The Daily Walk" onClick={dismiss}>
      <div className="jm-card" onClick={(e) => e.stopPropagation()}>
        <div className="jm-head">
          <span className="jm-brand">THE DAILY WALK NEWSLETTER</span>
          <button className="jm-close" onClick={dismiss} aria-label="Close">×</button>
        </div>

        <div className="jm-body">
          <div className="jm-stats">
            <span><b>DAILY</b> DEVOTIONAL</span>
            <span>·</span>
            <span><b>5 MIN</b> READ</span>
            <span>·</span>
            <span><b>FREE</b> ALWAYS</span>
          </div>

          <div className="jm-eyebrow"><span className="jm-dot" /> Free every morning — before the world gets loud</div>
          <h2 className="jm-title">A few quiet minutes <span>with God.</span> Every morning.</h2>
          <p className="jm-sub">
            A short devotional, one honest prayer, and a little encouragement to start your day —
            no noise, no guilt, just the walk. Free, forever.
          </p>

          <div className="jm-verse">
            <p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;</p>
            <cite>— Psalm 118:24 · lands at 6:30 AM PT</cite>
          </div>

          <SignupForm buttonLabel="Join free →" />

          <ul className="jm-list">
            <li><span aria-hidden="true">📖</span> <span><b>Hear God in His Word every morning</b> — a 5-minute devotional</span></li>
            <li><span aria-hidden="true">🙏</span> <span><b>Learn to talk and listen to God</b> — and notice when He&apos;s speaking</span></li>
            <li><span aria-hidden="true">🌅</span> <span><b>Start every day walking with God</b> — not just reading about Him</span></li>
            <li><span aria-hidden="true">🌱</span> <span><b>Build a real relationship with Jesus</b> — small steps that become a lifelong walk</span></li>
          </ul>

          <div className="jm-foot">Free forever · No spam · Unsubscribe anytime</div>
          <div className="jm-more">
            Ready to go deeper? <Link href="/pricing" onClick={dismiss}>Become a Founding Member →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
