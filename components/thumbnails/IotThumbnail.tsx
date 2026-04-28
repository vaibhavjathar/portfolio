"use client";
import { motion } from "framer-motion";

export default function IotThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Chip body */}
      <rect x="40" y="25" width="40" height="30" rx="3" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Chip grid */}
      <line x1="50" y1="25" x2="50" y2="55" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      <line x1="60" y1="25" x2="60" y2="55" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      <line x1="70" y1="25" x2="70" y2="55" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      <line x1="40" y1="35" x2="80" y2="35" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      <line x1="40" y1="45" x2="80" y2="45" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      {/* Pins left */}
      {[30, 36, 42, 48].map((y, i) => (
        <line key={`l${i}`} x1="34" y1={y} x2="40" y2={y} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {/* Pins right */}
      {[30, 36, 42, 48].map((y, i) => (
        <line key={`r${i}`} x1="80" y1={y} x2="86" y2={y} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {/* Pulse rings */}
      {[1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="60"
          cy="40"
          r={10 + i * 10}
          stroke="var(--accent)"
          strokeWidth="0.8"
          fill="none"
          initial={{ opacity: 0.6, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
        />
      ))}
      {/* Center dot */}
      <circle cx="60" cy="40" r="3" fill="var(--accent)" />
    </svg>
  );
}
