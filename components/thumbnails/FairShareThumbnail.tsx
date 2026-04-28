"use client";
import { motion } from "framer-motion";

export default function FairShareThumbnail() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Receipt */}
      <rect x="35" y="10" width="50" height="55" rx="2" stroke="var(--accent)" strokeWidth="1.2" fill="var(--surface)" />
      {/* Receipt lines */}
      {[22, 30, 38, 46].map((y, i) => (
        <line key={i} x1="42" y1={y} x2="78" y2={y} stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* Total line */}
      <line x1="42" y1="54" x2="78" y2="54" stroke="var(--accent)" strokeWidth="1.2" opacity="0.8" />
      {/* Split arrows */}
      <motion.path
        d="M60 65 L45 75 M60 65 L75 75"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Coin left */}
      <motion.circle
        cx="38"
        cy="75"
        r="5"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <text x="38" y="76" textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="var(--accent)">₹</text>
      {/* Coin right */}
      <motion.circle
        cx="82"
        cy="75"
        r="5"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      <text x="82" y="76" textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="var(--accent)">₹</text>
      {/* -70% badge */}
      <rect x="72" y="8" width="20" height="9" rx="2" fill="var(--accent)" />
      <text x="82" y="13" textAnchor="middle" dominantBaseline="middle" fontSize="4.5" fill="#0a0a0a" fontWeight="bold">-70%</text>
    </svg>
  );
}
