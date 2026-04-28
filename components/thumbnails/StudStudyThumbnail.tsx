"use client";
import { motion } from "framer-motion";

export default function StudStudyThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Open book */}
      <path d="M60 20 Q40 18 20 22 L20 62 Q40 58 60 60 Q80 58 100 62 L100 22 Q80 18 60 20Z"
        stroke="var(--accent)" strokeWidth="1.2" fill="var(--surface)" />
      {/* Spine */}
      <line x1="60" y1="20" x2="60" y2="60" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Left page lines */}
      {[30, 36, 42, 48].map((y, i) => (
        <line key={`l${i}`} x1="28" y1={y} x2="54" y2={y} stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      ))}
      {/* Right page lines */}
      {[30, 36, 42, 48].map((y, i) => (
        <line key={`r${i}`} x1="66" y1={y} x2="92" y2={y} stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      ))}
      {/* Play button on right page — YouTube reference */}
      <motion.circle
        cx="79"
        cy="40"
        r="10"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="var(--surface)"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "79px 40px" }}
      />
      <polygon points="76,36 76,44 85,40" fill="var(--accent)" opacity="0.9" />
      {/* "First project" badge */}
      <rect x="8" y="8" width="28" height="10" rx="2" fill="var(--accent)" opacity="0.9" />
      <text x="22" y="14" textAnchor="middle" dominantBaseline="middle" fontSize="4" fill="#0a0a0a" fontWeight="bold">FIRST</text>
    </svg>
  );
}
