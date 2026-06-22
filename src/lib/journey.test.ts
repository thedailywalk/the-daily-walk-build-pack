import { describe, it, expect } from "vitest";
import {
  TOTAL_DAYS,
  clampDay,
  newProgress,
  markComplete,
  restart,
  jumpToDay,
  setPace,
  daysCompleted,
  progressPercent,
  type Progress,
} from "./journey";

const TODAY = "2026-06-21";
const at = (currentDay: number, status: Progress["status"] = "active"): Progress => ({
  startDate: TODAY,
  currentDay,
  paceMode: "self",
  status,
});

describe("clampDay", () => {
  it("keeps valid days, clamps out-of-range and bad input", () => {
    expect(clampDay(1)).toBe(1);
    expect(clampDay(200)).toBe(200);
    expect(clampDay(365)).toBe(365);
    expect(clampDay(0)).toBe(1);
    expect(clampDay(-5)).toBe(1);
    expect(clampDay(999)).toBe(365);
    expect(clampDay(50.9)).toBe(50);
    expect(clampDay(NaN)).toBe(1);
  });
});

describe("newProgress", () => {
  it("starts on Day 1, active, self pace", () => {
    const p = newProgress(TODAY);
    expect(p).toEqual({
      startDate: TODAY,
      currentDay: 1,
      paceMode: "self",
      status: "active",
    });
  });
});

describe("markComplete", () => {
  it("advances to the next day", () => {
    expect(markComplete(at(1)).currentDay).toBe(2);
    expect(markComplete(at(40)).currentDay).toBe(41);
  });

  it("completing day 365 finishes the plan", () => {
    const done = markComplete(at(365));
    expect(done.currentDay).toBe(365);
    expect(done.status).toBe("completed");
  });

  it("is a no-op once completed", () => {
    const done = at(365, "completed");
    expect(markComplete(done)).toEqual(done);
  });

  it("does not mutate the input", () => {
    const p = at(10);
    markComplete(p);
    expect(p.currentDay).toBe(10);
  });
});

describe("restart", () => {
  it("returns to Day 1, active, with a fresh start date", () => {
    const r = restart(at(200, "active"), "2026-07-01");
    expect(r.currentDay).toBe(1);
    expect(r.status).toBe("active");
    expect(r.startDate).toBe("2026-07-01");
  });

  it("can restart even a completed plan", () => {
    const r = restart(at(365, "completed"), TODAY);
    expect(r.currentDay).toBe(1);
    expect(r.status).toBe("active");
  });
});

describe("jumpToDay (community pace)", () => {
  it("jumps within range and clamps out-of-range", () => {
    expect(jumpToDay(at(1), 120).currentDay).toBe(120);
    expect(jumpToDay(at(1), 0).currentDay).toBe(1);
    expect(jumpToDay(at(1), 9999).currentDay).toBe(365);
  });
});

describe("setPace", () => {
  it("switches pace mode", () => {
    expect(setPace(at(1), "community").paceMode).toBe("community");
  });
});

describe("daysCompleted & progressPercent", () => {
  it("counts completed days correctly", () => {
    expect(daysCompleted(at(1))).toBe(0);
    expect(daysCompleted(at(2))).toBe(1);
    expect(daysCompleted(at(365))).toBe(364);
    expect(daysCompleted(at(365, "completed"))).toBe(TOTAL_DAYS);
  });

  it("computes whole-number percentage", () => {
    expect(progressPercent(at(1))).toBe(0);
    expect(progressPercent(at(365, "completed"))).toBe(100);
    expect(progressPercent({ ...at(184) })).toBe(50); // 183/365 ≈ 50%
  });
});
