import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import AdminNav from "@/components/AdminNav";
import {
  listLibrary,
  getLibraryItem,
  topicCounts,
  mediaKind,
  TOPICS,
  CONTENT_TYPES,
  type LibraryItem,
} from "@/lib/library";
import { saveLibraryItemAction, deleteLibraryItemAction } from "./actions";

export const metadata: Metadata = {
  title: "Content Library",
  robots: { index: false },
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    topic?: string;
    kind?: string;
    edit?: string;
    saved?: string;
    err?: string;
  }>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  const [items, counts, editing] = await Promise.all([
    listLibrary({ q: sp.q, topic: sp.topic, kind: sp.kind }),
    topicCounts(),
    sp.edit ? getLibraryItem(sp.edit) : Promise.resolve(null),
  ]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Content Library
            </div>
            <p className="adm-sub">
              Your personal research base — quotes, notes, articles, links,
              sermon &amp; study notes, ideas, and inspiration. Tag everything so
              the newsletter generator can pull from it by theme.
            </p>
          </div>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>{" "}
            and run <code>supabase/content-library.sql</code> to start saving.
          </div>
        )}

        <AdminNav active="library" />

        {sp.saved && <div className="adm-saved">Saved ✓</div>}
        {sp.err === "size" && (
          <div className="adm-notice">
            That file was over 4MB, so it wasn&apos;t uploaded (your text was
            still saved). Use a smaller file, or paste a link to it instead.
          </div>
        )}

        {/* Coverage dashboard */}
        <div className="lib-cov">
          <div className="adm-bar">
            <h2 className="adm-h2">Coverage by topic</h2>
            <span className="adm-archrow-date">{total} items saved</span>
          </div>
          <p className="adm-hintline">
            Green = well-stocked · amber = a little · grey = needs material. Click
            a topic to filter.
          </p>
          <div className="lib-covgrid">
            {TOPICS.map((t) => {
              const n = counts[t] ?? 0;
              const level = n === 0 ? "none" : n < 3 ? "low" : "good";
              return (
                <Link
                  key={t}
                  href={`/admin/library?topic=${encodeURIComponent(t)}`}
                  className={`lib-covcell lib-${level}${sp.topic === t ? " is-on" : ""}`}
                >
                  <span className="lib-covname">{t}</span>
                  <span className="lib-covnum">{n}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="adm-cols lib-cols">
          {/* Add / edit form */}
          <ItemForm editing={editing} />

          {/* Browse */}
          <div>
            <div className="adm-bar">
              <h2 className="adm-h2">
                {sp.topic ? `“${sp.topic}”` : sp.q ? `Search: “${sp.q}”` : "All items"}
                <span className="lib-count"> · {items.length}</span>
              </h2>
              {(sp.topic || sp.q || sp.kind) && (
                <Link href="/admin/library" className="adm-back">
                  Clear filters
                </Link>
              )}
            </div>

            <form className="lib-search" action="/admin/library">
              <input
                name="q"
                defaultValue={sp.q}
                className="adm-input"
                placeholder="Search title, notes, content…"
              />
              <select name="kind" defaultValue={sp.kind ?? ""} className="sg-select">
                <option value="">Any type</option>
                {CONTENT_TYPES.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-ghost">
                Search
              </button>
            </form>

            {items.length === 0 ? (
              <div className="sg-zone sg-zone-cool" style={{ marginTop: 14 }}>
                <p className="muted" style={{ margin: 0 }}>
                  Nothing here yet. Add your first item with the form on the left.
                </p>
              </div>
            ) : (
              <div className="lib-list">
                {items.map((it) => (
                  <LibCard key={it.id} item={it} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LibCard({ item }: { item: LibraryItem }) {
  return (
    <div className="lib-card">
      <div className="lib-card-top">
        <span className="lib-kind">{item.kind}</span>
        {item.isOriginal && <span className="lib-orig">My words</span>}
        <div className="lib-card-actions">
          <Link href={`/admin/library?edit=${item.id}`} className="sg-link-btn">
            Edit
          </Link>
          <form action={deleteLibraryItemAction}>
            <input type="hidden" name="id" value={item.id} />
            <button type="submit" className="adm-link-danger">
              Delete
            </button>
          </form>
        </div>
      </div>
      {item.title && <div className="lib-title">{item.title}</div>}
      {item.body && <p className="lib-body">{item.body}</p>}
      <MediaPreview item={item} />
      {item.why && <p className="lib-why">Why: {item.why}</p>}
      <div className="lib-tags">
        {item.topics.map((t) => (
          <span key={t} className="lib-tag">
            {t}
          </span>
        ))}
        {item.scriptures.map((s) => (
          <span key={s} className="lib-tag lib-tag-verse">
            {s}
          </span>
        ))}
        {item.holiday && <span className="lib-tag lib-tag-alt">{item.holiday}</span>}
        {item.emotion && <span className="lib-tag lib-tag-alt">{item.emotion}</span>}
        {item.source && <span className="lib-tag lib-tag-src">{item.source}</span>}
      </div>
    </div>
  );
}

function MediaPreview({ item }: { item: LibraryItem }) {
  if (!item.url) return null;
  const kind = mediaKind(item.url, item.mediaPath);
  if (kind === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.url} alt={item.title || "Saved visual"} className="lib-media-img" />;
  }
  if (kind === "audio") {
    return <audio controls src={item.url} className="lib-media-audio" />;
  }
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="lib-link">
      {item.url}
    </a>
  );
}

function ItemForm({ editing }: { editing: LibraryItem | null }) {
  const d = editing;
  return (
    <form action={saveLibraryItemAction} className="adm-form lib-form">
      <h3 className="adm-group" style={{ borderTop: "none", paddingTop: 0, marginTop: 0 }}>
        {d ? "Edit item" : "Add to the library"}
      </h3>
      {d && <input type="hidden" name="id" value={d.id} />}
      <input type="hidden" name="existingMediaPath" value={d?.mediaPath ?? ""} />

      <label className="adm-field">
        <span className="adm-label">Title</span>
        <input name="title" defaultValue={d?.title} className="adm-input" placeholder="A line that names it" />
      </label>
      <label className="adm-field">
        <span className="adm-label">Type</span>
        <select name="kind" defaultValue={d?.kind ?? "note"} className="sg-select">
          {CONTENT_TYPES.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <label className="adm-field">
        <span className="adm-label">Content / paste / your thoughts</span>
        <textarea name="body" defaultValue={d?.body} className="adm-textarea" rows={5} />
      </label>
      <label className="adm-field">
        <span className="adm-label">Upload a file (image or audio, up to 4MB)</span>
        <input
          name="file"
          type="file"
          accept="image/*,audio/*"
          className="adm-input lib-file"
        />
      </label>
      {d && <MediaPreview item={d} />}
      <label className="adm-field">
        <span className="adm-label">…or paste a link / media URL</span>
        <input name="url" defaultValue={d?.url ?? ""} className="adm-input" placeholder="https://… (image, audio, article)" />
      </label>
      <label className="adm-field">
        <span className="adm-label">Why I saved it</span>
        <textarea name="why" defaultValue={d?.why ?? ""} className="adm-textarea" rows={2} />
      </label>

      <label className="adm-field">
        <span className="adm-label">Topics (pick any)</span>
        <div className="lib-checks">
          {TOPICS.map((t) => (
            <label key={t} className="lib-check">
              <input
                type="checkbox"
                name="topics"
                value={t}
                defaultChecked={d?.topics.includes(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </label>

      <div className="adm-row">
        <label className="adm-field">
          <span className="adm-label">Scriptures</span>
          <input
            name="scriptures"
            defaultValue={d?.scriptures.join(", ")}
            className="adm-input"
            placeholder="John 3:16, Psalm 23"
          />
        </label>
        <label className="adm-field">
          <span className="adm-label">Source</span>
          <input name="source" defaultValue={d?.source ?? ""} className="adm-input" placeholder="Person / site" />
        </label>
      </div>
      <div className="adm-row">
        <label className="adm-field">
          <span className="adm-label">Holiday (optional)</span>
          <input name="holiday" defaultValue={d?.holiday ?? ""} className="adm-input" placeholder="Easter, Christmas…" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Emotion (optional)</span>
          <input name="emotion" defaultValue={d?.emotion ?? ""} className="adm-input" placeholder="hope, comfort…" />
        </label>
      </div>

      <label className="lib-check lib-check-wide">
        <input type="checkbox" name="isOriginal" defaultChecked={d?.isOriginal} />
        These are my own words — okay to use directly in a newsletter.
      </label>

      <div className="adm-actions">
        <button type="submit" className="btn btn-gold">
          {d ? "Save changes" : "Add item"}
        </button>
        {d && (
          <Link href="/admin/library" className="btn btn-ghost">
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
