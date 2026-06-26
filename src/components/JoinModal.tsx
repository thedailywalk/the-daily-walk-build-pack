"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignupForm from "@/components/SignupForm";

/**
 * Welcome newsletter popup — "Dark Sun-crest" look. Appears shortly after landing
 * on a public page, remembers dismissal, never shows in the portal/admin/auth.
 */
const KEY = "tdw_join_v1";
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000;
const EXCLUDE = ["/admin", "/portal", "/login", "/subscribe", "/auth", "/designs"];

const CSS = `
.jm2-backdrop { position:fixed; inset:0; z-index:1000; display:flex; align-items:center; justify-content:center; padding:18px; overflow:auto;
  background: radial-gradient(120% 90% at 50% 0%, rgba(31,58,95,.5), transparent 60%), rgba(4,8,16,.78); backdrop-filter: blur(3px); animation: jm2-fade .25s ease both; }
@keyframes jm2-fade { from { opacity:0; } to { opacity:1; } }
.jm2-card { position:relative; width:100%; max-width:520px; background:#10203a; border-radius:22px; overflow:hidden;
  border:1px solid rgba(227,192,116,.22); box-shadow:0 30px 70px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.03) inset; color:#EAF0F8;
  max-height: calc(100vh - 36px); overflow-y:auto; }
.jm2-crest { position:relative; height:168px; overflow:hidden; }
.jm2-crest svg { display:block; width:100%; height:100%; }
.jm2-head { position:absolute; top:0; left:0; right:0; z-index:3; display:flex; align-items:center; justify-content:space-between; padding:14px 18px 0; }
.jm2-brand { font-family:Georgia,serif; font-weight:700; letter-spacing:.13em; font-size:13px; color:#E3C074; text-transform:uppercase; text-shadow:0 1px 6px rgba(0,0,0,.5); }
.jm2-close { width:30px; height:30px; border-radius:999px; display:flex; align-items:center; justify-content:center; background:rgba(11,20,36,.55);
  border:1px solid rgba(227,192,116,.35); color:#EAF0F8; font-size:18px; line-height:1; cursor:pointer; }
.jm2-stats { display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; padding:12px 18px 14px; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:#B9C6DA; border-bottom:1px solid rgba(255,255,255,.06); }
.jm2-stats b { color:#E3C074; font-weight:800; }
.jm2-stats .sep { color:rgba(227,192,116,.5); }
.jm2-body { padding:18px 24px 22px; }
.jm2-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:600; color:#D7C9A6; margin:0 0 12px; }
.jm2-dot { width:8px; height:8px; border-radius:999px; background:#E3C074; box-shadow:0 0 8px rgba(227,192,116,.8); }
.jm2-headline { font-family:Georgia,serif; font-weight:700; font-size:30px; line-height:1.12; margin:0 0 10px; color:#F4F7FC; }
.jm2-headline .g { color:#E3C074; }
.jm2-sub { font-size:14.5px; line-height:1.55; color:#C2CEDF; margin:0 0 16px; }
.jm2-verse { background:linear-gradient(180deg, rgba(11,20,36,.9), rgba(31,58,95,.35)); border:1px solid rgba(227,192,116,.4); border-radius:14px; padding:14px 16px; margin:0 0 18px; }
.jm2-verse p { margin:0; font-family:Georgia,serif; font-style:italic; font-size:14px; line-height:1.5; color:#EDE2C6; }
.jm2-verse cite { display:block; margin-top:8px; font-style:normal; font-size:11.5px; letter-spacing:.04em; color:#E3C074; }
.jm2-card .signup { display:flex; gap:8px; margin:0 0 18px; flex-wrap:wrap; }
.jm2-card .signup input { flex:1; min-width:150px; padding:12px 14px; border-radius:11px; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.05); color:#EAF0F8; font-size:14px; }
.jm2-card .signup input::placeholder { color:#8593A8; }
.jm2-card .signup .btn-gold { border:none; border-radius:11px; padding:12px 18px; font-weight:800; font-size:14px; white-space:nowrap; color:#2a1f06; background:linear-gradient(180deg,#E3C074,#C9A24B); box-shadow:0 6px 18px rgba(227,192,116,.3); }
.jm2-card .signup .form-success { color:#EDE2C6; font-style:italic; }
.jm2-card .signup .form-error { color:#f4b8b1; font-size:13px; }
.jm2-list { list-style:none; margin:0 0 18px; padding:0; display:grid; gap:10px; }
.jm2-list li { display:flex; align-items:flex-start; gap:10px; font-size:13.5px; line-height:1.45; color:#CDD8E8; }
.jm2-list .em { font-size:16px; width:22px; text-align:center; flex-shrink:0; }
.jm2-list b { color:#F4F7FC; }
.jm2-foot { text-align:center; border-top:1px solid rgba(255,255,255,.07); padding-top:14px; }
.jm2-fine { margin:0 0 8px; font-size:11.5px; color:#8C9AAE; }
.jm2-founding { font-size:12.5px; color:#C2CEDF; }
.jm2-founding a { color:#E3C074; font-weight:700; text-decoration:none; }
.jm2-founding a:hover { text-decoration:underline; }
@media (prefers-reduced-motion: no-preference) {
  .jm2-card { animation: jm2-pop .45s cubic-bezier(.2,.8,.25,1) both; }
  @keyframes jm2-pop { from { opacity:0; transform:translateY(14px) scale(.97); } to { opacity:1; transform:none; } }
  .jm2-rays { transform-origin:250px 168px; animation: jm2-shimmer 9s ease-in-out infinite; }
  @keyframes jm2-shimmer { 0%,100% { opacity:.55; } 50% { opacity:.9; } }
  .jm2-core { animation: jm2-glow 6s ease-in-out infinite; }
  @keyframes jm2-glow { 0%,100% { opacity:.9; } 50% { opacity:1; } }
  .jm2-card .signup .btn-gold { animation: jm2-btn 3.4s ease-in-out infinite; }
  @keyframes jm2-btn { 0%,100% { box-shadow:0 6px 18px rgba(227,192,116,.3); } 50% { box-shadow:0 10px 26px rgba(227,192,116,.55); } }
  .jm2-dot { animation: jm2-dotpulse 2.8s ease-in-out infinite; }
  @keyframes jm2-dotpulse { 0%,100% { box-shadow:0 0 8px rgba(227,192,116,.8); } 50% { box-shadow:0 0 14px rgba(227,192,116,.5); } }
  .jm2-verse, .jm2-list li { animation: jm2-rise .5s ease both; }
  .jm2-verse { animation-delay:.16s; }
  .jm2-list li:nth-child(1){animation-delay:.22s;} .jm2-list li:nth-child(2){animation-delay:.29s;}
  .jm2-list li:nth-child(3){animation-delay:.36s;} .jm2-list li:nth-child(4){animation-delay:.43s;}
  @keyframes jm2-rise { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:none; } }
}
@media (max-width:480px) { .jm2-headline { font-size:26px; } .jm2-card .signup { flex-direction:column; } .jm2-card .signup .btn-gold { width:100%; } }
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
    <div className="jm2-backdrop" role="dialog" aria-modal="true" aria-label="Join The Daily Walk Newsletter" onClick={dismiss}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="jm2-card" onClick={(e) => e.stopPropagation()}>
        <div className="jm2-crest">
          <svg viewBox="0 0 500 168" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <linearGradient id="jm2-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b1424" /><stop offset="55%" stopColor="#13243f" /><stop offset="100%" stopColor="#1F3A5F" />
              </linearGradient>
              <radialGradient id="jm2-coreg" cx="50%" cy="100%" r="75%">
                <stop offset="0%" stopColor="#FBEFC9" /><stop offset="35%" stopColor="#E3C074" /><stop offset="70%" stopColor="#C9A24B" /><stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="jm2-rayg" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#E3C074" stopOpacity=".9" /><stop offset="100%" stopColor="#E3C074" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="500" height="168" fill="url(#jm2-sky)" />
            <g className="jm2-rays" fill="url(#jm2-rayg)">
              <polygon points="250,168 232,30 268,30" /><polygon points="250,168 190,52 222,44" /><polygon points="250,168 310,52 278,44" />
              <polygon points="250,168 140,86 176,72" /><polygon points="250,168 360,86 324,72" /><polygon points="250,168 96,120 132,104" /><polygon points="250,168 404,120 368,104" />
            </g>
            <ellipse className="jm2-core" cx="250" cy="170" rx="150" ry="120" fill="url(#jm2-coreg)" />
            <circle className="jm2-core" cx="250" cy="178" r="58" fill="#FBEFC9" opacity=".95" />
            <path d="M0,150 Q250,138 500,150 L500,168 L0,168 Z" fill="#0b1424" opacity=".85" />
          </svg>
          <div className="jm2-head">
            <span className="jm2-brand">The Daily Walk Newsletter</span>
            <button className="jm2-close" aria-label="Close" onClick={dismiss}>×</button>
          </div>
        </div>

        <div className="jm2-stats">
          <span>Daily Devotional</span><span className="sep">·</span>
          <span><b>5 MIN</b> READ</span><span className="sep">·</span>
          <span><b>FREE</b> ALWAYS</span>
        </div>

        <div className="jm2-body">
          <p className="jm2-eyebrow"><span className="jm2-dot" /> Free every morning — before the world gets loud.</p>
          <h2 className="jm2-headline">A new morning <span className="g">with God.</span></h2>
          <p className="jm2-sub">
            Ephesians says put on the armor every morning — and the one weapon you fight with is the Word.
            Start your day already armed. Free, forever.
          </p>
          <div className="jm2-verse">
            <p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;<cite>— Psalm 118:24 · lands at 6:30 AM PT</cite></p>
          </div>

          <SignupForm buttonLabel="Join free →" />

          <ul className="jm2-list">
            <li><span className="em" aria-hidden="true">📖</span><span><b>Hear God in His Word every morning</b> — a 5-minute devotional</span></li>
            <li><span className="em" aria-hidden="true">🙏</span><span><b>Learn to talk and listen to God</b> — and notice when He&apos;s speaking</span></li>
            <li><span className="em" aria-hidden="true">🌅</span><span><b>Start every day walking with God</b> — not just reading about Him</span></li>
            <li><span className="em" aria-hidden="true">🌱</span><span><b>Build a real relationship with Jesus</b> — small steps that become a lifelong walk</span></li>
          </ul>

          <div className="jm2-foot">
            <p className="jm2-fine">Free forever · No spam · Unsubscribe anytime</p>
            <p className="jm2-founding">Ready to go deeper? <Link href="/pricing" onClick={dismiss}>Become a Founding Member →</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
