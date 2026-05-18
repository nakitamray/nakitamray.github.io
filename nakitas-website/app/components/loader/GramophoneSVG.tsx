/* ============================================================
   GramophoneSVG.tsx
   Hand-drawn line-art bird's-eye vinyl + tonearm.
   Site name lives inside the brass label as the focal point.
   Track + artist curl around it as subtle credit.
   ============================================================ */

interface GramophoneSVGProps {
  trackTitle?: string;
  artistName?: string;
}

export default function GramophoneSVG({
  trackTitle = "",
  artistName = "",
}: GramophoneSVGProps) {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Vinyl record on a gramophone, viewed from above"
    >
      <defs>
        {/* Warm ember halo behind the record */}
        <radialGradient id="recordGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-amber-warmth)" stopOpacity="0.55" />
          <stop offset="35%" stopColor="var(--color-ember-glow)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="var(--color-rust-shadow)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-midnight-ink)" stopOpacity="0" />
        </radialGradient>

        {/* Vinyl base — navy/sapphire, distinct from background */}
        <radialGradient id="vinylSurface" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-navy-velvet)" />
          <stop offset="55%" stopColor="var(--color-sapphire-deep)" />
          <stop offset="100%" stopColor="var(--color-midnight-ink)" />
        </radialGradient>

        {/* Center brass label */}
        <radialGradient id="labelSurface" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-champagne-light)" />
          <stop offset="100%" stopColor="var(--color-brass-needle)" />
        </radialGradient>

        {/* Brass metallic for tonearm */}
        <linearGradient id="brassMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-champagne-light)" />
          <stop offset="50%" stopColor="var(--color-brass-needle)" />
          <stop offset="100%" stopColor="var(--color-truffle-gold)" />
        </linearGradient>

        {/* Curved paths for track title and artist text */}
        <path
          id="trackTitlePath"
          d="M 400,400 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
          fill="none"
        />
        <path
          id="artistNamePath"
          d="M 400,400 m -130,0 a 130,130 0 1,0 260,0 a 130,130 0 1,0 -260,0"
          fill="none"
        />
      </defs>

      {/* Ember glow behind the record */}
      <circle cx="400" cy="400" r="395" fill="url(#recordGlow)" />

      {/* Main disc */}
      <circle
        cx="400"
        cy="400"
        r="300"
        fill="url(#vinylSurface)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="2"
      />

      {/* Groove rings */}
      {Array.from({ length: 24 }).map((_, i) => {
        const radius = 165 + i * 5.5;
        return (
          <circle
            key={`groove-${i}`}
            cx="400"
            cy="400"
            r={radius}
            fill="none"
            stroke="var(--color-steel-blue)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        );
      })}

      {/* Accent groove rings */}
      <circle cx="400" cy="400" r="200" fill="none" stroke="var(--color-cobalt-glow)" strokeWidth="0.6" opacity="0.45" />
      <circle cx="400" cy="400" r="240" fill="none" stroke="var(--color-cobalt-glow)" strokeWidth="0.6" opacity="0.45" />
      <circle cx="400" cy="400" r="280" fill="none" stroke="var(--color-cobalt-glow)" strokeWidth="0.6" opacity="0.45" />

      {/* Outer edge brass highlight */}
      <circle
        cx="400"
        cy="400"
        r="300"
        fill="none"
        stroke="var(--color-brass-needle)"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Curved artist name — subtle, just inside the grooves */}
      {artistName && (
        <text
          fontFamily="var(--font-body)"
          fontSize="9"
          fill="var(--color-paper-aged)"
          opacity="0.35"
          letterSpacing="5"
        >
          <textPath href="#artistNamePath" startOffset="25%" textAnchor="middle">
            {artistName.toUpperCase()}
          </textPath>
        </text>
      )}

      {/* Curved track title — subtle italic in brass */}
      {trackTitle && (
        <text
          fontFamily="var(--font-italic-accent)"
          fontStyle="italic"
          fontSize="11"
          fill="var(--color-brass-needle)"
          opacity="0.5"
          letterSpacing="3"
        >
          <textPath href="#trackTitlePath" startOffset="25%" textAnchor="middle">
            {trackTitle}
          </textPath>
        </text>
      )}

      {/* ============================================
         CENTER BRASS LABEL — holds the site name
         ============================================ */}
      <circle
        cx="400"
        cy="400"
        r="105"
        fill="url(#labelSurface)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="1.5"
      />

      <circle
        cx="400"
        cy="400"
        r="93"
        fill="none"
        stroke="var(--color-ink-shadow)"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Site name — the focal point of the label */}
      <text
        x="400"
        y="385"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="22"
        fill="var(--color-ink-shadow)"
        letterSpacing="2"
        fontWeight="400"
      >
        nakita ray&apos;s
      </text>
      <text
        x="400"
        y="440"
        textAnchor="middle"
        fontFamily="var(--font-italic-accent)"
        fontStyle="italic"
        fontSize="20"
        fill="var(--color-ink-shadow)"
        letterSpacing="3"
        opacity="0.85"
      >
        website
      </text>

      {/* Center hole — the portal */}
      <circle
        id="vinyl-center"
        cx="400"
        cy="400"
        r="7"
        fill="var(--color-midnight-ink)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="1"
      />

      {/* ============================================
         TONEARM
         ============================================ */}
      <circle cx="720" cy="150" r="38" fill="url(#brassMetal)" stroke="var(--color-ink-shadow)" strokeWidth="2" />
      <circle cx="720" cy="150" r="28" fill="none" stroke="var(--color-ink-shadow)" strokeWidth="1" opacity="0.6" />
      <circle cx="720" cy="150" r="8" fill="var(--color-ink-shadow)" />

      <g id="tonearm-group" style={{ transformOrigin: "720px 150px" }}>
      {/* Arm shaft — now straight DOWN from pivot
          (vertical resting position, perpendicular to top of viewBox).
          The arm extends from (720, 150) straight down to (720, 370),
          with slight taper. When GSAP rotates it -55° later, it swings
          out and lands on the record. */}
      <path
        d="M 712 150 L 712 370 L 728 370 L 728 150 Z"
        fill="url(#brassMetal)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="1.5"
      />

      {/* Counterweight at the back end (just above pivot) */}
      <ellipse
        cx="720"
        cy="115"
        rx="22"
        ry="14"
        fill="url(#brassMetal)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="1.5"
      />

      {/* Cartridge / headshell at the bottom end */}
      <path
        d="M 712 370 L 700 395 L 740 395 L 728 370 Z"
        fill="var(--color-ink-shadow)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="1"
      />

      {/* The needle (stylus) tip — hanging off the bottom */}
      <circle
        id="needle-tip"
        cx="720"
        cy="400"
        r="4"
        fill="var(--color-brass-needle)"
        stroke="var(--color-ink-shadow)"
        strokeWidth="0.8"
      />
    </g>
    </svg>
  );
}