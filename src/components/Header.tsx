import Link from "next/link";
import { site, nav } from "@/lib/site";

export default function Header() {
  return (
    <header className="nav">
      <div className="wrap row">
        <Link href="/" className="brand">
          {site.wordmark}
        </Link>
        <nav className="navlinks" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/subscribe" className="btn btn-gold navcta">
            Start free
          </Link>
        </nav>
      </div>
    </header>
  );
}
