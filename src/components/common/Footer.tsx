"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 md:px-16 lg:px-28"
      style={{
        background: "rgba(61,53,48,0.07)",
        borderTop: "1px solid rgba(61,53,48,0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left */}
        <span
          className="font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(61,53,48,0.55)" }}
        >
          © 2026 Samya Tiwari
        </span>

        {/* Center — nav links */}
        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(61,53,48,0.45)", textDecoration: "none" }}
              whileHover={{ color: "rgba(61,53,48,0.85)" }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Right */}
        <span
          className="font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(61,53,48,0.55)" }}
        >
          designed & built by samya
        </span>

      </div>
    </footer>
  );
}