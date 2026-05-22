/* ============================================================
   GramophoneSVG.tsx
   Bird's-eye sleek tonearm + spinning vinyl record.

   - Cool, dimensional sapphire record (straight-on gradient)
   - Strong red-amber warm halo (previews the lounge palette)
   - Tonearm pivots on the UPPER-RIGHT, swings on when clicked
   - Record spins as a separate group
   - Needle has a radar-pulse red dot to signal interactivity
   ============================================================ */

interface GramophoneSVGProps {
  trackTitle?: string;
  artistName?: string;
  onNeedleClick?: () => void;
  needleClicked?: boolean;
}

export default function GramophoneSVG({
  trackTitle = "",
  artistName = "",
  onNeedleClick,
  needleClicked = false,
}: GramophoneSVGProps) {
  return (
    <svg
      viewBox="-40 -40 880 880"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Vinyl record with brass tonearm, viewed from above"
    >
      <defs>
        {/* Strong red-amber warm halo behind the record */}
        <radialGradient id="recordGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-amber-warmth)" stopOpacity="0.7" />
          <stop offset="38%" stopColor="var(--color-ember-glow)" stopOpacity="0.5" />
          <stop offset="68%" stopColor="var(--color-hot-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-loader-shadow)" stopOpacity="0" />
        </radialGradient>

        {/* Dimensional sapphire vinyl — centered, straight-on */}
        <radialGradient id="vinylSurface" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-wine-mid)" />
          <stop offset="35%" stopColor="var(--color-wine-deep)" />
          <stop offset="70%" stopColor="#0A0000" />
          <stop offset="100%" stopColor="#000000" />
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

        {/* Red radar dot — solid center */}
        <radialGradient id="radarDot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3838" />
          <stop offset="60%" stopColor="#cc1818" />
          <stop offset="100%" stopColor="#8a0808" />
        </radialGradient>

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

      {/* Warm red-amber halo behind everything */}
      <circle cx="400" cy="400" r="420" fill="url(#recordGlow)" />

      {/* ============================================
         RECORD GROUP — spins on its own center
         ============================================ */}
      <g id="record-group">
        <circle
          cx="400"
          cy="400"
          r="300"
          fill="url(#vinylSurface)"
          stroke="var(--color-ink-shadow)"
          strokeWidth="2"
        />

        {Array.from({ length: 24 }).map((_, i) => {
          const radius = 165 + i * 5.5;
          return (
            <circle
              key={`groove-${i}`}
              cx="400"
              cy="400"
              r={radius}
              fill="none"
              stroke="var(--color-wine-bright)"
              strokeWidth="0.5"
              opacity="0.35"
            />
          );
        })}

        <circle cx="400" cy="400" r="200" fill="none" stroke="var(--color-amber-warmth)" strokeWidth="0.6" opacity="0.4" />
        <circle cx="400" cy="400" r="240" fill="none" stroke="var(--color-amber-warmth)" strokeWidth="0.6" opacity="0.4" />
        <circle cx="400" cy="400" r="280" fill="none" stroke="var(--color-amber-warmth)" strokeWidth="0.6" opacity="0.4" />

        <circle
          cx="400"
          cy="400"
          r="300"
          fill="none"
          stroke="var(--color-brass-needle)"
          strokeWidth="1"
          opacity="0.3"
        />

        {artistName && (
          <text fontFamily="var(--font-body)" fontSize="9" fill="var(--color-paper-aged)" opacity="0.35" letterSpacing="5">
            <textPath href="#artistNamePath" startOffset="25%" textAnchor="middle">
              {artistName.toUpperCase()}
            </textPath>
          </text>
        )}

        {trackTitle && (
          <text fontFamily="var(--font-italic-accent)" fontStyle="italic" fontSize="11" fill="var(--color-brass-needle)" opacity="0.5" letterSpacing="3">
            <textPath href="#trackTitlePath" startOffset="25%" textAnchor="middle">
              {trackTitle}
            </textPath>
          </text>
        )}

        {/* Soft warm glow behind the label, catching the lamp light */}
        <circle cx="400" cy="400" r="115" fill="var(--color-amber-warmth)" opacity="0.15" style={{ filter: "blur(12px)" }} />

        <circle cx="400" cy="400" r="105" fill="url(#labelSurface)" stroke="var(--color-ink-shadow)" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="93" fill="none" stroke="var(--color-ink-shadow)" strokeWidth="0.8" opacity="0.5" />

        <text x="400" y="370" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fill="var(--color-ink-shadow)" letterSpacing="2" fontWeight="400">
          nakita ray&apos;s
        </text>
        <text x="400" y="445" textAnchor="middle" fontFamily="var(--font-italic-accent)" fontStyle="italic" fontSize="20" fill="var(--color-ink-shadow)" letterSpacing="3" opacity="0.85">
          website
        </text>

        <circle id="vinyl-center" cx="400" cy="400" r="7" fill="var(--color-loader-shadow)" stroke="var(--color-ink-shadow)" strokeWidth="1" />
      </g>

      {/* Warm rim light hugging the record's edge */}
      <circle
        cx="400"
        cy="400"
        r="300"
        fill="none"
        stroke="var(--color-amber-warmth)"
        strokeWidth="6"
        opacity="0.3"
        style={{ filter: "blur(4px)" }}
      />

      {/* ============================================
         TONEARM — pivot on UPPER-RIGHT, well outside record
         At rest (rotate 45) the needle hovers off the record's
         upper-right edge. On click GSAP rotates to 0, swinging
         the needle onto the outer grooves.
         ============================================ */}

      {/* Pivot mount (decorative, doesn't rotate) */}
      <g id="tonearm-pivot">
        <circle cx="760" cy="130" r="34" fill="url(#brassMetal)" stroke="var(--color-ink-shadow)" strokeWidth="2" />
        <circle cx="760" cy="130" r="24" fill="none" stroke="var(--color-ink-shadow)" strokeWidth="1" opacity="0.5" />
        <circle cx="760" cy="130" r="6" fill="var(--color-ink-shadow)" />
      </g>

      {/* The interactive tonearm group */}
      <g
        id="tonearm-group"
        transform="rotate(-45 760 130)"
        style={{
          cursor: needleClicked ? "default" : "pointer",
        }}
        onClick={!needleClicked ? onNeedleClick : undefined}
      >
        {/* Invisible hit area along the arm length */}
        <path
          d="M 760 130 L 600 280 L 620 300 L 780 150 Z"
          fill="transparent"
          aria-label="Click to drop the needle"
        />

        {/* Sleek brass arm shaft */}
        <path
          d="M 754 130
             L 605 285
             L 612 292
             L 766 137 Z"
          fill="url(#brassMetal)"
          stroke="var(--color-ink-shadow)"
          strokeWidth="1.2"
        />

        {/* Counterweight */}
        <ellipse
          cx="785"
          cy="105"
          rx="18"
          ry="10"
          fill="url(#brassMetal)"
          stroke="var(--color-ink-shadow)"
          strokeWidth="1.2"
          transform="rotate(45 785 105)"
        />

        {/* Cartridge / headshell */}
        <path
          d="M 605 285
             L 588 297
             L 600 312
             L 617 300 Z"
          fill="var(--color-ink-shadow)"
          stroke="var(--color-ink-shadow)"
          strokeWidth="0.8"
        />

        {/* Brass detail on cartridge */}
        <rect
          x="595"
          y="290"
          width="10"
          height="3"
          fill="var(--color-brass-needle)"
          opacity="0.7"
          transform="rotate(-45 600 291)"
        />

        {/* Needle tip */}
        <circle
          id="needle-tip"
          cx="595"
          cy="307"
          r="3.5"
          fill="var(--color-brass-needle)"
          stroke="var(--color-ink-shadow)"
          strokeWidth="0.8"
        />

        {/* RADAR PULSING RED LIGHT */}
        {!needleClicked && (
          <g id="radar-indicator">
            <circle
              cx="595"
              cy="307"
              r="6"
              fill="none"
              stroke="#ff3838"
              strokeWidth="1.5"
              opacity="0"
              className="radar-ring"
            />
            <circle
              cx="595"
              cy="307"
              r="6"
              fill="none"
              stroke="#ff3838"
              strokeWidth="1.5"
              opacity="0"
              className="radar-ring radar-ring-delayed"
            />
            <circle
              cx="595"
              cy="307"
              r="4.5"
              fill="url(#radarDot)"
              className="radar-center"
            />
            <circle cx="594" cy="306" r="1.3" fill="#ffaaaa" opacity="0.8" />
          </g>
        )}
      </g>
    </svg>
  );
}