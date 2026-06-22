// Soft hand-drawn faith doodles for the wide side gutters of the study page.
// Decorative only; hidden on narrow screens via CSS.

type Kind = "sun" | "sparkle" | "flower" | "leaf" | "stars" | "heart" | "wheat";

const COLORS = ["var(--gold)", "#3c7a5a", "#8a6cab", "#b5654a"];

const SPOTS: { side: "left" | "right"; top: number; kind: Kind; color: number; rot: number }[] = [
  { side: "left", top: 110, kind: "sun", color: 0, rot: -8 },
  { side: "right", top: 180, kind: "sparkle", color: 2, rot: 6 },
  { side: "left", top: 430, kind: "leaf", color: 1, rot: -14 },
  { side: "right", top: 540, kind: "flower", color: 3, rot: 10 },
  { side: "left", top: 820, kind: "stars", color: 2, rot: 0 },
  { side: "right", top: 940, kind: "heart", color: 3, rot: -6 },
  { side: "left", top: 1240, kind: "flower", color: 0, rot: 12 },
  { side: "right", top: 1320, kind: "leaf", color: 1, rot: 16 },
  { side: "left", top: 1680, kind: "wheat", color: 1, rot: -6 },
  { side: "right", top: 1760, kind: "sparkle", color: 0, rot: -10 },
  { side: "left", top: 2080, kind: "heart", color: 2, rot: 8 },
  { side: "right", top: 2160, kind: "sun", color: 0, rot: 8 },
];

export default function StudyDoodles() {
  return (
    <div className="sg-doodles" aria-hidden="true">
      {SPOTS.map((s, i) => (
        <div
          key={i}
          className={`sg-doodle ${s.side}`}
          style={{
            top: s.top,
            color: COLORS[s.color],
            transform: `rotate(${s.rot}deg)`,
          }}
        >
          <Shape kind={s.kind} />
        </div>
      ))}
    </div>
  );
}

function Shape({ kind }: { kind: Kind }) {
  const c = {
    width: 104,
    height: 104,
    viewBox: "0 0 104 104",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    xmlns: "http://www.w3.org/2000/svg",
  };
  switch (kind) {
    case "sun":
      return (
        <svg {...c}>
          <circle cx="52" cy="52" r="16" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={52 + Math.cos(a) * 24}
                y1={52 + Math.sin(a) * 24}
                x2={52 + Math.cos(a) * 34}
                y2={52 + Math.sin(a) * 34}
              />
            );
          })}
        </svg>
      );
    case "sparkle":
      return (
        <svg {...c}>
          <path d="M52 26 C54 44 60 50 78 52 C60 54 54 60 52 78 C50 60 44 54 26 52 C44 50 50 44 52 26 Z" />
          <circle cx="30" cy="30" r="2.5" />
          <circle cx="76" cy="74" r="2" />
        </svg>
      );
    case "flower":
      return (
        <svg {...c}>
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * Math.PI) / 3;
            return (
              <ellipse
                key={i}
                cx={52 + Math.cos(a) * 16}
                cy={52 + Math.sin(a) * 16}
                rx="8"
                ry="13"
                transform={`rotate(${(a * 180) / Math.PI + 90} ${52 + Math.cos(a) * 16} ${52 + Math.sin(a) * 16})`}
              />
            );
          })}
          <circle cx="52" cy="52" r="6" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...c}>
          <path d="M40 86 C40 50 56 28 78 20" />
          <path d="M52 64 C44 60 40 52 42 44 C50 46 54 54 52 64 Z" />
          <path d="M60 50 C54 44 54 34 60 28 C66 34 66 44 60 50 Z" />
          <path d="M50 76 C42 74 38 66 40 58 C48 60 52 68 50 76 Z" />
        </svg>
      );
    case "stars":
      return (
        <svg {...c}>
          <path d="M40 30 L43 40 L53 43 L43 46 L40 56 L37 46 L27 43 L37 40 Z" />
          <path d="M68 56 L70 63 L77 65 L70 67 L68 74 L66 67 L59 65 L66 63 Z" />
          <circle cx="72" cy="34" r="2.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...c}>
          <path d="M52 74 C28 58 30 38 44 38 C50 38 52 44 52 46 C52 44 54 38 60 38 C74 38 76 58 52 74 Z" />
        </svg>
      );
    case "wheat":
      return (
        <svg {...c}>
          <path d="M52 84 L52 30" />
          {[36, 46, 56, 66].map((y, i) => (
            <g key={i}>
              <path d={`M52 ${y} C44 ${y - 4} 42 ${y - 12} 46 ${y - 14}`} />
              <path d={`M52 ${y} C60 ${y - 4} 62 ${y - 12} 58 ${y - 14}`} />
            </g>
          ))}
          <path d="M52 30 C48 24 50 18 52 16 C54 18 56 24 52 30 Z" />
        </svg>
      );
  }
}
