import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import {
  listMyVerses,
  memorizedCounts,
  weeklyLeaderboard,
  allTimeLeaderboard,
  weekStartPT,
  type LeaderRow,
} from "@/lib/community";
import { addVerseAction, markMemorizedAction, deleteVerseAction } from "./actions";

export const metadata: Metadata = { title: "Scripture Memory", robots: { index: false } };
export const dynamic = "force-dynamic";

function Leaderboard({ rows, title, sub }: { rows: LeaderRow[]; title: string; sub: string }) {
  const medal = ["🥇", "🥈", "🥉"];
  return (
    <section className="mem-board">
      <div className="mem-board-head">
        <h3 className="m-card-h">{title}</h3>
        <span className="m-card-line muted">{sub}</span>
      </div>
      {rows.length === 0 ? (
        <p className="muted" style={{ margin: "8px 2px" }}>
          Be the first — memorize a verse this week and you’ll start it off. 🌱
        </p>
      ) : (
        <ol className="mem-lb">
          {rows.map((r, i) => (
            <li key={r.userId} className={`mem-lb-row${r.isMe ? " is-me" : ""}`}>
              <span className="mem-lb-rank">{medal[i] ?? i + 1}</span>
              <span className="mem-lb-name">{r.name}{r.isMe && <em> · you</em>}</span>
              <span className="mem-lb-count">{r.count}<span> verses</span></span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default async function MemoryPage() {
  const user = await getUser();
  const userId = user!.id;

  const [verses, counts, weekly, allTime] = await Promise.all([
    listMyVerses(userId),
    memorizedCounts(userId),
    weeklyLeaderboard(userId, 10),
    allTimeLeaderboard(userId, 10),
  ]);
  const memorizing = verses.filter((v) => v.status === "memorizing");
  const done = verses.filter((v) => v.status === "memorized");

  return (
    <div className="m-wrap">
      <section className="m-hero mem-hero">
        <div className="m-hero-in">
          <span className="m-hero-kicker">Hide His Word in your heart</span>
          <h1 className="m-hero-h">Scripture Memory</h1>
          <p className="m-hero-sub">
            “I have hidden your word in my heart, that I might not sin against you.” — Psalm 119:11.
            Pick a verse, carry it with you, and mark it when it’s yours. Every verse memorized this week
            lifts you up the community board — not to compete, but to spur each other on.
          </p>
          <div className="mem-hero-stats">
            <div className="mem-hero-stat"><b>{counts.thisWeek}</b><span>this week</span></div>
            <div className="mem-hero-stat"><b>{counts.total}</b><span>all-time</span></div>
            <div className="mem-hero-stat"><b>{memorizing.length}</b><span>in progress</span></div>
          </div>
        </div>
      </section>

      <div className="m-two mem-cols">
        {/* Left: my verses */}
        <div>
          <div className="m-section-tag">Add a verse to memorize</div>
          <form action={addVerseAction} className="mem-add">
            <input name="ref" className="mem-input" placeholder="Reference — e.g. Philippians 4:13" required />
            <textarea name="verseText" className="mem-input" rows={2} placeholder="The verse text (optional — paste it so you can review)" />
            <button type="submit" className="btn btn-gold">Add verse</button>
          </form>

          <div className="m-section-tag">Working on ({memorizing.length})</div>
          {memorizing.length === 0 ? (
            <p className="muted" style={{ margin: "4px 2px" }}>Nothing in progress — add one above to begin. 🌅</p>
          ) : (
            <div className="mem-list">
              {memorizing.map((v) => (
                <div key={v.id} className="mem-card">
                  <div className="mem-card-ref">{v.ref}</div>
                  {v.verseText && <p className="mem-card-text">“{v.verseText}”</p>}
                  <div className="mem-card-actions">
                    <form action={markMemorizedAction}>
                      <input type="hidden" name="id" value={v.id} />
                      <button type="submit" className="btn btn-gold mem-done-btn">✓ I’ve memorized it</button>
                    </form>
                    <form action={deleteVerseAction}>
                      <input type="hidden" name="id" value={v.id} />
                      <button type="submit" className="mem-del">Remove</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}

          {done.length > 0 && (
            <>
              <div className="m-section-tag">Memorized ({done.length}) 💛</div>
              <div className="mem-done-grid">
                {done.map((v) => (
                  <span key={v.id} className="mem-done-chip">{v.ref}</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: leaderboards */}
        <div className="mem-boards">
          <Leaderboard
            rows={weekly}
            title="This week’s memory leaders"
            sub={`Resets Monday · week of ${weekStartPT()}`}
          />
          <Leaderboard rows={allTime} title="All-time" sub="Total verses hidden in the heart" />
          <p className="mem-grace">
            Iron sharpens iron (Proverbs 27:17) — this board is here to cheer each other on, never to make
            anyone feel behind. Wherever you are today is enough.
          </p>
          <Link href="/portal" className="btn btn-ghost">← Back to your home</Link>
        </div>
      </div>
    </div>
  );
}
