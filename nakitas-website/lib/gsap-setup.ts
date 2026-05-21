/* ============================================================
   gsap-setup.ts
   Central registration for all GSAP plugins.
   Import this from any component that uses ScrollTrigger.
   ============================================================ */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Only register once on the client.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };