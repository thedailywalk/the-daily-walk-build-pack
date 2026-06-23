import "server-only";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { getStudyDay } from "@/lib/studyGuide";
import { dayIndexForDate } from "@/lib/devotionals";

/** The library's organizing categories / topic tags. */
export const TOPICS = [
  "Holidays", "Faith", "Prayer", "Healing", "Anger", "Love", "Forgiveness",
  "Discipline", "Identity", "Spiritual Warfare", "Wisdom", "Relationships",
  "Anxiety", "Grief", "Purpose", "Obedience", "Confidence", "Bible Study",
  "Testimonies", "Visual Inspiration", "Newsletter Ideas",
] as const;

/** Content types you can save. (Media are link-based for now; file upload is a follow-up.) */
export const CONTENT_TYPES = [
  "note", "quote", "personal thought", "sermon notes", "bible study notes",
  "article", "link", "topic idea", "newsletter inspiration",
  "visual", "audio", "photo", "artwork", "other",
] as const;

export const FREQUENCIES = ["often", "occasionally", "certain topics"] as const;

export type LibraryItem = {
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
  createdAt?: string;
};

export type InspirationSource = {
  id: string;
  name: string;
  handle: string | null;
  kind: string | null;
  topics: string[];
  notes: string | null;
  frequency: string;
  createdAt?: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function toItem(r: any): LibraryItem {
  return {
    id: r.id,
    title: r.title ?? "",
    kind: r.kind ?? "note",
    body: r.body ?? "",
    url: r.url ?? null,
    source: r.source ?? null,
    why: r.why ?? null,
    topics: r.topics ?? [],
    scriptures: r.scriptures ?? [],
    holiday: r.holiday ?? null,
    emotion: r.emotion ?? null,
    isOriginal: !!r.is_original,
    createdAt: r.created_at,
  };
}
function toSource(r: any): InspirationSource {
  return {
    id: r.id,
    name: r.name ?? "",
    handle: r.handle ?? null,
    kind: r.kind ?? null,
    topics: r.topics ?? [],
    notes: r.notes ?? null,
    frequency: r.frequency ?? "occasionally",
    createdAt: r.created_at,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ----------------------------- library CRUD ----------------------------- */
export type LibraryFilter = {
  q?: string;
  topic?: string;
  kind?: string;
  source?: string;
  topics?: string[]; // overlap match (used by the references generator)
};

export async function listLibrary(filter: LibraryFilter = {}): Promise<LibraryItem[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    let query = supabase
      .from("library_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (filter.topic) query = query.contains("topics", [filter.topic]);
    if (filter.topics?.length) query = query.overlaps("topics", filter.topics);
    if (filter.kind) query = query.eq("kind", filter.kind);
    if (filter.source) query = query.ilike("source", `%${filter.source}%`);
    if (filter.q) {
      const q = filter.q.replace(/[%,]/g, " ");
      query = query.or(
        `title.ilike.%${q}%,body.ilike.%${q}%,why.ilike.%${q}%,source.ilike.%${q}%`
      );
    }
    const { data } = await query.limit(500);
    return (data ?? []).map(toItem);
  } catch {
    return [];
  }
}

export async function getLibraryItem(id: string): Promise<LibraryItem | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("library_items").select("*").eq("id", id).maybeSingle();
    return data ? toItem(data) : null;
  } catch {
    return null;
  }
}

export async function upsertLibraryItem(item: Partial<LibraryItem> & { id?: string }) {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    const row = {
      ...(item.id ? { id: item.id } : {}),
      title: item.title ?? "",
      kind: item.kind ?? "note",
      body: item.body ?? "",
      url: item.url ?? null,
      source: item.source ?? null,
      why: item.why ?? null,
      topics: item.topics ?? [],
      scriptures: item.scriptures ?? [],
      holiday: item.holiday ?? null,
      emotion: item.emotion ?? null,
      is_original: !!item.isOriginal,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("library_items").upsert(row);
  } catch {
    /* ignore */
  }
}

export async function deleteLibraryItem(id: string) {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("library_items").delete().eq("id", id);
  } catch {
    /* ignore */
  }
}

/** How many items each topic has — for the coverage dashboard. */
export async function topicCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const t of TOPICS) counts[t] = 0;
  if (!adminDbConfigured) return counts;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("library_items").select("topics");
    for (const r of data ?? []) {
      for (const t of (r.topics as string[]) ?? []) {
        if (t in counts) counts[t] += 1;
      }
    }
  } catch {
    /* ignore */
  }
  return counts;
}

