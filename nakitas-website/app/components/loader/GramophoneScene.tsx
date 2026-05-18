"use client";

/* ============================================================
   GramophoneScene.tsx
   Loader scene with YouTube-powered audio.
   Clicking "turn up the volume" starts music + animation.
   ============================================================ */

import { useState, useRef } from "react";
import GramophoneSVG from "./GramophoneSVG";
import { currentTrack } from "@/lib/tracks";
import { playYouTubeTrack } from "@/lib/audioManager";
import { playNeedleDropSequence } from "@/lib/animations/needleDrop";

interface GramophoneSceneProps {
  /** Fires when YouTube playback actually begins (audio first heard) */
  onMusicStart?: () => void;
  /** Fires when the portal zoom completes */
  onTransitionComplete?: () => void;
}

export default function GramophoneScene({
  onMusicStart,
  onTransitionComplete,
}: GramophoneSceneProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleStart = async () => {
    if (hasStarted) return;
    setHasStarted(true);

    // Kick off YouTube audio with fade-in.
    // When it resolves, the music credit can become visible.
    playYouTubeTrack("youtube-player", currentTrack.youtubeId, {
      targetVolume: 45,
      startSeconds: currentTrack.startSeconds,
      fadeMs: 2000,
    })
      .then(() => {
        onMusicStart?.();
      })
      .catch((err) => {
        console.error("YouTube playback failed:", err);
        // Even if YouTube fails, still show the credit
        // so the user knows what was intended
        onMusicStart?.();
      });

    playNeedleDropSequence({
      onComplete: () => {
        onTransitionComplete?.();
      },
    });
  };

  return (
    <section
      ref={sceneRef}
      className="gramophone-scene relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "var(--color-midnight-ink)" }}
    >

      {/* The gramophone fills the scene */}
      <div id="vinyl-disc" className="relative w-[min(95vh,95vw)] aspect-square">
        <GramophoneSVG
          trackTitle={currentTrack.title}
          artistName={currentTrack.artist}
        />
      </div>

      {/* ===========================================================
          The clickable trigger
          =========================================================== */}
      <button
        onClick={handleStart}
        disabled={hasStarted}
        className="loader-trigger absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center z-10 group cursor-pointer no-select bg-transparent border-0 p-3"
        style={{
          fontFamily: "var(--font-italic-accent)",
        }}
        aria-label="Start the experience"
      >
        <span
          className="text-sm md:text-base italic transition-all duration-500"
          style={{
            color: "var(--color-paper-aged)",
            opacity: 0.7,
            letterSpacing: "0.12em",
          }}
        >
          click to begin{" "}
          <span
            className="not-italic"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75em",
              opacity: 0.6,
              letterSpacing: "0.2em",
            }}
          >
            (turn up the volume)
          </span>
        </span>
        <span
          className="block mx-auto mt-2 h-px transition-all duration-700 group-hover:w-32 group-hover:opacity-100"
          style={{
            width: "1rem",
            opacity: 0.3,
            backgroundColor: "var(--color-brass-needle)",
          }}
        />
      </button>
    </section>
  );
}