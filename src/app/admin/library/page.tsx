import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  listLibrary,
  listSources,
  getSource,
  getLibraryItem,
  topicCounts,
  needsFinalizationCount,
  mediaKind,
  TOPICS,
  CONTENT_TYPES,
  FREQUENCIES,
  type LibraryItem,
  type InspirationSource,
} from "@/lib/library";
import {
  deleteLibraryItemAction,
  saveSourceAction,
  deleteSourceAction,
} from "./actions";
import SmartLibraryForm from "@/components/SmartLibraryForm";

export const metadata: Metadata = { title: "Content Library", robots: { index: false } };

type Tab = "library" | "add" | "voices";

const FREQ_LABEL: Record<string, string> = {
  often: "Use often",
  occasionally: "Occasionally",
  "certain topics": "Certain topics",
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    topic?: string;
    kind?: string;
    edit?: string;
    sedit?: string;
    saved?: string;
    wb?: string;
    wbmode?: string;
    err?: string;
    tab?: string;
    final?: string;
  }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const onlyDrafts = sp.final === "1";

  // Editing an item or applying a filter forces the relevant tab.
  const tab: Tab = sp.edit
    ? "add"
    : sp.tab === "add"
    ? "add"
    : sp.tab === "voices" || sp.sedit
    ? "voices"
    : "library";

  const [items, counts, sources, editing, editingSource, draftCount] = await Promise.all([
    listLibrary({ q: sp.q, topic: sp.topic, kind: sp.kind, needsFinalization: onlyDrafts }),
    topicCounts(),
    listSources(),
    sp.edit ? getLibraryItem(sp.edit) : Promise.resolve(null),
    sp.sedit ? getSource(sp.sedit) : Promise.resolve(null),
    needsFinalizationCount(),
  ]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const coveredTopics = TOPICS.filter((t) => (counts[t] ?? 0) > 0).length;

  const TABS: { key: Tab; href: string; label: string; icon: string }[] = [
    { key: "library", href: "/admin/library", label: "Library", icon: "📚" },
    { key: "add", href: "/admin/library?tab=add", label: editing ? "Edit item" : "Add new", icon: "＋" },
    { key: "voices", href: "/admin/library?tab=voices", label: "Your Voices", icon: "⭐" },
  ];

  return (
    <section className="section lib-warm">
      <div className="adm-wrap">
        {/* Warm hero (mirrors the member Study Guide header) */}
        <header className="lib-hero">
          <div className="lib-hero-kicker">Content Library</div>
          <h1 className="lib-hero-title">Your research &amp; the voices that shape it</h1>
          <p className="lib-hero-sub">
            One home for everything you gather — clips, transcripts, your own rewrites, and the people who
            inspire you. Tag it so the newsletter can pull by theme. Everything you write stays original.
          </p>
          <div className="lib-hero-stats">
            <div className="lib-hero-stat"><b>{total}</b><span>items saved</span></div>
            <div className="lib-hero-stat"><b>{sources.length}</b><span>voices you follow</span></div>
            <div className="lib-hero-stat"><b>{coveredTopics}<i>/{TOPICS.length}</i></b><span>topics covered</span></div>
          </div>
        </header>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code> and run{" "}
            <code>supabase/content-library.sql</code> to start saving.
          </div>
        )}

        {/* Tabs */}
        <nav className="lib2-tabs" aria-label="Content Library">
          {TABS.map((t) => (
            <Link key={t.key} href={t.href} className={`lib2-tab${tab === t.key ? " is-on" : ""}`}>
              <span className="lib2-tab-ico">{t.icon}</span> {t.label}
              {t.key === "library" && <span className="lib2-tab-n">{items.length}</span>}
              {t.key === "voices" && <span className="lib2-tab-n">{sources.length}</span>}
            </Link>
          ))}
        </nav>

        {sp.saved && (
          <div className="adm-saved">
            Saved ✓{" "}
            {sp.wb ? (
              <>
                — and it became workbook inspiration{" "}
                {sp.wbmode === "ai"
                  ? "✦ written by AI"
                  : "(quick draft — set ANTHROPIC_API_KEY for the deeper version)"}.{" "}
                <Link href={`/admin/workbook#batch-${sp.wb}`} className="adm-inline-link">
                  See the suggested workbook edits →
                </Link>
              </>
            ) : null}
          </div>
        )}
        {sp.err === "size" && (
          <div className="adm-notice">
            That file was over 4MB, so it wasn&apos;t uploaded (your text was still saved). Use a smaller
            file, or paste a link instead.
          </div>
        )}

        {/* ───────────────── LIBRARY TAB ───────────────── */}
        {tab === "library" && (
          <>
            {/* Unfinished drafts (e.g. forwarded from the Workbook) */}
            {draftCount > 0 && (
              <div className={`lib2-drafts${onlyDrafts ? " is-on" : ""}`}>
                <span>
                  ✍️ <strong>{draftCount}</strong> draft{draftCount === 1 ? "" : "s"} waiting to be finished
                  {" "}— forwarded research you can pick up where you left off.
                </span>
                {onlyDrafts ? (
                  <Link href="/admin/library" className="wb-btn wb-btn-ghost">Show all</Link>
                ) : (
                  <Link href="/admin/library?final=1" className="wb-btn">Finish drafts →</Link>
                )}
              </div>
            )}

            {/* Condensed coverage strip */}
            <div className="lib2-cov" role="group" aria-label="Filter by topic">
              {TOPICS.map((t) => {
                const n = counts[t] ?? 0;
                const level = n === 0 ? "none" : n < 3 ? "low" : "good";
                const on = sp.topic === t;
                return (
                  <Link
                    key={t}
                    href={on ? "/admin/library" : `/admin/library?topic=${encodeURIComponent(t)}`}
                    className={`lib2-chip lib-${level}${on ? " is-on" : ""}`}
                  >
                    <span className="lib2-dot" /> {t} <span className="lib2-chip-n">{n}</span>
                  </Link>
                );
              })}
            </div>

            {/* Toolbar */}
            <form className="lib2-toolbar" action="/admin/library">
              <input
                name="q"
                defaultValue={sp.q}
                className="adm-input"
                placeholder="Search title, notes, transcript…"
              />
              <select name="kind" defaultValue={sp.kind ?? ""} className="sg-select">
                <option value="">Any type</option>
                {CONTENT_TYPES.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
              <button type="submit" className="wb-btn">Search</button>
              {(sp.topic || sp.q || sp.kind) && (
                <Link href="/admin/library" className="wb-btn wb-btn-ghost">Clear</Link>
              )}
              <Link href="/admin/library?tab=add" className="btn-gold lib2-add-btn">＋ Add new</Link>
            </form>

            <div className="lib2-result-tag">
              {onlyDrafts
                ? "Drafts to finish"
                : sp.topic
                ? `Topic: “${sp.topic}”`
                : sp.q
                ? `Search: “${sp.q}”`
                : "All items"}
              <span className="lib-count"> · {items.length}</span>
            </div>

            {items.length === 0 ? (
              <div className="lib2-empty">
                Nothing here yet.{" "}
                <Link href="/admin/library?tab=add">Add your first item →</Link>
              </div>
            ) : (
              <div className="lib2-grid">
                {items.map((it) => <LibCard key={it.id} item={it} />)}
              </div>
            )}
          </>
        )}

        {/* ───────────────── ADD / EDIT TAB ───────────────── */}
        {tab === "add" && (
          <div className="lib2-form-wrap">
            {editing && (
              <div className="lib2-editing-bar">
                Editing <strong>{editing.title || "this item"}</strong>
                <Link href="/admin/library" className="wb-btn wb-btn-ghost">Cancel</Link>
              </div>
            )}
            <SmartLibraryForm topics={[...TOPICS]} contentTypes={[...CONTENT_TYPES]} editing={editing} />
          </div>
        )}

        {/* ───────────────── YOUR VOICES TAB ───────────────── */}
        {tab === "voices" && (
          <div className="lib2-voices">
            <p className="adm-hintline">
              The pastors, teachers, and creators you draw inspiration from — for themes, tone, and direction
              only. Everything you write stays original; nothing is copied.
            </p>
            <div className="lib2-voices-cols">
              <SourceForm editing={editingSource} />
              <div>
                {sources.length === 0 ? (
                  <div className="lib2-empty">No voices yet. Add the people who inspire you with the form.</div>
                ) : (
                  <div className="lib2-grid">
                    {sources.map((s) => <SourceCard key={s.id} source={s} />)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- cards --------------------------------- */

function LibCard({ item }: { item: LibraryItem }) {
  return (
    <div className="lib-card">
      <div className="lib-card-top">
        <span className="lib-kind">{item.kind}</span>
        {item.needsFinalization && <span className="lib-draft">✍️ Draft · finish</span>}
        {item.isVoice && <span className="lib-orig">⭐ Voice</span>}
        {item.isOriginal && <span className="lib-orig">My words</span>}
        <div className="lib-card-actions">
          <Link href={`/admin/library?tab=add&edit=${item.id}`} className="sg-link-btn">Edit</Link>
          <form action={deleteLibraryItemAction}>
            <input type="hidden" name="id" value={item.id} />
            <button type="submit" className="adm-link-danger">Delete</button>
          </form>
        </div>
      </div>
      {item.title && <div className="lib-title">{item.title}</div>}
      {item.body && <p className="lib-body">{item.body}</p>}
      <MediaPreview item={item} />
      {item.why && <p className="lib-why">Why: {item.why}</p>}
      <div className="lib-tags">
        {item.topics.map((t) => <span key={t} className="lib-tag">{t}</span>)}
        {item.scriptures.map((s) => <span key={s} className="lib-tag lib-tag-verse">{s}</span>)}
        {item.holiday && <span className="lib-tag lib-tag-alt">{item.holiday}</span>}
        {item.emotion && <span className="lib-tag lib-tag-alt">{item.emotion}</span>}
        {item.source && <span className="lib-tag lib-tag-src">{item.source}</span>}
      </div>
      {item.destinations?.length ? (
        <div className="lib-dest-tags">
          {item.destinations.includes("newsletter") && <span className="lib-dest-tag">📰 Newsletter</span>}
          {item.destinations.includes("workbook") && <span className="lib-dest-tag">📖 Workbook</span>}
          {item.destinations.includes("wellness") && <span className="lib-dest-tag">🕊 Wellness</span>}
        </div>
      ) : null}
      {item.wellnessDraft && (
        <details className="lib-sci">
          <summary>🕊 “Science Behind It” draft from this (for the Wellness Guide)</summary>
          <pre>{item.wellnessDraft}</pre>
        </details>
      )}
      {item.wbBatchId && (
        <Link href={`/admin/workbook#batch-${item.wbBatchId}`} className="lib-wb-btn">
          📖 See suggested workbook edits from this →
        </Link>
      )}
    </div>
  );
}

function SourceCard({ source: s }: { source: InspirationSource }) {
  return (
    <div className="lib-card">
      <div className="lib-card-top">
        <span className={`src-freq src-${s.frequency.replace(/\s/g, "-")}`}>
          {FREQ_LABEL[s.frequency] ?? s.frequency}
        </span>
        <div className="lib-card-actions">
          <Link href={`/admin/library?tab=voices&sedit=${s.id}`} className="sg-link-btn">Edit</Link>
          <form action={deleteSourceAction}>
            <input type="hidden" name="id" value={s.id} />
            <button type="submit" className="adm-link-danger">Remove</button>
          </form>
        </div>
      </div>
      <div className="lib-title">
        {s.name}
        {s.handle && <span className="src-handle"> · {s.handle}</span>}
      </div>
      {s.kind && <div className="src-kind">{s.kind}</div>}
      {s.notes && <p className="lib-why">{s.notes}</p>}
      <div className="lib-tags">{s.topics.map((t) => <span key={t} className="lib-tag">{t}</span>)}</div>
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
  if (kind === "audio") return <audio controls src={item.url} className="lib-media-audio" />;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="lib-link">{item.url}</a>
  );
}

function SourceForm({ editing }: { editing: InspirationSource | null }) {
  const d = editing;
  return (
    <form action={saveSourceAction} className="adm-form lib-form">
      <h3 className="adm-group" style={{ borderTop: "none", paddingTop: 0, marginTop: 0 }}>
        {d ? "Edit voice" : "Add a voice"}
      </h3>
      {d && <input type="hidden" name="id" value={d.id} />}
      <label className="adm-field">
        <span className="adm-label">Name</span>
        <input name="name" defaultValue={d?.name} className="adm-input" placeholder="Johnny Chang" required />
      </label>
      <div className="adm-row">
        <label className="adm-field">
          <span className="adm-label">Handle / website</span>
          <input name="handle" defaultValue={d?.handle ?? ""} className="adm-input" placeholder="@handle or site.com" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Type</span>
          <input name="kind" defaultValue={d?.kind ?? ""} className="adm-input" placeholder="Pastor, speaker, writer…" />
        </label>
      </div>
      <label className="adm-field">
        <span className="adm-label">How often to use</span>
        <select name="frequency" defaultValue={d?.frequency ?? "occasionally"} className="sg-select">
          {FREQUENCIES.map((f) => <option key={f} value={f}>{FREQ_LABEL[f]}</option>)}
        </select>
      </label>
      <label className="adm-field">
        <span className="adm-label">Topics they speak on</span>
        <div className="lib-checks">
          {TOPICS.map((t) => (
            <label key={t} className="lib-check">
              <input type="checkbox" name="topics" value={t} defaultChecked={d?.topics.includes(t)} />
              {t}
            </label>
          ))}
        </div>
      </label>
      <label className="adm-field">
        <span className="adm-label">Notes — what I like about their tone/message</span>
        <textarea name="notes" defaultValue={d?.notes ?? ""} className="adm-textarea" rows={3} />
      </label>
      <div className="adm-actions">
        <button type="submit" className="btn btn-gold">{d ? "Save changes" : "Add voice"}</button>
        {d && <Link href="/admin/library?tab=voices" className="btn btn-ghost">Cancel</Link>}
      </div>
    </form>
  );
}
