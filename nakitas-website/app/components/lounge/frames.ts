/* ============================================================
   frames.ts
   Gallery wall — varied shapes & sizes, NO overlap.
   Positions are hand-placed in two edge columns with a clear
   center channel. Each frame has a distinct shape.
   ============================================================ */

export type FrameShape =
  | "rect"
  | "rounded"
  | "oval"
  | "circle"
  | "arch"      // rounded top, flat bottom (window/tombstone)
  | "organic";  // irregular blob

export interface Frame {
  id: string;
  top: string;
  left: string;
  width: number;
  ratio: number;     // height / width
  rotate: number;
  shape: FrameShape;
  src: string | null;
  caption?: string;
}

export const frames: Frame[] = [
  // ===== LEFT COLUMN (spaced, no overlap) =====
  { id: "L1", top: "5%",  left: "2%",  width: 160, ratio: 0.8,  rotate: -2, shape: "rect",    src: null, caption: "lisbon" },
  { id: "L2", top: "5%",  left: "19%", width: 95,  ratio: 1.3,  rotate: 2,  shape: "arch",    src: null },
  { id: "L3", top: "27%", left: "4%",  width: 110, ratio: 1.0,  rotate: 1,  shape: "circle",  src: null },
  { id: "L4", top: "26%", left: "18%", width: 90,  ratio: 1.25, rotate: -2, shape: "oval",    src: null, caption: "her" },
  { id: "L5", top: "48%", left: "3%",  width: 150, ratio: 0.75, rotate: -1, shape: "rounded", src: null, caption: "the river" },
  { id: "L6", top: "47%", left: "21%", width: 85,  ratio: 1.1,  rotate: 2,  shape: "rect",    src: null },
  { id: "L7", top: "70%", left: "5%",  width: 120, ratio: 1.15, rotate: 1.5,shape: "organic", src: null },
  { id: "L8", top: "70%", left: "22%", width: 90,  ratio: 0.9,  rotate: -2, shape: "circle",  src: null, caption: "noon" },

  // ===== RIGHT COLUMN (spaced, no overlap) =====
  { id: "R1", top: "5%",  left: "80%", width: 150, ratio: 0.85, rotate: 2,  shape: "rect",    src: null, caption: "tokyo, 2am" },
  { id: "R2", top: "6%",  left: "67%", width: 95,  ratio: 1.2,  rotate: -2, shape: "oval",    src: null },
  { id: "R3", top: "27%", left: "83%", width: 105, ratio: 1.0,  rotate: -1, shape: "circle",  src: null },
  { id: "R4", top: "26%", left: "68%", width: 100, ratio: 1.3,  rotate: 2,  shape: "arch",    src: null, caption: "doorway" },
  { id: "R5", top: "48%", left: "80%", width: 145, ratio: 0.78, rotate: 1,  shape: "rounded", src: null },
  { id: "R6", top: "49%", left: "66%", width: 85,  ratio: 1.1,  rotate: -2, shape: "organic", src: null, caption: "bloom" },
  { id: "R7", top: "70%", left: "82%", width: 115, ratio: 1.1,  rotate: -1.5,shape: "rect",   src: null },
  { id: "R8", top: "71%", left: "68%", width: 90,  ratio: 0.95, rotate: 2,  shape: "oval",    src: null },

  // ===== BOTTOM CENTER (frame the channel, low) =====
  { id: "C1", top: "87%", left: "40%", width: 110, ratio: 0.85, rotate: 1,  shape: "rounded", src: null },
  { id: "C2", top: "88%", left: "53%", width: 95,  ratio: 1.0,  rotate: -1.5,shape: "circle",  src: null },
];