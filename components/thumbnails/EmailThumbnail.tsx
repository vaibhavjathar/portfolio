"use client";
import { motion } from "framer-motion";

const NODES = [
  { cx: 20, cy: 40, label: "IN" },
  { cx: 60, cy: 20, label: "A" },
  { cx: 60, cy: 40, label: "B" },
  { cx: 60, cy: 60, label: "C" },
  { cx: 100, cy: 40, label: "OUT" },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 4],
];

export default function EmailThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Edges */}
      {EDGES.map(([from, to], i) => (
        <motion.line
          key={i}
          x1={NODES[from].cx}
          y1={NODES[from].cy}
          x2={NODES[to].cx}
          y2={NODES[to].cy}
          stroke="var(--accent)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.cx}
            cy={n.cy}
            r="7"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="1.2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
          <text x={n.cx} y={n.cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="4" fill="var(--accent)" fontFamily="monospace">
            {n.label}
          </text>
        </g>
      ))}
      {/* Envelope icon at entry */}
      <rect x="6" y="35" width="10" height="8" rx="1" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.5" />
      <polyline points="6,35 11,40 16,35" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}
