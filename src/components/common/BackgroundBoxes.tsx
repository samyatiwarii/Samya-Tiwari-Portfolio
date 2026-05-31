"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const colors = [
  "rgb(125 211 252)",
  "rgb(249 168 212)",
  "rgb(134 239 172)",
  "rgb(253 224 71)",
  "rgb(216 180 254)",
  "rgb(147 197 253)",
  "rgb(252 165 165)",
  "rgb(165 180 252)",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

function Box({ j, i }: { j: number; i: number }) {
  const [hoverColor, setHoverColor] = useState(getRandomColor());

  return (
    <motion.div
      className="w-24 h-12 border-r border-t border-stone-200 relative"
      onHoverStart={() => setHoverColor(getRandomColor())}
      whileHover={{ backgroundColor: hoverColor, transition: { duration: 0 } }}
animate={{ backgroundColor: "rgba(0,0,0,0)", transition: { duration: 1.5 } }}    >
      {j % 2 === 0 && i % 2 === 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute h-6 w-10 -top-[14px] -left-[22px] text-stone-300 stroke-[1px] pointer-events-none"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      ) : null}
    </motion.div>
  );
}

export const Boxes = React.memo(() => {
  const rows = new Array(100).fill(1);
  const cols = new Array(80).fill(1);

  return (
    <div
      style={{
        transform: `translate(-20%,-40%) skewX(-48deg) skewY(14deg) scale(0.9) rotate(0deg) translateZ(0)`,
      }}
      className="absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0"
    >
      {rows.map((_, i) => (
        <motion.div key={`row${i}`} className="w-24 h-12 border-l border-stone-200 relative">
          {cols.map((_, j) => (
            <Box key={`col${j}`} j={j} i={i} />
          ))}
        </motion.div>
      ))}
    </div>
  );
});

Boxes.displayName = "Boxes";