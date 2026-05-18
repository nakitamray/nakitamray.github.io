"use client";

/* ============================================================
   MusicCredit.tsx
   The subtle "now playing" widget in the bottom-right corner.
   Shows a small music icon + track title + artist in italic.
   Designed to be present but never demand attention.
   ============================================================ */

import { currentTrack } from "@/lib/tracks";

interface MusicCreditProps {
  /** Whether the music has actually started — controls visibility */
  isVisible: boolean;
}

export default function MusicCredit({ isVisible }: MusicCreditProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 no-select transition-opacity duration-1000 pointer-events-none"
      style={{
        opacity: isVisible ? 0.55 : 0,
        fontFamily: "var(--font-italic-accent)",
      }}
      aria-label={`Now playing: ${currentTrack.title} by ${currentTrack.artist}`}
    >
      {/* Tiny vinyl/music icon — built inline as SVG so it inherits colors */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        {/* Outer circle (vinyl edge) */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--color-brass-needle)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Inner ring */}
        <circle
          cx="12"
          cy="12"
          r="6"
          stroke="var(--color-brass-needle)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.5" fill="var(--color-brass-needle)" />
      </svg>

      <p
        className="text-xs italic tracking-wider"
        style={{
          color: "var(--color-paper-aged)",
          letterSpacing: "0.06em",
        }}
      >
        {currentTrack.title}{" "}
        <span
          className="not-italic"
          style={{
            opacity: 0.7,
            fontFamily: "var(--font-body)",
          }}
        >
          — {currentTrack.artist}
        </span>
      </p>
    </div>
  );
}