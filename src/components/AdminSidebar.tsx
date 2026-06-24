"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match: (path: string, qs: string) => boolean;
};

/* Minimal line icons (stroke = currentColor) */
const I = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4" />
    </>
  ),
  library: (
    <>
      <path d="M4 5v14M9 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9zM4 9h5M4 14h5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </>
  ),
  hands: (
    <>
      <path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.65-7 9-7 9z" />
    </>
  ),
};

function icon(path: React.ReactNode) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const ITEMS: Item[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: icon(I.grid),
    match: (p) => p === "/admin",
  },
  {
    href: "/admin/devotionals",
    label: "The Week Ahead",
    icon: icon(I.calendar),
    match: (p, qs) => p.startsWith("/admin/devotionals") && !qs.includes("view=archive"),
  },
  {
    href: "/admin/devotionals?view=archive",
    label: "Archive",
    icon: icon(I.archive),
    match: (p, qs) => p.startsWith("/admin/devotionals") && qs.includes("view=archive"),
  },
  {
    href: "/admin/library",
    label: "Content Library",
    icon: icon(I.library),
    match: (p) => p.startsWith("/admin/library"),
  },
  {
    href: "/admin/inspiration",
    label: "Inspiration Sources",
    icon: icon(I.spark),
    match: (p) => p.startsWith("/admin/inspiration"),
  },
  {
    href: "/admin/weekly-video",
    label: "Weekly Video",
    icon: icon(I.video),
    match: (p) => p.startsWith("/admin/weekly-video"),
  },
  {
    href: "/admin/good-news",
    label: "Good News",
    icon: icon(I.sun),
    match: (p) => p.startsWith("/admin/good-news"),
  },
  {
    href: "/admin/prayers",
    label: "Prayer Wall",
    icon: icon(I.hands),
    match: (p) => p.startsWith("/admin/prayers"),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const qs = useSearchParams()?.toString() ?? "";

  return (
    <aside className="aside">
      <div className="aside-brand">
        <span className="aside-mark">TDW</span>
        <div>
          <div className="aside-name">The Daily Walk</div>
          <div className="aside-tag">Admin Studio · Private</div>
        </div>
      </div>

      <nav className="aside-nav" aria-label="Admin">
        {ITEMS.map((it) => {
          const on = it.match(pathname, qs);
          return (
            <Link
              key={it.label}
              href={it.href}
              className={`aside-link${on ? " is-on" : ""}`}
              aria-current={on ? "page" : undefined}
            >
              <span className="aside-ico">{it.icon}</span>
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="aside-foot">
        <Link href="/" className="aside-foot-link" target="_blank">
          View live site ↗
        </Link>
        <form action="/auth/signout" method="post">
          <button type="submit" className="aside-signout">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
