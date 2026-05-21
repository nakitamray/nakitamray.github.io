"use client";

/* ============================================================
   MenuScene.tsx — TEMPORARY placeholder.
   The banquet table + wine spill are retired.
   Chunk 2 rebuilds this as the dessert-lounge entry.
   ============================================================ */

interface MenuSceneProps {
  onEnterAbout?: () => void;
  onReachFeast?: () => void;
}

export default function MenuScene({ onEnterAbout }: MenuSceneProps) {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center gap-8 px-6"
      style={{ backgroundColor: "var(--color-espresso-deep)" }}
    >
      <p
        className="text-sm tracking-[0.3em] uppercase"
        style={{ color: "var(--color-led-glow)", opacity: 0.7 }}
      >
        the dessert lounge — coming in chunk 2
      </p>

      <button
        onClick={onEnterAbout}
        className="px-10 py-4 transition-all duration-500 hover:scale-105"
        style={{
          backgroundColor: "transparent",
          border: "1px solid var(--color-brass-needle)",
          borderRadius: "2px",
          color: "var(--color-cream-linen)",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontSize: "0.8rem",
        }}
      >
        about the chef
      </button>
    </section>
  );
}