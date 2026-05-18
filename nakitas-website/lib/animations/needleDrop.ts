/* ============================================================
   needleDrop.ts
   GSAP timeline: needle drops onto record, record spins,
   then camera zooms into the center hole as portal transition.
   ============================================================ */

import { gsap } from "gsap";

interface NeedleDropOptions {
  onComplete?: () => void;
}

export function playNeedleDropSequence({ onComplete }: NeedleDropOptions = {}) {
  const tl = gsap.timeline({
    onComplete,
    defaults: { ease: "power2.inOut" },
  });

  // 1. Fade out the trigger text gracefully
  tl.to(".loader-trigger", {
    opacity: 0,
    y: 10,
    duration: 0.6,
    ease: "power2.in",
  });

  // 2. Tonearm rotates into position over the record
  tl.to(
    "#tonearm-group",
    {
      rotation: -55,
      duration: 1.6,
      ease: "power3.inOut",
    },
    "-=0.2"
  );

  // 3. Small "needle touchdown" bounce
  tl.to("#needle-tip", {
    scale: 1.15,
    transformOrigin: "center",
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: "power2.out",
  });

  // 4. Record begins spinning forever (separate animation,
  //    not part of the main timeline so it persists)
  tl.add(() => {
    gsap.to("#vinyl-disc", {
      rotation: 360,
      duration: 1.8,
      ease: "none",
      repeat: -1,
      transformOrigin: "center",
    });
  });

  // 5. Hold so the visitor enjoys the music + spinning record
  tl.to({}, { duration: 2.5 });

  // 6. PORTAL ZOOM — scale the entire scene into the center hole
  tl.to(".gramophone-scene", {
    scale: 40,
    duration: 2.2,
    ease: "power3.in",
    transformOrigin: "center center",
  });

  // 7. Fade to black as the zoom ends
  tl.to(
    ".gramophone-scene",
    {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    },
    "-=0.4"
  );

  return tl;
}