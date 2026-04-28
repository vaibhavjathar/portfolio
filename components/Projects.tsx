"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import NeuralBackground from "@/components/backgrounds/NeuralBackground";
import IotThumbnail from "./thumbnails/IotThumbnail";
import DroneThumbnail from "./thumbnails/DroneThumbnail";
import EmailThumbnail from "./thumbnails/EmailThumbnail";
import FederatedThumbnail from "./thumbnails/FederatedThumbnail";
import FairShareThumbnail from "./thumbnails/FairShareThumbnail";
import ResumeIQThumbnail from "./thumbnails/ResumeIQThumbnail";
import ConnectiveThumbnail from "./thumbnails/ConnectiveThumbnail";
import TechTitansThumbnail from "./thumbnails/TechTitansThumbnail";
import StudStudyThumbnail from "./thumbnails/StudStudyThumbnail";

const THUMBNAIL_MAP: Record<string, React.ComponentType> = {
  iot: IotThumbnail,
  drone: DroneThumbnail,
  email: EmailThumbnail,
  federated: FederatedThumbnail,
  fairshare: FairShareThumbnail,
  resumeiq: ResumeIQThumbnail,
  connective: ConnectiveThumbnail,
  techtitans: TechTitansThumbnail,
  studstudy: StudStudyThumbnail,
};

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const Thumbnail = THUMBNAIL_MAP[project.thumbnail];

  return (
    <motion.div
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-sm border transition-all duration-300 overflow-hidden cursor-default"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(0,255,65,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div className="h-32 flex items-center justify-center p-4 border-b" style={{ borderColor: "var(--border)" }}>
        {Thumbnail && <Thumbnail />}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-sm font-semibold text-[var(--foreground)] leading-tight">
            {project.title}
          </h3>
          {project.featured && (
            <span className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded-sm" style={{ background: "var(--accent)", color: "#0a0a0a" }}>
              FEATURED
            </span>
          )}
        </div>

        <p className="text-xs text-[var(--foreground)]/60 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-sm border"
              style={{ borderColor: "var(--border)", color: "var(--foreground)", opacity: 0.6 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-mono transition-colors duration-200 mt-1 w-fit"
          style={{ color: "var(--foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub →
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
      <NeuralBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono text-xs text-[var(--accent)] tracking-widest mb-3">SYSTEMS</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Systems I&apos;ve Shipped</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
