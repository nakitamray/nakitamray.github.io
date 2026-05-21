"use client";

/* ============================================================
   MusicCredit.tsx
   Subtle "now playing" widget in the bottom-right corner.
   Adapts its color scheme based on the background it's on.
   ============================================================ */

import { currentTrack } from "@/lib/tracks";

interface MusicCreditProps {
  isVisible: boolean;
  /** 'dark' for dark backgrounds, 'light' for cream backgrounds */
  variant?: "dark" | "light";
}

export default function MusicCredit({
  isVisible,
  variant = "dark",
}: MusicCreditProps) {
  const isLight = variant === "light";

  const iconColor = isLight
    ? "var(--color-ink-shadow)"
    : "var(--color-brass-needle)";
  const textColor = isLight
    ? "var(--color-ink-shadow)"
    : "var(--color-paper-aged)";
  const opacity = isVisible ? (isLight ? 0.6 : 0.55) : 0;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 no-select transition-opacity duration-1000 pointer-events-none"
      style={{
        opacity,
        fontFamily: "var(--font-italic-accent)",
      }}
      aria-label={`Now playing: ${currentTrack.title} by ${currentTrack.artist}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke={iconColor} strokeWidth="1.2" fill="none" />
        <circle cx="12" cy="12" r="6" stroke={iconColor} strokeWidth="0.8" fill="none" opacity="0.6" />
        <circle cx="12" cy="12" r="1.5" fill={iconColor} />
      </svg>

      <p
        className="text-xs italic tracking-wider"
        style={{ color: textColor, letterSpacing: "0.06em" }}
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