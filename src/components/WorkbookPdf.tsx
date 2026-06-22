import "server-only";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { WorkbookDay, WorkbookMonth } from "@/lib/workbook";

/* Brand palette (print-friendly) */
const NAVY = "#1F3A5F";
const GOLD = "#B8902E";
const INK = "#22262B";
const GREY = "#5A6270";
const CREAM = "#FAF6EE";
const LINE = "#E4DEd0";

const s = StyleSheet.create({
  page: {
    paddingTop: 54,
    paddingBottom: 56,
    paddingHorizontal: 52,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: INK,
    backgroundColor: "#ffffff",
  },
  /* Cover */
  cover: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CREAM,
    paddingHorizontal: 60,
  },
  coverKicker: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    letterSpacing: 3,
    color: GOLD,
    marginBottom: 18,
  },
  coverTitle: {
    fontFamily: "Times-Roman",
    fontSize: 40,
    color: NAVY,
    textAlign: "center",
    marginBottom: 6,
  },
  coverSub: {
    fontFamily: "Times-Italic",
    fontSize: 15,
    color: GREY,
    marginBottom: 28,
  },
  coverRule: {
    width: 70,
    height: 3,
    backgroundColor: GOLD,
    marginBottom: 28,
  },
  coverMonth: {
    fontFamily: "Times-Roman",
    fontSize: 26,
    color: NAVY,
    marginBottom: 4,
  },
  coverRange: {
    fontFamily: "Helvetica",
    fontSize: 12,
    color: GREY,
    marginBottom: 40,
  },
  coverTagline: {
    fontFamily: "Times-Italic",
    fontSize: 12,
    color: GOLD,
  },
  /* Section header on content pages */
  pageHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    paddingBottom: 8,
    marginBottom: 16,
  },
  pageHeadName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: GOLD,
  },
  pageHeadMonth: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: GREY,
  },
  /* Day block */
  day: {
    marginBottom: 22,
  },
  dayHead: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  dayNum: {
    fontFamily: "Times-Roman",
    fontSize: 17,
    color: NAVY,
  },
  dayReading: {
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: GREY,
    marginLeft: 8,
  },
  keyVerse: {
    fontFamily: "Times-Italic",
    fontSize: 11.5,
    color: NAVY,
    lineHeight: 1.4,
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: GOLD,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 1.2,
    color: GOLD,
    marginBottom: 4,
    marginTop: 4,
  },
  kw: {
    marginBottom: 3,
    lineHeight: 1.4,
  },
  kwWord: {
    fontFamily: "Helvetica-Bold",
    color: NAVY,
  },
  kwMeaning: {
    color: INK,
  },
  vref: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: GOLD,
  },
  vtext: {
    fontFamily: "Times-Italic",
    fontSize: 10,
    color: INK,
    lineHeight: 1.4,
    marginBottom: 6,
  },
  prompt: {
    color: INK,
    lineHeight: 1.45,
    marginBottom: 6,
  },
  writeLine: {
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    height: 16,
  },
  footer: {
    position: "absolute",
    bottom: 26,
    left: 52,
    right: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: GREY,
    fontFamily: "Helvetica",
  },
});

function WriteLines({ n }: { n: number }) {
  return (
    <View style={{ marginTop: 4, marginBottom: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <View key={i} style={s.writeLine} />
      ))}
    </View>
  );
}

function DayBlock({ d }: { d: WorkbookDay }) {
  return (
    <View style={s.day} wrap={false}>
      <View style={s.dayHead}>
        <Text style={s.dayNum}>Day {d.day}</Text>
        <Text style={s.dayReading}>{d.reading}</Text>
      </View>

      {d.verse ? <Text style={s.keyVerse}>{d.verse}</Text> : null}

      {d.keyWords.length > 0 && (
        <>
          <Text style={s.label}>KEY WORDS</Text>
          {d.keyWords.map((k, i) => (
            <Text key={i} style={s.kw}>
              <Text style={s.kwWord}>{k.word}. </Text>
              <Text style={s.kwMeaning}>{k.meaning}</Text>
            </Text>
          ))}
        </>
      )}

      {d.verses.length > 0 && (
        <>
          <Text style={s.label}>VERSES TO CARRY</Text>
          {d.verses.map((v, i) => (
            <Text key={i} style={s.vtext}>
              <Text style={s.vref}>{v.ref} — </Text>
              {`“${v.text}”`}
            </Text>
          ))}
        </>
      )}

      <Text style={s.label}>REFLECT</Text>
      <Text style={s.prompt}>{d.reflection}</Text>
      <WriteLines n={2} />

      <Text style={s.label}>ONE STEP</Text>
      <Text style={s.prompt}>{d.step}</Text>
      <WriteLines n={1} />

      <Text style={s.label}>GOING DEEPER</Text>
      <Text style={s.prompt}>{d.sideReflection}</Text>
      <WriteLines n={2} />
    </View>
  );
}

export function WorkbookDocument({
  meta,
  days,
}: {
  meta: WorkbookMonth;
  days: WorkbookDay[];
}) {
  return (
    <Document
      title={`The Daily Walk — Workbook · ${meta.label}`}
      author="The Daily Walk"
    >
      {/* Cover */}
      <Page size="LETTER" style={[s.page, { padding: 0 }]}>
        <View style={s.cover}>
          <Text style={s.coverKicker}>THE DAILY WALK</Text>
          <Text style={s.coverTitle}>Monthly Workbook</Text>
          <Text style={s.coverSub}>Bible-in-a-Year guided journey</Text>
          <View style={s.coverRule} />
          <Text style={s.coverMonth}>{meta.label}</Text>
          <Text style={s.coverRange}>
            Days {meta.startDay}–{meta.endDay} · {meta.covers}
          </Text>
          <Text style={s.coverTagline}>Walking with God in real life</Text>
        </View>
      </Page>

      {/* Content */}
      <Page size="LETTER" style={s.page} wrap>
        <View style={s.pageHead} fixed>
          <Text style={s.pageHeadName}>THE DAILY WALK · WORKBOOK</Text>
          <Text style={s.pageHeadMonth}>
            {meta.label} · Days {meta.startDay}–{meta.endDay}
          </Text>
        </View>

        {days.map((d) => (
          <DayBlock key={d.day} d={d} />
        ))}

        <View style={s.footer} fixed>
          <Text>The Daily Walk · thedailywalknewsletter.com</Text>
          <Text
            render={({ pageNumber }) => `${pageNumber}`}
          />
        </View>
      </Page>
    </Document>
  );
}
