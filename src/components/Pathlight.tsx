"use client";

import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm Pathlight. I'm here to help you read and understand Scripture, find verses, and reflect. Ask me anything, or tap a starter below. (I'm a guide, not a replacement for your Bible, prayer, or your church.)",
};

const STARTERS = [
  "What does today's verse mean?",
  "Find verses about anxiety",
  "Give me a prayer prompt for today",
  "Help me understand grace",
  "I'm discouraged — where do I look?",
];

export default function Pathlight() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      const reply: string =
        data.reply ?? data.error ?? "I couldn't respond just now — please try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something interrupted us — try again in a moment." },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  return (
    <div className="pl">
      <div className="pl-stream" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`pl-msg pl-${m.role}`}>
            {m.role === "assistant" && <span className="pl-ava" aria-hidden="true">✦</span>}
            <div className="pl-bubble">
              {m.content.split("\n").map((line, j) => (
                <p key={j}>{line || " "}</p>
              ))}
            </div>
          </div>
        ))}
        {busy && (
          <div className="pl-msg pl-assistant">
            <span className="pl-ava" aria-hidden="true">✦</span>
            <div className="pl-bubble pl-typing"><span /><span /><span /></div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="pl-starters">
          {STARTERS.map((s) => (
            <button key={s} type="button" className="pl-chip" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="pl-input"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a verse, a topic, or how to pray…"
          aria-label="Ask Pathlight"
        />
        <button type="submit" className="btn btn-gold" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
      <p className="pl-disclaimer">
        Pathlight is a study companion — it can be wrong, and it never replaces your
        Bible, prayer, or your church. In crisis, reach out to someone you trust or
        call/text <strong>988</strong> (US).
      </p>
    </div>
  );
}
