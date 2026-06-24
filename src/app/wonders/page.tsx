import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getWordOfTheDay } from "@/lib/wordOfTheDay";
import { getHistoryMoment } from "@/lib/thisDayInHistory";
import { getWonderOfTheDay } from "@/lib/wonderOfTheDay";
import { getLiveWeeklyVideo } from "@/lib/weeklyVideo";

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
  const video = await getLiveWeeklyVideo();

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
              <svg
                viewBox="0 0 600 150"
                className="wonder-dawn"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="wonderRay" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#ffe7b6" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#ffe7b6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Sunrise light beams fanning up from the dawn below */}
                <g fill="url(#wonderRay)">
                  <polygon points="300,150 70,0 110,0" />
                  <polygon points="300,150 165,0 200,0" />
                  <polygon points="300,150 260,0 288,0" />
                  <polygon points="300,150 312,0 340,0" />
                  <polygon points="300,150 400,0 435,0" />
                  <polygon points="300,150 495,0 530,0" />
                </g>
              </svg>
              <span className="wonder-kicker">✦ Wonder of His Creation</span>
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

      {/* WATCH OF THE WEEK — one featured video, refreshed every Monday */}
      <section className="vidsec">
        <div className="wrap">
          <div className="sec-tag" style={{ textAlign: "left" }}>
            ✦ Watch of the Week
          </div>

          {video ? (
            <>
              <h2 className="h" style={{ textAlign: "left", marginTop: 6 }}>
                {video.title}
              </h2>
              {video.intro && <p className="vid-intro">{video.intro}</p>}
              <figure className="vid-feature">
                <div className="vid-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <figcaption className="vid-meta">
                  {video.theme && (
                    <div className="vid-theme">Theme · {video.theme}</div>
                  )}
                  {video.scriptures.length > 0 && (
                    <div className="vid-scrips">
                      {video.scriptures.join("  ·  ")}
                    </div>
                  )}
                  <a
                    className="vid-credit"
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {video.channelTitle} · watch on YouTube ↗
                  </a>
                </figcaption>
              </figure>
            </>
          ) : (
            <div className="vid-empty">
              <p>
                A fresh video is on its way. Check back Monday for this
                week&apos;s pick.
              </p>
            </div>
          )}

          <p className="vid-foot">
            ✦ A new video is chosen and featured here every Monday — a few
            minutes to slow down, look up, and let God speak.
          </p>
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
