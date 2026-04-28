"use client";

import { motion } from "framer-motion";
import { ABOUT, OWNER } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono text-xs text-[var(--accent)] tracking-widest mb-3">ABOUT</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">About Me</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Paragraphs */}
        <div className="flex flex-col gap-6">
          {ABOUT.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-[var(--foreground)]/70 leading-relaxed"
            >
              {p}
            </motion.p>
          ))}

          {/* The Specs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4"
          >
            <h3 className="font-mono text-sm font-semibold text-[var(--accent)] mb-4 tracking-wider">
              THE SPECS
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                ["Location", OWNER.location],
                ["Languages", OWNER.languages],
                ["Education", OWNER.education],
                ["Currently", OWNER.seeking],
              ].map(([label, value]) => (
                <li key={label} className="flex gap-3 text-sm font-mono">
                  <span className="text-[var(--foreground)]/40 min-w-[90px]">{label}</span>
                  <span className="text-[var(--foreground)]/80">{value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-mono text-sm font-semibold text-[var(--accent)] mb-6 tracking-wider">
            TECH STACK
          </h3>
          <ul className="flex flex-col gap-4">
            {ABOUT.techStack.map((category, i) => (
              <motion.li
                key={category.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col gap-1 pb-4 border-b last:border-0"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="font-mono text-xs text-[var(--accent)]/70 tracking-wide">
                  {category.label}
                </span>
                <span className="text-sm text-[var(--foreground)]/70">
                  {category.items}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
