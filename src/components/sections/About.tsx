"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const roles = [
  { label: "IEEE CS", sub: "Senior Coordinator" },
  { label: "GSSoC '26", sub: "Open Source Contributor" },
  { label: "International Student Cell MUJ", sub: "Events Team" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-32 md:py-40 px-6 md:px-16 lg:px-28 overflow-hidden"
    >
      {/* Faint vertical rule */}
      <div
        className="absolute left-6 md:left-16 top-0 bottom-0 w-px"
        style={{ background: "rgba(61,53,48,0.06)" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
        {/* Left — heading + bio */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase mb-6 font-mono"
            style={{ color: "var(--accent)" }}
          >
            01 / about
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-light leading-none mb-10"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "var(--cream)",
              letterSpacing: "-0.02em",
            }}
          >
            builder.
            <br />
            <span className="italic" style={{ color: "var(--accent)", opacity: 0.7 }}>
              learner.
            </span>
            <br />
            maker.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-body font-light text-base leading-[1.9]"
            style={{ color: "var(--muted)", maxWidth: "42ch" }}
          >
            I'm a first-year B.Tech CS student at Manipal University Jaipur,
            passionate about building technology that solves real problems.
            I explore Full Stack Development and AI/ML, and love working on
            projects that push me to learn and grow.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-body font-light text-base leading-[1.9] mt-4"
            style={{ color: "var(--muted)", maxWidth: "42ch" }}
          >
            Currently contributing to open-source under GSSoC '26, coordinating
            at IEEE CS MUJ, and shipping side projects that live at the
            intersection of design and engineering.
          </motion.p>
        </div>

        {/* Right — code block + roles */}
        <div className="flex flex-col gap-12">
          {/* Code bio block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-sm overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(61,53,48,0.08)",
            }}
          >
            {/* Window bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(61,53,48,0.06)" }}
            >
              {["#c8b89a40", "#c8b89a25", "#c8b89a15"].map((c, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
              <span className="text-[10px] font-mono ml-2" style={{ color: "var(--muted)" }}>
                samya.ts
              </span>
            </div>

            <pre
              className="p-5 text-sm font-mono leading-[1.8] overflow-x-auto"
              style={{ color: "var(--cream)" }}
            >
              <code>
                <span style={{ color: "var(--accent)" }}>const</span>
                {" "}
                <span style={{ color: "var(--cream)" }}>samya</span>
                {" = {\n"}
                {"  "}
                <span style={{ color: "var(--muted)" }}>role</span>
                {" : "}
                <span style={{ color: "#7a9978" }}>"CS @ MUJ · she/her"</span>
                {",\n"}
                {"  "}
                <span style={{ color: "var(--muted)" }}>focus</span>
                {" : ["}
                <span style={{ color: "#7a9978" }}>"full-stack"</span>
                {", "}
                <span style={{ color: "#7a9978" }}>"AI/ML"</span>
                {", "}
                <span style={{ color: "#7a9978" }}>"open-source"</span>
                {"],\n"}
                {"  "}
                <span style={{ color: "var(--muted)" }}>now</span>
                {" : "}
                <span style={{ color: "#7a9978" }}>"GSSoC '26 · IEEE CS"</span>
                {",\n"}
                {"  "}
                <span style={{ color: "var(--muted)" }}>from</span>
                {" : "}
                <span style={{ color: "#7a9978" }}>"Bhopal, India"</span>
                {",\n"}
                {"  "}
                <span style={{ color: "var(--muted)" }}>building</span>
                {" : "}
                <span style={{ color: "#7a9978" }}>"things that matter"</span>
                {",\n}"}
              </code>
            </pre>
          </motion.div>

          {/* Roles */}
          <div className="flex flex-col gap-0">
            {roles.map((role, i) => (
              <motion.div
                key={role.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="flex items-center justify-between py-4 group"
                style={{ borderBottom: "1px solid rgba(61,53,48,0.07)" }}
              >
                <span
                  className="font-body text-sm tracking-wide transition-colors duration-200"
                  style={{ color: "var(--cream)" }}
                >
                  {role.label}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {role.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
