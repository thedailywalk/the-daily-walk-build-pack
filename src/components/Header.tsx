import Link from "next/link";
import { site } from "@/lib/site";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

/** "About" groups the marketing pages under one tidy menu. */
const aboutItems: { href: string; label: string }[] = [
  { href: "/#how", label: "How it works" },
  { href: "/about", label: "Why read the Bible" },
  { href: "/prayer-wall", label: "Prayer Wall" },
  { href: "/pricing", label: "Pricing" },
];

/** "Profile" groups a member's personal spaces (shown when signed in). */
const profileItems: { href: string; label: string; sub?: string }[] = [
  { href: "/journey", label: "My Journey", sub: "Bible in a year" },
  { href: "/portal/prayer", label: "Prayer Journal" },
  { href: "/portal/memory", label: "Scripture Memory" },
  { href: "/journey?tab=notes", label: "Saved Notes" },
];

export default async function Header() {
  const user = await getUser();
  const showAdmin = isAdminEmail(user?.email);
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
          {/* About ▾ */}
          <div className="navdrop">
            <button type="button" className="navdrop-t" aria-haspopup="true">
              About <span className="navdrop-caret" aria-hidden="true">▾</span>
            </button>
            <div className="navdrop-menu" role="menu">
              {aboutItems.map((i) => (
                <Link key={i.href} href={i.href} role="menuitem">
                  {i.label}
                </Link>
              ))}
              <span className="navdrop-soon">
                Mission statement <em>Coming soon</em>
              </span>
            </div>
          </div>

          {/* Profile ▾ (members) */}
          {user && (
            <div className="navdrop">
              <button type="button" className="navdrop-t" aria-haspopup="true">
                Profile <span className="navdrop-caret" aria-hidden="true">▾</span>
              </button>
              <div className="navdrop-menu" role="menu">
                {profileItems.map((i) => (
                  <Link key={i.href} href={i.href} role="menuitem">
                    {i.label}
                    {i.sub && <small className="navdrop-sub">{i.sub}</small>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link href="/pricing" className="navpremium">
            Premium
          </Link>
          {accountLink && <Link href={accountLink.href}>{accountLink.label}</Link>}
          {showAdmin && <Link href="/admin/devotionals">Admin</Link>}
          {!user && (
            <Link href="/subscribe" className="btn btn-gold navcta">
              Start free
            </Link>
          )}
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
            <div className="mobilegroup">About</div>
            {aboutItems.map((i) => (
              <Link key={i.href} href={i.href}>
                {i.label}
              </Link>
            ))}
            <span className="mobilesoon">Mission statement · Coming soon</span>

            {user && (
              <>
                <div className="mobilegroup">Profile</div>
                {profileItems.map((i) => (
                  <Link key={i.href} href={i.href}>
                    {i.label}
                  </Link>
                ))}
              </>
            )}

            <div className="mobilegroup">More</div>
            <Link href="/pricing">Premium</Link>
            {accountLink && <Link href={accountLink.href}>{accountLink.label}</Link>}
            {showAdmin && <Link href="/admin/devotionals">Admin</Link>}
            {!user && (
              <Link href="/subscribe" className="btn btn-gold btn-block">
                Start free
              </Link>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
