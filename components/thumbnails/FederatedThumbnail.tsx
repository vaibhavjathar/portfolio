"use client";
import { motion } from "framer-motion";

const CLIENTS = [
  { cx: 20, cy: 20 }, { cx: 100, cy: 20 },
  { cx: 20, cy: 60 }, { cx: 100, cy: 60 },
];

export default function FederatedThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* No direct client-to-client lines — federated */}
      {/* Client to center lines */}
      {CLIENTS.map((c, i) => (
        <motion.line
          key={i}
          x1={c.cx}
          y1={c.cy}
          x2={60}
          y2={40}
          stroke="var(--accent)"
          strokeWidth="0.8"
          strokeDasharray="4 2"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {/* Client nodes */}
      {CLIENTS.map((c, i) => (
        <g key={i}>
          <rect x={c.cx - 8} y={c.cy - 8} width="16" height="16" rx="2" stroke="var(--accent)" strokeWidth="1.2" fill="var(--surface)" />
          <text x={c.cx} y={c.cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="var(--accent)" fontFamily="monospace">C{i + 1}</text>
          {/* Gradient animation — data aggregating */}
          <motion.circle
            cx={c.cx}
            cy={c.cy}
            r="12"
            stroke="var(--accent)"
            strokeWidth="0.5"
            fill="none"
            animate={{ r: [12, 18], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        </g>
      ))}
      {/* Central aggregator */}
      <circle cx="60" cy="40" r="10" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="60" y="41" textAnchor="middle" dominantBaseline="middle" fontSize="4.5" fill="var(--accent)" fontFamily="monospace">AGG</text>
      {/* Lock icon — privacy */}
      <rect x="56" y="52" width="8" height="6" rx="1" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M57.5 52 Q57.5 49 60 49 Q62.5 49 62.5 52" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.6" />
    </svg>
  );
}
