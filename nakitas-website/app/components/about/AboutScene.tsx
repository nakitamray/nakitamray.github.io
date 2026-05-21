"use client";

/* ============================================================
   AboutScene.tsx
   1. Green bleeds in from menu transition
   2. Cream envelope appears center-screen with seal text
   3. Envelope opens (flap rotates up), letter slides out
   4. Letter scales up to fill ~85% of screen (burgundy border visible)
   5. Letter contains photo (left) + typewriter body (right)
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { typewriter } from "@/lib/animations/typewriter";

interface AboutSceneProps {
  onBackToMenu?: () => void;
}

const HEADING_TEXT = "about me";

const BODY_TEXT = `i'm nakita ray — a computer scientist, mathematician, and the kind of person who treats every project like a multi-course meal.

i study at purdue, where i double-major in computer science and mathematics. last summer i was a software engineering intern at the mitre corporation, where i learned that the best engineering, like the best cooking, lives in the details.

beyond the keyboard, i build things i wish existed: carbonfork, narwomen in stem, a photo archive of golden-hour light wherever i find it.

code should read like a recipe. leadership should feel like hospitality. every portfolio deserves a soundtrack.

welcome to the table.`;

type Stage = "envelope" | "opening" | "letter";

export default function AboutScene({ onBackToMenu }: AboutSceneProps) {
  const [stage, setStage] = useState<Stage>("envelope");
  const [bodyComplete, setBodyComplete] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  // Auto-trigger envelope opening after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      openEnvelope();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const openEnvelope = () => {
    if (stage !== "envelope") return;
    setStage("opening");

    const tl = gsap.timeline({
      onComplete: () => setStage("letter"),
    });

    // 1. The seal "breaks" — pulses briefly, then fades
    //    (subtle moment of anticipation before the flap opens)
    tl.to(".envelope-seal", {
      scale: 1.15,
      duration: 0.25,
      ease: "power2.out",
    });

    tl.to(".envelope-seal", {
      scale: 1,
      opacity: 0.0,
      duration: 0.25,
      ease: "power2.in",
    });

    // 2. Brief pause — the "is something happening?" beat
    tl.to({}, { duration: 0.15 });

    // 3. The flap slowly rotates open (this is the showpiece —
    //    let it breathe)
    tl.to(".envelope-flap", {
      rotateX: 180,
      duration: 1.2,
      ease: "power2.inOut",
      transformOrigin: "top center",
    });

    // 4. Brief pause so user can see the open envelope
    tl.to({}, { duration: 0.3 });

    // 5. Letter slides up out of envelope, deliberately
    tl.to(
      ".envelope-letter-preview",
      {
        y: -140,
        duration: 1.4,
        ease: "power2.out",
      }
    );

    // 6. One more breathing moment
    tl.to({}, { duration: 0.25 });

    // 7. Whole envelope fades out slowly
    tl.to(".envelope-container", {
      opacity: 0,
      duration: 1.0,
      ease: "power2.in",
    });

    return tl;
  };

  // Once stage = "letter", animate the letter in and start typing
  useEffect(() => {
    if (stage !== "letter" || !letterRef.current) return;

    const tl = gsap.timeline();

    // Letter scales up + fades in
    tl.from(letterRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    // After it's visible, start typing heading
    tl.add(() => {
      typewriter({
        target: "#about-heading",
        text: HEADING_TEXT,
        duration: 1.2,
        delay: 0.2,
        keepCursor: false,
        onComplete: () => {
          typewriter({
            target: "#about-body",
            text: BODY_TEXT,
            duration: 7,
            delay: 0.5,
            keepCursor: true,
            onComplete: () => setBodyComplete(true),
          });
        },
      });
    });
  }, [stage]);

  return (
    <section
      className="about-scene relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "var(--color-kombu-green)" }}
    >
      {/* ===========================================================
          BACK BUTTON — top left, always visible
          =========================================================== */}
      <button
        onClick={onBackToMenu}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 transition-all duration-300 group cursor-pointer no-select"
        style={{
          backgroundColor: "transparent",
          border: "1px solid var(--color-brass-needle)",
          borderRadius: "2px",
          opacity: 0.8,
        }}
      >
        <span
          className="transition-transform duration-300 group-hover:-translate-x-1"
          style={{ color: "var(--color-cream-linen)" }}
        >
          ←
        </span>
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{
            color: "var(--color-cream-linen)",
            fontFamily: "var(--font-body)",
          }}
        >
          menu
        </span>
      </button>

      {/* ===========================================================
          STAGE 1/2: ENVELOPE
          =========================================================== */}
      {(stage === "envelope" || stage === "opening") && (
        <div className="envelope-container relative" style={{ perspective: "1200px" }}>
          {/* Envelope body */}
          <div
            ref={envelopeRef}
            className="relative shadow-2xl"
            style={{
              width: "380px",
              height: "240px",
              backgroundColor: "var(--color-cream-linen)",
              borderRadius: "4px",
            }}
          >
            {/* Envelope back/body texture */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-cream-linen) 0%, var(--color-paper-aged) 100%)",
                borderRadius: "4px",
              }}
            />

            {/* Letter preview peeking out from inside */}
            <div
              className="envelope-letter-preview absolute left-4 right-4 bottom-4 z-10"
              style={{
                height: "180px",
                backgroundColor: "#fefcf7",
                borderRadius: "2px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <div
                className="text-center pt-6"
                style={{
                  color: "var(--color-ink-shadow)",
                  fontFamily: "var(--font-italic-accent)",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  opacity: 0.5,
                }}
              >
                a letter inside
              </div>
            </div>

            {/* Envelope FLAP — rotates open on animation */}
            <div
              className="envelope-flap absolute top-0 left-0 right-0 z-20"
              style={{
                height: "0",
                borderLeft: "190px solid transparent",
                borderRight: "190px solid transparent",
                borderTop: "120px solid var(--color-paper-aged)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            />

            {/* Wax seal (decorative) */}
            <div
              className="envelope-seal absolute z-30"
              style={{
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "var(--color-deep-emerald)",
                boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="flex items-center justify-center w-full h-full"
                style={{
                  color: "var(--color-brass-needle)",
                  fontFamily: "var(--font-italic-accent)",
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                n
              </div>
            </div>
          </div>

          {/* Seal description below envelope */}
          <p
            className="text-center mt-8 text-sm italic tracking-wider"
            style={{
              color: "var(--color-paper-aged)",
              opacity: 0.7,
              fontFamily: "var(--font-italic-accent)",
            }}
          >
            from the desk of nakita ray
          </p>
        </div>
      )}

      {/* ===========================================================
          STAGE 3: LETTER (scales up to fill ~85% with red border)
          =========================================================== */}
      {stage === "letter" && (
        <div
          ref={letterRef}
          className="relative my-8 mx-4 shadow-2xl flex"
          style={{
            width: "min(90vw, 1100px)",
            minHeight: "85vh",
            backgroundColor: "#fefcf7",
            borderRadius: "3px",
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 80px, rgba(80,60,40,0.025) 80px, rgba(80,60,40,0.025) 81px)",
          }}
        >
          {/* Decorative top corners */}
          <div className="absolute top-6 left-6 flex flex-col gap-1 no-select pointer-events-none">
            <p
              className="text-xs tracking-[0.4em] uppercase"
              style={{
                color: "var(--color-ink-shadow)",
                opacity: 0.45,
                fontFamily: "var(--font-body)",
              }}
            >
              chapter 01
            </p>
            <p
              className="text-xs italic"
              style={{
                color: "var(--color-ink-shadow)",
                opacity: 0.35,
                fontFamily: "var(--font-italic-accent)",
                letterSpacing: "0.1em",
              }}
            >
              a brief introduction
            </p>
          </div>

          <div className="absolute top-6 right-6 no-select pointer-events-none text-right">
            <p
              className="text-xs italic"
              style={{
                color: "var(--color-ink-shadow)",
                opacity: 0.45,
                fontFamily: "var(--font-italic-accent)",
                letterSpacing: "0.1em",
              }}
            >
              written after too much coffee
            </p>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mt-1"
              style={{
                color: "var(--color-ink-shadow)",
                opacity: 0.3,
                fontFamily: "var(--font-body)",
              }}
            >
              n.m.ray · 2026
            </p>
          </div>

          {/* ===========================================================
              CONTENT: photo (left) + text (right)
              =========================================================== */}
          <div className="flex flex-col md:flex-row gap-10 p-16 md:p-20 pt-24 md:pt-28 w-full">
            {/* Photo column */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-start">
              <div
                className="relative overflow-hidden shadow-lg"
                style={{
                  width: "260px",
                  height: "320px",
                  border: "8px solid #fefcf7",
                  outline: "1px solid rgba(0,0,0,0.1)",
                  backgroundColor: "var(--color-paper-aged)",
                }}
              >
                {/* Drop your photo at public/images/nakita.jpg */}
                <Image
                  src="/images/nakita.jpg"
                  alt="Nakita Ray"
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    // Fallback: hide image, show placeholder text
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback placeholder shown if image missing */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-center px-4"
                  style={{
                    color: "var(--color-ink-shadow)",
                    fontFamily: "var(--font-italic-accent)",
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                    opacity: 0.4,
                    zIndex: -1,
                  }}
                >
                  add nakita.jpg
                  <br />
                  to public/images/
                </div>
              </div>

              <p
                className="mt-3 text-xs italic"
                style={{
                  color: "var(--color-ink-shadow)",
                  opacity: 0.55,
                  fontFamily: "var(--font-italic-accent)",
                  letterSpacing: "0.08em",
                }}
              >
                — hi, i'm real
              </p>
            </div>

            {/* Text column */}
            <div className="flex-1 min-w-0">
              <h1
                id="about-heading"
                className="text-5xl md:text-7xl mb-4 lowercase"
                style={{
                  fontFamily: "var(--font-italic-accent)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--color-ink-shadow)",
                  letterSpacing: "-0.01em",
                  minHeight: "1.2em",
                }}
              />

              <div
                className="w-16 h-px mb-8"
                style={{
                  backgroundColor: "var(--color-ink-shadow)",
                  opacity: 0.4,
                }}
              />

              <div
                id="about-body"
                className="text-sm md:text-base leading-relaxed whitespace-pre-line"
                style={{
                  fontFamily: "var(--font-letter)",
                  color: "var(--color-ink-shadow)",
                  opacity: 0.92,
                  minHeight: "20rem",
                  letterSpacing: "0.02em",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}