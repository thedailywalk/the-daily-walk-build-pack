import type { Metadata } from "next";
import { getUser } from "@/lib/supabase/server";
import { listEntries } from "@/lib/prayerJournal";
import { addPrayerAction, toggleAnsweredAction, deletePrayerAction } from "./actions";

export const metadata: Metadata = {
  title: "Prayer Journal",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

function when(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function PrayerJournalPage() {
  const user = await getUser();
  const entries = user?.id ? await listEntries(user.id) : [];
  const open = entries.filter((e) => !e.answered);
  const answered = entries.filter((e) => e.answered);

  return (
    <div className="m-wrap">
      <section className="m-hero m-hero-sm">
        <div className="m-hero-in">
          <span className="m-hero-kicker">✦ Prayer Journal</span>
          <h1 className="m-hero-h">Your prayers, kept close</h1>
          <p className="m-hero-sub">
            Write what&apos;s on your heart and bring it to God. This space is
            private to you. When He answers, mark it — and watch how He&apos;s been
            faithful over time.
          </p>
        </div>
      </section>

      {/* New entry */}
      <form action={addPrayerAction} className="m-panel pj-form">
        <input name="title" className="pj-title" placeholder="What are you praying for? (a short title)" />
        <textarea name="body" className="pj-body" rows={3} placeholder="Pour it out here — honest is good." required />
        <div className="pj-form-actions">
          <button type="submit" className="btn btn-gold">Add to journal</button>
        </div>
      </form>

      {/* Open prayers */}
      <div className="m-section-tag">Praying now {open.length > 0 && `· ${open.length}`}</div>
      {open.length === 0 ? (
        <p className="muted" style={{ marginBottom: 22 }}>Nothing here yet — add your first prayer above.</p>
      ) : (
        <div className="pj-list">
          {open.map((e) => (
            <article key={e.id} className="m-panel pj-card">
              <div className="pj-card-head">
                {e.title && <h3 className="pj-card-title">{e.title}</h3>}
                <span className="pj-date">{when(e.createdAt)}</span>
              </div>
              <p className="pj-card-body">{e.body}</p>
              <div className="pj-card-actions">
                <form action={toggleAnsweredAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="answered" value="1" />
                  <button type="submit" className="btn btn-ghost btn-sm">🙏 Mark answered</button>
                </form>
                <form action={deletePrayerAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className="pj-del">Delete</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Answered */}
      {answered.length > 0 && (
        <>
          <div className="m-section-tag">Answered · {answered.length} 🙌</div>
          <div className="pj-list">
            {answered.map((e) => (
              <article key={e.id} className="m-panel pj-card pj-answered">
                <div className="pj-card-head">
                  {e.title && <h3 className="pj-card-title">{e.title}</h3>}
                  <span className="pj-badge">Answered</span>
                </div>
                <p className="pj-card-body">{e.body}</p>
                <div className="pj-card-actions">
                  <form action={toggleAnsweredAction}>
                    <input type="hidden" name="id" value={e.id} />
                    <input type="hidden" name="answered" value="0" />
                    <button type="submit" className="pj-del">Move back to praying</button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
