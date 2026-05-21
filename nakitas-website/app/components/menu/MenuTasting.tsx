"use client";

/* ============================================================
   MenuTasting.tsx
   The tasting menu list. Centered, sits above the bottom shelf
   of decorative props and the wine glass.
   ============================================================ */

const COURSES = [
  { en: "puri & sambar", fr: "indian · resume" },
  { en: "sashimi", fr: "japanese · projects" },
  { en: "dim sum", fr: "chinese · machine learning" },
  { en: "mezze", fr: "turkish · leadership" },
  { en: "lamb & tzatziki", fr: "greek · contact" },
  { en: "truffle pasta", fr: "italian · photography" },
  { en: "injera platter", fr: "ethiopian · community" },
];

export default function MenuTasting() {
  return (
    <div className="relative z-10 text-center max-w-3xl">
      <p
        className="text-xs tracking-[0.4em] uppercase mb-6"
        style={{ color: "var(--color-brass-needle)", opacity: 0.75 }}
      >
        tonight&apos;s tasting
      </p>
      <h3
        className="text-3xl md:text-5xl mb-10 leading-tight"
        style={{
          fontFamily: "var(--font-italic-accent)",
          fontStyle: "italic",
          color: "var(--color-cream-linen)",
          fontWeight: 300,
        }}
      >
        seven dishes, one storyteller.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-left max-w-2xl mx-auto mb-10">
        {COURSES.map((course, i) => (
          <div
            key={i}
            className="flex items-baseline justify-between gap-2 py-2 border-b"
            style={{
              borderBottomColor: "rgba(201, 169, 97, 0.2)",
            }}
          >
            <span
              className="text-base md:text-lg italic"
              style={{
                color: "var(--color-cream-linen)",
                fontFamily: "var(--font-italic-accent)",
                fontStyle: "italic",
              }}
            >
              {course.en}
            </span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: "var(--color-brass-needle)",
                opacity: 0.7,
                fontFamily: "var(--font-body)",
              }}
            >
              {course.fr}
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-sm italic tracking-wider"
        style={{
          color: "var(--color-paper-aged)",
          opacity: 0.6,
          fontFamily: "var(--font-italic-accent)",
        }}
      >
        keep scrolling for a pour.
      </p>
    </div>
  );
}