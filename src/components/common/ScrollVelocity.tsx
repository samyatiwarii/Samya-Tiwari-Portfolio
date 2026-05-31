"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";

function VelocityText({ children, baseVelocity, className, style }: { children: React.ReactNode; baseVelocity: number; className?: string; style?: React.CSSProperties }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 80, stiffness: 100 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.2], { clamp: true });
  const copyRef = useRef<HTMLSpanElement>(null);
  const widthRef = useRef(0);

  const wrap = useCallback((min: number, max: number, v: number) => {
    const range = max - min;
    return (((v - min) % range) + range) % range + min;
  }, []);

  const x = useTransform(baseX, (v) => {
    const w = widthRef.current;
    if (!w) return "0px";
    return `${Math.round(wrap(-w, 0, v))}px`;
  });

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 100);
    const vf = Math.max(-1.5, Math.min(1.5, velocityFactor.get()));
    if (vf < -0.05) directionFactor.current = -1;
    else if (vf > 0.05) directionFactor.current = 1;
    let moveBy = directionFactor.current * baseVelocity * (dt / 1000);
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
    if (copyRef.current) widthRef.current = copyRef.current.offsetWidth;
  });

  const spans = Array.from({ length: 6 }, (_, i) => (
    <span key={i} ref={i === 0 ? copyRef : undefined} className={`flex-shrink-0 ${className ?? ""}`} style={style}>
      {children}&nbsp;&nbsp;&nbsp;
    </span>
  ));

  return (
    <div className="overflow-hidden relative">
      <motion.div className="flex whitespace-nowrap" style={{ x, willChange: "transform" }}>
        {spans}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({ texts, velocity = 40, className, style }: { texts: string[]; velocity?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div>
      {texts.map((text, i) => (
        <VelocityText key={i} baseVelocity={i % 2 !== 0 ? -velocity : velocity} className={className} style={style}>
          {text}
        </VelocityText>
      ))}
    </div>
  );
}
