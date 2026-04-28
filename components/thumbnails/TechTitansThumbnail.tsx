"use client";
import { motion } from "framer-motion";

export default function TechTitansThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Face silhouette */}
      <ellipse cx="60" cy="35" rx="18" ry="22" stroke="var(--accent)" strokeWidth="1.2" opacity="0.5" />
      {/* Eyes */}
      <circle cx="54" cy="30" r="2.5" stroke="var(--accent)" strokeWidth="1" />
      <circle cx="66" cy="30" r="2.5" stroke="var(--accent)" strokeWidth="1" />
      {/* Mouth */}
      <path d="M54 42 Q60 47 66 42" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />

      {/* Scanning grid */}
      {[16, 24, 32, 40, 48, 56].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="10" x2={x} y2="68" stroke="var(--accent)" strokeWidth="0.4" opacity="0.15" />
      ))}
      {[16, 24, 32, 40, 48, 56, 64].map((y, i) => (
        <line key={`h${i}`} x1="14" y1={y} x2="106" y2={y} stroke="var(--accent)" strokeWidth="0.4" opacity="0.15" />
      ))}

      {/* Scan line */}
      <motion.line
        x1="14"
        y1="10"
        x2="106"
        y2="10"
        stroke="var(--accent)"
        strokeWidth="1.5"
        opacity="0.7"
        animate={{ y1: [10, 68, 10], y2: [10, 68, 10] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Detection box */}
      <motion.rect
        x="38"
        y="10"
        width="44"
        height="52"
        rx="2"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.3, 0.9, 1] }}
      />
      {/* Corner markers */}
      {[
        [38, 10], [82, 10], [38, 62], [82, 62]
      ].map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 3}
          y={y - 3}
          width="6"
          height="6"
          fill="var(--accent)"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.3, 0.9, 1] }}
        />
      ))}
    </svg>
  );
}
