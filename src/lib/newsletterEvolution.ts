import "server-only";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import {
  adminGetByDate,
  adminUpsert,
  fullDevotionalFor,
  type DevotionalData,
} from "@/lib/devotionals";
import {
  premiumGetByDate,
  premiumUpsert,
  fullPremiumFor,
  type PremiumData,
} from "@/lib/premium";

/**
 * The Newsletter Evolution layer — the same living-content workflow as the
 * workbook, but for the FREE daily devotional and the PREMIUM edition. Dropped
 * inspiration proposes edits to the upcoming week's issues; the owner reviews
 * (Approve / Dismiss). Approving writes the revision into that issue's stored
 * content. Scripture/verses are never targeted — delivery only, never doctrine.
 */

export type Publication = "free" | "premium";

/** Editable prose fields we let suggestions strengthen, per publication. */
export const FREE_FIELDS = [
  "readingIntro",
  "readingAfter",
  "makeItRealBody",
  "question",
  "prayer",
  "communityText",
  "closingLine",
] as const;
export const PREMIUM_FIELDS = [
  "editorNote",
  "devIntro",
  "devBody",
  "devReflection",
  "devApply",
  "devPrayer",
  "studyBody",
  "closingLine",
] as const;

export const FIELD_LABEL: Record<string, string> = {
  // free
  readingIntro: "Reading intro",
  readingAfter: "After the reading",
  makeItRealBody: "Make it real",
  question: "Reflection question",
  prayer: "Prayer",
  communityText: "Community note",
  closingLine: "Closing line",
  // premium
  editorNote: "Founder's note",
  devIntro: "Devotional intro",
  devBody: "Deeper reflection",
  devReflection: "Reflection question",
  devApply: "Today's walk",
  devPrayer: "Prayer",
  studyBody: "Weekend study",
};

export const PUBLICATION_LABEL: Record<Publication, string> = {
  free: "Free Daily",
  premium: "Premium",
};

export function fieldsFor(pub: Publication): readonly string[] {
  return pub === "premium" ? PREMIUM_FIELDS : FREE_FIELDS;
}

export type SuggestionStatus = "pending" | "applied" | "rejected";

export type NewsletterSuggestion = {
  id: string;
  publication: Publication;
  issueDate: string;
  batchId: string;
  sourceLabel: string;
  sourceType: string;
  targetField: string;
  currentText: string;
  proposedText: string;
  whyFits: string;
  impact: string;
  themes: string[];
  tone: string;
  status: SuggestionStatus;
  createdAt?: string;
  decidedAt?: string;
};

export type NewNewsletterSuggestion = Omit<
  NewsletterSuggestion,
  "id" | "status" | "createdAt" | "decidedAt"
>;

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowTo(r: any): NewsletterSuggestion {
  const pub = r.publication === "premium" ? "premium" : "free";
  const st = String(r.status ?? "pending");
  return {
    id: String(r.id),
    publication: pub,
    issueDate: String(r.issue_date),
    batchId: String(r.batch_id ?? ""),
    sourceLabel: String(r.source_label ?? ""),
    sourceType: String(r.source_type ?? "library"),
    targetField: String(r.target_field ?? ""),
    currentText: String(r.current_text ?? ""),
    proposedText: String(r.proposed_text ?? ""),
    whyFits: String(r.why_fits ?? ""),
    impact: String(r.impact ?? ""),
    themes: (r.themes as string[]) ?? [],
    tone: String(r.tone ?? ""),
    status: (["pending", "applied", "rejected"].includes(st) ? st : "pending") as SuggestionStatus,
    createdAt: r.created_at ? String(r.created_at) : undefined,
    decidedAt: r.decided_at ? String(r.decided_at) : undefined,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function listNewsletterSuggestions(opts?: {
  status?: SuggestionStatus;
  publication?: Publication;
  limit?: number;
}): Promise<NewsletterSuggestion[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    let q = supabase
      .from("newsletter_suggestions")
      .select("*")
      .order("issue_date", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(opts?.limit ?? 200);
    if (opts?.status) q = q.eq("status", opts.status);
    if (opts?.publication) q = q.eq("publication", opts.publication);
    const { data } = await q;
    return (data ?? []).map(rowTo);
  } catch {
    return [];
  }
}

/** Pending suggestions for one specific issue (publication + date). */
export async function pendingForIssue(
  publication: Publication,
  date: string
): Promise<NewsletterSuggestion[]> {
  const all = await listNewsletterSuggestions({ status: "pending", publication, limit: 100 });
  return all.filter((s) => s.issueDate === date);
}

export async function getNewsletterSuggestion(id: string): Promise<NewsletterSuggestion | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("newsletter_suggestions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return data ? rowTo(data) : null;
  } catch {
    return null;
  }
}

export async function insertNewsletterSuggestions(list: NewNewsletterSuggestion[]): Promise<number> {
  if (!adminDbConfigured || list.length === 0) return 0;
  try {
    const supabase = createServiceClient();
    const rows = list.map((s) => ({
      publication: s.publication,
      issue_date: s.issueDate,
      batch_id: s.batchId,
      source_label: s.sourceLabel,
      source_type: s.sourceType,
      target_field: s.targetField,
      current_text: s.currentText,
      proposed_text: s.proposedText,
      why_fits: s.whyFits,
      impact: s.impact,
      themes: s.themes,
      tone: s.tone,
      status: "pending",
    }));
    const { data } = await supabase.from("newsletter_suggestions").insert(rows).select("id");
    return (data ?? []).length;
  } catch {
    return 0;
  }
}

export async function deletePendingNewsletterSuggestions(): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("newsletter_suggestions").delete().eq("status", "pending");
  } catch {
    /* ignore */
  }
}

