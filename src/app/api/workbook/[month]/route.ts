import { createElement, type ReactElement } from "react";
import { NextResponse } from "next/server";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getWorkbookMonth, parseMonth } from "@/lib/workbook";
import { WorkbookDocument } from "@/components/WorkbookPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/workbook/[month] — streams a printable PDF workbook for that month
 * of the journey. Gated to signed-in Premium/Patron members.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ month: string }> }
) {
  if (!supabaseConfigured) {
    return NextResponse.redirect(new URL("/", _req.url));
  }

  const user = await getUser();
  if (!user?.email) {
    return NextResponse.redirect(new URL("/login", _req.url));
  }

  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") {
    return NextResponse.redirect(new URL("/pricing", _req.url));
  }

  const { month: raw } = await params;
  const month = parseMonth(raw);
  if (!month) {
    return new NextResponse("Workbook not found.", { status: 404 });
  }

  const data = getWorkbookMonth(month);
  if (!data) {
    return new NextResponse("Workbook not found.", { status: 404 });
  }

  const element = createElement(WorkbookDocument, {
    meta: data.meta,
    days: data.days,
  }) as unknown as ReactElement<DocumentProps>;
  const buffer = await renderToBuffer(element);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="the-daily-walk-workbook-month-${month}.pdf"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
