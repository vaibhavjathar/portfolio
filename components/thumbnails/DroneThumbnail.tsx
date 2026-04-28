"use client";
import { motion } from "framer-motion";

export default function DroneThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Hexagon body */}
      <polygon
        points="60,20 75,29 75,47 60,56 45,47 45,29"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Arms */}
      <line x1="45" y1="29" x2="25" y2="18" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
      <line x1="75" y1="29" x2="95" y2="18" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
      <line x1="45" y1="47" x2="25" y2="58" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
      <line x1="75" y1="47" x2="95" y2="58" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
      {/* Rotors */}
      {[
        [25, 18], [95, 18], [25, 58], [95, 58]
      ].map(([cx, cy], i) => (
        <motion.ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="10"
          ry="3"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="none"
          animate={{ rx: [10, 12, 10] }}
          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      {/* Scanning sweep */}
      <motion.line
        x1="60"
        y1="38"
        x2="60"
        y2="15"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
        animate={{ rotate: [0, 60, -60, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 38px" }}
      />
      {/* Center */}
      <circle cx="60" cy="38" r="3" fill="var(--accent)" />
      {/* Alert dot */}
      <motion.circle
        cx="95"
        cy="12"
        r="3"
        fill="#ff4444"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}
