/* ============================================================
   WallLights.tsx
   Five DISTINCT, detailed wall sconces. Each is its own design:
   a brass candle sconce, a tulip-glass sconce, a lantern-box
   sconce, an art-deco fan sconce, and a globe-on-arm sconce.
   Each casts a warm glow pool and flickers gently.
   ============================================================ */

interface LightProps {
  className?: string;
  style?: React.CSSProperties;
  scale?: number;
}

function GlowPool({ w = 220, h = 260 }: { w?: number; h?: number }) {
  return (
    <div
      className="lamp-flicker"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(232,149,64,0.30), rgba(212,90,34,0.10) 45%, transparent 70%)",
        zIndex: -1,
      }}
    />
  );
}

/* 1 — Brass candle sconce with a real flame */
export function SconceCandle({ className, style, scale = 1 }: LightProps) {
  return (
    <div className={className} style={{ position: "absolute", ...style }} aria-hidden="true">
      <GlowPool />
      <svg viewBox="0 0 60 90" width={40 * scale} style={{ position: "relative" }}>
        <defs>
          <linearGradient id="scBrass1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8c060" /><stop offset="50%" stopColor="#b8860b" /><stop offset="100%" stopColor="#6a4806" />
          </linearGradient>
        </defs>
        {/* wall plate */}
        <ellipse cx="30" cy="20" rx="10" ry="14" fill="url(#scBrass1)" stroke="#0a0604" strokeWidth="1" />
        <circle cx="30" cy="20" r="3" fill="#3a2410" />
        {/* curved arm */}
        <path d="M 30 28 Q 30 44, 30 50" fill="none" stroke="url(#scBrass1)" strokeWidth="3" />
        {/* drip cup */}
        <path d="M 22 50 L 38 50 L 35 56 L 25 56 Z" fill="url(#scBrass1)" stroke="#0a0604" strokeWidth="0.8" />
        {/* candle */}
        <rect x="26" y="36" width="8" height="16" fill="#e8dcc0" stroke="#0a0604" strokeWidth="0.6" />
        <path d="M 26 40 Q 24 46, 26 50" stroke="#c4b89a" strokeWidth="0.6" fill="none" />
        {/* flame */}
        <path d="M 30 36 Q 26 30, 28 24 Q 30 18, 32 24 Q 34 30, 30 36 Z" fill="#ffb04a" className="cdl-flame" />
        <path d="M 30 36 Q 28 31, 29 26 Q 30 22, 31 26 Q 32 31, 30 36 Z" fill="#fff0c4" className="cdl-flame-inner" />
      </svg>
    </div>
  );
}

/* 2 — Tulip frosted-glass sconce */
export function SconceTulip({ className, style, scale = 1 }: LightProps) {
  return (
    <div className={className} style={{ position: "absolute", ...style }} aria-hidden="true">
      <GlowPool w={240} h={240} />
      <svg viewBox="0 0 60 80" width={42 * scale} style={{ position: "relative" }}>
        <defs>
          <radialGradient id="tulipGlass" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#fff0c4" /><stop offset="55%" stopColor="#f0a04a" /><stop offset="100%" stopColor="#c8401f" />
          </radialGradient>
          <linearGradient id="scBrass2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8c060" /><stop offset="50%" stopColor="#b8860b" /><stop offset="100%" stopColor="#6a4806" />
          </linearGradient>
        </defs>
        {/* backplate */}
        <rect x="24" y="6" width="12" height="20" rx="3" fill="url(#scBrass2)" stroke="#0a0604" strokeWidth="0.8" />
        {/* arm down to glass */}
        <path d="M 30 26 Q 30 36, 30 40" stroke="url(#scBrass2)" strokeWidth="2.5" fill="none" />
        {/* tulip glass (upward flare) */}
        <path d="M 18 64 Q 16 44, 30 40 Q 44 44, 42 64 Q 30 70, 18 64 Z" fill="url(#tulipGlass)" stroke="#8a3010" strokeWidth="1" />
        <path d="M 22 60 Q 30 64, 38 60" stroke="#fff" strokeWidth="0.8" opacity="0.3" fill="none" />
        {/* fitter ring */}
        <ellipse cx="30" cy="42" rx="7" ry="2.5" fill="url(#scBrass2)" />
      </svg>
    </div>
  );
}

