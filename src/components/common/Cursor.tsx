"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  // Dot — instant follow
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const addHover = () => {
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    addHover();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mouseX, mouseY, dotX, dotY]);

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(61,53,48,0.4)",
        }}
        animate={{
          width: hovering ? 48 : clicking ? 18 : 32,
          height: hovering ? 48 : clicking ? 18 : 32,
          opacity: hovering ? 0.6 : 0.35,
          borderColor: hovering ? "rgba(61,53,48,0.7)" : "rgba(61,53,48,0.4)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      />

      {/* Inner dot — instant */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicking ? 3 : 5,
          height: clicking ? 3 : 5,
          backgroundColor: "rgba(61,53,48,0.9)",
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      />
    </>
  );
}
