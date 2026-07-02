import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
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
import { getWordOfTheDay } from "@/lib/wordOfTheDay";
import QuestionOfDay from "@/components/QuestionOfDay";
import MemoryFlashcard from "@/components/MemoryFlashcard";
import { POPULAR_VERSES } from "@/lib/popularVerses";
import { listEntries } from "@/lib/prayerJournal";
import {
  recordCheckIn,
  getStreak,
  getCurrentMemoryVerse,
  memorizedCounts,
  streakLeaderboard,
  communityPace,
  weeklyActivity,
  walkScore,
  communityWall,
  computeBadges,
  awardNewBadges,
  reactionsGivenCount,
  sharesPostedCount,
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
  "Take a breath. This is your time with God today — no rush, no guilt.",
  "However you arrived today — tired, hopeful, distracted — you're welcome here.",
  "He's not grading you; He's glad you came. Here's your walk with God today.",
  "Small and steady is how a life quietly changes. A few honest minutes is enough.",
  "His mercies are new this morning — including for you. Begin again.",
  "You don't have to carry today alone. Let God meet you right here.",
  "One day at a time, one step at a time. Slow down and walk with Him.",
  "Before the noise of the day, give God the first few minutes.",
  "No striving today — just showing up. That's the whole secret.",
  "Wherever you are in the journey, you're exactly on time.",
];
function dailySub(): string {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const start = Date.UTC(d.getFullYear(), 0, 0);
  const doy = Math.floor((d.getTime() - start) / 86400000);
  return DAILY_SUBS[doy % DAILY_SUBS.length];
}

/** Morning / noon / night — the hero "sky" shifts with the time you arrive. */
function timeOfDay(): "morning" | "noon" | "night" {
  const h = Number(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", hour12: false })
  );
  if (h < 12) return "morning";
  if (h < 18) return "noon";
  return "night";
}

const initials = (n: string) =>
  n.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "✦";

