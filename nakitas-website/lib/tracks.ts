/* ============================================================
   tracks.ts
   The track that plays during the loader (and beyond).
   Uses YouTube embed for legal, free streaming.
   ============================================================ */

export interface Track {
  /** Display title shown on the record label */
  title: string;
  /** Artist credited on the inner ring */
  artist: string;
  /** YouTube video ID (the part after v= in the URL) */
  youtubeId: string;
  /** Optional: start playback at this many seconds in (skip intros) */
  startSeconds?: number;
}

/**
 * The single curated track that plays for every visitor.
 * To swap songs, just change these three fields — that's it.
 */
export const currentTrack: Track = {
  title: "jazz is for ordinary people",
  artist: "berlioz",
  youtubeId: "CJkGGslFneE",
  startSeconds: 5,
};