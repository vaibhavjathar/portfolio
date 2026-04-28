"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const LINKS = 6;

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [overlay, setOverlay] = useState<{ expanded: boolean; dark: boolean } | null>(null);

  const trigger = useCallback(() => {
    if (isPulling) return;
    const toLight = isDark;
    setIsPulling(true);

    setTimeout(() => {
      setOverlay({ expanded: false, dark: !toLight });
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setOverlay({ expanded: true, dark: !toLight })
        )
      );
    }, 280);
  }, [isDark, isPulling]);

  const onOverlayEnd = useCallback(() => {
    if (!overlay?.expanded) return;
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    setOverlay(null);
    setIsPulling(false);
  }, [isDark, overlay]);

  return (
    <>
      {overlay && (
        <div
          onTransitionEnd={onOverlayEnd}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: overlay.dark ? "#0a0a0a" : "#f0f0e8",
            clipPath: overlay.expanded
              ? "circle(200vmax at calc(100% - 36px) 80px)"
              : "circle(0px at calc(100% - 36px) 80px)",
            transition: "clip-path 0.7s cubic-bezier(0.77, 0, 0.18, 1)",
          }}
        />
      )}

      <div
        className="fixed top-[72px] right-6 z-40 flex flex-col items-center cursor-pointer select-none"
        onClick={trigger}
        aria-label="Toggle light/dark mode"
      >
        {/* Ceiling pin */}
        <div
          className="w-3 h-1 rounded-full mb-0.5"
          style={{ background: "var(--accent)", opacity: 0.6 }}
        />
        <div
          className="w-[2px] h-2 rounded-full"
          style={{ background: "var(--accent)", opacity: 0.4 }}
        />

        {/* Pull y-motion wrapper */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: isPulling ? [0, 18, 0] : 0 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Sway rotation wrapper */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ rotate: isPulling ? 0 : [-3, 3, -3] }}
            transition={
              isPulling
                ? { duration: 0.1 }
                : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "top center" }}
          >
            {Array.from({ length: LINKS }).map((_, i) => {
              const isVertical = i % 2 === 0;
              return (
                <svg
                  key={i}
                  width={isVertical ? 12 : 18}
                  height={isVertical ? 20 : 10}
                  viewBox={isVertical ? "0 0 12 20" : "0 0 18 10"}
                  fill="none"
                  style={{ marginTop: i === 0 ? 0 : -4 }}
                >
                  <ellipse
                    cx={isVertical ? 6 : 9}
                    cy={isVertical ? 10 : 5}
                    rx={isVertical ? 4 : 7}
                    ry={isVertical ? 8.5 : 3.5}
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    opacity={0.55 + i * 0.05}
                  />
                </svg>
              );
            })}

            {/* Pull ring */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginTop: -3 }}
            >
              <circle cx="10" cy="10" r="8" stroke="var(--accent)" strokeWidth="2" opacity="0.8" />
              <circle cx="10" cy="10" r="3.5" fill="var(--accent)" opacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Mode label */}
        <p
          className="mt-2 font-mono text-[9px] tracking-widest"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "var(--foreground)",
            opacity: 0.3,
          }}
        >
          {isDark ? "DARK" : "LIGHT"}
        </p>
      </div>
    </>
  );
}
