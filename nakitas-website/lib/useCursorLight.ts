"use client";

/* ============================================================
   useCursorLight.ts
   Tracks the cursor position (smoothed) so components can
   render a warm light that follows the mouse. Returns a ref
   to attach to the glow element — we update it directly via
   style for performance (no re-render per mouse move).
   ============================================================ */

import { useEffect, useRef } from "react";

export function useCursorLight() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame: number;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Smoothly ease the glow toward the cursor each frame (lag = luxury)
    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return glowRef;
}