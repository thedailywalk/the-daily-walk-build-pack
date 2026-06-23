import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import AdminNav from "@/components/AdminNav";
import { TOPICS } from "@/lib/library";
import InstagramCapture from "@/components/InstagramCapture";

export const metadata: Metadata = {
  title: "Capture from Instagram",
  robots: { index: false },
};

export default async function CapturePage() {
  await requireAdmin();
  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Capture from Instagram
            </div>
            <p className="adm-sub">
              Paste a reel, sermon clip, quote, or post. Drop in the caption and
              transcript, and it&apos;ll suggest a category, tags, and any
              scriptures — accept or edit, then save it to your library.
            </p>
          </div>
          <Link href="/admin/library" className="btn btn-ghost">
            ← Content Library
          </Link>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Add <code>SUPABASE_SERVICE_ROLE_KEY</code> and run{" "}
            <code>supabase/content-library.sql</code> to save captures.
          </div>
        )}

        <AdminNav active="library" />

        <div className="adm-notice" style={{ background: "#eef2fb", borderColor: "#d9e2f2", color: "#3a4a63" }}>
          🔒 This is for backend research, organization, and inspiration only. It
          never copies or republishes the post into a newsletter. Anything it
          inspires is written in your own original wording.
        </div>

        <InstagramCapture topics={[...TOPICS]} />
      </div>
    </section>
  );
}
