"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  style?: React.CSSProperties;
  revealedStyle?: React.CSSProperties;
  animateOn?: "view" | "hover" | "load";
  delay?: number;
}

export default function DecryptedText({
  text,
  speed = 45,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&",
  className = "",
  encryptedClassName = "",
  style,
  revealedStyle,
  animateOn = "load",
  delay = 0,
}: DecryptedTextProps) {
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());
  const [scrambled, setScrambled] = useState<string[]>(() =>
    text.split("").map((c) =>
      c === " " ? " " : characters[Math.floor(Math.random() * characters.length)]
    )
  );
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  const run = () => {
    if (hasRun.current) return;
    hasRun.current = true;
    setRevealedSet(new Set());
    setDone(false);

    // Scramble non-revealed chars continuously
    const scrambleInterval = setInterval(() => {
      setScrambled(
        text.split("").map((c) =>
          c === " " ? " " : characters[Math.floor(Math.random() * characters.length)]
        )
      );
    }, 50);

    // Reveal one char at a time
    let idx = 0;
    const revealNext = () => {
      if (idx >= text.length) {
        clearInterval(scrambleInterval);
        setDone(true);
        return;
      }
      const i = idx++;
      setRevealedSet((prev) => new Set([...prev, i]));
      setTimeout(revealNext, speed);
    };
    revealNext();
  };

  useEffect(() => {
    if (animateOn === "load") {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }
    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setTimeout(run, delay); observer.disconnect(); }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <span
      ref={containerRef}
      className="inline-block"
      onMouseEnter={animateOn === "hover" ? () => { hasRun.current = false; run(); } : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((char, i) => {
          const isRevealed = revealedSet.has(i) || done;
          return (
            <span
              key={i}
              className={isRevealed ? className : encryptedClassName}
              style={isRevealed ? revealedStyle : style}
            >
              {isRevealed ? char : scrambled[i]}
            </span>
          );
        })}
      </span>
    </span>
  );
}
