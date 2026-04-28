"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OWNER } from "@/lib/data";
import MatrixRain from "@/components/backgrounds/MatrixRain";

const TITLES = [
  "AI Systems Engineer",
  "LangGraph Architect",
  "Edge ML Builder",
  "Production AI",
  "Agentic AI Builder",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Matrix rain */}
      <MatrixRain />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,65,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[var(--foreground)]">
          {OWNER.name}
        </h1>

        {/* Typewriter */}
        <div className="h-8 flex items-center gap-1">
          <span className="font-mono text-xl md:text-2xl text-[var(--accent)]">
            {displayed}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="font-mono text-xl text-[var(--accent)]"
          >
            |
          </motion.span>
        </div>

        {/* Tagline */}
        <p className="max-w-xl text-[var(--foreground)]/50 font-mono text-sm tracking-wide">
          fault-tolerant systems · agentic AI · edge ML · production-ready
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mt-4">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-6 py-2.5 rounded-sm font-mono text-sm font-semibold tracking-wide border transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "#0a0a0a",
              borderColor: "var(--accent)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
            }}
          >
            View Systems
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-6 py-2.5 rounded-sm font-mono text-sm tracking-wide border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] text-[var(--foreground)]/30 tracking-widest">SCROLL</span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path d="M6 0v16M1 11l5 5 5-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </svg>
      </motion.div>
    </section>
  );
}
