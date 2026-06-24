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
  const [kind, setKind] = useState(d?.kind ?? "note");
  const [body, setBody] = useState(d?.body ?? "");
  const [why, setWhy] = useState(d?.why ?? "");
  const [scriptures, setScriptures] = useState((d?.scriptures ?? []).join(", "));
  const [emotion, setEmotion] = useState(d?.emotion ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set(d?.topics ?? []));
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const analysis = useMemo(() => {
    const text = `${title}\n${body}`;
    const dt = detectTopics(text, topics);
    const mentioned = detectScriptures(text);
    const verses = suggestVersesForTopics(dt, 10);
    return { dt, mentioned, verses };
  }, [title, body, topics]);

  function autofill() {
    const text = `${title}\n${body}`;
    const dt = detectTopics(text, topics);
    setSelected((prev) => new Set([...prev, ...dt]));
    if (analysis.mentioned.length && !scriptures.trim()) {
      setScriptures(analysis.mentioned.join(", "));
    }
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
    <form action={saveLibraryItemAction} className="adm-form lib-form">
      {d && <input type="hidden" name="id" value={d.id} />}
      <input type="hidden" name="existingMediaPath" value={d?.mediaPath ?? ""} />
      {Array.from(selected).map((t) => (
        <input key={t} type="hidden" name="topics" value={t} />
      ))}

      <h3 className="adm-group" style={{ borderTop: "none", paddingTop: 0, marginTop: 0 }}>
        {d ? "Edit item" : "Add to the library"}
      </h3>

      <label className="adm-field">
        <span className="adm-label">Title</span>
        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="adm-input" placeholder="A line that names it" />
      </label>
      <label className="adm-field">
        <span className="adm-label">Type</span>
        <select name="kind" value={kind} onChange={(e) => setKind(e.target.value)} className="sg-select">
          {contentTypes.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <label className="adm-field">
        <span className="adm-label">Content / paste / your thoughts</span>
        <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} className="adm-textarea" rows={6} placeholder="Paste an article, caption, transcript, quote, or your notes…" />
      </label>

      <div className="smart-bar">
        <button type="button" className="btn btn-gold" onClick={autofill}>
          ✨ Analyze &amp; auto-fill
        </button>
        {analysis.dt.length > 0 && (
          <span className="smart-hint">Detected: {analysis.dt.join(", ")}</span>
        )}
      </div>

      <label className="adm-field">
        <span className="adm-label">Link / media URL (optional)</span>
        <input name="url" defaultValue={d?.url ?? ""} className="adm-input" placeholder="https://… (image, audio, article)" />
      </label>
      <label className="adm-field">
        <span className="adm-label">Upload a screenshot / image (optional · up to 4MB)</span>
        <input name="file" type="file" accept="image/*" className="adm-input lib-file" onChange={(e) => {
          const f = e.target.files?.[0];
          setImgPreview(f ? URL.createObjectURL(f) : null);
        }} />
      </label>
      {imgPreview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgPreview} alt="Preview" className="lib-media-img" />
      )}

      <label className="adm-field">
        <span className="adm-label">Why I saved it / how it might inspire a devotional</span>
        <textarea name="why" value={why} onChange={(e) => setWhy(e.target.value)} className="adm-textarea" rows={3} placeholder="Auto-filled when you analyze — edit in your own words." />
      </label>

      <label className="adm-field">
        <span className="adm-label">Categories (accept, add, or remove)</span>
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
        <span className="adm-label">Scriptures (auto-detected; edit freely)</span>
        <input value={scriptures} onChange={(e) => setScriptures(e.target.value)} name="scriptures" className="adm-input" placeholder="John 3:16, Psalm 23" />
      </label>

      {analysis.verses.length > 0 && (
        <div className="smart-verses">
          <span className="adm-label" style={{ display: "block", marginBottom: 6 }}>
            {analysis.mentioned.length
              ? "More related verses — tap to add:"
              : "No verse mentioned — related verses you can attach:"}
          </span>
          <div className="lib-tags">
            {analysis.verses.map((v) => (
              <button key={v.ref} type="button" className="smart-chip" title={v.text} onClick={() => addScripture(v.ref)}>
                + {v.ref}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="adm-row">
        <label className="adm-field">
          <span className="adm-label">Source</span>
          <input name="source" defaultValue={d?.source ?? ""} className="adm-input" placeholder="Person / site" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Emotion (optional)</span>
          <input name="emotion" value={emotion} onChange={(e) => setEmotion(e.target.value)} className="adm-input" placeholder="hope, comfort…" />
        </label>
      </div>
      <label className="adm-field">
        <span className="adm-label">Holiday (optional)</span>
        <input name="holiday" defaultValue={d?.holiday ?? ""} className="adm-input" placeholder="Easter, Christmas…" />
      </label>

      <label className="lib-check lib-check-wide">
        <input type="checkbox" name="isOriginal" defaultChecked={d?.isOriginal} />
        These are my own words — okay to use directly in a newsletter.
      </label>

      <div className="adm-actions">
        <button type="submit" className="btn btn-gold">
          {d ? "Save changes" : "Add item"}
        </button>
      </div>
    </form>
  );
}
