"use client";

import { useEffect, useRef } from "react";

interface LineBackgroundProps {
  className?: string;
  lineColor?: string;
  lineCount?: number;
  animated?: boolean;
}

export default function LineBackground({
  className = "",
  lineColor = "rgba(200, 184, 154, 0.07)",
  lineCount = 6,
  animated = true,
}: LineBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const noise = (x: number, y: number, t: number) =>
      Math.sin(x * 0.8 + t * 0.1) * Math.cos(y * 0.6 + t * 0.07) * 0.4 +
      Math.sin(x * 0.4 - y * 0.5 + t * 0.06) * 0.3 +
      Math.cos(x * 1.1 + y * 0.9 - t * 0.09) * 0.2 +
      Math.sin(x * 0.25 + y * 0.3 + t * 0.04) * 0.1;

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      const cellSize = Math.max(18, Math.max(w, h) / 90);
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const cw = w / cols;
      const ch = h / rows;

      const field: number[][] = [];
      for (let j = 0; j <= rows; j++) {
        field[j] = [];
        for (let i = 0; i <= cols; i++) {
          field[j][i] = noise((i * cw) / 280, (j * ch) / 280, t);
        }
      }

      for (let c = 0; c < lineCount; c++) {
        const threshold = -0.8 + (1.6 * c) / (lineCount - 1);
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const v00 = field[j][i], v10 = field[j][i+1];
            const v01 = field[j+1][i], v11 = field[j+1][i+1];
            const x0 = i * cw, y0 = j * ch, x1 = x0 + cw, y1 = y0 + ch;
            const lerp = (a: number, b: number, va: number, vb: number) => a + ((b - a) * (threshold - va)) / (vb - va);
            const idx = (v00 > threshold ? 8 : 0) | (v10 > threshold ? 4 : 0) | (v11 > threshold ? 2 : 0) | (v01 > threshold ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const top = { x: lerp(x0, x1, v00, v10), y: y0 };
            const right = { x: x1, y: lerp(y0, y1, v10, v11) };
            const bottom = { x: lerp(x0, x1, v01, v11), y: y1 };
            const left = { x: x0, y: lerp(y0, y1, v00, v01) };
            const segs: [[{x:number;y:number},{x:number;y:number}]] = (() => {
              switch(idx) {
                case 1: return [[bottom,left]];
                case 2: return [[right,bottom]];
                case 3: return [[right,left]];
                case 4: return [[top,right]];
                case 6: return [[top,bottom]];
                case 7: return [[top,left]];
                case 8: return [[left,top]];
                case 9: return [[bottom,top]];
                case 11: return [[right,top]];
                case 12: return [[left,right]];
                case 13: return [[bottom,right]];
                case 14: return [[left,bottom]];
                case 5: return [[top,left],[right,bottom]] as any;
                case 10: return [[left,bottom],[top,right]] as any;
                default: return [];
              }
            })() as any;
            for (const [from, to] of segs) {
              ctx.moveTo(from.x, from.y);
              ctx.lineTo(to.x, to.y);
            }
          }
        }
        ctx.stroke();
        ctx.beginPath();
      }
    };

    const animate = () => {
      timeRef.current += animated ? 0.03 : 0;
      draw(timeRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [lineColor, lineCount, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
    />
  );
}
