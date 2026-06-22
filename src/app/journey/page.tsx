import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getOrCreateProgress } from "@/lib/progress";
import { getStudyDay, getBookStarts, ARCS } from "@/lib/studyGuide";
import { getNotes, listNoteDays, listFavorites } from "@/lib/studyData";
import { daysCompleted, progressPercent, TOTAL_DAYS } from "@/lib/journey";
import StudyGuide from "@/components/StudyGuide";
import StudySideCards from "@/components/StudySideCards";
import {
  markCompleteAction,
  restartAction,
  jumpToDayAction,
  removeFavoriteAction,
} from "./actions";

export const metadata: Metadata = {
  title: "My Journey",
  robots: { index: false },
};

const TABS = [
  { key: "today", label: "Today's Reading" },
  { key: "progress", label: "My Progress" },
  { key: "plan", label: "Reading Plan" },
  { key: "notes", label: "Saved Notes" },
  { key: "favorites", label: "Favorite Verses" },
  { key: "workbook", label: "Workbook" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default async function JourneyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();
  if (!user?.email) redirect("/login");
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") redirect("/pricing");

  const sp = await searchParams;
  const tab = (TABS.find((t) => t.key === sp.tab)?.key ?? "today") as TabKey;

  const progress = await getOrCreateProgress(user.id);

  return (
    <section className="sg-section">
      <div className="sg-portal-head">
        <div className="sec-tag" style={{ textAlign: "left" }}>
          Bible-in-a-Year · Study Guide
        </div>
        <p className="sg-portal-sub">
          Start with Jesus. Build the foundation. Then walk through the whole
          story.
        </p>
        <nav className="sg-tabs-nav" aria-label="Study sections">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={`/journey?tab=${t.key}`}
              className={`sg-tabnav${tab === t.key ? " is-on" : ""}`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>

      {tab === "today" && (await TodayTab(user.id, progress))}
      {tab === "progress" && <ProgressTab progress={progress} />}
      {tab === "plan" && <PlanTab currentDay={progress.currentDay} />}
      {tab === "notes" && (await NotesTab(user.id))}
      {tab === "favorites" && (await FavoritesTab(user.id))}
      {tab === "workbook" && <WorkbookTab />}
    </section>
  );
}

/* ---------------- Today's Reading ---------------- */
async function TodayTab(
  userId: string,
  progress: { currentDay: number; status: string }
) {
  const entry = getStudyDay(progress.currentDay);
  const [notes, favorites] = await Promise.all([
    getNotes(userId, progress.currentDay),
    listFavorites(userId),
  ]);
  const favRefs = favorites.map((f) => f.ref);
  const completed = progress.status === "completed";
  const done = daysCompleted(progress as never);
  const pct = progressPercent(progress as never);

  return (
    <div className="sg-layout">
      <aside className="sg-side sg-side-left">
        <StudySideCards
          title="Go deeper"
          words={entry.keyWords}
          reflection={entry.sideReflection}
        />
      </aside>
      <div className="sg-main">
        {completed && (
          <div className="sg-complete" style={{ marginTop: 0 }}>
            🎉 You finished the whole journey — all 365 days. Amen.
          </div>
        )}
        <StudyGuide entry={entry} synced initial={notes} />
        <div className="sg-dayactions">
          <div className="sg-dayprogress">
            {done} of {TOTAL_DAYS} days complete · {pct}%
          </div>
          {!completed && (
            <form action={markCompleteAction}>
              <button type="submit" className="btn btn-gold">
                ✓ Mark Day {progress.currentDay} complete →
              </button>
            </form>
          )}
          <form action={restartAction}>
            <button type="submit" className="btn btn-ghost">
              Restart at Day 1
            </button>
          </form>
        </div>
      </div>
      <aside className="sg-side sg-side-right">
        <StudySideCards
          title="For your heart"
          verses={entry.verses}
          synced
          day={progress.currentDay}
          favRefs={favRefs}
        />
      </aside>
    </div>
  );
}

/* ---------------- My Progress ---------------- */
function ProgressTab({
  progress,
}: {
  progress: { currentDay: number; startDate: string; status: string };
}) {
  const done = daysCompleted(progress as never);
  const pct = progressPercent(progress as never);
  const books = getBookStarts();
  return (
    <div className="sg-tabwrap">
      <div className="sg-zone sg-zone-cool">
        <p className="sg-zone-title">Where you are</p>
        <div className="sg-statgrid">
          <Stat big={`${progress.currentDay}`} label={`of ${TOTAL_DAYS}`} sub="Current day" />
          <Stat big={`${done}`} label="days" sub="Completed" />
          <Stat big={`${pct}%`} label="" sub="Through the Bible" />
        </div>
        <div className="sg-progress-track" style={{ height: 12, margin: "4px 0 0" }}>
          <span className="sg-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div style={{ margin: "0 0 18px" }}>
        <Link href="/journey?tab=today" className="btn btn-gold">
          Resume where I left off →
        </Link>
      </div>

      <div className="sg-zone sg-zone-warm">
        <p className="sg-zone-title">Jump around the plan</p>
        <div className="rcard">
          <div className="rk">Jump to a book</div>
          <p style={{ color: "#3c4350", fontSize: 14, margin: "8px 0 12px" }}>
            Skip ahead (or back) to where any book begins in the plan.
          </p>
          <form action={jumpToDayAction} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select name="day" className="sg-select" defaultValue={books.find((b) => b.book === "John")?.day}>
              {books.map((b) => (
                <option key={b.book} value={b.day}>
                  {b.book} (Day {b.day})
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-ghost">
              Go
            </button>
          </form>
        </div>

        <div className="rcard" style={{ marginTop: 14 }}>
          <div className="rk">Jump to a specific day</div>
          <form action={jumpToDayAction} style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <input
              type="number"
              name="day"
              min={1}
              max={365}
              defaultValue={progress.currentDay}
              className="sg-select"
              style={{ width: 110 }}
            />
            <button type="submit" className="btn btn-ghost">
              Go to day
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Stat({ big, label, sub }: { big: string; label: string; sub: string }) {
  return (
    <div className="sg-stat">
      <div className="sg-stat-big">
        {big}
        {label && <span className="sg-stat-label"> {label}</span>}
      </div>
      <div className="sg-stat-sub">{sub}</div>
    </div>
  );
}

/* ---------------- Reading Plan ---------------- */
function PlanTab({ currentDay }: { currentDay: number }) {
  return (
    <div className="sg-tabwrap">
      <p className="sub" style={{ textAlign: "left", margin: "0 0 20px", maxWidth: 640 }}>
        We don&apos;t start in Genesis. We start with Jesus — so Scripture
        clicks before you ever hit the hard parts. All 66 books, in one year.
      </p>
      <div className="sg-zone sg-zone-warm">
        <p className="sg-zone-title">The journey · 6 arcs</p>
        <div className="sg-arclist">
          {ARCS.map((a, i) => (
            <div className="sg-arc" key={a.name}>
              <span className="sg-arc-num">{i + 1}</span>
              <div>
                <div className="sg-arc-name">{a.reading}</div>
                <div className="sg-arc-sub">
                  {a.name} · {a.days}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop: 18, fontSize: 14 }}>
        You&apos;re on <strong>Day {currentDay}</strong>.{" "}
        <Link href="/journey?tab=today">Open today&apos;s reading →</Link>
      </p>
    </div>
  );
}

/* ---------------- Saved Notes ---------------- */
async function NotesTab(userId: string) {
  const days = await listNoteDays(userId);
  if (days.length === 0) {
    return (
      <div className="sg-tabwrap">
        <div className="sg-zone sg-zone-cool">
          <p className="muted" style={{ margin: 0 }}>
            No notes yet. As you journal on each day, they&apos;ll be saved here —
            and they follow your account across devices.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="sg-tabwrap">
      <div className="sg-zone sg-zone-cool">
        <p className="sg-zone-title">Saved notes</p>
        <div className="sg-notelist">
        {days.map(({ day, data }) => {
          const snippet =
            data.notes?.trim() ||
            data.takeaway?.trim() ||
            data.stood?.trim() ||
            "Checked-off reflections saved.";
          const entry = getStudyDay(day);
          return (
            <div className="sg-notecard" key={day}>
              <div className="sg-notecard-head">
                <span className="sg-notecard-day">
                  Day {day} · {entry.reading}
                </span>
                <form action={jumpToDayAction}>
                  <input type="hidden" name="day" value={day} />
                  <button type="submit" className="sg-link-btn">
                    Open →
                  </button>
                </form>
              </div>
              <p className="sg-notecard-snippet">{snippet}</p>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Favorite Verses ---------------- */
async function FavoritesTab(userId: string) {
  const favs = await listFavorites(userId);
  if (favs.length === 0) {
    return (
      <div className="sg-tabwrap">
        <div className="sg-zone sg-zone-warm">
          <p className="muted" style={{ margin: 0 }}>
            No saved verses yet. Tap the ♡ on any verse in today&apos;s reading to
            keep it here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="sg-tabwrap">
      <div className="sg-zone sg-zone-warm">
        <p className="sg-zone-title">Saved verses</p>
        <div className="sg-favlist">
        {favs.map((f) => (
          <div className="sg-favcard" key={f.ref}>
            <div className="sg-favcard-head">
              <span className="sg-verse-ref">{f.ref}</span>
              <form action={removeFavoriteAction}>
                <input type="hidden" name="ref" value={f.ref} />
                <button type="submit" className="sg-link-btn" aria-label="Remove">
                  ♥ Remove
                </button>
              </form>
            </div>
            <p className="sg-verse-text">&ldquo;{f.verseText}&rdquo;</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Workbook ---------------- */
function WorkbookTab() {
  return (
    <div className="sg-tabwrap">
      <div
        className="sg-zone sg-zone-warm"
        style={{ textAlign: "center", padding: "40px 28px" }}
      >
        <div style={{ fontSize: 34 }}>📒</div>
        <h3 style={{ color: "var(--navy)", margin: "8px 0 8px", fontSize: 20 }}>
          Monthly workbook
        </h3>
        <p className="muted" style={{ maxWidth: 460, margin: "0 auto" }}>
          A printable PDF of each month&apos;s readings, key words, verses, and
          journal prompts is coming soon — so you can take your journey offline,
          into a binder, or onto your iPad.
        </p>
      </div>
    </div>
  );
}
