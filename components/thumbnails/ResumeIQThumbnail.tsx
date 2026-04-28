"use client";
import { motion } from "framer-motion";

export default function ResumeIQThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Document */}
      <rect x="25" y="10" width="45" height="60" rx="2" stroke="var(--accent)" strokeWidth="1.2" fill="var(--surface)" />
      {/* Doc lines */}
      {[22, 30, 38, 46, 54].map((y, i) => (
        <line key={i} x1="32" y1={y} x2={i % 2 === 0 ? 62 : 55} y2={y} stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* ATS Score ring */}
      <circle cx="87" cy="38" r="18" stroke="var(--border)" strokeWidth="3" fill="none" />
      <motion.circle
        cx="87"
        cy="38"
        r="18"
        stroke="var(--accent)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="113"
        initial={{ strokeDashoffset: 113 }}
        animate={{ strokeDashoffset: 25 }}
        transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
        style={{ transformOrigin: "87px 38px", transform: "rotate(-90deg)" }}
      />
      <text x="87" y="37" textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="var(--accent)" fontFamily="monospace" fontWeight="bold">92</text>
      <text x="87" y="46" textAnchor="middle" dominantBaseline="middle" fontSize="4" fill="var(--foreground)" opacity="0.5" fontFamily="monospace">ATS</text>
      {/* Match arrow */}
      <motion.path
        d="M70 38 L69 38"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinecap="round"
        animate={{ d: ["M70 38 L69 38", "M70 38 L67 38"] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  );
}
