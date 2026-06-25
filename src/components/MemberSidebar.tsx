"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const stroke = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);

const I = {
  home: stroke(<><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" /></>),
  guide: stroke(<><path d="M12 3a4 4 0 0 0-4 4c0 1.5.8 2.3 1.6 3 .7.6 1.4 1.2 1.4 2.4M12 17h.01" /><circle cx="12" cy="12" r="9" opacity="0" /></>),
  compass: stroke(<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>),
  star: stroke(<path d="M12 3.5 14.6 9l6 .5-4.6 4 1.4 5.8L12 16.9 6.6 19.3 8 13.5 3.4 9.5l6-.5z" />),
  book: stroke(<path d="M4 5v14M9 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9zM4 9h5M4 14h5" />),
  hands: stroke(<path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.65-7 9-7 9z" />),
  pen: stroke(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>),
  archive: stroke(<><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4" /></>),
  user: stroke(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>),
  heart: stroke(<path d="M12 20s-7-4.35-7-9a3.8 3.8 0 0 1 7-2.1A3.8 3.8 0 0 1 19 11c0 4.65-7 9-7 9z" />),
};

type Item = { href: string; label: string; icon: React.ReactNode; sub?: string; ext?: boolean };

const MAIN: Item[] = [
  { href: "/portal", label: "Dashboard", icon: I.home },
  { href: "/portal/guide", label: "Pathlight", icon: I.guide, sub: "Bible guide" },
];
const WALK: Item[] = [
  { href: "/journey", label: "My Journey", icon: I.compass, sub: "Bible in a year" },
  { href: "/wonders", label: "Daily Wonders", icon: I.star },
  { href: "/portal/prayer", label: "Prayer Journal", icon: I.pen, sub: "Private" },
  { href: "/portal/memory", label: "Scripture Memory", icon: I.heart, sub: "Hide His Word" },
  { href: "/journey?tab=notes", label: "Saved & Notes", icon: I.book },
  { href: "/portal/archive", label: "Archive", icon: I.archive },
  { href: "/prayer-wall", label: "Prayer Wall", icon: I.hands },
];

export default function MemberSidebar({ tier, name }: { tier: string; name: string }) {
  const pathname = usePathname() ?? "";
  const isOn = (href: string) => {
    const base = href.split("?")[0];
    if (base === "/portal") return pathname === "/portal";
    return pathname === base || pathname.startsWith(base + "/");
  };

  const link = (it: Item) => (
    <Link
      key={it.label}
      href={it.href}
      className={`m-link${isOn(it.href) ? " is-on" : ""}`}
      aria-current={isOn(it.href) ? "page" : undefined}
    >
      <span className="m-ico">{it.icon}</span>
      <span className="m-link-text">
        {it.label}
        {it.sub && <span className="m-link-sub">{it.sub}</span>}
      </span>
    </Link>
  );

  return (
    <aside className="m-aside">
      <div className="m-brand">
        <span className="m-brand-mark" aria-hidden="true">✦</span>
        <div>
          <div className="m-brand-name">The Daily Walk</div>
          <div className="m-brand-tag">Member Portal</div>
        </div>
      </div>

      <nav className="m-nav" aria-label="Member">
        {MAIN.map(link)}
        <div className="m-nav-label">Your walk</div>
        {WALK.map(link)}
      </nav>

      <div className="m-aside-foot">
        <ThemeToggle />
        <Link href="/account" className={`m-link${isOn("/account") ? " is-on" : ""}`}>
          <span className="m-ico">{I.user}</span>
          <span className="m-link-text">
            Account
            <span className="m-link-sub">
              {name} · {tier} member
            </span>
          </span>
        </Link>
        <div className="m-aside-row">
          <Link href="/" className="m-foot-link" target="_blank">
            Live site ↗
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="m-signout">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
