import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  listWorkbookMonths,
  getWorkbookMonth,
  parseMonth,
  monthRange,
} from "@/lib/workbook";
import { WorkbookDocument } from "@/components/WorkbookPdf";

describe("workbook months", () => {
  it("covers all 365 days across 12 months with no gaps", () => {
    const months = listWorkbookMonths();
    expect(months).toHaveLength(12);
    expect(months[0].startDay).toBe(1);
    expect(months[11].endDay).toBe(365);
    for (let i = 1; i < months.length; i++) {
      expect(months[i].startDay).toBe(months[i - 1].endDay + 1);
    }
  });

  it("validates the month param", () => {
    expect(parseMonth(1)).toBe(1);
    expect(parseMonth(12)).toBe(12);
    expect(parseMonth(0)).toBeNull();
    expect(parseMonth(13)).toBeNull();
    expect(parseMonth("abc")).toBeNull();
  });

  it("loads a month's days from the study guide", () => {
    const data = getWorkbookMonth(1);
    expect(data).not.toBeNull();
    expect(data!.days).toHaveLength(monthRange(1).endDay - monthRange(1).startDay + 1);
    expect(data!.days[0].day).toBe(1);
    expect(data!.days[0].reading).toMatch(/John/);
  });

  it("renders a valid PDF buffer", async () => {
    const data = getWorkbookMonth(1)!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buf = await renderToBuffer(createElement(WorkbookDocument, data as any) as any);
    expect(buf.subarray(0, 5).toString("latin1")).toBe("%PDF-");
    expect(buf.length).toBeGreaterThan(5000);
  }, 30000);
});
