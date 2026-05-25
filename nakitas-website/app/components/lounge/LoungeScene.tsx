"use client";

/* ============================================================
   LoungeScene.tsx
   A dim jazz-lounge gallery wall. Frames packed at the edges,
   a clear text channel down the center. Wall sconces + a
   pendant glow warmly; the cursor carries a light to reveal
   the wall as you explore.
   ============================================================ */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCursorLight } from "@/lib/useCursorLight";
import PhotoFrame from "./PhotoFrame";
import { frames } from "./frames";
import {
  SconceCandle,
  SconceTulip,
  SconceLanternBox,
  SconceDecoFan,
  SconceGlobeArm,
} from "./WallLights";

interface LoungeSceneProps {
  onEnterAbout?: () => void;
}

export default function LoungeScene({ onEnterAbout }: LoungeSceneProps) {
  const cursorGlowRef = useCursorLight();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".gallery-frame", {
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
    });
    tl.to(
      ".lounge-entry-text",
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="lounge-scene relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-espresso-deep)" }}
    >
      {/* Warm wood-panel wall */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 110px, rgba(0,0,0,0.3) 114px), linear-gradient(180deg, #1f1409, var(--color-espresso-deep))",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Vignette to keep it moody */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 45%, transparent, rgba(10,6,4,0.7) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ===== WALL SCONCES — all different, scattered ===== */}
      <SconceCandle    style={{ top: "14%", left: "40%", zIndex: 2 }} />
      <SconceTulip     style={{ top: "38%", left: "30%", zIndex: 2 }} />
      <SconceGlobeArm  style={{ top: "33%", left: "60%", zIndex: 2 }} />
      <SconceLanternBox style={{ top: "62%", left: "44%", zIndex: 2 }} />
      <SconceDecoFan   style={{ top: "60%", left: "57%", zIndex: 2 }} />

      {/* ===== FRAMES ===== */}
      {frames.map((frame) => (
        <PhotoFrame key={frame.id} frame={frame} />
      ))}

      {/* ===== CURSOR LIGHT ===== */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "460px",
          height: "460px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,149,64,0.22) 0%, rgba(212,90,34,0.09) 32%, transparent 65%)",
          mixBlendMode: "screen",
          zIndex: 4,
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* ===== CENTER TEXT (in the clear channel) ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pointer-events-none">
        <div
          className="lounge-entry-text pointer-events-auto"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-cream-linen)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            the dessert
            <br />
            <span
              style={{
                fontFamily: "var(--font-italic-accent)",
                fontStyle: "italic",
                color: "var(--color-led-glow)",
              }}
            >
              lounge
            </span>
          </h2>

          <p
            className="text-base md:text-lg mb-12"
            style={{
              color: "var(--color-paper-aged)",
              opacity: 0.7,
              fontFamily: "var(--font-italic-accent)",
              fontStyle: "italic",
              letterSpacing: "0.04em",
            }}
          >
            pull up a chair.
          </p>

          <button
            onClick={onEnterAbout}
            className="group inline-flex items-center gap-3 px-8 py-3 transition-all duration-500 cursor-pointer no-select mb-16 hover:gap-4"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-brass-needle)",
              borderRadius: "2px",
            }}
          >
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--color-cream-linen)", fontFamily: "var(--font-body)" }}
            >
              about the chef
            </span>
          </button>

          <div className="flex flex-col items-center">
            <p
              className="text-xs tracking-[0.3em] uppercase italic mb-3"
              style={{
                color: "var(--color-paper-aged)",
                opacity: 0.45,
                fontFamily: "var(--font-italic-accent)",
              }}
            >
              scroll to look around
            </p>
            <div
              className="w-px h-12"
              style={{
                background: "linear-gradient(to bottom, var(--color-led-glow), transparent)",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}