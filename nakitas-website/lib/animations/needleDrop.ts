/* ============================================================
   needleDrop.ts
   GSAP timeline:
   1. Hint fades
   2. Tonearm rotates counterclockwise from rest to onto-record
   3. Subtle needle bounce
   4. Record begins infinite spin
   5. Hold for ambiance
   6. Portal zoom + color fill
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

  // 1. Fade the hint
  tl.to(".loader-hint", {
    opacity: 0,
    y: 10,
    duration: 0.6,
    ease: "power2.in",
  });

  // 2. Tonearm rotates counterclockwise (negative degrees) from
  //    rest position. Pivot at (760, 130), arm angles toward
  //    record. Rotating -32° swings needle further left onto
  //    the outer groove.
  tl.to(
    "#tonearm-group",
    {
      rotation: 25,
      duration: 1.6,
      ease: "power3.inOut",
      svgOrigin: "760 130", // GSAP-specific: explicit SVG rotation origin
    },
    "-=0.2"
  );

  // 3. Needle bounce
  tl.to("#needle-tip", {
    scale: 1.3,
    transformOrigin: "center",
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: "power2.out",
  });

  // 4. RECORD SPIN — separate infinite tween. svgOrigin tells
  //    GSAP to rotate around (400, 400) in SVG coordinates,
  //    bypassing CSS transform-origin issues with SVG groups.
  tl.add(() => {
    gsap.to("#record-group", {
      rotation: 360,
      duration: 4,
      ease: "none",
      repeat: -1,
      svgOrigin: "400 400",
    });
  });

  // 5. Hold for ambiance
  tl.to({}, { duration: 2.8 });

  // 6. Portal zoom
  tl.to(".gramophone-scene", {
    scale: 50,
    duration: 2.4,
    ease: "power3.in",
    transformOrigin: "center center",
  });

  // 7. Solid color fill at the end
  tl.to(
    ".portal-fill",
    {
      opacity: 1,
      duration: 0.8,
      ease: "power2.in",
    },
    "-=1.0"
  );

  return tl;
}