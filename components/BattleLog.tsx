"use client";

import { motion } from "framer-motion";
import { BATTLE_LOG } from "@/lib/data";

export default function BattleLog() {
  return (
    <section id="battlelog" className="py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono text-xs text-[var(--accent)] tracking-widest mb-3">EARNED</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Battle Log</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Certifications */}
        <div>
          <h3 className="font-mono text-sm font-semibold text-[var(--accent)] mb-6 tracking-wider">
            CERTIFICATIONS
          </h3>
          <div className="flex flex-col gap-4">
            {BATTLE_LOG.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-sm border-l-2"
                style={{ borderLeftColor: "var(--accent)", background: "var(--surface)" }}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm leading-snug">{cert.title}</p>
                  <p className="font-mono text-xs text-[var(--foreground)]/50">{cert.issuer}</p>
                  <p className="font-mono text-xs text-[var(--accent)]/70">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-mono text-sm font-semibold text-[var(--accent)] mb-6 tracking-wider">
            ACHIEVEMENTS
          </h3>
          <div className="flex flex-col gap-4">
            {BATTLE_LOG.achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-sm border-l-2"
                style={{ borderLeftColor: "var(--accent)", background: "var(--surface)" }}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm leading-snug">{item.title}</p>
                  <p className="text-xs text-[var(--foreground)]/55 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
