import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedArchive, prettyDate } from "@/lib/devotionals";
import { listArchive, weekLabel } from "@/lib/weeklyVideo";

export const metadata: Metadata = {
  title: "Archive",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const [devotionals, videos] = await Promise.all([
    listPublishedArchive(90),
    listArchive(),
  ]);

  return (
    <div className="m-wrap">
      <section className="m-hero m-hero-sm">
        <div className="m-hero-in">
          <span className="m-hero-kicker">✦ Member Archive</span>
          <h1 className="m-hero-h">Revisit your walk</h1>
          <p className="m-hero-sub">
            Every devotional and weekly video, kept here for you. Go back and
            re-read what spoke to you, or catch up on one you missed.
          </p>
        </div>
      </section>

      <div className="m-section-tag">Past devotionals</div>
      {devotionals.length === 0 ? (
        <p className="muted" style={{ marginBottom: 24 }}>
          Your past issues will collect here as they go out each day.
        </p>
      ) : (
        <div className="arc-list">
          {devotionals.map((d) => (
            <Link key={d.date} href={`/portal/archive/${d.date}`} className="m-panel arc-row">
              <div>
                <div className="arc-date">{prettyDate(d.date)}</div>
                <div className="arc-title">{d.title}</div>
                {d.data?.verseRef && <div className="arc-verse">{d.data.verseRef}</div>}
              </div>
              <span className="arc-open">Read →</span>
            </Link>
          ))}
        </div>
      )}

      <div className="m-section-tag" style={{ marginTop: 28 }}>Past weekly videos</div>
      {videos.length === 0 ? (
        <p className="muted">Past featured videos will collect here.</p>
      ) : (
        <div className="arc-vidgrid">
          {videos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="m-panel arc-vid"
            >
              <div className="arc-vid-thumb">
                {v.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnailUrl} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <span>▶</span>
                )}
              </div>
              <div className="arc-vid-meta">
                <div className="arc-vid-week">Week of {weekLabel(v.weekStart)}</div>
                <div className="arc-vid-title">{v.title}</div>
                <div className="arc-vid-ch">{v.channelTitle}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
