"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono text-xs text-[var(--accent)] tracking-widest mb-3">WORK</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Work Experience</h2>
      </motion.div>

      <div className="relative flex flex-col gap-8 pl-8">
        {/* Timeline line */}
        <div
          className="absolute left-0 top-2 bottom-2 w-px"
          style={{ background: "var(--border)" }}
        />

        {EXPERIENCE.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[37px] top-2 w-3 h-3 rounded-full border-2"
              style={{
                background: "var(--background)",
                borderColor: "var(--accent)",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />

            <div
              className="p-6 rounded-sm border"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{job.company}</h3>
                  <p className="font-mono text-sm text-[var(--accent)]">{job.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-[var(--foreground)]/50">{job.period}</p>
                  <p className="font-mono text-xs text-[var(--foreground)]/40">{job.location}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-sm text-[var(--foreground)]/70">
                    <span className="text-[var(--accent)] mt-0.5 shrink-0">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
