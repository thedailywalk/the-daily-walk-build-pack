import type { Metadata } from "next";
import { getStudyDay } from "@/lib/studyGuide";
import StudyGuide from "@/components/StudyGuide";

export const metadata: Metadata = {
  title: "Study Guide preview",
  robots: { index: false },
};

// Public preview of the Bible-in-a-Year study guide (Day 1). Not linked in nav.
export default function StudyPreviewPage() {
  const entry = getStudyDay(1);
  return (
    <section className="sg-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <p className="sg-preview-note">
          Preview · this is how a day in the guided journey will look for members.
        </p>
        <StudyGuide entry={entry} />
      </div>
    </section>
  );
}
