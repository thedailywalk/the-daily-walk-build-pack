import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getWordOfTheDay } from "@/lib/wordOfTheDay";
import { getHistoryMoment } from "@/lib/thisDayInHistory";
import { getWonderOfTheDay } from "@/lib/wonderOfTheDay";
import { WONDER_VIDEOS, embedUrl, watchUrl } from "@/lib/wonderVideos";

export const metadata: Metadata = {
  title: "Daily Wonders",
  robots: { index: false },
};

export default async function WondersPage() {
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();
  if (!user?.email) redirect("/login");
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") redirect("/pricing");

  const word = getWordOfTheDay();
  const moment = getHistoryMoment();
  const wonder = getWonderOfTheDay();

  return (
    <>
      <header className="hero sunrise portal-hero">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">Members · Daily Wonders</div>
            <h1>A little more wonder, every day</h1>
            <p className="lead">
              Three short reads to widen your eyes at God — a word from the
              original Scriptures, a moment from His story, and a wonder from the
              world He made. Plus a few videos worth pressing play on.
            </p>
          </div>
        </div>
      </header>

      {/* WORD OF THE DAY */}
      <section className="wordsec">
        <div className="wrap">
          <div className="word-card">
            <div className="word-side">
              <div className="word-lang">{word.lang}</div>
              <div className="word-term" lang={word.lang === "Greek" ? "el" : "he"}>
                {word.term}
              </div>
              <div className="word-translit">{word.translit}</div>
            </div>
            <div className="word-main">
              <div className="sec-tag" style={{ textAlign: "left" }}>
                ✦ Word of the Day
              </div>
              <p className="word-gloss">{word.gloss}</p>
              <p className="word-meaning">{word.meaning}</p>
              <div className="word-verse">
                &ldquo;{word.verseText}&rdquo; — {word.verseRef}
              </div>
              <p className="word-reflect">{word.reflection}</p>
            </div>
          </div>
        </div>
      </section>

      {/* THIS DAY IN HIS STORY */}
      <section className="histsec">
        <div className="wrap">
          <div className="hist-card">
            <div className="hist-head">
              <div className="sec-tag" style={{ textAlign: "left" }}>
                This Day in His Story
              </div>
              <span className="hist-year">{moment.year}</span>
            </div>
            <h3 className="hist-title">{moment.title}</h3>
            <p className="hist-story">{moment.story}</p>
            <div className="hist-takeaway">{moment.takeaway}</div>
          </div>
        </div>
      </section>

      {/* WONDER OF THE DAY */}
      <section className="wondersec">
        <div className="wrap">
          <div className="wonder-card">
            <div className="wonder-sky">
              <svg viewBox="0 0 600 150" className="wonder-stars" aria-hidden="true">
                {[
                  [60, 40, 1.4], [120, 80, 1], [180, 30, 1.8], [250, 60, 1],
                  [300, 100, 1.3], [360, 45, 1], [420, 90, 1.6], [515, 35, 1],
                  [555, 70, 1.2], [560, 112, 1], [90, 115, 1], [220, 120, 1.3],
                  [400, 125, 1], [150, 55, 0.9], [330, 25, 1.1], [480, 118, 1],
                ].map(([cx, cy, r], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" opacity={0.85} />
                ))}
                <circle cx="470" cy="58" r="14" fill="#ffe7b6" opacity="0.18" />
                <circle cx="470" cy="58" r="3.2" fill="#ffd27a" />
                <g stroke="#ffd27a" strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
                  <line x1="470" y1="48" x2="470" y2="68" />
                  <line x1="460" y1="58" x2="480" y2="58" />
                </g>
              </svg>
              <span className="wonder-kicker">✦ Wonder of the Day</span>
            </div>
            <div className="wonder-body-wrap">
              <h3 className="wonder-title">{wonder.title}</h3>
              <p className="wonder-text">{wonder.body}</p>
              <div className="wonder-verse">
                &ldquo;{wonder.verseText}&rdquo; — {wonder.verseRef}
              </div>
              <p className="wonder-reflect">{wonder.reflection}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WATCH & REFLECT — embeds only */}
      <section className="vidsec">
        <div className="wrap">
          <div className="sec-tag" style={{ textAlign: "left" }}>
            ✦ Watch &amp; Reflect
          </div>
          <h2 className="h" style={{ textAlign: "left", marginTop: 6 }}>
            A few minutes worth pressing play on
          </h2>

          {WONDER_VIDEOS.length === 0 ? (
            <div className="vid-empty">
              <p>
                This shelf is curated by hand and stays on the right side of
                copyright: videos are <strong>embedded</strong> straight from
                YouTube or Vimeo&apos;s own players — never copied or re-hosted —
                so the creator keeps full credit. Only your own videos, openly
                shareable ministry content, or freely-licensed teaching (like
                BibleProject) get added here.
              </p>
              <p className="muted" style={{ marginTop: 10 }}>
                No videos added yet. Send the links you&apos;d like featured and
                they&apos;ll appear here.
              </p>
            </div>
          ) : (
            <div className="vid-grid">
              {WONDER_VIDEOS.map((v) => (
                <figure className="vid-card" key={`${v.provider}-${v.id}`}>
                  <div className="vid-frame">
                    <iframe
                      src={embedUrl(v)}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="vid-meta">
                    <h3 className="vid-title">{v.title}</h3>
                    <p className="vid-note">{v.note}</p>
                    <a
                      className="vid-credit"
                      href={watchUrl(v)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {v.creator} · watch on{" "}
                      {v.provider === "vimeo" ? "Vimeo" : "YouTube"} ↗
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <Link href="/journey" className="btn btn-ghost">
            ← Back to My Journey
          </Link>
        </div>
      </section>
    </>
  );
}
