import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * The marketing site is public. Member-only features that aren't ready yet
 * — sign-in, account, the member portal, and My Journey — show a warm
 * "coming soon" page (with a rotating verse) instead of a half-built screen.
 *
 * The owner keeps full access by visiting /unlock?key=<PREVIEW_KEY> once; it
 * sets a cookie that waves them through the member gates so they can sign in
 * and use the portal/admin. When these features are ready, remove their
 * prefixes from COMING_SOON_PREFIXES to open them to everyone.
 */
const PREVIEW_COOKIE = "tdw_preview";
const PREVIEW_KEY = process.env.PREVIEW_KEY || "founding";

// Not-ready member areas — gated behind the "coming soon" page for the public.
const COMING_SOON_PREFIXES = ["/login", "/account", "/portal", "/journey"];
function isComingSoon(path: string): boolean {
  return COMING_SOON_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

// Three verses, dispersed across the member areas.
const VERSES = [
  {
    t: "&ldquo;For I know the plans I have for you,&rdquo; declares the Lord, &ldquo;plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;",
    r: "Jeremiah 29:11",
  },
  {
    t: "&ldquo;&hellip;being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.&rdquo;",
    r: "Philippians 1:6",
  },
  {
    t: "&ldquo;See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.&rdquo;",
    r: "Isaiah 43:19",
  },
];
function verseFor(path: string) {
  if (path.startsWith("/account")) return VERSES[1]; // Philippians 1:6
  if (path.startsWith("/portal")) return VERSES[2]; // Isaiah 43:19
  if (path.startsWith("/journey")) return VERSES[0]; // Jeremiah 29:11
  return VERSES[0]; // /login → Jeremiah 29:11
}

function comingSoonHtml(path: string): string {
  const v = verseFor(path);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>The Daily Walk — Coming soon</title>
<style>
  *{box-sizing:border-box} html,body{margin:0;height:100%}
  body{font-family:Georgia,'Times New Roman',serif;background:
    radial-gradient(120% 90% at 50% 120%, #f6cf86 0%, #e3a85a 14%, #b9763f 30%, #2a3a5a 60%, #16263f 82%, #0e1a30 100%);
    color:#fff;display:flex;align-items:center;justify-content:center;min-height:100%;text-align:center;padding:24px}
  .w{max-width:620px}
  .k{font-family:Arial,Helvetica,sans-serif;letter-spacing:4px;font-size:12px;font-weight:700;color:#E3C074;text-transform:uppercase}
  h1{font-size:38px;margin:14px 0 12px;line-height:1.12}
  p.lead{font-size:17px;line-height:1.6;color:#e7eaf0;margin:0 auto 4px;max-width:500px}
  .rule{width:60px;height:3px;background:#C9A24B;border-radius:2px;margin:26px auto}
  .verse{font-style:italic;color:#f2e8cb;font-size:16px;line-height:1.65;max-width:520px;margin:0 auto}
  .cite{font-family:Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:2px;font-size:12px;color:#cdb989;margin-top:12px;text-transform:uppercase}
  a.home{display:inline-block;margin-top:32px;color:#E3C074;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600}
  a.home:hover{text-decoration:underline}
</style></head>
<body><div class="w">
  <div class="k">The Daily Walk</div>
  <h1>This part is still being built.</h1>
  <p class="lead">Your member space &mdash; sign&#8209;in, your dashboard, and the guided Bible&#8209;in&#8209;a&#8209;Year journey &mdash; is coming soon.</p>
  <div class="rule"></div>
  <p class="verse">${v.t}</p>
  <p class="cite">${v.r}</p>
  <a class="home" href="/">&larr; Back to The Daily Walk</a>
</div></body></html>`;
}

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

  const unlocked = request.cookies.get(PREVIEW_COOKIE)?.value === "1";
  if (!unlocked && isComingSoon(pathname)) {
    return new NextResponse(comingSoonHtml(pathname), {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
