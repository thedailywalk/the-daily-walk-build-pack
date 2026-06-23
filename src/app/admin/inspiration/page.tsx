import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import AdminNav from "@/components/AdminNav";
import {
  listSources,
  getSource,
  TOPICS,
  FREQUENCIES,
  type InspirationSource,
} from "@/lib/library";
import { saveSourceAction, deleteSourceAction } from "./actions";

export const metadata: Metadata = {
  title: "Inspiration Sources",
  robots: { index: false },
};

const FREQ_LABEL: Record<string, string> = {
  often: "Use often",
  occasionally: "Occasionally",
  "certain topics": "Certain topics",
};

export default async function InspirationPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; saved?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const [sources, editing] = await Promise.all([
    listSources(),
    sp.edit ? getSource(sp.edit) : Promise.resolve(null),
  ]);

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Inspiration Sources
            </div>
            <p className="adm-sub">
              The voices the newsletter draws inspiration from — for themes, tone,
              and direction only. Everything written stays original and in your
              voice; nothing is copied.
            </p>
          </div>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Add <code>SUPABASE_SERVICE_ROLE_KEY</code> and run{" "}
            <code>supabase/content-library.sql</code> to manage sources.
          </div>
        )}

        <AdminNav active="inspiration" />
        {sp.saved && <div className="adm-saved">Saved ✓</div>}

        <div className="adm-cols lib-cols">
          <SourceForm editing={editing} />

          <div>
            <div className="adm-bar">
              <h2 className="adm-h2">
                Your voices<span className="lib-count"> · {sources.length}</span>
              </h2>
            </div>
            {sources.length === 0 ? (
              <div className="sg-zone sg-zone-cool">
                <p className="muted" style={{ margin: 0 }}>
                  No sources yet. Add the pastors, teachers, and creators who
                  inspire you using the form.
                </p>
              </div>
            ) : (
              <div className="lib-list">
                {sources.map((s) => (
                  <div key={s.id} className="lib-card">
                    <div className="lib-card-top">
                      <span className={`src-freq src-${s.frequency.replace(/\s/g, "-")}`}>
                        {FREQ_LABEL[s.frequency] ?? s.frequency}
                      </span>
                      <div className="lib-card-actions">
                        <Link href={`/admin/inspiration?edit=${s.id}`} className="sg-link-btn">
                          Edit
                        </Link>
                        <form action={deleteSourceAction}>
                          <input type="hidden" name="id" value={s.id} />
                          <button type="submit" className="adm-link-danger">
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="lib-title">
                      {s.name}
                      {s.handle && <span className="src-handle"> · {s.handle}</span>}
                    </div>
                    {s.kind && <div className="src-kind">{s.kind}</div>}
                    {s.notes && <p className="lib-why">{s.notes}</p>}
                    <div className="lib-tags">
                      {s.topics.map((t) => (
                        <span key={t} className="lib-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SourceForm({ editing }: { editing: InspirationSource | null }) {
  const d = editing;
  return (
    <form action={saveSourceAction} className="adm-form lib-form">
      <h3 className="adm-group" style={{ borderTop: "none", paddingTop: 0, marginTop: 0 }}>
        {d ? "Edit source" : "Add a source"}
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
          <span className="adm-label">Type of inspiration</span>
          <input name="kind" defaultValue={d?.kind ?? ""} className="adm-input" placeholder="Pastor, speaker, writer…" />
        </label>
      </div>
      <label className="adm-field">
        <span className="adm-label">How often to use</span>
        <select name="frequency" defaultValue={d?.frequency ?? "occasionally"} className="sg-select">
          {FREQUENCIES.map((f) => (
            <option key={f} value={f}>
              {FREQ_LABEL[f]}
            </option>
          ))}
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
        <button type="submit" className="btn btn-gold">
          {d ? "Save changes" : "Add source"}
        </button>
        {d && (
          <Link href="/admin/inspiration" className="btn btn-ghost">
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
