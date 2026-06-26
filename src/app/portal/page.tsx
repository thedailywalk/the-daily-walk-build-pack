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
import { getHistoryMoment } from "@/lib/thisDayInHistory";
import { getWonderOfTheDay } from "@/lib/wonderOfTheDay";
import QuestionOfDay from "@/components/QuestionOfDay";
import MemoryFlashcard from "@/components/MemoryFlashcard";
import { POPULAR_VERSES } from "@/lib/popularVerses";
import { listEntries } from "@/lib/prayerJournal";
import {
  recordCheckIn,
  getStreak,
  getCurrentMemoryVerse,
  memorizedCounts,
  weeklyLeaderboard,
  streakLeaderboard,
  communityPace,
  weeklyActivity,
  walkScore,
  communityWall,
  computeBadges,
  awardNewBadges,
  reactionsGivenCount,
  sharesPostedCount,
  displayNameFromEmail,
  REACTIONS,
} from "@/lib/community";
import { reactAction, shareToWallAction, setDashVerseAction, clearDashVerseAction } from "./memory/actions";

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

/** A gentle welcome line that quietly changes each day (rotates by date). */
const DAILY_SUBS = [
  "Take a breath. This is your time with God today — no rush, no guilt. Everything you're reading, studying, and praying lives right here.",
  "However you arrived this morning — tired, hopeful, distracted — you're welcome here. Let's take the next quiet step together.",
  "He's not grading you; He's glad you came. Settle in — your walk with God for today is all in one place.",
  "Small and steady is how a life quietly changes. A few honest minutes today is enough.",
  "His mercies are new this morning — including for you. Come as you are and begin again.",
  "You don't have to carry today alone. Read a little, pray a little, and let God meet you right here.",
  "One day at a time, one step at a time. This is your space to slow down and walk with Him.",
  "Before the noise of the day, give God the first few minutes. Everything you need is gathered below.",
  "No striving today — just showing up. That's the whole secret, and you're already doing it.",
  "Wherever you are in the journey, you're exactly on time. Let's keep walking together.",
];
function dailySub(): string {
  const d = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const start = Date.UTC(d.getFullYear(), 0, 0);
  const doy = Math.floor((d.getTime() - start) / 86400000);
  return DAILY_SUBS[doy % DAILY_SUBS.length];
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
  const moment = getHistoryMoment();
  const wonder = getWonderOfTheDay();
  const pDate = pollDate();

  await recordCheckIn(user!.id); // count today toward the streak

  const [ent, today, progress, video, noteDays, favorites, pollCounts, streak, mem, prayers, weekly, streakBoard, activity, wall, currentVerse] =
    await Promise.all([
      getEntitlement(email),
      getLiveDevotional(),
      getOrCreateProgress(user!.id),
      getLiveWeeklyVideo(),
      listNoteDays(user!.id),
      listFavorites(user!.id),
      getCounts(pollDate(), poll.options.length),
      getStreak(user!.id),
      memorizedCounts(user!.id),
      listEntries(user!.id),
      weeklyLeaderboard(user!.id, 5),
      streakLeaderboard(user!.id, 5),
      weeklyActivity(user!.id),
      communityWall(user!.id, 8),
      getCurrentMemoryVerse(user!.id),
    ]);

  const day = progress.currentDay;
  const reading = getStudyDay(day);
  const pct = progressPercent(progress);
  const done = daysCompleted(progress);
  const pace = await communityPace(user!.id, day);
  const [reactionsGiven, sharesPosted] = await Promise.all([
    reactionsGivenCount(user!.id),
    sharesPostedCount(user!.id),
  ]);

  // Walk Score — one transparent number from real engagement.
  const score = walkScore({
    daysCompleted: done,
    memorizedTotal: mem.total,
    prayerCount: prayers.length,
    longestStreak: streak.longest,
    notesCount: noteDays.length,
    favoritesCount: favorites.length,
  });

  // "Walking since" from the account creation date.
  const joined = user!.created_at
    ? new Date(user!.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  // Badges (derived) + post any newly-earned ones to the wall.
  const badgeStats = {
    longestStreak: streak.longest,
    currentStreak: streak.current,
    memorizedTotal: mem.total,
    prayerCount: prayers.length,
    favoritesCount: favorites.length,
    notesCount: noteDays.length,
    daysCompleted: done,
    reactionsGiven,
    sharesPosted,
  };
  await awardNewBadges(user!.id, display, badgeStats);
  const badges = computeBadges(badgeStats);
  const earnedBadges = badges.filter((b) => b.earned);
  // Never preview secret badges — they stay a surprise until earned.
  const nextBadge = badges.find((b) => !b.earned && !b.secret);

  const cards = [
    { href: "/portal/guide", icon: ICON.guide, label: "Pathlight", sub: "Ask, reflect, find verses" },
    { href: "/wonders", icon: ICON.star, label: "Daily Wonders", sub: "Word, history & wonder" },
    { href: "/journey?tab=notes", icon: ICON.book, label: "Scripture Notes", sub: `${noteDays.length} saved` },
    { href: "/journey?tab=favorites", icon: ICON.star, label: "Favorite Verses", sub: `${favorites.length} bookmarked` },
    { href: "/portal/prayer", icon: ICON.hands, label: "Prayer Journal", sub: "Private prayers" },
    { href: "/portal/archive", icon: ICON.book, label: "Archive", sub: "Past devotionals" },
    { href: "/prayer-wall", icon: ICON.hands, label: "Prayer Wall", sub: "Pray & be prayed for" },
    { href: "/account", icon: ICON.compass, label: "Account", sub: `${ent.tier} membership` },
  ];

  return (
    <div className="m-wrap">
      {/* Greeting hero — elevated "inner circle" feel, kept light */}
      <section className="m-hero m-hero-elevated">
        <div className="m-hero-sky" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="m-hero-in">
          <div className="m-hero-top">
            <div className="m-hero-profile">
              <span className="m-avatar" aria-hidden="true">{display.charAt(0)}</span>
              <div>
                <span className="m-hero-kicker">{prettyDate(todayPT())}</span>
                <h1 className="m-hero-h">{greeting()}, {display}.</h1>
                <div className="m-hero-meta">
                  {joined && <span>Walking since {joined}</span>}
                  <span className="m-tier">{ent.tier}</span>
                </div>
              </div>
            </div>

            {/* North Star streak */}
            <div className="m-north" aria-label={`${streak.current} day streak`}>
              <span className="m-north-dove" aria-hidden="true">🕊️</span>
              <span className="m-north-star" aria-hidden="true">
                <span className="m-north-flare" />
                <span className="m-north-core" />
                <span className="m-north-num">{streak.current}</span>
              </span>
              <span className="m-north-label">
                <b>YOUR NORTH STAR</b>
                <span>
                  {streak.current === 0
                    ? "start your streak today"
                    : `${streak.current}-day streak · ${streak.today ? "lit today" : "guided by His light"}`}
                </span>
              </span>
            </div>
          </div>

          <p className="m-hero-sub">{dailySub()}</p>

          {/* Walk Score */}
          <div className="m-walkscore">
            <div className="m-ws-num">
              <b>{score.score}</b>
              <span>Walk Score</span>
            </div>
            <div className="m-ws-body">
              <div className="m-ws-level">{score.level}</div>
              <div className="m-ws-bar"><span style={{ width: `${Math.round(score.intoLevel * 100)}%` }} /></div>
              <div className="m-ws-hint">
                {score.nextLevel
                  ? `${score.toNext} to ${score.nextLevel} — reading, prayer & memorized verses all add up.`
                  : "Deeply rooted. Keep walking. 🌳"}
              </div>
            </div>
          </div>

          {/* Journey star-path */}
          <div className="m-journey">
            <div className="m-journey-head">
              <span className="m-journey-lbl">YOUR JOURNEY</span>
              <span className="m-journey-ends">Day 1 — Day {TOTAL_DAYS}</span>
            </div>
            {(() => {
              const youX = 30 + (pct / 100) * 840;
              const youY = 60 - (pct / 100) * 48;
              return (
                <svg className="m-journeysvg" viewBox="0 0 900 70" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="m-jpath" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="rgba(184,144,46,.3)" />
                      <stop offset="1" stopColor="rgba(184,144,46,.55)" />
                    </linearGradient>
                  </defs>
                  <line x1="30" y1="60" x2="870" y2="12" stroke="rgba(31,58,95,.15)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="30" y1="60" x2={youX} y2={youY} stroke="url(#m-jpath)" strokeWidth="3" strokeLinecap="round" />
                  {[0, 25, 50, 75, 100].map((p) => (
                    <circle key={p} cx={30 + (p / 100) * 840} cy={60 - (p / 100) * 48} r="2.5" fill="rgba(31,58,95,.25)" />
                  ))}
                  <circle cx="870" cy="12" r="5" fill="#C9A24B" />
                  <circle cx="870" cy="12" r="9" fill="none" stroke="rgba(201,162,75,.4)" strokeWidth="1.5" />
                  <circle className="m-journey-you" cx={youX} cy={youY} r="6" fill="#B8902E" />
                  <circle cx={youX} cy={youY} r="11" fill="none" stroke="rgba(201,162,75,.45)" strokeWidth="1.5" />
                </svg>
              );
            })()}
            <div className="m-journey-cap">Day {day} · you are here — {pct}% of the way to Day {TOTAL_DAYS}</div>
          </div>

          {/* Memory flashcard */}
          <MemoryFlashcard
            current={currentVerse ? { id: currentVerse.id, ref: currentVerse.ref, verseText: currentVerse.verseText } : null}
            popular={POPULAR_VERSES}
            setAction={setDashVerseAction}
            clearAction={clearDashVerseAction}
          />
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
          <span className="m-card-eyebrow">{ICON.video} This week&apos;s video</span>
          {video ? (
            <>
              {video.videoId && video.embeddable ? (
                <div className="m-weekly-embed">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="m-weekly-thumb">
                  {video.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={video.thumbnailUrl} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <span>▶</span>
                  )}
                </div>
              )}
              <h3 className="m-card-h">{video.title}</h3>
              <p className="m-card-line">{video.channelTitle}</p>
            </>
          ) : (
            <>
              <div className="m-weekly-thumb"><span>▶</span></div>
              <h3 className="m-card-h">A fresh video every Monday</h3>
              <p className="m-card-line muted">This week&apos;s pick is on its way.</p>
            </>
          )}
        </section>
      </div>

      {/* Community: walk together */}
      <div className="m-section-tag">Walk together</div>

      {/* Where everyone's at — grace-first community pace */}
      <section className="m-panel m-pace">
        <span className="m-card-eyebrow">✦ Where everyone&apos;s at</span>
        <div className="m-pace-grid">
          <div className="m-pace-stat"><b>Day {pace.myDay}</b><span>you&apos;re here</span></div>
          <div className="m-pace-stat"><b>Day {pace.avgDay}</b><span>community average</span></div>
          <div className="m-pace-stat"><b>{pace.walking}</b><span>walking together</span></div>
        </div>
        <p className="m-card-line muted" style={{ marginTop: 4 }}>
          {pace.myDay >= pace.avgDay
            ? "You're right in step with the community — keep walking. 🌿"
            : "A little behind the group? There's no race here — pick up right where you are."}
        </p>
        <div className="m-pace-actions">
          <Link href="/journey" className="btn btn-ghost">Continue my journey →</Link>
          <Link href="/subscribe" className="m-invite">＋ Invite a friend to walk with you</Link>
        </div>
      </section>

      {/* Iron sharpens iron — optional friendly accountability board */}
      <details className="m-accountability">
        <summary>
          <span className="m-acc-title">⚔️ Iron sharpens iron</span>
          <span className="m-acc-hint">Optional — a friendly nudge to keep each other accountable. Tap to open.</span>
        </summary>
        <div className="m-two m-acc-boards">
          <section className="m-panel m-leaderboard">
            <span className="m-card-eyebrow">🔥 Longest streaks right now</span>
            {streakBoard.length === 0 ? (
              <p className="muted">No streaks going yet — <Link href="/portal">show up today</Link> to start one.</p>
            ) : (
              <ol className="mem-lb">
                {streakBoard.map((r, i) => (
                  <li key={r.userId} className={`mem-lb-row${r.isMe ? " is-me" : ""}`}>
                    <span className="mem-lb-rank">{["🥇", "🥈", "🥉"][i] ?? i + 1}</span>
                    <span className="mem-lb-name">{r.name}{r.isMe && <em> · you</em>}</span>
                    <span className="mem-lb-count">{r.count}<span> days</span></span>
                  </li>
                ))}
              </ol>
            )}
          </section>
          <section className="m-panel m-leaderboard">
            <span className="m-card-eyebrow">📖 Verses memorized this week</span>
            {weekly.length === 0 ? (
              <p className="muted">No verses yet this week. <Link href="/portal/memory">Be the first →</Link></p>
            ) : (
              <ol className="mem-lb">
                {weekly.map((r, i) => (
                  <li key={r.userId} className={`mem-lb-row${r.isMe ? " is-me" : ""}`}>
                    <span className="mem-lb-rank">{["🥇", "🥈", "🥉"][i] ?? i + 1}</span>
                    <span className="mem-lb-name">{r.name}{r.isMe && <em> · you</em>}</span>
                    <span className="mem-lb-count">{r.count}<span> verses</span></span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
        <p className="m-acc-foot">Iron sharpens iron — not a contest. We&apos;re cheering each other on toward Him. 🤍</p>
      </details>

      {/* Encouragement wall + share */}
      <section className="m-panel m-wall">
        <span className="m-card-eyebrow">♥ Encouragement wall</span>
        <p className="m-card-line muted" style={{ marginTop: -2 }}>
          Praises and milestones from the community. Share something, or send a little support — no words needed.
        </p>
        <form action={shareToWallAction} className="m-share">
          <input
            name="text"
            maxLength={280}
            className="m-share-input"
            placeholder="Share a praise, an answered prayer, or an encouragement…"
          />
          <button type="submit" className="btn btn-gold">Share</button>
        </form>
        {wall.length === 0 ? (
          <p className="muted">Be the first to share something today. 🎉</p>
        ) : (
          <ul className="m-wall-feed">
            {wall.map((a) => (
              <li key={a.id} className="m-wall-item">
                <p className="m-wall-text">
                  <strong>{a.name}</strong>{" "}
                  {a.kind === "share" ? (
                    <span className="m-wall-said">&ldquo;{a.label}&rdquo;</span>
                  ) : (
                    <>
                      {a.label}
                      {a.detail && <span className="m-wall-detail"> — {a.detail}</span>}
                    </>
                  )}
                </p>
                <div className="m-wall-reacts">
                  {REACTIONS.map((r) => {
                    const n = a.counts[r.kind] ?? 0;
                    const mine = a.myReaction === r.kind;
                    return (
                      <form action={reactAction} key={r.kind}>
                        <input type="hidden" name="achievementId" value={a.id} />
                        <input type="hidden" name="kind" value={r.kind} />
                        <input type="hidden" name="from" value="/portal" />
                        <button type="submit" className={`m-react${mine ? " is-on" : ""}`} title={r.label}>
                          <span aria-hidden="true">{r.emoji}</span>
                          {n > 0 && <span className="m-react-n">{n}</span>}
                        </button>
                      </form>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* More for today — tucked away to keep the dashboard calm */}
      <details className="m-more">
        <summary>
          <span className="m-acc-title">✦ A little more for today</span>
          <span className="m-acc-hint">Your momentum, badges, reflection &amp; wonder — tap to open.</span>
        </summary>

      {/* Weekly momentum — this week vs last week */}
      <section className="m-momentum">
        <span className="m-card-eyebrow">✦ Your momentum</span>
        <div className="m-mo-rows">
          {([
            { label: "Days walked", icon: "🔥", tw: activity.thisWeek.days, lw: activity.lastWeek.days, max: 7 },
            { label: "Verses memorized", icon: "📖", tw: activity.thisWeek.verses, lw: activity.lastWeek.verses, max: Math.max(3, activity.thisWeek.verses, activity.lastWeek.verses) },
          ] as const).map((r) => (
            <div key={r.label} className="m-mo-row">
              <div className="m-mo-label">{r.icon} {r.label}</div>
              <div className="m-mo-bars">
                <div className="m-mo-bar"><span className="m-mo-fill is-this" style={{ width: `${Math.min(100, (r.tw / r.max) * 100)}%` }} /><em>This week · {r.tw}</em></div>
                <div className="m-mo-bar"><span className="m-mo-fill is-last" style={{ width: `${Math.min(100, (r.lw / r.max) * 100)}%` }} /><em>Last week · {r.lw}</em></div>
              </div>
            </div>
          ))}
        </div>
        <p className="m-mo-foot">
          {activity.thisWeek.days >= activity.lastWeek.days
            ? "You're keeping pace — beautiful. Small and steady wins. 🌱"
            : "A gentler week — that's okay. Today is a fresh start."}
        </p>
      </section>

      {/* Your badges */}
      <div className="m-section-tag">Your badges</div>
      <section className="m-badges">
        {earnedBadges.length === 0 && (
          <p className="muted" style={{ margin: "2px 2px 12px" }}>
            Your first badge is one step away — read today, write a prayer, or memorize a verse. 🌱
          </p>
        )}
        <div className="m-badge-row">
          {earnedBadges.map((b) => (
            <div key={b.id} className={`m-badge is-earned${b.secret ? " is-secret" : ""}`} title={b.blurb}>
              <span className="m-badge-ico">{b.emoji}</span>
              <span className="m-badge-name">{b.label}</span>
              {b.secret && <span className="m-badge-secret">✨ hidden</span>}
            </div>
          ))}
          {nextBadge && (
            <div className="m-badge is-next" title={nextBadge.blurb}>
              <span className="m-badge-ico">{nextBadge.emoji}</span>
              <span className="m-badge-name">{nextBadge.label}</span>
              <span className="m-badge-next">Next up</span>
            </div>
          )}
        </div>
      </section>

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

      {/* A little more wonder — This Day in His Story + Wonder of His Creation */}
      <div className="m-section-tag">A little more wonder today</div>
      <div className="m-two">
        <section className="m-panel m-hist">
          <span className="m-card-eyebrow">✦ This Day in His Story</span>
          <div className="m-hist-year">{moment.year}</div>
          <h3 className="m-card-h">{moment.title}</h3>
          <p className="m-card-line">{moment.story}</p>
          <p className="m-hist-take">{moment.takeaway}</p>
        </section>

        <section className="m-panel m-wonder">
          <span className="m-card-eyebrow">✦ Wonder of His Creation</span>
          <h3 className="m-card-h">{wonder.title}</h3>
          <p className="m-card-line">{wonder.body}</p>
          <blockquote className="m-wonder-verse">
            &ldquo;{wonder.verseText}&rdquo; <cite>— {wonder.verseRef}</cite>
          </blockquote>
          <p className="m-wonder-reflect">{wonder.reflection}</p>
          <Link href="/wonders" className="btn btn-ghost">Open Daily Wonders →</Link>
        </section>
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
      </details>
    </div>
  );
}
