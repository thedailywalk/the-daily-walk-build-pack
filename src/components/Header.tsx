import Link from "next/link";
import { site, nav } from "@/lib/site";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";

export default async function Header() {
  const user = await getUser();
  const accountLink =
    supabaseConfigured &&
    (user ? { href: "/account", label: "My account" } : { href: "/login", label: "Sign in" });

  return (
    <header className="nav">
      <div className="wrap row">
        <Link href="/" className="brand">
          {site.wordmark}
        </Link>

        {/* Desktop nav */}
        <nav className="navlinks" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          {accountLink && <Link href={accountLink.href}>{accountLink.label}</Link>}
          <Link href="/subscribe" className="btn btn-gold navcta">
            Start free
          </Link>
        </nav>

        {/* Mobile nav — no-JS disclosure menu */}
        <details className="mobilenav">
          <summary aria-label="Menu">
            <span className="ham" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </summary>
          <div className="mobilepanel">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            {accountLink && <Link href={accountLink.href}>{accountLink.label}</Link>}
            <Link href="/subscribe" className="btn btn-gold btn-block">
              Start free
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
