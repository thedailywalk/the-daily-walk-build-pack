import Link from "next/link";
import { site, nav } from "@/lib/site";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";

export default async function Header() {
  const user = await getUser();

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
          {supabaseConfigured &&
            (user ? (
              <Link href="/account">My account</Link>
            ) : (
              <Link href="/login">Sign in</Link>
            ))}
          <Link href="/subscribe" className="btn btn-gold navcta">
            Start free
          </Link>
        </nav>
      </div>
    </header>
  );
}