/* ------------------------- inspiration sources -------------------------- */
export async function listSources(): Promise<InspirationSource[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("inspiration_sources")
      .select("*")
      .order("name", { ascending: true });
    return (data ?? []).map(toSource);
  } catch {
    return [];
  }
}

export async function getSource(id: string): Promise<InspirationSource | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("inspiration_sources").select("*").eq("id", id).maybeSingle();
    return data ? toSource(data) : null;
  } catch {
    return null;
  }
}

export async function upsertSource(s: Partial<InspirationSource> & { id?: string }) {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("inspiration_sources").upsert({
      ...(s.id ? { id: s.id } : {}),
      name: s.name ?? "",
      handle: s.handle ?? null,
      kind: s.kind ?? null,
      topics: s.topics ?? [],
      notes: s.notes ?? null,
      frequency: s.frequency ?? "occasionally",
      updated_at: new Date().toISOString(),
    });
  } catch {
    /* ignore */
  }
}

export async function deleteSource(id: string) {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("inspiration_sources").delete().eq("id", id);
  } catch {
    /* ignore */
  }
}

/* --------------------- "Behind the Devotional" --------------------------- */
const TOPIC_KEYWORDS: [string, RegExp][] = [
  ["Prayer", /\bpray|prayer\b/i],
  ["Forgiveness", /\bforgiv|mercy|pardon\b/i],
  ["Healing", /\bheal|wound|restore|broken\b/i],
  ["Anger", /\banger|angry|wrath|rage\b/i],
  ["Love", /\blove|loved|loving|beloved\b/i],
  ["Anxiety", /\banxi|worry|worried|afraid|fear\b/i],
  ["Grief", /\bgrief|griev|mourn|loss|weep|sorrow|tears\b/i],
  ["Identity", /\bidentity|who you are|image of god|fearfully|belong\b/i],
  ["Spiritual Warfare", /\barmor|enemy|devil|satan|temptation|spiritual battle\b/i],
  ["Wisdom", /\bwisdom|wise|discern|foolish\b/i],
  ["Relationships", /\bfriend|marriage|neighbor|relationship|family\b/i],
  ["Purpose", /\bpurpose|calling|called|mission\b/i],
  ["Obedience", /\bobey|obedience|follow him\b/i],
  ["Confidence", /\bconfidence|courage|bold|strength|strong\b/i],
  ["Discipline", /\bdiscipline|self-control|habit\b/i],
  ["Faith", /\bfaith|believe|trust\b/i],
];

function deriveTopics(text: string): string[] {
  const t = text.toLowerCase();
  const found: string[] = [];
  for (const [topic, re] of TOPIC_KEYWORDS) {
    if (re.test(t) && !found.includes(topic)) found.push(topic);
  }
  return found.length ? found.slice(0, 4) : ["Faith"];
}

function verseRefOf(v: string): string {
  const i = v.lastIndexOf(" — ");
  return i === -1 ? "" : v.slice(i + 3).trim();
}

export type DevotionalReferences = {
  day: number;
  reading: string;
  topics: string[];
  scriptures: string[];
  items: LibraryItem[];
  sources: InspirationSource[];
  thinTopics: string[];
  explanation: string;
};

/** Admin-only: what the generator drew on for a given date. Never sent to readers. */
export async function getDevotionalReferences(date: string): Promise<DevotionalReferences> {
  const s = getStudyDay(dayIndexForDate(date));
  const text = [
    s.context, s.plainEnglish, s.aboutGod, s.aboutPeople, s.realLife,
    s.reflection, s.prayer, s.sideReflection,
  ].join(" ");
  const topics = deriveTopics(text);
  const scriptures = [verseRefOf(s.verse), ...s.verses.map((v) => v.ref)].filter(Boolean);

  const [items, sources, counts] = await Promise.all([
    listLibrary({ topics }),
    listSources(),
    topicCounts(),
  ]);

  const considered = sources.filter(
    (src) => src.frequency === "often" || src.topics.some((t) => topics.includes(t))
  );
  const thinTopics = topics.filter((t) => (counts[t] ?? 0) === 0);

  const explanation =
    `Seeded from your study library (Day ${dayIndexForDate(date)} · ${s.reading}). ` +
    `Detected themes: ${topics.join(", ")}. ` +
    (items.length
      ? `Pulled ${items.length} saved item${items.length === 1 ? "" : "s"} on those themes`
      : `No saved library items matched these themes yet`) +
    `, and considered ${considered.length} inspiration source${considered.length === 1 ? "" : "s"}.`;

  return {
    day: dayIndexForDate(date),
    reading: s.reading,
    topics,
    scriptures,
    items,
    sources: considered,
    thinTopics,
    explanation,
  };
}
