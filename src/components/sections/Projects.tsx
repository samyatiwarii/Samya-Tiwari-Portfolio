"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    index: "01",
    title: "Collabor-ate",
    description:
      "Creator × brand collaboration platform for India's creator economy. Responsive frontend with scalable component architecture and campaign management workflows.",
    stack: ["TypeScript", "React", "Node.js"],
link: "https://github.com/samyatiwarii/Collabor-ate",
    year: "2026",
  },
  {
    index: "02",
    title: "MUJ CabShare",
    description:
      "Centralized cab-sharing platform for university students. Real-time UI updates, WhatsApp deep linking with pre-filled messaging — no more fragmented coordination.",
    stack: ["JavaScript", "HTML", "CSS"],
link: "https://github.com/samyatiwarii/muj-cabshare",
    year: "2026",
  },
  {
    index: "03",
    title: "MujKart",
    description:
      "Campus marketplace enabling students to buy, sell, and connect. Categorized listings for streamlined product discovery, optimized for mobile and desktop.",
    stack: ["JavaScript", "HTML", "CSS"],
link: "https://github.com/samyatiwarii/mujkart",
    year: "2026",
  },
  {
    index: "04",
    title: "Productivity Dashboard",
    description:
      "Web-based academic dashboard to track assignments, deadlines and study progress. Matplotlib-powered visualizations to analyze productivity trends.",
    stack: ["Python", "Flask", "Matplotlib"],
    link: "https://github.com/samyatiwarii",
    year: "2024",
  },
];

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.3 });

  return (
    <motion.a
      ref={rowRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block group"
      style={{ textDecoration: "none" }}
    >
      <div
        className="relative py-8 px-0 transition-all duration-500"
        style={{
          borderTop: "1px solid rgba(61,53,48,0.08)",
          background: hovered ? "rgba(61,53,48,0.04)" : "transparent",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
          {/* Index */}
          <span
            className="font-mono text-xs shrink-0 mt-1"
            style={{ color: "var(--muted)", width: "2.5rem" }}
          >
            {project.index}
          </span>

          {/* Title + desc */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3
                className="font-display font-light transition-colors duration-300"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                  color: hovered ? "var(--cream)" : "rgba(232,228,220,0.8)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {project.title}
              </h3>
              <motion.span
                animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs mt-2 ml-4 shrink-0"
                style={{ color: "var(--accent)" }}
              >
                ↗
              </motion.span>
            </div>

            <p
              className="font-body font-light text-sm leading-[1.8] mb-4"
              style={{ color: "var(--muted)", maxWidth: "60ch" }}
            >
              {project.description}
            </p>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1"
                  style={{
                    border: "1px solid rgba(61,53,48,0.12)",
                    color: "var(--muted)",
                    background: "rgba(61,53,48,0.04)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Year */}
          <span
            className="font-mono text-xs shrink-0 hidden md:block mt-1"
            style={{ color: "rgba(138,133,128,0.5)" }}
          >
            {project.year}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, amount: 0.3 });

  return (
    <section
      id="projects"
      className="relative w-full py-32 md:py-40 px-6 md:px-16 lg:px-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-16 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.35em] uppercase mb-4 font-mono"
              style={{ color: "var(--accent)" }}
            >
              02 / projects
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-light"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--cream)",
                letterSpacing: "-0.02em",
              }}
            >
              selected work
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            href="https://github.com/samyatiwarii"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase font-mono transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            all on github →
          </motion.a>
        </div>

        {/* Project rows */}
        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.index} project={p} index={i} />
          ))}
          {/* Final border */}
          <div style={{ borderTop: "1px solid rgba(61,53,48,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
