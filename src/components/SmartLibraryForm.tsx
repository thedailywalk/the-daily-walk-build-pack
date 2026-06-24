"use client";

import { useMemo, useState } from "react";
import { saveLibraryItemAction } from "@/app/admin/library/actions";
import {
  detectTopics,
  detectScriptures,
  detectEmotion,
  suggestVersesForTopics,
  composeWhy,
} from "@/lib/scripture";

type EditItem = {
  id: string;
  title: string;
  kind: string;
  body: string;
  url: string | null;
  source: string | null;
  why: string | null;
  topics: string[];
  scriptures: string[];
  holiday: string | null;
  emotion: string | null;
  isOriginal: boolean;
  mediaPath: string | null;
  caption: string | null;
  transcript: string | null;
  personalTake: string | null;
  sources: string | null;
  isVoice: boolean;
};

export default function SmartLibraryForm({
  topics,
  contentTypes,
  editing,
}: {
  topics: string[];
  contentTypes: string[];
  editing: EditItem | null;
}) {
  const d = editing;
  const [title, setTitle] = useState(d?.title ?? "");
  const [caption, setCaption] = useState(d?.caption ?? "");
  const [transcript, setTranscript] = useState(d?.transcript ?? "");
  const [take, setTake] = useState(d?.personalTake ?? "");
  const [why, setWhy] = useState(d?.why ?? "");
  const [scriptures, setScriptures] = useState((d?.scriptures ?? []).join(", "));
  const [emotion, setEmotion] = useState(d?.emotion ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set(d?.topics ?? []));
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  // Analyze across everything the owner pasted/wrote.
  const text = `${title}\n${caption}\n${transcript}\n${take}`;
  const analysis = useMemo(() => {
    const dt = detectTopics(text, topics);
    const mentioned = detectScriptures(text);
    const verses = suggestVersesForTopics(dt, 10);
    return { dt, mentioned, verses };
  }, [text, topics]);

  function autofill() {
    const dt = detectTopics(text, topics);
    setSelected((prev) => new Set([...prev, ...dt]));
    if (analysis.mentioned.length && !scriptures.trim()) setScriptures(analysis.mentioned.join(", "));
    if (!why.trim()) setWhy(composeWhy(dt));
    const emo = detectEmotion(text);
    if (emo && !emotion.trim()) setEmotion(emo);
  }

  function toggle(t: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  }

  function addScripture(ref: string) {
    setScriptures((s) => {
      const arr = s.split(/[,\n]+/).map((x) => x.trim()).filter(Boolean);
      if (!arr.includes(ref)) arr.push(ref);
      return arr.join(", ");
    });
  }

  return (
    <form action={saveLibraryItemAction} className="adm-form lib-form2">
      {d && <input type="hidden" name="id" value={d.id} />}
      <input type="hidden" name="existingMediaPath" value={d?.mediaPath ?? ""} />
      {Array.from(selected).map((t) => (
        <input key={t} type="hidden" name="topics" value={t} />
      ))}

      {/* ── 1. Where it's from ── */}
      <section className="lib-sec">
        <div className="lib-sec-h">Where it&apos;s from <span>everything optional — fill in what you used</span></div>
        <label className="adm-field">
          <span className="adm-label">Link <em>(Instagram, article, or media URL)</em></span>
          <input name="url" defaultValue={d?.url ?? ""} className="adm-input" placeholder="https://www.instagram.com/reel/…" />
        </label>
        <div className="adm-row">
          <label className="adm-field">
            <span className="adm-label">Inspiration source</span>
            <input name="source" defaultValue={d?.source ?? ""} className="adm-input" placeholder="Name or @handle" />
          </label>
          <label className="adm-field">
            <span className="adm-label">Type</span>
            <select name="kind" defaultValue={d?.kind ?? "newsletter inspiration"} className="sg-select">
              {contentTypes.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="lib-check lib-check-wide lib-voice">
          <input type="checkbox" name="isVoice" defaultChecked={d?.isVoice} />
          ⭐ Save this person as one of <strong>“Your Voices”</strong> — a creator you want to feature &amp; pull from often (not just a one-off save).
        </label>
        <label className="adm-field">
          <span className="adm-label">Title</span>
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="adm-input" placeholder="A short line that names this" />
        </label>
      </section>

      {/* ── 2. The original ── */}
      <section className="lib-sec">
        <div className="lib-sec-h">The original <span>verbatim — paste exactly what they said</span></div>
        <label className="adm-field">
          <span className="adm-label">Caption</span>
          <textarea name="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="adm-textarea" rows={3} placeholder="Paste the post caption…" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Verbatim transcript</span>
          <textarea name="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} className="adm-textarea" rows={4} placeholder="Paste the transcript — reels have built-in auto-captions you can copy." />
        </label>
        <label className="adm-field">
          <span className="adm-label">Screenshot / image <em>(optional · up to 4MB)</em></span>
          <input name="file" type="file" accept="image/*" className="adm-input lib-file" onChange={(e) => {
            const f = e.target.files?.[0];
            setImgPreview(f ? URL.createObjectURL(f) : null);
          }} />
        </label>
        {imgPreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgPreview} alt="Preview" className="lib-media-img" />
        )}
      </section>

      {/* ── 3. My take & the science ── */}
      <section className="lib-sec lib-sec-accent">
        <div className="lib-sec-h">My take &amp; the science <span>your own words — the heart of a future devotional</span></div>
        <label className="adm-field">
          <span className="adm-label">My Personal Take · In My Own Words · The Science Behind It</span>
          <textarea name="personalTake" value={take} onChange={(e) => setTake(e.target.value)} className="adm-textarea" rows={5}
            placeholder="Rewrite the message completely in your own words. Explain the research, psychology, or neuroscience behind it — simply and clearly, the way you'd say it to a friend." />
        </label>
        <label className="adm-field">
          <span className="adm-label">Sources cited for my take &amp; research <em>(paste links)</em></span>
          <textarea name="sources" defaultValue={d?.sources ?? ""} className="adm-textarea lib-sources" rows={2}
            placeholder="Paste the reputable studies / sites you used (one per line), so you can reference them later." />
        </label>
      </section>

      {/* ── 4. Tag & connect ── */}
      <section className="lib-sec">
        <div className="lib-sec-h">Tag &amp; connect <span>let the system help</span></div>
        <div className="smart-bar">
          <button type="button" className="btn btn-gold" onClick={autofill}>✨ Analyze &amp; auto-fill</button>
          {analysis.dt.length > 0 && <span className="smart-hint">Detected: {analysis.dt.join(", ")}</span>}
        </div>

        <label className="adm-field">
          <span className="adm-label">Categories</span>
          <div className="lib-checks">
            {topics.map((t) => (
              <label key={t} className={`lib-check${selected.has(t) ? " ig-on" : ""}`}>
                <input type="checkbox" checked={selected.has(t)} onChange={() => toggle(t)} />
                {t}
                {analysis.dt.includes(t) && !selected.has(t) && <span className="smart-sug"> · suggested</span>}
              </label>
            ))}
          </div>
        </label>

        <label className="adm-field">
          <span className="adm-label">Scriptures <em>(auto-detected; edit freely)</em></span>
          <input value={scriptures} onChange={(e) => setScriptures(e.target.value)} name="scriptures" className="adm-input" placeholder="John 3:16, Psalm 23" />
        </label>
        {analysis.verses.length > 0 && (
          <div className="smart-verses">
            <span className="adm-label" style={{ display: "block", marginBottom: 6 }}>
              {analysis.mentioned.length ? "More related verses — tap to add:" : "No verse mentioned — related verses you can attach:"}
            </span>
            <div className="lib-tags">
              {analysis.verses.map((v) => (
                <button key={v.ref} type="button" className="smart-chip" title={v.text} onClick={() => addScripture(v.ref)}>+ {v.ref}</button>
              ))}
            </div>
          </div>
        )}

        <div className="adm-row">
          <label className="adm-field">
            <span className="adm-label">Emotion <em>(optional)</em></span>
            <input name="emotion" value={emotion} onChange={(e) => setEmotion(e.target.value)} className="adm-input" placeholder="hope, comfort…" />
          </label>
          <label className="adm-field">
            <span className="adm-label">Holiday <em>(optional)</em></span>
            <input name="holiday" defaultValue={d?.holiday ?? ""} className="adm-input" placeholder="Easter, Christmas…" />
          </label>
        </div>
      </section>

      {/* ── 5. Note to self ── */}
      <section className="lib-sec">
        <div className="lib-sec-h">Note to self</div>
        <label className="adm-field">
          <span className="adm-label">Why I saved it / how it might inspire a devotional</span>
          <textarea name="why" value={why} onChange={(e) => setWhy(e.target.value)} className="adm-textarea" rows={2} placeholder="Auto-filled when you analyze — edit in your own words." />
        </label>
        <label className="lib-check lib-check-wide">
          <input type="checkbox" name="isOriginal" defaultChecked={d?.isOriginal} />
          My take above is my own words — okay to use directly in a newsletter.
        </label>
      </section>

      <div className="adm-actions">
        <button type="submit" className="btn btn-gold">{d ? "Save changes" : "Add to library"}</button>
      </div>
    </form>
  );
}
