"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignupForm from "@/components/SignupForm";

/**
 * Welcome newsletter popup — "Golden Dawn": animated sunrise crest rising into the
 * cream Cream-Classic body. Appears shortly after landing on a public page,
 * remembers dismissal, never shows in the portal/admin/auth.
 */
const KEY = "tdw_join_v1";
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000;
const EXCLUDE = ["/admin", "/portal", "/login", "/subscribe", "/auth", "/designs"];

const CSS = `
.jmd-backdrop { position:fixed; inset:0; z-index:1000; display:flex; align-items:center; justify-content:center; padding:18px; overflow:auto;
  background: radial-gradient(120% 90% at 50% 0%, rgba(31,58,95,.45), transparent 60%), rgba(8,12,22,.7); backdrop-filter: blur(3px); animation: jmd-fade .25s ease both; }
@keyframes jmd-fade { from { opacity:0; } to { opacity:1; } }
.jmd-card { position:relative; width:100%; max-width:520px; background:#FAF6EE; border-radius:20px; overflow:hidden; border:1px solid #e7ddc7;
  box-shadow:0 30px 70px rgba(8,12,22,.55); max-height:calc(100vh - 36px); overflow-y:auto; }
.jmd-crest { position:relative; height:150px; overflow:hidden; }
.jmd-crest svg { display:block; width:100%; height:100%; }
.jmd-head { position:absolute; top:0; left:0; right:0; display:flex; align-items:center; justify-content:space-between; padding:15px 20px 0; }
.jmd-brand { font-family:Georgia,serif; font-weight:700; letter-spacing:.13em; font-size:13px; color:#E3C074; text-transform:uppercase; text-shadow:0 1px 6px rgba(0,0,0,.5); }
.jmd-close { width:30px; height:30px; border-radius:999px; display:flex; align-items:center; justify-content:center; background:rgba(11,20,36,.45); border:1px solid rgba(227,192,116,.35); color:#EAF0F8; font-size:18px; line-height:1; cursor:pointer; }
.jmd-body { padding:18px 26px 22px; color:#3c4350; }
.jmd-stats { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; font-size:11px; letter-spacing:.5px; text-transform:uppercase; color:#8a8270; padding-bottom:14px; border-bottom:1px solid #e7ddc7; }
.jmd-stats b { color:#1F3A5F; }
.jmd-stats .sep { color:#c9b48a; }
.jmd-eyebrow { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px; color:#B8902E; margin:16px 0 6px; }
.jmd-dot { width:9px; height:9px; border-radius:50%; background:#5a9a6b; box-shadow:0 0 0 4px rgba(90,154,107,.18); }
.jmd-headline { font-family:Georgia,serif; font-size:27px; line-height:1.15; color:#1F3A5F; margin:0 0 8px; }
.jmd-headline .g { color:#B8902E; }
.jmd-sub { font-size:14px; line-height:1.6; color:#3c4350; margin:0 0 16px; }
.jmd-verse { background:#F3ECDA; border-left:4px solid #C9A24B; border-radius:0 10px 10px 0; padding:13px 16px; margin:0 0 16px; }
.jmd-verse p { margin:0; font-family:Georgia,serif; font-style:italic; font-size:15px; line-height:1.5; color:#1F3A5F; }
.jmd-verse cite { display:block; margin-top:8px; font-style:normal; font-size:12px; color:#8a8270; }
.jmd-card .signup { display:flex; gap:8px; margin:0 0 16px; flex-wrap:wrap; }
.jmd-card .signup input { flex:1; min-width:150px; background:#fff; border:1px solid #e7ddc7; border-radius:10px; padding:11px 14px; color:#22262B; font-size:14px; }
.jmd-card .signup input::placeholder { color:#9a917c; }
.jmd-card .signup .btn-gold { background:#C9A24B; color:#1F3A5F; font-weight:800; border-radius:10px; padding:11px 18px; font-size:14px; white-space:nowrap; border:none; }
.jmd-card .signup .form-success { color:#1F3A5F; font-style:italic; }
.jmd-card .signup .form-error { color:#b3534b; font-size:13px; }
.jmd-list { list-style:none; margin:14px 0 12px; padding:0; display:grid; gap:10px; }
.jmd-list li { display:flex; align-items:flex-start; gap:10px; font-size:14px; line-height:1.45; color:#3c4350; }
.jmd-list .em { font-size:16px; width:22px; text-align:center; flex-shrink:0; }
.jmd-list b { color:#1F3A5F; }
.jmd-foot { text-align:center; border-top:1px solid #e7ddc7; padding-top:12px; margin-top:4px; }
.jmd-fine { margin:0 0 8px; font-size:12px; color:#8a8270; }
.jmd-founding { font-size:12px; color:#8a8270; }
.jmd-founding a { color:#B8902E; font-weight:700; text-decoration:none; }
.jmd-founding a:hover { text-decoration:underline; }
@media (prefers-reduced-motion: no-preference) {
  .jmd-card { animation: jmd-pop .45s cubic-bezier(.2,.8,.25,1) both; }
  @keyframes jmd-pop { from { opacity:0; transform:translateY(14px) scale(.97);} to { opacity:1; transform:none; } }
  .jmd-rays { transform-origin:250px 150px; animation: jmd-shimmer 9s ease-in-out infinite; }
  @keyframes jmd-shimmer { 0%,100% { opacity:.55;} 50% { opacity:.9; } }
  .jmd-core { animation: jmd-glow 6s ease-in-out infinite; }
  @keyframes jmd-glow { 0%,100% { opacity:.92;} 50% { opacity:1; } }
  .jmd-dot { animation: jmd-dotpulse 2.8s ease-in-out infinite; }
  @keyframes jmd-dotpulse { 0%,100% { box-shadow:0 0 0 4px rgba(90,154,107,.18);} 50% { box-shadow:0 0 0 8px rgba(90,154,107,.06);} }
  .jmd-card .signup .btn-gold { animation: jmd-btn 3.4s ease-in-out infinite; }
  @keyframes jmd-btn { 0%,100% { box-shadow:0 2px 8px -4px rgba(184,144,46,.3);} 50% { box-shadow:0 8px 24px -6px rgba(201,162,75,.55);} }
  .jmd-verse, .jmd-list li { animation: jmd-rise .5s ease both; }
  .jmd-verse { animation-delay:.16s; }
  .jmd-list li:nth-child(1){animation-delay:.22s;} .jmd-list li:nth-child(2){animation-delay:.29s;}
  .jmd-list li:nth-child(3){animation-delay:.36s;} .jmd-list li:nth-child(4){animation-delay:.43s;}
  @keyframes jmd-rise { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:none; } }
}
@media (max-width:480px) { .jmd-headline { font-size:24px; } .jmd-card .signup { flex-direction:column; } .jmd-card .signup .btn-gold { width:100%; } }
`;