/* 3 — Lantern-box sconce (caged glass) */
export function SconceLanternBox({ className, style, scale = 1 }: LightProps) {
  return (
    <div className={className} style={{ position: "absolute", ...style }} aria-hidden="true">
      <GlowPool w={200} h={240} />
      <svg viewBox="0 0 50 90" width={34 * scale} style={{ position: "relative" }}>
        <defs>
          <linearGradient id="boxGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffcf8a" /><stop offset="100%" stopColor="#d4682a" />
          </linearGradient>
          <linearGradient id="scBrass3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4a838" /><stop offset="50%" stopColor="#a87a1c" /><stop offset="100%" stopColor="#5a3d06" />
          </linearGradient>
        </defs>
        {/* backplate + arm */}
        <rect x="20" y="6" width="10" height="14" rx="2" fill="url(#scBrass3)" />
        <path d="M 25 20 L 25 30" stroke="url(#scBrass3)" strokeWidth="2.5" />
        {/* top cap */}
        <path d="M 14 30 L 36 30 L 32 36 L 18 36 Z" fill="url(#scBrass3)" stroke="#0a0604" strokeWidth="0.6" />
        {/* glass box */}
        <rect x="16" y="36" width="18" height="34" fill="url(#boxGlass)" stroke="url(#scBrass3)" strokeWidth="1.5" />
        {/* cage bars */}
        <line x1="22" y1="36" x2="22" y2="70" stroke="#5a3d06" strokeWidth="0.8" />
        <line x1="28" y1="36" x2="28" y2="70" stroke="#5a3d06" strokeWidth="0.8" />
        <line x1="16" y1="52" x2="34" y2="52" stroke="#5a3d06" strokeWidth="0.8" />
        {/* bottom cap + finial */}
        <path d="M 16 70 L 34 70 L 30 76 L 20 76 Z" fill="url(#scBrass3)" />
        <circle cx="25" cy="80" r="3" fill="url(#scBrass3)" />
      </svg>
    </div>
  );
}

/* 4 — Art-deco fan sconce (shell uplight) */
export function SconceDecoFan({ className, style, scale = 1 }: LightProps) {
  return (
    <div className={className} style={{ position: "absolute", ...style }} aria-hidden="true">
      <GlowPool w={230} h={200} />
      <svg viewBox="0 0 70 70" width={46 * scale} style={{ position: "relative" }}>
        <defs>
          <linearGradient id="fanGlass" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c8401f" /><stop offset="60%" stopColor="#f0a04a" /><stop offset="100%" stopColor="#fff0c4" />
          </linearGradient>
          <linearGradient id="scBrass4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8c060" /><stop offset="50%" stopColor="#b8860b" /><stop offset="100%" stopColor="#6a4806" />
          </linearGradient>
        </defs>
        {/* mounting base */}
        <rect x="30" y="50" width="10" height="14" rx="2" fill="url(#scBrass4)" stroke="#0a0604" strokeWidth="0.6" />
        {/* fan shell — frosted ribs spreading upward */}
        <path d="M 35 52 Q 8 40, 6 14 Q 35 26, 64 14 Q 62 40, 35 52 Z" fill="url(#fanGlass)" stroke="#8a3010" strokeWidth="1" />
        {/* ribs */}
        {[14, 22, 30, 40, 48, 56].map((x, i) => (
          <line key={i} x1="35" y1="50" x2={x} y2="16" stroke="#8a3010" strokeWidth="0.6" opacity="0.5" />
        ))}
        {/* brass fitter */}
        <path d="M 28 50 L 42 50 L 39 56 L 31 56 Z" fill="url(#scBrass4)" />
      </svg>
    </div>
  );
}

/* 5 — Globe-on-curved-arm sconce */
export function SconceGlobeArm({ className, style, scale = 1 }: LightProps) {
  return (
    <div className={className} style={{ position: "absolute", ...style }} aria-hidden="true">
      <GlowPool w={250} h={250} />
      <svg viewBox="0 0 80 80" width={50 * scale} style={{ position: "relative" }}>
        <defs>
          <radialGradient id="globeArmGlass" cx="42%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fff4d0" /><stop offset="55%" stopColor="#f0b04a" /><stop offset="100%" stopColor="#d4682a" />
          </radialGradient>
          <linearGradient id="scBrass5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8c060" /><stop offset="50%" stopColor="#b8860b" /><stop offset="100%" stopColor="#6a4806" />
          </linearGradient>
        </defs>
        {/* backplate */}
        <ellipse cx="14" cy="40" rx="7" ry="11" fill="url(#scBrass5)" stroke="#0a0604" strokeWidth="0.8" />
        <circle cx="14" cy="40" r="2.5" fill="#3a2410" />
        {/* sweeping curved arm */}
        <path d="M 16 36 Q 40 18, 56 34" fill="none" stroke="url(#scBrass5)" strokeWidth="3" strokeLinecap="round" />
        {/* fitter */}
        <path d="M 50 30 L 62 30 L 59 38 L 53 38 Z" fill="url(#scBrass5)" />
        {/* glass globe */}
        <circle cx="56" cy="48" r="14" fill="url(#globeArmGlass)" stroke="#8a3010" strokeWidth="1" />
        <ellipse cx="51" cy="43" rx="4" ry="5" fill="#fff" opacity="0.3" />
      </svg>
    </div>
  );
}