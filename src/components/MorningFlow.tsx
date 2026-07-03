/**
 * "How a morning works" — the 3 small, doable steps (cue → routine → reward).
 * Shared by the homepage "How it works" section and the pricing page so the
 * same clear rhythm shows up in both places.
 */

const STEPS = [
  {
    label: "It comes to you",
    icon: "🌅",
    body: "Before the world gets loud — around 5:00 AM ET — a short devotional lands in your inbox. No app to open, no streak to chase.",
  },
  {
    label: "Ten honest minutes",
    icon: "📖",
    body: "A short devotional, one real prayer, and a next step you can actually take. Small enough to do on your busiest morning.",
  },
  {
    label: "You walk in ready",
    icon: "🛡️",
    body: "You carry something real into your day — and it quietly compounds. Miss a day? Nothing resets. You just pick back up.",
  },
];

export default function MorningFlow() {
  return (
    <div className="hiw-flow">
      {STEPS.map((s) => (
        <div className="hiw-step" key={s.label}>
          <div className="hiw-step-top">
            <span className="hiw-step-ic" aria-hidden="true">
              {s.icon}
            </span>
          </div>
          <h4>{s.label}</h4>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
