"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollVelocity from "@/components/common/ScrollVelocity";
import {
  FaReact, FaNodeJs, FaGithub, FaPython, FaHtml5, FaCss3Alt,
} from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiTailwindcss,
  SiJavascript, SiC, SiGit, SiFramer, SiVercel,
} from "react-icons/si";

const skills = [
  { category: "Languages", items: ["C", "Python", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Vercel"] },
  { category: "Concepts", items: ["DSA", "REST APIs", "Responsive Design", "OOP", "DBMS"] },
];

const orbitIcons = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#1a1816" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: FaHtml5, color: "#E34F26" },
  { Icon: FaCss3Alt, color: "#1572B6" },
  { Icon: SiFramer, color: "#0055FF" },
  { Icon: FaGithub, color: "#1a1816" },
  { Icon: SiGit, color: "#F05032" },
  { Icon: SiVercel, color: "#1a1816" },
];

const orbitCount = 3;
const iconsPerOrbit = Math.ceil(orbitIcons.length / orbitCount);

function TechOrbit() {
  return (
    <div className="relative w-[420px] h-[420px] flex items-center justify-center shrink-0">
      {/* Center */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center z-10"
        style={{ background: "var(--bg)", border: "1px solid rgba(61,53,48,0.12)", boxShadow: "0 4px 20px rgba(61,53,48,0.08)" }}
      >
        <FaReact style={{ color: "#61DAFB", width: 28, height: 28 }} />
      </div>

      {[...Array(orbitCount)].map((_, orbitIdx) => {
        const size = `${10 + 7 * (orbitIdx + 1)}rem`;
        const duration = 14 + orbitIdx * 7;
        const angleStep = (2 * Math.PI) / iconsPerOrbit;

        return (
          <div
            key={orbitIdx}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: "1px dashed rgba(61,53,48,0.12)",
              animation: `orbit-spin ${duration}s linear infinite`,
            }}
          >
            {orbitIcons
              .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
              .map((cfg, iconIdx) => {
                const angle = iconIdx * angleStep;
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);
                return (
                  <div
                    key={iconIdx}
                    className="absolute rounded-full p-1.5"
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      background: "var(--bg)",
                      border: "1px solid rgba(61,53,48,0.1)",
                      boxShadow: "0 2px 8px rgba(61,53,48,0.06)",
                      animation: `orbit-counter-spin ${duration}s linear infinite`,
                    }}
                  >
                    <cfg.Icon style={{ color: cfg.color, width: 22, height: 22 }} />
                  </div>
                );
              })}
          </div>
        );
      })}

      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-counter-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={sectionRef} className="relative w-full py-32 md:py-40 overflow-hidden">

      {/* Marquee */}
      <div className="mb-24 py-10" style={{ borderTop: "1px solid rgba(61,53,48,0.06)", borderBottom: "1px solid rgba(61,53,48,0.06)" }}>
        <ScrollVelocity
          texts={[
            "React · TypeScript · Python · Node.js · Next.js · Framer Motion · Vercel ·",
            "DSA · Responsive Design · OOP · DBMS · C · HTML · CSS · JavaScript ·",
          ]}
          velocity={35}
          className="font-display font-light italic"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", color: "rgba(61,53,48,0.15)", letterSpacing: "-0.01em" }}
        />
      </div>

      {/* Main content */}
      <div className="px-6 md:px-16 lg:px-28 max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase mb-4 font-mono"
            style={{ color: "var(--muted)" }}
          >
            03 / skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-light"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--cream)", letterSpacing: "-0.02em" }}
          >
            the toolkit
          </motion.h2>
        </div>

        {/* Two col — skills list left, orbit right */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-0">

          {/* Left — skills grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
              >
                <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-4"
                  style={{ color: "var(--accent)", opacity: 0.6 }}>
                  {group.category}
                </p>
                <div className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="font-body text-sm font-light flex items-center gap-2" style={{ color: "var(--muted)" }}>
                      <span className="inline-block w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent)", opacity: 0.4 }} />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center w-full lg:w-auto"
          >
            <TechOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
}