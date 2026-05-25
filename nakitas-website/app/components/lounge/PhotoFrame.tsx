"use client";

/* ============================================================
   PhotoFrame.tsx
   Renders a framed photo in one of several shapes:
   rect, rounded, oval, circle, arch, organic.
   Each shape uses a clip-path or border-radius + a matching
   warm frame border.
   ============================================================ */

import Image from "next/image";
import type { Frame, FrameShape } from "./frames";

/* clip-paths / radii per shape */
function shapeStyle(shape: FrameShape): React.CSSProperties {
  switch (shape) {
    case "circle":
      return { borderRadius: "50%" };
    case "oval":
      return { borderRadius: "50%" }; // ratio makes it an oval
    case "rounded":
      return { borderRadius: "14px" };
    case "arch":
      return { borderRadius: "50% 50% 6px 6px / 38% 38% 6px 6px" };
    case "organic":
      return {
        borderRadius: "62% 38% 55% 45% / 48% 58% 42% 52%",
      };
    case "rect":
    default:
      return { borderRadius: "2px" };
  }
}

export default function PhotoFrame({ frame }: { frame: Frame }) {
  const height = frame.width * frame.ratio;
  const sStyle = shapeStyle(frame.shape);

  return (
    <div
      className="gallery-frame absolute"
      style={{
        top: frame.top,
        left: frame.left,
        width: `${frame.width}px`,
        transform: `rotate(${frame.rotate}deg)`,
        opacity: 0,
        zIndex: 3,
      }}
      aria-hidden="true"
    >
      {/* Frame border — warm wood/brass, follows the shape */}
      <div
        style={{
          padding: "9px",
          background: "linear-gradient(135deg, #4a3018, #1f1409)",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(184,134,11,0.4)",
          ...sStyle,
        }}
      >
        {/* Matte */}
        <div style={{ background: "#15100b", padding: "5px", ...sStyle }}>
          {/* Photo / placeholder */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: `${height}px`,
              backgroundColor: "#0d0907",
              overflow: "hidden",
              ...sStyle,
            }}
          >
            {frame.src ? (
              <Image
                src={frame.src}
                alt={frame.caption || "gallery photo"}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #2a1d12, #1a120b 60%, #0d0907)",
                }}
              >
                <span
                  style={{
                    color: "var(--color-led-glow)",
                    opacity: 0.22,
                    fontFamily: "var(--font-italic-accent)",
                    fontStyle: "italic",
                    fontSize: "0.7rem",
                  }}
                >
                  photo
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {frame.caption && (
        <p
          className="text-center mt-2"
          style={{
            color: "var(--color-paper-aged)",
            opacity: 0.4,
            fontFamily: "var(--font-italic-accent)",
            fontStyle: "italic",
            fontSize: "0.65rem",
            letterSpacing: "0.04em",
          }}
        >
          {frame.caption}
        </p>
      )}
    </div>
  );
}