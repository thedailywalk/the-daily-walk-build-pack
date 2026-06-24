import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getLiveDevotional, prettyDate } from "@/lib/devotionals";
import { getOrCreateProgress, todayPT } from "@/lib/progress";
import { daysCompleted, progressPercent, TOTAL_DAYS } from "@/lib/journey";
import { getStudyDay } from "@/lib/studyGuide";
import { getLiveWeeklyVideo } from "@/lib/weeklyVideo";
import { listNoteDays, listFavorites } from "@/lib/studyData";
import { getTodayQuestion, pollDate } from "@/lib/questionOfTheDay";
import { getCounts } from "@/lib/poll";
import { getParallel, FRAMING } from "@/lib/bibleParallels";
import QuestionOfDay from "@/components/QuestionOfDay";

export const metadata: Metadata = {
  title: "Member Portal",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

function greeting(): string {
  const h = Number(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", hour12: false })
  );
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const svg = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const ICON = {
  compass: svg(<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>),
  star: svg(<path d="M12 3.5 14.6 9l6 .5-4.6 4 1.4 5.8L12 16.9 6.6 19.3 8 13.5 3.4 9.5l6-.5z" />),
  guide: svg(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .8-1 1.7M12 16h.01" /></>),
  book: svg(<path d="M4 5v14M9 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9zM4 9h5M4 14h5" />),
  hands: svg(<path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.65-7 9-7 9z" />),
  video: svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></>),
};

export default async function PortalHome() {
  const user = await getUser();
  const email = user!.email!;
  const name = email.split("@")[0].replace(/[._-]+/g, " ").split(" ")[0];
  const display = name.charAt(0).toUpperCase() + name.slice(1);

  const poll = getTodayQuestion();
  const parallel = getParallel();
  const pDate = pollDate();

  const [ent, today, progress, video, noteDays, favorites, pollCounts] = await Promise.all([
    getEntitlement(email),
    getLiveDevotional(),
    getOrCreateProgress(user!.id),
    getLiveWeeklyVideo(),
    listNoteDays(user!.id),
    listFavorites(user!.id),
    getCounts(pollDate(), poll.options.length),
  ]);

  const day = progress.currentDay;
  const reading = getStudyDay(day);
  const pct = progressPercent(progress);
  const done = daysCompleted(progress);

  const cards = [
    { href: "/portal/guide", icon: ICON.guide, label: "Pathlight", sub: "Ask, reflect, find verses" },
    { href: "/wonders", icon: ICON.star, label: "Daily Wonders", sub: "Word, history & wonder" },
    { href: "/journey?tab=notes", icon: ICON.book, label: "Scripture Notes", sub: `${noteDays.length} saved` },
    { href: "/journey?tab=favorites", icon: ICON.star, label: "Favorite Verses", sub: `${favorites.length} bookmarked` },
    { href: "/prayer-wall", icon: ICON.hands, label: "Prayer Wall", sub: "Pray & be prayed for" },
    { href: "/account", icon: ICON.compass, label: "Account", sub: `${ent.tier} membership` },
  ];

  return (
    <div className="m-wrap">
      {/* Greeting hero */}
      <section className="m-hero">
        <div className="m-hero-in">
          <span className="m-hero-kicker">{prettyDate(todayPT())}</span>
          <h1 className="m-hero-h">
            {greeting()}, {display}.
          </h1>
          <p className="m-hero-sub">
            Welcome to your walk with God today. Everything you&apos;re reading,
            studying, saving, and praying lives here — one calm place to keep going.
          </p>
        </div>
      </section>

      {/* Today's Walk */}
      <div className="m-section-tag" id="today">Today&apos;s Walk</div>
      <section className="m-today">
        {today ? (
          <>
            <div className="m-today-body">
              <span className="m-today-eyebrow">Today&apos;s devotional</span>
              <h2 className="m-today-title">{today.title}</h2>
              {today.data?.verseText && (
                <blockquote className="m-today-verse">
                  &ldquo;{today.data.verseText}&rdquo;
                  {today.data.verseRef && <cite> — {today.data.verseRef}</cite>}
                </blockquote>
              )}
              <Link href="/devotional" className="btn btn-gold">
                Read today&apos;s devotional →
              </Link>
            </div>
          </>
        ) : (
          <div className="m-today-body">
            <h2 className="m-today-title">Today&apos;s devotional is on its way.</h2>
            <p className="muted">Check back this morning — a fresh reading lands daily.</p>
          </div>
        )}
      </section>

      {/* Continue + Weekly video, side by side */}
      <div className="m-two">
        <section className="m-continue">
          <span className="m-card-eyebrow">{ICON.compass} Continue where you left off</span>
          <h3 className="m-card-h">Day {day} · Bible in a Year</h3>
          <p className="m-card-line">
            {reading?.reading ? `Read ${reading.reading}` : "Today's reading is ready."}
          </p>
          <div className="m-progress">
            <div className="m-progress-bar"><span style={{ width: `${pct}%` }} /></div>
            <span className="m-progress-num">{done} of {TOTAL_DAYS} days · {pct}%</span>
          </div>
          <Link href="/journey" className="btn btn-gold">Open My Journey →</Link>
        </section>

        <section className="m-weekly">
          <span className="m-card-eyebrow">{ICON.video} Weekly video</span>
          {video ? (
            <>
              <div className="m-weekly-thumb">
                {video.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={video.thumbnailUrl} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <span>▶</span>
                )}
              </div>
              <h3 className="m-card-h">{video.title}</h3>
              <p className="m-card-line">{video.channelTitle}</p>
              <Link href="/wonders" className="btn btn-ghost">Watch in Daily Wonders →</Link>
            </>
          ) : (
            <>
              <h3 className="m-card-h">A fresh video every Monday</h3>
              <p className="m-card-line muted">This week&apos;s pick is on its way.</p>
              <Link href="/wonders" className="btn btn-ghost">Open Daily Wonders →</Link>
            </>
          )}
        </section>
      </div>

      {/* Question of the Day + Bible Parallels */}
      <div className="m-section-tag">Reflect &amp; relate</div>
      <div className="m-two">
        <div className="m-panel">
          <QuestionOfDay
            date={pDate}
            question={poll.question}
            options={poll.options}
            initialCounts={pollCounts}
          />
        </div>
        <div className="m-panel m-parallel">
          <span className="m-card-eyebrow">✦ Bible Parallels</span>
          <div className="m-parallel-emoji" aria-hidden="true">{parallel.emoji}</div>
          <h3 className="m-parallel-hook">{parallel.parallel}</h3>
          <p className="m-parallel-truth">{parallel.truth}</p>
          <blockquote className="m-parallel-verse">
            &ldquo;{parallel.verseText}&rdquo; <cite>— {parallel.verseRef}</cite>
          </blockquote>
          <p className="m-parallel-framing">{FRAMING}</p>
        </div>
      </div>

      {/* Quick access */}
      <div className="m-section-tag">Quick access</div>
      <div className="m-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="m-card">
            <span className="m-card-ico">{c.icon}</span>
            <span className="m-card-label">{c.label}</span>
            <span className="m-card-sub">{c.sub}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
