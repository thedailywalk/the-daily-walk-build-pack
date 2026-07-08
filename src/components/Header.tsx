import Link from "next/link";
import { site } from "@/lib/site";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

/** "About" jumps to the matching section on the homepage (smooth in-page scroll). */
const aboutItems: { href: string; label: string }[] = [
  { href: "/#how", label: "How it works" },
  { href: "/#mission-home", label: "Our Mission" },
  { href: "/#why", label: "Why read the Bible" },
  { href: "/#pray", label: "Prayer Wall" },
  { href: "/#pricing", label: "Pricing" },
];

/** "Founding Membership" — where visitors learn about premium AND the founders. */
const foundingItems: { href: string; label: string; sub?: string }[] = [
  { href: "/pricing", label: "Plans & Pricing", sub: "Founding Member & Partner" },
  { href: "/mission", label: "Our Mission & Founders", sub: "The story & where it goes" },
];

/** "Profile" groups a member's personal spaces (shown when signed in). */
const profileItems: { href: string; label: string; sub?: string }[] = [
  { href: "/journey", label: "My Journey", sub: "Bible in a year" },
  { href: "/portal/prayer", label: "Prayer Journal" },
  { href: "/portal/memory", label: "Scripture Memory" },
  { href: "/journey?tab=notes", label: "Saved Notes" },
];

/** "Admin" groups the owner's workspaces (shown to admins only). */
const adminItems: { href: string; label: string; sub?: string }[] = [
  { href: "/admin/devotionals", label: "Daily (Free)", sub: "the week ahead" },
  { href: "/admin/premium", label: "The Deeper Walk", sub: "premium · week ahead" },
  { href: "/admin/wellness", label: "Wellness Guide", sub: "week ahead" },
  { href: "/admin/weekly-video", label: "Weekly Video" },
  { href: "/admin/library", label: "Content Library" },
  { href: "/admin/workbook", label: "Workbook Evolution" },
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
          {/* About ▾ — label links to the homepage "How it works" */}
          <div className="navdrop">
            <Link href="/#how" className="navdrop-t" aria-haspopup="true">
              About <span className="navdrop-caret" aria-hidden="true">▾</span>
            </Link>
            <div className="navdrop-menu" role="menu">
              {aboutItems.map((i) => (
                <Link key={i.href} href={i.href} role="menuitem">
                  {i.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Samples — preview each newsletter before signing up */}
          <Link href="/samples">Samples</Link>

          {/* Profile ▾ (members) */}
          {user && (
            <div className="navdrop">
              <Link href="/portal" className="navdrop-t" aria-haspopup="true">
                Profile <span className="navdrop-caret" aria-hidden="true">▾</span>
              </Link>
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

          {/* Founding Membership ▾ — label links to the pricing page */}
          <div className="navdrop">
            <Link
              href="/pricing"
              className="navdrop-t navpremium-t"
              aria-haspopup="true"
            >
              Founding Membership{" "}
              <span className="navdrop-caret" aria-hidden="true">
                ▾
              </span>
            </Link>
            <div className="navdrop-menu" role="menu">
              {foundingItems.map((i) => (
                <Link key={i.href} href={i.href} role="menuitem">
                  {i.label}
                  {i.sub && <small className="navdrop-sub">{i.sub}</small>}
                </Link>
              ))}
            </div>
          </div>
          {accountLink && <Link href={accountLink.href}>{accountLink.label}</Link>}

          {/* Admin ▾ (admins only) */}
          {showAdmin && (
            <div className="navdrop">
              <button type="button" className="navdrop-t" aria-haspopup="true">
                Admin <span className="navdrop-caret" aria-hidden="true">▾</span>
              </button>
              <div className="navdrop-menu" role="menu">
                {adminItems.map((i) => (
                  <Link key={i.href} href={i.href} role="menuitem">
                    {i.label}
                    {i.sub && <small className="navdrop-sub">{i.sub}</small>}
                  </Link>
                ))}
                <Link href="/admin" role="menuitem">Admin home</Link>
              </div>
            </div>
          )}

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
            <Link href="/samples">Samples — see what you get</Link>

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

            <div className="mobilegroup">Founding Membership</div>
            {foundingItems.map((i) => (
              <Link key={i.href} href={i.href}>
                {i.label}
              </Link>
            ))}

            <div className="mobilegroup">More</div>
            {accountLink && <Link href={accountLink.href}>{accountLink.label}</Link>}

            {showAdmin && (
              <>
                <div className="mobilegroup">Admin</div>
                {adminItems.map((i) => (
                  <Link key={i.href} href={i.href}>
                    {i.label}
                  </Link>
                ))}
                <Link href="/admin">Admin home</Link>
              </>
            )}

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