/** "publication:date:field" spots already rejected — never re-surface these. */
export async function rejectedNewsletterSpots(): Promise<Set<string>> {
  const set = new Set<string>();
  const rejected = await listNewsletterSuggestions({ status: "rejected", limit: 500 });
  for (const s of rejected) set.add(`${s.publication}:${s.issueDate}:${s.targetField}`);
  return set;
}

/** Approve: write the revision into that issue's stored content, mark applied. */
export async function applyNewsletterSuggestion(id: string): Promise<boolean> {
  const s = await getNewsletterSuggestion(id);
  if (!s) return false;
  try {
    if (s.publication === "premium") {
      const existing = await premiumGetByDate(s.issueDate);
      const base: PremiumData = existing?.data ?? fullPremiumFor(s.issueDate);
      const next: PremiumData = { ...base, [s.targetField]: s.proposedText };
      await premiumUpsert(
        s.issueDate,
        existing?.status ?? "draft",
        existing?.title || next.devHeading || "",
        next
      );
    } else {
      const existing = await adminGetByDate(s.issueDate);
      const base: DevotionalData = existing?.data ?? fullDevotionalFor(s.issueDate);
      const next: DevotionalData = { ...base, [s.targetField]: s.proposedText };
      await adminUpsert(
        s.issueDate,
        existing?.status ?? "draft",
        existing?.title || next.readingHeading || "",
        next
      );
    }
  } catch {
    return false;
  }
  if (!adminDbConfigured) return false;
  try {
    const supabase = createServiceClient();
    await supabase
      .from("newsletter_suggestions")
      .update({ status: "applied", decided_at: new Date().toISOString() })
      .eq("id", id);
    return true;
  } catch {
    return false;
  }
}

export async function rejectNewsletterSuggestion(id: string): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase
      .from("newsletter_suggestions")
      .update({ status: "rejected", decided_at: new Date().toISOString() })
      .eq("id", id);
  } catch {
    /* ignore */
  }
}

/** Clear any still-pending suggestions for one issue (used when it's locked). */
export async function clearPendingForIssue(publication: Publication, date: string): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase
      .from("newsletter_suggestions")
      .delete()
      .eq("publication", publication)
      .eq("issue_date", date)
      .eq("status", "pending");
  } catch {
    /* ignore */
  }
}

/**
 * "Lock" an issue: mark it Ready (finalized) so the cumulative engine stops
 * proposing edits to it, and clear anything still pending for it. The newsletter
 * equivalent of locking a workbook day.
 */
export async function lockNewsletterIssue(publication: Publication, date: string): Promise<void> {
  if (publication === "premium") {
    const ex = await premiumGetByDate(date);
    const data: PremiumData = ex?.data ?? fullPremiumFor(date);
    await premiumUpsert(date, "ready", ex?.title || data.devHeading || "", data);
  } else {
    const ex = await adminGetByDate(date);
    const data: DevotionalData = ex?.data ?? fullDevotionalFor(date);
    await adminUpsert(date, "ready", ex?.title || data.readingHeading || "", data);
  }
  await clearPendingForIssue(publication, date);
}

/** Pending suggestions grouped by issue (publication + date) for the review UI. */
export type NewsletterBatch = {
  key: string;
  publication: Publication;
  issueDate: string;
  suggestions: NewsletterSuggestion[];
};

export async function pendingNewsletterBatches(): Promise<NewsletterBatch[]> {
  const pending = await listNewsletterSuggestions({ status: "pending", limit: 300 });
  const byIssue = new Map<string, NewsletterBatch>();
  for (const s of pending) {
    const key = `${s.publication}:${s.issueDate}`;
    let b = byIssue.get(key);
    if (!b) {
      b = { key, publication: s.publication, issueDate: s.issueDate, suggestions: [] };
      byIssue.set(key, b);
    }
    b.suggestions.push(s);
  }
  return [...byIssue.values()];
}

export async function appliedNewsletterSuggestions(limit = 40): Promise<NewsletterSuggestion[]> {
  return listNewsletterSuggestions({ status: "applied", limit });
}
