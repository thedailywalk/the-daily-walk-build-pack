import Link from "next/link";

type Tab = "week" | "archive" | "library" | "inspiration" | "video";

const TABS: { key: Tab; href: string; label: string }[] = [
  { key: "week", href: "/admin/devotionals", label: "The week ahead" },
  { key: "archive", href: "/admin/devotionals?view=archive", label: "Archive" },
  { key: "library", href: "/admin/library", label: "Content Library" },
  { key: "inspiration", href: "/admin/inspiration", label: "Inspiration Sources" },
  { key: "video", href: "/admin/weekly-video", label: "Weekly Video" },
];

export default function AdminNav({ active }: { active: Tab }) {
  return (
    <nav className="adm-subnav" aria-label="Admin sections">
      {TABS.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`adm-subtab${active === t.key ? " is-on" : ""}`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
