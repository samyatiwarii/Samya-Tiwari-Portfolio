"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Boxes } from "@/components/common/BackgroundBoxes";
import VaporizeTextCycle, { Tag } from "@/components/common/VapourText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    gsap.to(headlineRef.current, {
      yPercent: 14,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background boxes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 10%, var(--bg) 85%)",          }}
        />
        <Boxes />
      </div>

      {/* Content */}
      <div ref={headlineRef} className="relative z-20 text-center px-6 flex flex-col items-center w-full">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs tracking-[0.35em] uppercase mb-10 font-mono"
          style={{ color: "var(--muted)" }}
        >
          full stack · ai/ml · open source
        </motion.p>

        {/* Vapour name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-full"
          style={{ height: "clamp(180px, 28vw, 300px)" }}
        >
          <VaporizeTextCycle
            texts={["Samya Tiwari", "Samya Tiwari"]}
            font={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "120px",
              fontWeight: 300,
            }}
            color="rgb(26, 24, 22)"
            spread={4}
            density={6}
            animation={{ vaporizeDuration: 1.5, fadeInDuration: 0.8, waitDuration: 0.3 }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-body font-light text-base md:text-lg max-w-md leading-relaxed mt-2"
          style={{ color: "var(--muted)" }}
        >
          CS undergrad @ MUJ — building things that matter,
          from creator platforms to open-source AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 flex items-center gap-6"
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs tracking-[0.25em] uppercase font-body py-3 px-6 border transition-all duration-300"
            style={{ borderColor: "rgba(61,53,48,0.2)", color: "var(--cream)", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream)"; e.currentTarget.style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--cream)"; }}
          >
            view projects
          </button>
          <a
            href="mailto:samyatiiwarii@gmail.com"
            className="text-xs tracking-[0.25em] uppercase font-body transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            say hello →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono" style={{ color: "var(--muted)" }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "var(--accent)", opacity: 0.4 }}
        />
      </motion.div>
    </section>
  );
}
