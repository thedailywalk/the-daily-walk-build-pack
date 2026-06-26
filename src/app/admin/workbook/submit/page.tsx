import { redirect } from "next/navigation";

/**
 * The standalone "Add inspiration" page is retired — the Content Library is now
 * the single place to add inspiration, and saving there automatically feeds the
 * Workbook Evolution engine. Any old links land in the Library's Add tab.
 */
export default function RetiredWorkbookSubmit() {
  redirect("/admin/library?tab=add");
}
