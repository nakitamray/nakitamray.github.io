"use client";

/* ============================================================
   MenuScene.tsx
   The vertical sliding interface visitors land on after the
   gramophone's portal zoom completes.

   Step 5: builds the visual structure (hero + button).
   Step 6 will add scroll-driven reveal animations + the
   ink-spread transition into the feast scene.
   ============================================================ */

interface MenuSceneProps {
  /** Called when "check out the menu" is clicked — triggers
   *  the ink-spread transition to the feast scene */
  onEnterFeast?: () => void;
}

export default function MenuScene({ onEnterFeast }: MenuSceneProps) {
  return (
    <section
      className="menu-scene relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-midnight-ink)" }}
    >
      {/* ===========================================================
          Decorative top border — slim brass line that echoes
          a high-end menu's editorial bar
          =========================================================== */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px mt-12"
        style={{ backgroundColor: "var(--color-brass-needle)", opacity: 0.5 }}
      />

      {/* ===========================================================
          HERO BLOCK — first thing visitors see post-portal
          Editorial typography, lowercase, tracked, BOOJIE energy
          =========================================================== */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Tiny pre-header — the kind of label you see on luxury menus */}
        <p
          className="text-xs tracking-[0.35em] uppercase mb-8"
          style={{ color: "var(--color-brass-needle)", opacity: 0.75 }}
        >
          est. by appetite &nbsp;·&nbsp; one seat, one story
        </p>

        {/* Main hero headline */}
        <h2
          className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-cream-linen)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
          }}
        >
          a portfolio,
          <br />
          <span
            style={{
              fontFamily: "var(--font-italic-accent)",
              fontStyle: "italic",
              color: "var(--color-brass-needle)",
            }}
          >
            served slowly.
          </span>
        </h2>

        {/* Subhead — describes the experience */}
        <p
          className="max-w-xl text-base md:text-lg mb-16 leading-relaxed"
          style={{
            color: "var(--color-paper-aged)",
            opacity: 0.85,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
          }}
        >
          welcome to a curated table of code, design, and community —
          each dish a chapter of who nakita is, and what she&apos;s built.
        </p>

        {/* ============================================
            THE BUTTON
            "check out the menu" — bordered brass button
            with hover state that hints at the ink-spread
            ============================================ */}
        <button
          onClick={onEnterFeast}
          className="menu-cta group relative px-12 py-5 overflow-hidden cursor-pointer transition-all duration-500 no-select"
          style={{
            backgroundColor: "transparent",
            border: "1px solid var(--color-brass-needle)",
            borderRadius: "2px",
          }}
        >
          {/* Hover background — fills with burgundy from center */}
          <span
            className="absolute inset-0 transition-transform duration-700 origin-center scale-0 group-hover:scale-100"
            style={{
              backgroundColor: "var(--color-burgundy-velvet)",
              borderRadius: "1px",
            }}
            aria-hidden="true"
          />

          {/* Button text — sits above the hover fill */}
          <span
            className="relative z-10 text-sm md:text-base tracking-[0.3em] uppercase transition-colors duration-500"
            style={{
              color: "var(--color-brass-needle)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
            }}
          >
            check out the menu
          </span>
        </button>

        {/* Scroll hint below the button */}
        <p
          className="mt-20 text-xs tracking-[0.3em] uppercase italic"
          style={{
            color: "var(--color-paper-aged)",
            opacity: 0.4,
            fontFamily: "var(--font-italic-accent)",
          }}
        >
          or scroll to peek
        </p>

        {/* Animated scroll indicator — vertical line that pulses */}
        <div className="mt-4 flex flex-col items-center">
          <div
            className="w-px h-12 menu-scroll-line"
            style={{
              backgroundColor: "var(--color-brass-needle)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      {/* ===========================================================
          PLACEHOLDER for the scroll-revealed content
          (Step 6 will populate this with the chic teaser sections)
          =========================================================== */}
      <div className="px-6 py-32 flex items-center justify-center min-h-[60vh]">
        <p
          className="text-sm tracking-widest uppercase italic"
          style={{
            color: "var(--color-paper-aged)",
            opacity: 0.3,
            fontFamily: "var(--font-italic-accent)",
          }}
        >
          scroll reveals coming in step 6 · feast in step 7
        </p>
      </div>
    </section>
  );
}