export default function JoinModal() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const excluded = EXCLUDE.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (excluded) return;
    let seen = 0;
    try { seen = Number(localStorage.getItem(KEY) || 0); } catch {}
    if (seen && Date.now() - seen < SNOOZE_MS) return;
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, [excluded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="jmd-backdrop" role="dialog" aria-modal="true" aria-label="Join The Daily Walk Newsletter" onClick={dismiss}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="jmd-card" onClick={(e) => e.stopPropagation()}>
        <div className="jmd-crest">
          <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <linearGradient id="jmd-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b1424" /><stop offset="55%" stopColor="#13243f" /><stop offset="100%" stopColor="#1F3A5F" />
              </linearGradient>
              <radialGradient id="jmd-coreg" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#FBEFC9" /><stop offset="38%" stopColor="#E3C074" /><stop offset="72%" stopColor="#C9A24B" /><stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="jmd-rayg" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#E3C074" stopOpacity=".9" /><stop offset="100%" stopColor="#E3C074" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="500" height="150" fill="url(#jmd-sky)" />
            <g className="jmd-rays" fill="url(#jmd-rayg)">
              <polygon points="250,150 232,18 268,18" /><polygon points="250,150 188,42 220,34" /><polygon points="250,150 312,42 280,34" />
              <polygon points="250,150 138,76 174,62" /><polygon points="250,150 362,76 326,62" /><polygon points="250,150 96,108 132,92" /><polygon points="250,150 404,108 368,92" />
            </g>
            <ellipse className="jmd-core" cx="250" cy="150" rx="150" ry="120" fill="url(#jmd-coreg)" />
            <circle className="jmd-core" cx="250" cy="156" r="52" fill="#FBEFC9" opacity=".97" />
            <path d="M0,128 Q250,116 500,128 L500,150 L0,150 Z" fill="#FAF6EE" />
          </svg>
          <div className="jmd-head">
            <span className="jmd-brand">The Daily Walk Newsletter</span>
            <button className="jmd-close" aria-label="Close" onClick={dismiss}>×</button>
          </div>
        </div>

        <div className="jmd-body">
          <div className="jmd-stats"><span><b>DAILY</b> DEVOTIONAL</span><span className="sep">·</span><span><b>5 MIN</b> READ</span><span className="sep">·</span><span><b>FREE</b> ALWAYS</span></div>
          <p className="jmd-eyebrow"><span className="jmd-dot" /> Free every morning — before the world gets loud</p>
          <h2 className="jmd-headline">A few quiet minutes <span className="g">with God.</span> Every morning.</h2>
          <p className="jmd-sub">
            You&apos;ll never grow close to someone you never actually talk to — not even God. This is where the
            conversation starts: ten honest minutes in His Word each morning that quietly change the other
            twenty-three hours. Ephesians calls it putting on your armor — so start your day already armed. Free, forever.
          </p>
          <div className="jmd-verse">
            <p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;<cite>— Psalm 118:24 · lands at 6:30 AM PT</cite></p>
          </div>

          <SignupForm buttonLabel="Join free →" />

          <ul className="jmd-list">
            <li><span className="em" aria-hidden="true">📖</span><span><b>Hear God in His Word every morning</b> — a 5-minute devotional</span></li>
            <li><span className="em" aria-hidden="true">🙏</span><span><b>Learn to talk and listen to God</b> — and notice when He&apos;s speaking</span></li>
            <li><span className="em" aria-hidden="true">🌅</span><span><b>Start every day walking with God</b> — not just reading about Him</span></li>
            <li><span className="em" aria-hidden="true">🌱</span><span><b>Build a real relationship with Jesus</b> — small steps that become a lifelong walk</span></li>
          </ul>

          <div className="jmd-foot">
            <p className="jmd-fine">Free forever · No spam · Unsubscribe anytime</p>
            <p className="jmd-founding">Ready to go deeper? <Link href="/pricing" onClick={dismiss}>Become a Founding Member →</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
