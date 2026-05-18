/* ============================================================
   audioManager.ts
   Wraps the YouTube IFrame Player API for audio-only playback.
   The video player loads hidden offscreen — only the audio
   reaches the user. Handles fade-in and exposes a play function.

   YouTube blocks autoplay unless the user has interacted with
   the page, so this is always called from a click handler.
   ============================================================ */

// TypeScript declaration for the YouTube IFrame API that loads
// from a <script> tag at runtime.
declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: YTPlayerOptions
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    fs?: 0 | 1;
    modestbranding?: 0 | 1;
    rel?: 0 | 1;
    start?: number;
    playsinline?: 0 | 1;
  };
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number; target: YTPlayer }) => void;
  };
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  setVolume: (v: number) => void;
  getVolume: () => number;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

let player: YTPlayer | null = null;
let apiLoadPromise: Promise<void> | null = null;

/**
 * Inject the YouTube IFrame API script tag (only runs once).
 * Returns a promise that resolves when YT.Player is usable.
 */
function loadYouTubeAPI(): Promise<void> {
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise((resolve) => {
    // If the API is already loaded for any reason, resolve immediately
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // The IFrame API calls this global function when it finishes loading
    window.onYouTubeIframeAPIReady = () => resolve();

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return apiLoadPromise;
}

/**
 * Create the hidden YouTube player inside a container element
 * and start playback with a fade-in.
 *
 * @param containerId - id of an empty <div> the player will replace
 * @param videoId - YouTube video ID
 * @param options - playback options (volume, start time, fade duration)
 */
export async function playYouTubeTrack(
  containerId: string,
  videoId: string,
  options: {
    targetVolume?: number;  // 0-100 (YouTube uses 0-100, not 0-1)
    startSeconds?: number;
    fadeMs?: number;
  } = {}
): Promise<void> {
  const { targetVolume = 45, startSeconds = 0, fadeMs = 2000 } = options;

  await loadYouTubeAPI();

  // Destroy any existing player first (idempotent)
  if (player) {
    player.destroy();
    player = null;
  }

  return new Promise((resolve) => {
    player = new window.YT!.Player(containerId, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,           // hide controls (we don't want the UI)
        disablekb: 1,          // disable keyboard shortcuts
        fs: 0,                 // no fullscreen button
        modestbranding: 1,     // less YouTube branding
        rel: 0,                // no related videos at end
        start: startSeconds,
        playsinline: 1,        // play inline on mobile (no fullscreen takeover)
      },
      events: {
        onReady: (event) => {
          // Start silent, then fade up
          event.target.setVolume(0);
          event.target.playVideo();
          fadeVolume(event.target, 0, targetVolume, fadeMs);
          resolve();
        },
      },
    });
  });
}

/**
 * Linear volume fade between two values over duration.
 * YouTube doesn't have a native fade method, so we step it manually.
 */
function fadeVolume(
  yt: YTPlayer,
  from: number,
  to: number,
  durationMs: number
): void {
  const steps = 40;
  const stepDuration = durationMs / steps;
  const stepValue = (to - from) / steps;
  let current = from;
  let stepsTaken = 0;

  const interval = setInterval(() => {
    stepsTaken++;
    current += stepValue;
    yt.setVolume(Math.max(0, Math.min(100, current)));
    if (stepsTaken >= steps) {
      clearInterval(interval);
      yt.setVolume(to);
    }
  }, stepDuration);
}

/**
 * Fade out + stop the current track.
 */
export function stopTrack(fadeMs = 1500): void {
  if (!player) return;
  const startVol = player.getVolume();
  fadeVolume(player, startVol, 0, fadeMs);
  setTimeout(() => {
    player?.stopVideo();
  }, fadeMs);
}