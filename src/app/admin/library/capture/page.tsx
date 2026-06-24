import { redirect } from "next/navigation";

// The Instagram capture is now folded into the single combined Content Library
// form, so this route just sends you there.
export default function CaptureRedirect() {
  redirect("/admin/library");
}
