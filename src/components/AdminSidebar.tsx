"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Sub = { href: string; label: string; match: (p: string, qs: string) => boolean };
type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match: (path: string, qs: string) => boolean;
  children?: Sub[];
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
  library: <path d="M4 5v14M9 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9zM4 9h5M4 14h5" />,
  spark: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
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
    <path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.65-7 9-7 9z" />
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  star: (
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.9 6.8 19.3l1-5.9L3.5 9.2l5.9-.9z" />
  ),
  book: (
    <>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5.5A1.5 1.5 0 0 0 4 20.5z" />
      <path d="M4 16.5A1.5 1.5 0 0 1 5.5 15H20" />
      <path d="M9 7.5l2.5 2 2.5-2" />
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
    label: "Daily · Free",
    icon: icon(I.calendar),
    match: (p) => p.startsWith("/admin/devotionals"),
    children: [
      {
        href: "/admin/devotionals",
        label: "The Week Ahead",
        match: (p, qs) => p.startsWith("/admin/devotionals") && !qs.includes("view=archive"),
      },
      {
        href: "/admin/devotionals?view=archive",
        label: "Archive",
        match: (p, qs) => p.startsWith("/admin/devotionals") && qs.includes("view=archive"),
      },
    ],
  },
  {
    href: "/admin/premium",
    label: "Premium ★",
    icon: icon(I.star),
    match: (p) => p.startsWith("/admin/premium"),
    children: [
      {
        href: "/admin/premium",
        label: "The Week Ahead",
        match: (p, qs) => p.startsWith("/admin/premium") && !qs.includes("view=archive"),
      },
      {
        href: "/admin/premium?view=archive",
        label: "Archive",
        match: (p, qs) => p.startsWith("/admin/premium") && qs.includes("view=archive"),
      },
    ],
  },
  {
    href: "/admin/library",
    label: "Content Library",
    icon: icon(I.library),
    match: (p) => p.startsWith("/admin/library") || p.startsWith("/admin/inspiration"),
  },
  {
    href: "/admin/workbook",
    label: "Workbook",
    icon: icon(I.book),
    match: (p) => p.startsWith("/admin/workbook"),
    children: [
      {
        href: "/admin/workbook",
        label: "Evolution Dashboard",
        match: (p) => p === "/admin/workbook",
      },
      {
        href: "/admin/workbook/submit",
        label: "Add inspiration",
        match: (p) => p.startsWith("/admin/workbook/submit"),
      },
    ],
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

          if (!it.children) {
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
          }

          return (
            <div key={it.label} className="aside-group">
              <Link
                href={it.href}
                className={`aside-link aside-parent${on ? " is-on" : ""}`}
                aria-current={on ? "page" : undefined}
              >
                <span className="aside-ico">{it.icon}</span>
                {it.label}
                <span className="aside-chev">{icon(I.chevron)}</span>
              </Link>
              <div className="aside-flyout" role="menu">
                <div className="aside-flyout-title">{it.label}</div>
                {it.children.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    role="menuitem"
                    className={`aside-sub${sub.match(pathname, qs) ? " is-on" : ""}`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
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
