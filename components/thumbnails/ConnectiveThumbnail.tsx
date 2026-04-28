"use client";
import { motion } from "framer-motion";

const DOTS = [
  { cx: 60, cy: 40 },
  { cx: 25, cy: 20 }, { cx: 95, cy: 20 },
  { cx: 20, cy: 55 }, { cx: 100, cy: 55 },
  { cx: 60, cy: 68 },
];

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [3, 5], [4, 5],
];

export default function ConnectiveThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {CONNECTIONS.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={DOTS[a].cx} y1={DOTS[a].cy}
          x2={DOTS[b].cx} y2={DOTS[b].cy}
          stroke="var(--accent)"
          strokeWidth="0.7"
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      {DOTS.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={i === 0 ? 6 : 4}
          fill={i === 0 ? "var(--accent)" : "var(--surface)"}
          stroke="var(--accent)"
          strokeWidth="1.2"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
        />
      ))}
    </svg>
  );
}
