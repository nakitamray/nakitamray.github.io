"use client";

import { useState } from "react";
import GramophoneScene from "./components/loader/GramophoneScene";
import MenuScene from "./components/menu/MenuScene";
import MusicCredit from "./components/shared/MusicCredit";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [enterFeast, setEnterFeast] = useState(false);

  return (
    <main>
      {!hasEntered && (
        <GramophoneScene
          onMusicStart={() => setMusicStarted(true)}
          onTransitionComplete={() => setHasEntered(true)}
        />
      )}

      {hasEntered && !enterFeast && (
        <MenuScene onEnterFeast={() => setEnterFeast(true)} />
      )}

      {enterFeast && (
        <section
          className="w-screen h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--color-burgundy-velvet)" }}
        >
          <p
            className="text-2xl font-italic-accent"
            style={{ color: "var(--color-cream-linen)" }}
          >
            feast scene coming in step 7
          </p>
        </section>
      )}

      {/* Persistent music credit — only visible once music starts */}
      <MusicCredit isVisible={musicStarted} />
    </main>
  );
}