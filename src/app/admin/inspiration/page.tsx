import { redirect } from "next/navigation";

// Inspiration Sources are now folded into the Content Library as "Your Voices".
export default function InspirationRedirect() {
  redirect("/admin/library?tab=voices");
}
