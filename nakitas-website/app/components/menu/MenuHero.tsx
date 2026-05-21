"use client";

/* ============================================================
   MenuHero.tsx
   Section 1 of the menu: hero text + "about the chef" button.
   ============================================================ */

interface MenuHeroProps {
  onEnterAbout?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MenuHero({ onEnterAbout }: MenuHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 z-10">
      <div className="text-center max-w-3xl">
        <div
          className="w-32 h-px mx-auto mb-12"
          style={{ backgroundColor: "var(--color-brass-needle)", opacity: 0.5 }}
        />

        <p
          className="text-xs tracking-[0.35em] uppercase mb-8"
          style={{ color: "var(--color-brass-needle)", opacity: 0.75 }}
        >
          est. by appetite &nbsp;·&nbsp; one seat, one story
        </p>

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

        <p
          className="max-w-xl mx-auto text-base md:text-lg mb-12 leading-relaxed"
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

        <button
          onClick={onEnterAbout}
          className="menu-cta relative px-12 py-5 overflow-hidden cursor-pointer transition-all duration-500 no-select hover:scale-105"
          style={{
            backgroundColor: "var(--color-sage-herb)",
            border: "1px solid var(--color-brass-needle)",
            borderRadius: "2px",
          }}
        >
          <span
            className="relative z-10 text-sm md:text-base tracking-[0.3em] uppercase"
            style={{
              color: "var(--color-cream-linen)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
            }}
          >
            about the chef
          </span>
        </button>

        <div className="mt-16 flex flex-col items-center">
          <p
            className="text-xs tracking-[0.3em] uppercase italic mb-3"
            style={{
              color: "var(--color-paper-aged)",
              opacity: 0.55,
              fontFamily: "var(--font-italic-accent)",
            }}
          >
            or scroll for tonight&apos;s tasting
          </p>
          <div
            className="w-px h-16"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-brass-needle), transparent)",
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </section>
  );
}