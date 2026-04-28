"use client";

import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll<SVGPathElement>(".trace");
    if (!paths) return;

    const cleanups: (() => void)[] = [];

    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;

      const delay = i * 800;
      const duration = 2200 + i * 300;

      let start: number | null = null;
      let animId: number;

      const animate = (ts: number) => {
        if (!start) start = ts + delay;
        const elapsed = ts - start;
        if (elapsed < 0) {
          animId = requestAnimationFrame(animate);
          return;
        }
        const progress = (elapsed % (duration + 1200)) / duration;
        const clamped = Math.min(progress, 1);
        path.style.strokeDashoffset = `${len * (1 - clamped)}`;
        // Reset after pause
        if (elapsed % (duration + 1200) > duration) {
          path.style.strokeDashoffset = `${len}`;
          start = ts + 200;
        }
        animId = requestAnimationFrame(animate);
      };

      animId = requestAnimationFrame(animate);
      cleanups.push(() => cancelAnimationFrame(animId));
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.08 }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
    >
      {/* Horizontal trace 1 */}
      <path
        className="trace"
        d="M 0 80 H 120 V 160 H 320 V 80 H 500"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical trace 1 */}
      <path
        className="trace"
        d="M 640 0 V 120 H 720 V 280 H 640 V 400"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Horizontal trace 2 */}
      <path
        className="trace"
        d="M 800 300 H 600 V 380 H 440 V 300 H 200 V 460 H 0"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Corner trace */}
      <path
        className="trace"
        d="M 80 600 V 480 H 200 V 380 H 80 V 240 H 160"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Short diagonal-ish trace */}
      <path
        className="trace"
        d="M 380 600 V 500 H 520 V 440 H 680 V 560 H 800"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top-left trace */}
      <path
        className="trace"
        d="M 0 200 H 80 V 120 H 240 V 200 H 360"
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nodes at intersections */}
      {[
        [120, 80], [320, 80], [640, 120], [720, 280],
        [200, 380], [440, 300], [80, 480], [520, 440],
        [240, 120], [360, 200],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="var(--accent)"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}