const svg = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const ICON = {
  compass: svg(<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>),
  video: svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></>),
  book: svg(<path d="M4 5v14M9 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9zM4 9h5M4 14h5" />),
  star: svg(<path d="M12 3.5 14.6 9l6 .5-4.6 4 1.4 5.8L12 16.9 6.6 19.3 8 13.5 3.4 9.5l6-.5z" />),
  hands: svg(<path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.65-7 9-7 9z" />),
  guide: svg(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .8-1 1.7M12 16h.01" /></>),
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
  const word = getWordOfTheDay();
  const pDate = pollDate();

  await recordCheckIn(user!.id); // count today toward the streak

  const [today, progress, video, noteDays, favorites, pollCounts, streak, mem, prayers, streakBoard, activity, wall, currentVerse] =
    await Promise.all([
      getLiveDevotional(),
      getOrCreateProgress(user!.id),
      getLiveWeeklyVideo(),
      listNoteDays(user!.id),
      listFavorites(user!.id),
      getCounts(pollDate(), poll.options.length),
      getStreak(user!.id),
      memorizedCounts(user!.id),
      listEntries(user!.id),
      streakLeaderboard(user!.id, 5),
      weeklyActivity(user!.id),
      communityWall(user!.id, 6),
      getCurrentMemoryVerse(user!.id),
    ]);

  const day = progress.currentDay;
  const reading = getStudyDay(day);
  const pct = progressPercent(progress);
  const done = daysCompleted(progress);
  const tod = timeOfDay();
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
  const nextBadge = badges.find((b) => !b.earned && !b.secret);

  const cards = [
    { href: "/portal/guide", icon: ICON.guide, label: "Pathlight", sub: "Ask, reflect, find verses" },
    { href: "/journey?tab=notes", icon: ICON.book, label: "Scripture Notes", sub: `${noteDays.length} saved` },
    { href: "/journey?tab=favorites", icon: ICON.star, label: "Favorite Verses", sub: `${favorites.length} bookmarked` },
    { href: "/portal/prayer", icon: ICON.hands, label: "Prayer Journal", sub: "Private prayers" },
    { href: "/portal/archive", icon: ICON.book, label: "Archive", sub: "Past devotionals" },
    { href: "/prayer-wall", icon: ICON.hands, label: "Prayer Wall", sub: "Pray & be prayed for" },
  ];

  const todTag = tod === "morning" ? "MORNING" : tod === "noon" ? "MIDDAY" : "EVENING";
  const avColors = ["blue", "green"] as const;

  return (
    <div className="mp">
      <style dangerouslySetInnerHTML={{ __html: MP_CSS }} />

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="sky" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
        </div>

        <div className="hero-top">
          <div className="hero-lead">
            <div className="kick">{prettyDate(todayPT()).toUpperCase()}</div>
            <h1 className="serif">{greeting()}, {display}.</h1>
            <p className="sub">{dailySub()}</p>
            <div className="chips">
              <span className="chip">📖 Day <b>{day}</b> of {TOTAL_DAYS}</span>
              <span className="chip">⭐ Walk Score <b>{score.score}</b></span>
              {joined && <span className="chip">🕊️ Walking since {joined}</span>}
            </div>
          </div>

          {/* North Star cluster */}
          <div className="northwrap" aria-label={`${streak.current} day streak`}>
            <div className="dove" aria-hidden="true">🕊️</div>
            <div className="nstar">
              <span className="core" />
              <span className="num">{streak.current}</span>
            </div>
            <div className="nstar-label">
              <div className="t">YOUR NORTH STAR</div>
              <div className="d">
                {streak.current === 0
                  ? "start your streak today"
                  : `${streak.current}-day streak · ${streak.today ? "lit today" : "guided by His light"}`}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Memory flashcard */}
      <MemoryFlashcard
        current={currentVerse ? { id: currentVerse.id, ref: currentVerse.ref, verseText: currentVerse.verseText } : null}
        popular={POPULAR_VERSES}
        setAction={setDashVerseAction}
        clearAction={clearDashVerseAction}
      />

      {/* ============= Devotional + Encouragement Wall ============= */}
      <div className="grid">
        <section className="card dev">
          <div className="crow">
            <span className="ctitle serif">Today&apos;s Devotional</span>
            <span className="tag">{todTag}</span>
          </div>
          {today ? (
            <>
              {today.data?.verseRef && <div className="vk">{today.data.verseRef.toUpperCase()}</div>}
              <h2 className="serif">{today.title}</h2>
              {today.data?.verseText && (
                <p>&ldquo;{today.data.verseText}&rdquo;</p>
              )}
              <Link className="btn" href="/devotional">Read today&apos;s walk →</Link>
            </>
          ) : (
            <>
              <h2 className="serif">Today&apos;s devotional is on its way.</h2>
              <p>Check back this morning — a fresh reading lands daily.</p>
            </>
          )}
        </section>

        <section className="card wall">
          <div className="crow">
            <span className="ctitle serif">Encouragement Wall</span>
            <span className="tag">COMMUNITY</span>
          </div>
          <form action={shareToWallAction} className="wall-share">
            <input
              name="text"
              maxLength={280}
              className="wall-input"
              placeholder="Share a praise or an encouragement…"
            />
            <button type="submit" className="btn btn-sm">Share</button>
          </form>
          {wall.length === 0 ? (
            <p className="wall-empty">Be the first to share something today. 🎉</p>
          ) : (
            wall.slice(0, 3).map((a, i) => (
              <div className="item" key={a.id}>
                <div className={`av ${avColors[i % 2]}`}>{initials(a.name)}</div>
                <div className="item-body">
                  <b>{a.name}</b>
                  <p>
                    {a.kind === "share" ? (
                      <>&ldquo;{a.label}&rdquo;</>
                    ) : (
                      <>{a.label}{a.detail && <> — {a.detail}</>}</>
                    )}
                  </p>
                  <div className="react">
                    {REACTIONS.map((r) => {
                      const n = a.counts[r.kind] ?? 0;
                      const mine = a.myReaction === r.kind;
                      return (
                        <form action={reactAction} key={r.kind}>
                          <input type="hidden" name="achievementId" value={a.id} />
                          <input type="hidden" name="kind" value={r.kind} />
                          <input type="hidden" name="from" value="/portal" />
                          <button type="submit" className={`react-btn${mine ? " on" : ""}`} title={r.label}>
                            {r.emoji}{n > 0 && <> {n}</>}
                          </button>
                        </form>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>

      {/* ============= The Inner Circle ============= */}
      <section className="card lb">
          <div className="crow">
            <span className="ctitle serif">The Inner Circle</span>
            <span className="tag">THIS WEEK</span>
          </div>
          {streakBoard.length === 0 ? (
            <p className="wall-empty">No streaks going yet — show up today to light the first one. 🔥</p>
          ) : (
            streakBoard.map((r, i) => (
              <div className={`lrow${r.isMe ? " me" : ""}`} key={r.userId}>
                <span className="rk">{["🥇", "🥈", "🥉"][i] ?? i + 1}</span>
                <div className="lring">{initials(r.name)}</div>
                <div className="nm">
                  {r.name}{r.isMe && <small> · you</small>}
                  <div className="fchips"><span>🔥 {r.count}-day streak</span></div>
                </div>
                <span className="sc">{r.count}</span>
              </div>
            ))
          )}
          <div className="badges" aria-label="Your badges">
            {earnedBadges.slice(0, 5).map((b) => (
              <div className="bdg" key={b.id} title={`${b.label} — ${b.blurb}`}>{b.emoji}</div>
            ))}
            {nextBadge && <div className="bdg lock" title={`Next up: ${nextBadge.label} — ${nextBadge.blurb}`}>{nextBadge.emoji}</div>}
            {earnedBadges.length === 0 && !nextBadge && <div className="bdg lock" title="Your first badge is one step away">✦</div>}
          </div>
          <p className="lb-foot">Iron sharpens iron — not a contest. We&apos;re cheering each other on toward Him. 🤍</p>
      </section>

      {/* ============= Continue + Weekly video ============= */}
      <div className="grid2">
        <section className="card cont">
          <div className="crow">
            <span className="ctitle serif">Continue your journey</span>
            <span className="tag">BIBLE IN A YEAR</span>
          </div>
          <div className="cont-h">Day {day}</div>
          <p>{reading?.reading ? `Today's reading — ${reading.reading}` : "Today's reading is ready."}</p>
          <div className="cont-bar"><span style={{ width: `${pct}%` }} /></div>
          <div className="cont-num">{done} of {TOTAL_DAYS} days · {pct}%</div>
          <Link className="btn" href="/journey">Open My Journey →</Link>
        </section>

        <section className="card vid">
          <div className="crow">
            <span className="ctitle serif">This Week&apos;s Video</span>
            <span className="tag">WATCH</span>
          </div>
          {video ? (
            <>
              {video.videoId && video.embeddable ? (
                <div className="vid-embed">
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
                <div className="vid-thumb">
                  {video.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={video.thumbnailUrl} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <span>▶</span>
                  )}
                </div>
              )}
              <div className="vid-t">{video.title}</div>
              <p>{video.channelTitle}</p>
            </>
          ) : (
            <>
              <div className="vid-thumb"><span>▶</span></div>
              <div className="vid-t">A fresh video every Monday</div>
              <p>This week&apos;s pick is on its way.</p>
            </>
          )}
        </section>
      </div>

      {/* ============= A little more for today (tucked) ============= */}
      <details className="mp-more">
        <summary>
          <span className="mp-more-t serif">✦ A little more for today</span>
          <span className="mp-more-h">Where everyone&apos;s at, your momentum, reflection &amp; wonder — tap to open.</span>
        </summary>

        {/* Community pace */}
        <section className="card">
          <div className="crow"><span className="ctitle serif">Where everyone&apos;s at</span><span className="tag">TOGETHER</span></div>
          <div className="pace-grid">
            <div className="pace-stat"><b>Day {pace.myDay}</b><span>you&apos;re here</span></div>
            <div className="pace-stat"><b>Day {pace.avgDay}</b><span>community average</span></div>
            <div className="pace-stat"><b>{pace.walking}</b><span>walking together</span></div>
          </div>
          <p className="mp-note">
            {pace.myDay >= pace.avgDay
              ? "You're right in step with the community — keep walking. 🌿"
              : "A little behind the group? There's no race here — pick up right where you are."}
          </p>
          <Link className="btn btn-ghost2" href="/subscribe">＋ Invite a friend to walk with you</Link>
        </section>

        {/* Momentum this week vs last */}
        <section className="card">
          <div className="crow"><span className="ctitle serif">Your momentum</span><span className="tag">THIS WEEK</span></div>
          <div className="mo-rows">
            {([
              { label: "Days walked", icon: "🔥", tw: activity.thisWeek.days, lw: activity.lastWeek.days, max: 7 },
              { label: "Verses memorized", icon: "📖", tw: activity.thisWeek.verses, lw: activity.lastWeek.verses, max: Math.max(3, activity.thisWeek.verses, activity.lastWeek.verses) },
            ] as const).map((r) => (
              <div key={r.label} className="mo-row">
                <div className="mo-label">{r.icon} {r.label}</div>
                <div className="mo-bars">
                  <div className="mo-bar"><span className="mo-fill this" style={{ width: `${Math.min(100, (r.tw / r.max) * 100)}%` }} /><em>This week · {r.tw}</em></div>
                  <div className="mo-bar"><span className="mo-fill last" style={{ width: `${Math.min(100, (r.lw / r.max) * 100)}%` }} /><em>Last week · {r.lw}</em></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reflect + relate */}
        <div className="grid2">
          <section className="card">
            <QuestionOfDay date={pDate} question={poll.question} options={poll.options} initialCounts={pollCounts} />
          </section>
          <section className="card">
            <div className="crow"><span className="ctitle serif">Bible Parallels</span><span className="tag">RELATE</span></div>
            <div className="parallel-emoji" aria-hidden="true">{parallel.emoji}</div>
            <h3 className="mp-h">{parallel.parallel}</h3>
            <p>{parallel.truth}</p>
            <blockquote className="mp-verse">&ldquo;{parallel.verseText}&rdquo; <cite>— {parallel.verseRef}</cite></blockquote>
            <p className="mp-note">{FRAMING}</p>
          </section>
        </div>

        {/* Wonder */}
        <section className="card word">
          <div className="crow"><span className="ctitle serif">Word of the Day</span><span className="tag">{word.lang.toUpperCase()}</span></div>
          <div className="word-term" lang={word.lang === "Greek" ? "el" : "he"}>{word.term}</div>
          <div className="word-translit">{word.translit} · {word.gloss}</div>
          <p>{word.meaning}</p>
          <blockquote className="mp-verse">&ldquo;{word.verseText}&rdquo; <cite>— {word.verseRef}</cite></blockquote>
          <p className="mp-note">{word.reflection}</p>
        </section>
        <div className="grid2">
          <section className="card">
            <div className="crow"><span className="ctitle serif">This Day in His Story</span><span className="tag">{String(moment.year)}</span></div>
            <h3 className="mp-h">{moment.title}</h3>
            <p>{moment.story}</p>
            <p className="mp-note">{moment.takeaway}</p>
          </section>
          <section className="card">
            <div className="crow"><span className="ctitle serif">Wonder of His Creation</span><span className="tag">MARVEL</span></div>
            <h3 className="mp-h">{wonder.title}</h3>
            <p>{wonder.body}</p>
            <blockquote className="mp-verse">&ldquo;{wonder.verseText}&rdquo; <cite>— {wonder.verseRef}</cite></blockquote>
            <p className="mp-note">{wonder.reflection}</p>
          </section>
        </div>

        {/* Quick access */}
        <div className="quick">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="quick-card">
              <span className="quick-ico">{c.icon}</span>
              <span className="quick-label">{c.label}</span>
              <span className="quick-sub">{c.sub}</span>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}

/* ============================================================ */
/* Self-contained "North Star" dashboard styling (scoped .mp).  */
/* A faithful port of /designs/portal/ic2-northstar, wired to    */
/* real member data. Reduced-motion safe.                        */
/* ============================================================ */
const MP_CSS = `
.mp{
  --gold:#E3C074;--gold2:#C9A24B;--gold-dk:#B8902E;--navy:#0b1424;
  --ink:#e8edf6;--mut:#9fb0c8;--mut2:#6f829e;--line:rgba(227,192,116,.16);
  --card:rgba(18,32,54,.72);--card2:rgba(13,24,42,.6);
  display:flex;flex-direction:column;gap:20px;min-width:0;max-width:1080px;margin:0 auto;
  color:var(--ink);
}
.mp *{box-sizing:border-box}
.mp a{color:inherit;text-decoration:none}
.mp .serif{font-family:var(--serif),"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400;letter-spacing:.2px}
.mp .kick{font-size:11px;letter-spacing:2.6px;color:var(--gold);font-weight:600}

/* ===== HERO ===== */
.mp .hero{
  position:relative;overflow:hidden;border-radius:24px;padding:30px 30px 26px;border:1px solid var(--line);
  background:
    radial-gradient(140% 120% at 50% -30%,rgba(120,160,220,.18),transparent 55%),
    radial-gradient(80% 90% at 50% 0%,rgba(20,38,66,.9),rgba(8,16,30,.96));
}
.mp .sky{position:absolute;inset:0;pointer-events:none}
.mp .sky i{position:absolute;width:2px;height:2px;border-radius:50%;background:#dce8ff;opacity:.5}
.mp .sky i:nth-child(1){top:14%;left:10%}
.mp .sky i:nth-child(2){top:26%;left:22%;width:1.5px;height:1.5px}
.mp .sky i:nth-child(3){top:18%;left:68%}
.mp .sky i:nth-child(4){top:40%;left:84%;width:2.5px;height:2.5px}
.mp .sky i:nth-child(5){top:60%;left:14%}
.mp .sky i:nth-child(6){top:72%;left:30%;width:1.5px;height:1.5px}
.mp .sky i:nth-child(7){top:55%;left:60%}
.mp .sky i:nth-child(8){top:78%;left:78%;width:2.5px;height:2.5px}
.mp .sky i:nth-child(9){top:33%;left:44%}
.mp .sky i:nth-child(10){top:66%;left:92%;width:1.5px;height:1.5px}

.mp .hero-top{position:relative;display:flex;justify-content:space-between;gap:24px;align-items:flex-start}
.mp .hero-lead{min-width:0}
.mp .hero h1{font-size:40px;line-height:1.05;margin:10px 0 8px}
.mp .hero .sub{color:var(--mut);font-size:14.5px;max-width:460px;line-height:1.55}
.mp .chips{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.mp .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:12px;font-size:13px;
  background:rgba(255,255,255,.04);border:1px solid var(--line);color:var(--ink)}
.mp .chip b{color:var(--gold)}

/* North Star cluster — a calm, neutral streak medallion (not a glowing beacon) */
.mp .northwrap{position:relative;width:184px;min-width:184px;height:150px;flex-shrink:0}
.mp .nstar{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:84px;height:84px;display:grid;place-items:center}
.mp .nstar .core{position:relative;width:70px;height:70px;border-radius:50%;
  background:linear-gradient(155deg,#fdf4e2 0%,#f0dcb0 46%,#e3c074 100%);
  border:1px solid rgba(255,255,255,.55);
  box-shadow:0 10px 24px -8px rgba(12,20,36,.75),inset 0 2px 5px rgba(255,255,255,.6),inset 0 -5px 10px rgba(184,144,46,.28)}
.mp .nstar::after{content:"✦";position:absolute;top:-3px;right:8px;font-size:14px;color:var(--gold);opacity:.85}
.mp .nstar .num{position:relative;z-index:2;font-size:27px;font-weight:800;color:#3b2f10}
.mp .nstar-label{position:absolute;top:96px;left:0;right:0;text-align:center}
.mp .nstar-label .t{font-size:10px;letter-spacing:2.4px;color:var(--gold);font-weight:600}
.mp .nstar-label .d{font-size:11.5px;color:var(--mut);margin-top:3px;line-height:1.4}
.mp .dove{position:absolute;top:14px;left:14px;font-size:16px;opacity:.85;filter:drop-shadow(0 1px 2px rgba(12,20,36,.4))}

/* star-path */
.mp .pathwrap{position:relative;margin-top:24px;padding-top:18px;border-top:1px solid var(--line)}
.mp .path-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.mp .path-head .lbl{font-size:11px;letter-spacing:2.4px;color:var(--gold);font-weight:600}
.mp .path-head .ends{font-size:11px;color:var(--mut2)}
.mp .pathsvg{display:block;width:100%;height:96px}
.mp .path-cap{font-size:12px;color:var(--mut);margin-top:2px}

/* time-of-day */
.mp .tod{display:flex;align-items:center;gap:12px;margin-top:14px;flex-wrap:wrap}
.mp .tod .swatches{display:flex;gap:6px}
.mp .sw{width:30px;height:18px;border-radius:6px;border:1px solid var(--line);opacity:.5}
.mp .sw.on{opacity:1;box-shadow:0 0 0 1px rgba(227,192,116,.55)}
.mp .sw.m{background:linear-gradient(180deg,#f7d9a6,#bcd4ef)}
.mp .sw.n{background:linear-gradient(180deg,#a9d2f2,#dfeefb)}
.mp .sw.t{background:linear-gradient(180deg,#16263f,#0b1424)}
.mp .tod .cap{font-size:11.5px;color:var(--mut)}
.mp .tod .arc{font-size:13px;color:var(--gold);letter-spacing:1px}

/* ===== Cards + grids ===== */
.mp .grid{display:grid;grid-template-columns:1.35fr 1fr;gap:20px;align-items:start}
.mp .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}
.mp .card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px;
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 20px 44px -30px rgba(0,0,0,.85)}
.mp .crow{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}
.mp .tag{font-size:9.5px;letter-spacing:2px;font-weight:700;color:var(--navy);white-space:nowrap;
  background:linear-gradient(150deg,var(--gold),var(--gold2));padding:5px 9px;border-radius:7px}
.mp .ctitle{font-size:21px}
.mp .card > p{color:var(--mut);font-size:14px;line-height:1.6}

/* buttons */
.mp .btn{display:inline-block;margin-top:16px;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:700;
  color:var(--navy);background:linear-gradient(150deg,var(--gold),var(--gold-dk));
  box-shadow:0 8px 22px rgba(201,162,75,.32);transition:transform .18s,box-shadow .18s}
.mp .btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(201,162,75,.42)}
.mp .btn.btn-sm{margin:0;padding:10px 14px;font-size:13px}
.mp .btn.btn-ghost2{background:transparent;color:var(--gold);border:1px solid var(--line);box-shadow:none}
.mp .btn.btn-ghost2:hover{transform:none;border-color:var(--gold);background:rgba(227,192,116,.06)}

/* Devotional */
.mp .dev .vk{font-size:11px;letter-spacing:2.2px;color:var(--gold);font-weight:600;margin:14px 0 6px}
.mp .dev h2{font-size:28px;line-height:1.12;margin-bottom:12px}
.mp .dev p{color:var(--mut);font-size:14.5px;line-height:1.65}

/* Wall */
.mp .wall-share{display:flex;gap:8px;margin-bottom:12px}
.mp .wall-input{flex:1;min-width:0;background:rgba(8,16,30,.5);border:1px solid var(--line);border-radius:11px;
  padding:10px 12px;color:var(--ink);font-size:13px;font-family:inherit}
.mp .wall-input::placeholder{color:var(--mut2)}
.mp .wall-empty{color:var(--mut);font-size:13.5px}
.mp .wall .item{display:flex;gap:12px;padding:13px;border-radius:14px;background:rgba(255,255,255,.025);
  border:1px solid rgba(255,255,255,.05);margin-top:11px}
.mp .item-body{min-width:0}
.mp .av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-size:12px;font-weight:700;color:#fff}
.mp .av.blue{background:linear-gradient(150deg,#5b86c4,#3a5d96);box-shadow:0 0 0 2px rgba(91,134,196,.3)}
.mp .av.green{background:linear-gradient(150deg,#5aa982,#3c7d5e);box-shadow:0 0 0 2px rgba(90,169,130,.3)}
.mp .item b{font-size:13.5px}
.mp .item p{font-size:13px;color:var(--mut);line-height:1.5;margin:3px 0 8px}
.mp .react{display:flex;gap:8px;flex-wrap:wrap}
.mp .react form{margin:0}
.mp .react-btn{font-size:11.5px;color:var(--mut2);background:rgba(255,255,255,.04);border:1px solid var(--line);
  padding:3px 9px;border-radius:20px;cursor:pointer;font-family:inherit;transition:.15s}
.mp .react-btn:hover{color:var(--ink);border-color:var(--gold)}
.mp .react-btn.on{color:var(--navy);background:linear-gradient(150deg,var(--gold),var(--gold2));border-color:transparent}

/* This Week chart */
.mp .chart svg{display:block;width:100%;height:120px}
.mp .week{display:flex;justify-content:space-between;font-size:10px;color:var(--mut2);margin-top:6px;padding:0 6px}
.mp .chart-cap{font-size:12px;color:var(--mut);margin-top:8px}

/* Leaderboard */
.mp .lb .lrow{display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.mp .lb .lrow.me{margin:0 -10px;padding:9px 10px;border-radius:10px;background:rgba(227,192,116,.06);border-bottom-color:transparent}
.mp .lb .rk{width:20px;text-align:center;font-size:13px;font-weight:700}
.mp .lring{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;
  color:var(--gold);background:var(--navy);box-shadow:0 0 0 2px var(--navy),0 0 0 3.5px rgba(227,192,116,.5)}
.mp .lb .nm{flex:1;min-width:0;font-size:13px}
.mp .lb .nm small{color:var(--mut2);font-size:10.5px}
.mp .lb .sc{font-size:16px;font-weight:800;color:var(--gold)}
.mp .fchips{display:flex;gap:6px;margin-top:3px}
.mp .fchips span{font-size:10.5px;color:var(--mut2)}
.mp .badges{display:flex;gap:9px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line);flex-wrap:wrap}
.mp .bdg{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;font-size:16px;
  background:rgba(255,255,255,.04);border:1px solid var(--line)}
.mp .bdg.lock{opacity:.45}
.mp .lb-foot{font-size:12px;color:var(--mut);text-align:center;margin-top:12px}

/* Continue */
.mp .cont .cont-h{font-size:30px;font-family:var(--serif),Georgia,serif;margin:8px 0 4px}
.mp .cont p{color:var(--mut);font-size:14px}
.mp .cont-bar{height:8px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden;margin:14px 0 6px}
.mp .cont-bar span{display:block;height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold));border-radius:99px}
.mp .cont-num{font-size:12px;color:var(--mut)}

/* Weekly video */
.mp .vid-embed,.mp .vid-thumb{border-radius:14px;overflow:hidden;background:rgba(8,16,30,.6);
  aspect-ratio:16/9;display:grid;place-items:center;margin-bottom:12px}
.mp .vid-embed iframe{width:100%;height:100%;border:0;display:block}
.mp .vid-thumb img{width:100%;height:100%;object-fit:cover}
.mp .vid-thumb span{font-size:34px;color:var(--gold)}
.mp .vid-t{font-size:16px;font-weight:600;line-height:1.3}
.mp .vid p{color:var(--mut);font-size:13px;margin-top:3px}

/* ===== Tucked "more" ===== */
.mp .mp-more{margin-top:2px}
.mp .mp-more>summary{list-style:none;cursor:pointer;display:flex;flex-direction:column;gap:2px;
  padding:16px 20px;border-radius:16px;border:1px solid var(--line);background:var(--card2)}
.mp .mp-more>summary::-webkit-details-marker{display:none}
.mp .mp-more>summary:hover{border-color:rgba(227,192,116,.32)}
.mp .mp-more-t{font-size:17px;color:var(--gold)}
.mp .mp-more-h{font-size:12.5px;color:var(--mut)}
.mp .mp-more[open]>summary{margin-bottom:20px}
.mp .mp-more>*+*{margin-top:20px}
.mp .mp-h{font-size:18px;font-weight:600;margin:8px 0 6px;line-height:1.3}
.mp .mp-note{font-size:12.5px;color:var(--mut);line-height:1.55;margin-top:8px}
.mp .mp-verse{border-left:3px solid var(--gold);padding:2px 0 2px 14px;margin:12px 0;color:var(--ink);
  font-family:var(--serif),Georgia,serif;font-size:16px;line-height:1.5}
.mp .mp-verse cite{display:block;font-size:12px;color:var(--gold);font-style:normal;margin-top:6px}
.mp .parallel-emoji{font-size:30px}
.mp .word .word-term{font-size:30px;font-family:var(--serif),Georgia,serif;color:var(--gold);margin:6px 0 2px}
.mp .word .word-translit{font-size:12.5px;color:var(--mut);letter-spacing:.5px;margin-bottom:8px}

/* pace + momentum */
.mp .pace-grid{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:6px}
.mp .pace-stat{flex:1;min-width:96px;text-align:center;background:rgba(255,255,255,.03);border:1px solid var(--line);
  border-radius:14px;padding:14px 8px}
.mp .pace-stat b{display:block;font-size:20px;color:var(--gold)}
.mp .pace-stat span{font-size:11.5px;color:var(--mut)}
.mp .mo-rows{display:flex;flex-direction:column;gap:16px}
.mp .mo-label{font-size:13px;margin-bottom:8px}
.mp .mo-bars{display:flex;flex-direction:column;gap:8px}
.mp .mo-bar{position:relative;height:24px;border-radius:8px;background:rgba(255,255,255,.05);overflow:hidden}
.mp .mo-fill{position:absolute;inset:0 auto 0 0;border-radius:8px}
.mp .mo-fill.this{background:linear-gradient(90deg,var(--gold2),var(--gold))}
.mp .mo-fill.last{background:rgba(159,176,200,.35)}
.mp .mo-bar em{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;font-style:normal;color:var(--ink)}

/* quick access */
.mp .quick{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.mp .quick-card{display:flex;flex-direction:column;gap:4px;padding:16px;border-radius:16px;
  background:var(--card2);border:1px solid var(--line);transition:.16s}
.mp .quick-card:hover{border-color:rgba(227,192,116,.35);transform:translateY(-2px)}
.mp .quick-ico{width:22px;height:22px;color:var(--gold)}
.mp .quick-ico svg{width:22px;height:22px}
.mp .quick-label{font-size:14px;font-weight:600}
.mp .quick-sub{font-size:11.5px;color:var(--mut)}

/* flashcard sits full-width between hero and grids — dark glass tile */
.mp .m-flash{margin:0}

@media (max-width:920px){
  .mp .grid,.mp .grid2,.mp .quick{grid-template-columns:1fr}
  .mp .hero h1{font-size:31px}
  .mp .hero-top{flex-direction:column-reverse;align-items:flex-start}
  .mp .northwrap{align-self:center}
}

@media (prefers-reduced-motion: no-preference){
  .mp .sky i{animation:mp-tw 4s ease-in-out infinite}
  .mp .sky i:nth-child(2n){animation-duration:5.5s;animation-delay:1s}
  .mp .sky i:nth-child(3n){animation-duration:6.5s;animation-delay:.5s}
  @keyframes mp-tw{0%,100%{opacity:.25}50%{opacity:.9}}
  .mp .dove{animation:mp-dove 9s ease-in-out infinite}
  @keyframes mp-dove{0%{transform:translate(0,0) rotate(-4deg)}50%{transform:translate(14px,8px) rotate(3deg)}100%{transform:translate(0,0) rotate(-4deg)}}
  .mp .shimmer{animation:mp-shim 5s linear infinite}
  @keyframes mp-shim{0%{stroke-dashoffset:240}100%{stroke-dashoffset:0}}
  .mp .bar{transform-box:fill-box;transform-origin:bottom;animation:mp-bar 1s ease forwards;transform:scaleY(0)}
  .mp .bar:nth-child(2){animation-delay:.06s}.mp .bar:nth-child(3){animation-delay:.12s}
  .mp .bar:nth-child(4){animation-delay:.18s}.mp .bar:nth-child(5){animation-delay:.24s}
  .mp .bar:nth-child(6){animation-delay:.3s}.mp .bar:nth-child(7){animation-delay:.36s}
  @keyframes mp-bar{to{transform:scaleY(1)}}
  .mp .youstar{animation:mp-you 3s ease-in-out infinite}
  @keyframes mp-you{0%,100%{r:6;opacity:1}50%{r:7.5;opacity:.85}}
  .mp .wall .item{opacity:0;animation:mp-fade .7s ease forwards}
  .mp .wall .item:nth-child(3){animation-delay:.2s}
  .mp .wall .item:nth-child(4){animation-delay:.4s}
  @keyframes mp-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
}
`;
