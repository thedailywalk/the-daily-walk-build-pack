import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { upcomingDates, adminListRange, prettyDate } from "@/lib/devotionals";
import {
  getLiveWeeklyVideo,
  listUpcoming,
  listCandidates,
  listFlaggedSelected,
  nextWeekStart,
  weekLabel,
} from "@/lib/weeklyVideo";
import { listLibrary, listSources } from "@/lib/library";
import { listPendingPrayers } from "@/lib/prayers";
import { getFeaturedGoodNews } from "@/lib/featuredGoodNews";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

type Tone = "good" | "info" | "warn" | "danger" | "neutral";

function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={`dash-pill ${tone}`}>{children}</span>;
}

/* small inline icons */
const svg = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const ICONS = {
  cal: svg(<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>),
  video: svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></>),
  library: svg(<path d="M4 5v14M9 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9zM4 9h5M4 14h5" />),
  spark: svg(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />),
  hands: svg(<path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.65-7 9-7 9z" />),
  sun: svg(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>),
};

export default async function AdminDashboard() {
  await requireAdmin();

  const dates = upcomingDates(7);
  const [devs, live, upcoming, nextCands, flagged, library, sources, pending, featured] =
    await Promise.all([
      adminListRange(dates[0], dates[dates.length - 1]),
      getLiveWeeklyVideo(),
      listUpcoming(),
      listCandidates(nextWeekStart()),
      listFlaggedSelected(),
      listLibrary(),
      listSources(),
      listPendingPrayers(),
      getFeaturedGoodNews(),
    ]);

  const ready = devs.filter((d) => d.status === "ready").length;

  // Weekly video status
  let vidStat = "None staged";
  let vidTone: Tone = "neutral";
  let vidPill = "Empty";
  if (flagged.length > 0) {
    vidStat = "Video pulled"; vidTone = "danger"; vidPill = "Action needed";
  } else if (upcoming.length > 0) {
    vidStat = `Week of ${weekLabel(upcoming[0].weekStart)}`; vidTone = "info"; vidPill = "Scheduled";
  } else if (live) {
    vidStat = live.title.slice(0, 40); vidTone = "good"; vidPill = "Live";
  } else if (nextCands.length > 0) {
    vidStat = `${nextCands.length} staged`; vidTone = "warn"; vidPill = "Needs pick";
  }

  const cards: {
    href: string;
    icon: React.ReactNode;
    label: string;
    stat: string;
    sub: string;
    tone: Tone;
    pill: string;
  }[] = [
    {
      href: "/admin/devotionals",
      icon: ICONS.cal,
      label: "Devotionals",
      stat: `${ready}/7 ready`,
      sub: "This week's issues",
      tone: ready >= 7 ? "good" : "warn",
      pill: ready >= 7 ? "All set" : "Drafts pending",
    },
    {
      href: "/admin/weekly-video",
      icon: ICONS.video,
      label: "Weekly Video",
      stat: vidStat,
      sub: "Members' dashboard",
      tone: vidTone,
      pill: vidPill,
    },
    {
      href: "/admin/prayers",
      icon: ICONS.hands,
      label: "Prayer Wall",
      stat: pending.length ? `${pending.length} pending` : "All clear",
      sub: "Awaiting moderation",
      tone: pending.length ? "warn" : "good",
      pill: pending.length ? "Needs review" : "Clear",
    },
    {
      href: "/admin/library",
      icon: ICONS.library,
      label: "Content Library",
      stat: `${library.length} items`,
      sub: "Saved research & inspiration",
      tone: "neutral",
      pill: "Private",
    },
    {
      href: "/admin/inspiration",
      icon: ICONS.spark,
      label: "Inspiration Sources",
      stat: `${sources.length} sources`,
      sub: "Creators & ministries",
      tone: "neutral",
      pill: "Private",
    },
    {
      href: "/admin/good-news",
      icon: ICONS.sun,
      label: "Good News",
      stat: featured.length ? `${featured.length} picked` : "Automatic",
      sub: "Homepage stories",
      tone: featured.length ? "info" : "neutral",
      pill: featured.length ? "Curated" : "Auto",
    },
  ];

  return (
    <div className="adm-wrap">
      {/* Hero banner */}
      <div className="dash-hero">
        <div className="dash-hero-glow" aria-hidden="true" />
        <div className="dash-hero-in">
          <span className="dash-hero-kicker">The Daily Walk · Admin Studio</span>
          <h1 className="dash-hero-h">Welcome back</h1>
          <p className="dash-hero-sub">
            Your private command center for everything members and readers see —
            devotionals, the weekly video, content, and the community.
          </p>
          <div className="dash-hero-actions">
            <Link href="/admin/devotionals" className="btn btn-gold">
              Open the week ahead →
            </Link>
            <Link href="/admin/weekly-video" className="btn btn-ghost">
              Weekly video
            </Link>
          </div>
        </div>
        <span className="dash-hero-date">{prettyDate(dates[0])}</span>
      </div>

      {flagged.length > 0 && (
        <div className="adm-notice wv-alert" style={{ marginBottom: 18 }}>
          <strong>⚠ A featured video was auto-hidden</strong> because its YouTube
          settings changed. <Link href="/admin/weekly-video">Pick a replacement →</Link>
        </div>
      )}

      <div className="dash-section-tag">Overview</div>
      <div className="dash-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="dash-card">
            <div className="dash-card-top">
              <span className="dash-card-ico">{c.icon}</span>
              <Pill tone={c.tone}>{c.pill}</Pill>
            </div>
            <div className="dash-card-stat">{c.stat}</div>
            <div className="dash-card-label">{c.label}</div>
            <div className="dash-card-sub">{c.sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
