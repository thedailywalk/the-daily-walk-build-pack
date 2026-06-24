import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import { youtubeConfigured } from "@/lib/youtube";
import AdminNav from "@/components/AdminNav";
import WeeklyVideoStudio from "@/components/WeeklyVideoStudio";
import {
  listCandidates,
  listArchive,
  listUpcoming,
  currentWeekStart,
  nextWeekStart,
  weekLabel,
} from "@/lib/weeklyVideo";
import { addCandidatesAction, autoFillAction } from "./actions";

export const metadata: Metadata = {
  title: "Weekly Video",
  robots: { index: false },
};

const SAFE_CHANNELS =
  "Good starting points (confirm each is the creator's official channel): BibleProject, " +
  "The Bible Project, Spoken Gospel, Saddleback Church, Elevation Church, and other " +
  "ministries that publish their own teaching. Avoid clips, reuploads, and music videos.";

export default async function WeeklyVideoPage({
  searchParams,
}: {
  searchParams: Promise<{
    week?: string;
    added?: string;
    skipped?: string;
    selected?: string;
    saved?: string;
    autofilled?: string;
  }>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  const thisWeek = currentWeekStart();
  const next = nextWeekStart();
  // Default the studio to next Monday (what you're scheduling toward).
  const week = sp.week || next;

  const [candidates, archive, upcoming] = await Promise.all([
    listCandidates(week),
    listArchive(),
    listUpcoming(),
  ]);

  const weekOptions = Array.from(new Set([thisWeek, next, week]));

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Weekly Video
            </div>
            <p className="adm-sub">
              One faith-filled video featured each week inside the members&apos;
              Daily Wonders tab. Paste candidates, see what&apos;s genuinely safe
              to embed, then choose the one to feature. It goes live on its
              Monday and rolls over automatically.
            </p>
          </div>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>{" "}
            and run <code>supabase/weekly-video.sql</code> to start saving.
          </div>
        )}
        {!youtubeConfigured && (
          <div className="adm-notice">
            Add a free <code>YOUTUBE_API_KEY</code> to <code>.env.local</code> so
            the system can read each video&apos;s real embeddable flag, license,
            and channel. Without it, candidates can&apos;t be safety-checked.
          </div>
        )}

        <AdminNav active="video" />

        {sp.added && (
          <div className="adm-saved">
            Inspected {sp.added} video{sp.added === "1" ? "" : "s"} ✓
            {sp.skipped && Number(sp.skipped) > 0
              ? ` · ${sp.skipped} skipped (not embeddable, bad link, or missing key)`
              : ""}
          </div>
        )}
        {sp.selected && <div className="adm-saved">Featured video set ✓</div>}
        {sp.saved && <div className="adm-saved">Public copy saved ✓</div>}
        {sp.autofilled && (
          <div className="adm-saved">
            {sp.autofilled === "0"
              ? "Couldn't pull any new picks — check the API key, or that the table (supabase/weekly-video.sql) has been created."
              : `Pulled ${sp.autofilled} verified pick${sp.autofilled === "1" ? "" : "s"} from your trusted channels ✓`}
          </div>
        )}

        {/* One-click: auto-fill 10 verified picks from trusted channels */}
        <form action={autoFillAction} className="wv-auto">
          <input type="hidden" name="weekStart" value={week} />
          <div>
            <strong>Save time — let the system find them.</strong>
            <p className="adm-hint" style={{ margin: "4px 0 0" }}>
              Pulls 10 recent videos from your trusted channels, verifies each
              one (public + embeddable), and stages them below for the week of{" "}
              {weekLabel(week)}. You just pick one.
            </p>
          </div>
          <button type="submit" className="btn btn-gold" disabled={!youtubeConfigured}>
            ✨ Auto-fill 10 verified picks
          </button>
        </form>

        {/* Add candidates */}
        <form action={addCandidatesAction} className="adm-form wv-add">
          <h3 className="adm-group" style={{ marginTop: 8 }}>
            Or add your own links
          </h3>
          <div className="adm-row">
            <label className="adm-field" style={{ flex: "0 0 220px" }}>
              <span className="adm-label">Week to feature</span>
              <select name="weekStart" defaultValue={week} className="sg-select">
                {weekOptions.map((w) => (
                  <option key={w} value={w}>
                    Week of {weekLabel(w)}
                    {w === thisWeek ? " (this week)" : w === next ? " (next week)" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="adm-field">
            <span className="adm-label">YouTube links (one per line)</span>
            <textarea
              name="urls"
              className="adm-textarea"
              rows={4}
              placeholder={"https://www.youtube.com/watch?v=…\nhttps://youtu.be/…"}
            />
          </label>
          <p className="adm-hint">{SAFE_CHANNELS}</p>
          <div className="adm-actions">
            <button type="submit" className="btn btn-gold">
              Inspect &amp; add
            </button>
          </div>
        </form>

        {/* This week's candidate dashboard */}
        <h3 className="adm-group">
          Candidates · week of {weekLabel(week)}
          {week === thisWeek ? " (this week)" : week === next ? " (next week)" : ""}
        </h3>
        <WeeklyVideoStudio candidates={candidates} weekStart={week} />

        {/* Scheduled ahead */}
        {upcoming.length > 0 && (
          <>
            <h3 className="adm-group">Scheduled ahead</h3>
            <ul className="wv-list">
              {upcoming.map((v) => (
                <li key={v.id} className="wv-list-row">
                  <span className="wv-list-week">{weekLabel(v.weekStart)}</span>
                  <span className="wv-list-title">{v.title}</span>
                  <Link
                    href={`/admin/weekly-video?week=${v.weekStart}`}
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Archive */}
        <h3 className="adm-group">Past featured videos</h3>
        {archive.length === 0 ? (
          <p className="muted">Nothing featured yet — your archive builds here.</p>
        ) : (
          <ul className="wv-list">
            {archive.map((v) => (
              <li key={v.id} className="wv-list-row">
                <span className="wv-list-week">{weekLabel(v.weekStart)}</span>
                <span className="wv-list-title">{v.title}</span>
                <span className="wv-list-ch">{v.channelTitle}</span>
                <a
                  href={`https://www.youtube.com/watch?v=${v.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  Open ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
