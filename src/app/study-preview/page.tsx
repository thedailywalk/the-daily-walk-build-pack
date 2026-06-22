import type { Metadata } from "next";
import { getStudyDay } from "@/lib/studyGuide";
import StudyGuide from "@/components/StudyGuide";
import StudySideCards from "@/components/StudySideCards";
import StudyTips from "@/components/StudyTips";

export const metadata: Metadata = {
  title: "Study Guide preview",
  robots: { index: false },
};

// Public preview of the Bible-in-a-Year study guide (Day 1). Not linked in nav.
export default function StudyPreviewPage() {
  const entry = getStudyDay(1);
  return (
    <section className="sg-section">
      <div className="sg-layout">
        <aside className="sg-side sg-side-left">
          <StudySideCards
            title="Go deeper"
            words={entry.keyWords}
            reflection={entry.sideReflection}
          />
        </aside>

        <div className="sg-main">
          <p className="sg-preview-note">
            Preview · this is how a day in the guided journey will look for
            members.
          </p>
          <StudyTips />
          <StudyGuide entry={entry} />
        </div>

        <aside className="sg-side sg-side-right">
          <StudySideCards title="For your heart" verses={entry.verses} />
        </aside>
      </div>
    </section>
  );
}
