import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Pre-launch "coming soon" gate. While the site is hidden, the public sees a
 * splash; the owner unlocks with /unlock?key=<PREVIEW_KEY> (sets a cookie).
 * Design previews under /designs stay open so popup/portal drafts can be shared
 * without exposing the site. API, auth, RSS, admin & portal stay reachable.
 *
 * To take the site fully public later, set SITE_PUBLIC=true (or remove this gate).
 */
const PREVIEW_COOKIE = "tdw_preview";
const PREVIEW_KEY = process.env.PREVIEW_KEY || "founding";
const SITE_PUBLIC = process.env.SITE_PUBLIC === "true";

function isAlwaysAllowed(path: string): boolean {
  return (
    path.startsWith("/designs") || // shareable design drafts (popup/portal)
    path.startsWith("/api") ||
    path.startsWith("/auth") ||
    path.startsWith("/admin") || // login-gated already
    path.startsWith("/portal") || // login-gated already
    path.startsWith("/account") ||
    path.startsWith("/login") ||
    path.startsWith("/_next") ||
    path === "/devotional/rss.xml" || // Beehiiv RSS-to-Send
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path === "/favicon.ico"
  );
}

const SPLASH = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>The Daily Walk — Coming soon</title>
<style>
  *{box-sizing:border-box} html,body{margin:0;height:100%}
  body{font-family:Georgia,'Times New Roman',serif;background:
    radial-gradient(120% 90% at 50% 120%, #f6cf86 0%, #e3a85a 14%, #b9763f 30%, #2a3a5a 60%, #16263f 82%, #0e1a30 100%);
    color:#fff;display:flex;align-items:center;justify-content:center;min-height:100%;text-align:center;padding:24px}
  .w{max-width:560px}
  .k{font-family:Arial,Helvetica,sans-serif;letter-spacing:4px;font-size:12px;font-weight:700;color:#E3C074;text-transform:uppercase}
  h1{font-size:40px;margin:14px 0 10px;line-height:1.1}
  p{font-size:17px;line-height:1.6;color:#e7eaf0;margin:0 auto;max-width:460px}
  .tag{margin-top:20px;font-style:italic;color:#cdd7e6;font-size:15px}
</style></head>
<body><div class="w">
  <div class="k">The Daily Walk</div>
  <h1>Something good is coming.</h1>
  <p>We're putting the finishing touches on a daily walk with God — a devotional, a prayer, and a little encouragement every morning. It opens soon.</p>
  <div class="tag">"This is the day that the Lord has made." — Psalm 118:24</div>
</div></body></html>`;

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Owner unlock: /unlock?key=... sets the preview cookie and returns home.
  if (pathname === "/unlock") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    const res = NextResponse.redirect(url);
    if (searchParams.get("key") === PREVIEW_KEY) {
      res.cookies.set(PREVIEW_COOKIE, "1", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    }
    return res;
  }

  if (!SITE_PUBLIC) {
    const unlocked = request.cookies.get(PREVIEW_COOKIE)?.value === "1";
    if (!unlocked && !isAlwaysAllowed(pathname)) {
      return new NextResponse(SPLASH, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
