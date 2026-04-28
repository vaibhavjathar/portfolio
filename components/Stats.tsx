"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedCounter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const steps = 50;
    const increment = value / steps;
    const interval = (duration * 1000) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

const STAT_ITEMS = [
  { label: "AI Systems Built", value: 9, suffix: "" },
  { label: "Public Repos", value: 16, suffix: "+" },
  { label: "Hours in AI/ML", value: 8760, suffix: "+" },
  { label: "Frameworks Mastered", value: 6, suffix: "+" },
  { label: "Years Old", value: 21, suffix: "" },
];

export default function Stats() {
  const [inView, setInView] = useState(false);

  return (
    <section className="py-16 border-y" style={{ borderColor: "var(--border)" }}>
      <motion.div
        className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setInView(true)}
        transition={{ duration: 0.5 }}
      >
        {STAT_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <span className="text-4xl font-bold font-mono text-[var(--accent)]">
              {inView ? (
                <>
                  <AnimatedCounter value={item.value} />
                  {item.suffix}
                </>
              ) : (
                "—"
              )}
            </span>
            <span className="font-mono text-xs text-[var(--foreground)]/40 tracking-wider">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
