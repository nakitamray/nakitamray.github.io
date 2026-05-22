"use client";

/* ============================================================
   LoungeScene.tsx
   The dessert lounge entry.
   - Arrives dark, "lights come up" across the wall
   - Cursor carries a warm light that reveals the dark wall
   - Entry text fades up in a warm pool
   Chunk 3 adds the shelves + framed photos.
   ============================================================ */

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useCursorLight } from "@/lib/useCursorLight";

interface LoungeSceneProps {
  onEnterAbout?: () => void;
}

export default function LoungeScene({ onEnterAbout }: LoungeSceneProps) {
  const cursorGlowRef = useCursorLight();
  const [lightsUp, setLightsUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // "Lights coming up" sequence on mount
  useEffect(() => {
    const tl = gsap.timeline();

    // The LED bands flicker/warm up one by one
    tl.to(".led-band", {
      opacity: 1,
      duration: 0.5,
      stagger: 0.25, // each band lights 0.25s after the previous
      ease: "power2.out",
    });

    // Entry text fades up after lights are mostly on
    tl.to(
      ".lounge-entry-text",
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        onStart: () => setLightsUp(true),
      },
      "-=0.4"
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
      {/* ===========================================================
          DARK WOOD WALL TEXTURE
          Subtle vertical grain to suggest wood paneling
          =========================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 60px, rgba(0,0,0,0.25) 63px), linear-gradient(180deg, var(--color-espresso-wood), var(--color-espresso-deep))",
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      {/* ===========================================================
          LED LIGHT BANDS — horizontal warm washes across shelves
          These start at opacity 0 and "light up" on mount.
          For now they're evenly spaced; Chunk 3 aligns them with
          actual shelves.
          =========================================================== */}
      {[18, 38, 58, 78].map((topPct, i) => (
        <div
          key={`band-${i}`}
          className="led-band absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${topPct}%`,
            height: "2px",
            opacity: 0,
            background:
              "linear-gradient(90deg, transparent, var(--color-led-glow) 20%, var(--color-led-glow) 80%, transparent)",
            boxShadow:
              "0 0 24px 6px var(--color-led-edge), 0 8px 40px 8px rgba(212, 104, 42, 0.35)",
            zIndex: 2,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ===========================================================
          CURSOR LIGHT — warm glow that follows the mouse
          Fixed so it tracks across the whole viewport.
          Uses mix-blend so it "illuminates" rather than covers.
          =========================================================== */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232, 149, 64, 0.18) 0%, rgba(212, 104, 42, 0.08) 35%, transparent 70%)",
          mixBlendMode: "screen",
          zIndex: 3,
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* ===========================================================
          ENTRY TEXT — in a warm pool, fades up after lights
          =========================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div
          className="lounge-entry-text"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--color-led-glow)", opacity: 0.8 }}
          >
            after hours
          </p>

          <h2
            className="text-5xl md:text-7xl lg:text-8xl mb-6"
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
            className="max-w-md mx-auto text-base md:text-lg mb-12 leading-relaxed"
            style={{
              color: "var(--color-paper-aged)",
              opacity: 0.75,
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            a curated evening of light, sound, and small sweet things.
            by nakita.
          </p>

          {/* About the chef — discreet entry */}
          <button
            onClick={onEnterAbout}
            className="group inline-flex items-center gap-3 px-8 py-3 transition-all duration-500 cursor-pointer no-select mb-16"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-brass-needle)",
              borderRadius: "2px",
            }}
          >
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{
                color: "var(--color-cream-linen)",
                fontFamily: "var(--font-body)",
              }}
            >
              about the chef
            </span>
          </button>

          {/* Scroll cue */}
          <div className="flex flex-col items-center">
            <p
              className="text-xs tracking-[0.3em] uppercase italic mb-3"
              style={{
                color: "var(--color-paper-aged)",
                opacity: 0.5,
                fontFamily: "var(--font-italic-accent)",
              }}
            >
              scroll to enter
            </p>
            <div
              className="w-px h-12 lounge-scroll-cue"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-led-glow), transparent)",
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}