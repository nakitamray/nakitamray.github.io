"use client";

/* ============================================================
   GramophoneScene.tsx
   Loader scene with clickable needle and YouTube audio.
   Click the needle to start music + animation sequence.
   Cool blue-black room lit by a warm red-amber glow.
   ============================================================ */

import { useState } from "react";
import GramophoneSVG from "./GramophoneSVG";
import { currentTrack } from "@/lib/tracks";
import { playYouTubeTrack } from "@/lib/audioManager";
import { playNeedleDropSequence } from "@/lib/animations/needleDrop";

interface GramophoneSceneProps {
  onMusicStart?: () => void;
  onTransitionComplete?: () => void;
}

export default function GramophoneScene({
  onMusicStart,
  onTransitionComplete,
}: GramophoneSceneProps) {
  const [hasStarted, setHasStarted] = useState(false);

  const handleNeedleClick = () => {
    if (hasStarted) return;
    setHasStarted(true);

    playYouTubeTrack("youtube-player", currentTrack.youtubeId, {
      targetVolume: 45,
      startSeconds: currentTrack.startSeconds,
      fadeMs: 2000,
    })
      .then(() => onMusicStart?.())
      .catch((err) => {
        console.error("YouTube playback failed:", err);
        onMusicStart?.();
      });

    playNeedleDropSequence({
      onComplete: () => onTransitionComplete?.(),
    });
  };

  return (
    <section
      className="gramophone-scene relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "var(--color-loader-shadow)" }}
    >
      {/* Warm overhead light — a warm lamp washing over the cool scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 42%, rgba(212, 74, 28, 0.16), transparent 68%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* The gramophone fills the scene */}
      <div className="relative w-[min(95vh,95vw)] aspect-square">
        <GramophoneSVG
          trackTitle={currentTrack.title}
          artistName={currentTrack.artist}
          onNeedleClick={handleNeedleClick}
          needleClicked={hasStarted}
        />
      </div>

      {/* Bottom hint */}
      <div className="loader-hint absolute bottom-[5%] left-1/2 -translate-x-1/2 text-center z-10 no-select pointer-events-none">
        <p
          style={{
            color: "var(--color-cream-linen)",
            opacity: 0.85,
            fontFamily: "var(--font-italic-accent)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            letterSpacing: "0.12em",
            marginBottom: "0.5rem",
          }}
        >
          begin your experience — tap the needle
        </p>
        <p
          style={{
            color: "var(--color-brass-needle)",
            opacity: 0.65,
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          (turn your volume up)
        </p>
      </div>

      {/* PORTAL FILL OVERLAY — warms into the lounge */}
      <div
        className="portal-fill absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "var(--color-espresso-wood)",
          opacity: 0,
          zIndex: 5,
        }}
        aria-hidden="true"
      />
    </section>
  );
}