/* ============================================================
   typewriter.ts
   Visible typewriter effect with a blinking cursor.
   Text appears character by character with a |  cursor
   that follows the typing then blinks after completion.
   ============================================================ */

import { gsap } from "gsap";

interface TypewriterOptions {
  target: string;
  text: string;
  duration?: number;
  delay?: number;
  /** Whether to keep the cursor blinking after typing finishes */
  keepCursor?: boolean;
  onComplete?: () => void;
}

export function typewriter({
  target,
  text,
  duration = 2,
  delay = 0,
  keepCursor = true,
  onComplete,
}: TypewriterOptions) {
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;

  if (!el) return null;

  el.innerHTML = "";

  // Create cursor element that lives next to the typing text
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "|";

  // Container for the typed text (separate from cursor)
  const textSpan = document.createElement("span");
  textSpan.className = "typewriter-text";

  el.appendChild(textSpan);
  el.appendChild(cursor);

  const proxy = { chars: 0 };

  return gsap.to(proxy, {
    chars: text.length,
    duration,
    delay,
    ease: "none",
    onUpdate: () => {
      textSpan.textContent = text.slice(0, Math.ceil(proxy.chars));
    },
    onComplete: () => {
      if (!keepCursor) {
        cursor.remove();
      }
      onComplete?.();
    },
  });
}