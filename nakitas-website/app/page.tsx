"use client";

import { useState, useEffect } from "react";
import GramophoneScene from "./components/loader/GramophoneScene";
import MenuScene from "./components/menu/MenuScene";
import AboutScene from "./components/about/AboutScene";
import MusicCredit from "./components/shared/MusicCredit";

type SceneState = "loader" | "menu" | "about" | "feast";

export default function Home() {
  const [scene, setScene] = useState<SceneState>("loader");
  const [musicStarted, setMusicStarted] = useState(false);

  // Lock scrolling during the loader; unlock once we reach the lounge
  useEffect(() => {
    if (scene === "loader") {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [scene]);

  return (
    <main>
      {scene === "loader" && (
        <GramophoneScene
          onMusicStart={() => setMusicStarted(true)}
          onTransitionComplete={() => setScene("menu")}
        />
      )}

      {scene === "menu" && (
        <MenuScene
          onEnterAbout={() => setScene("about")}
          onReachFeast={() => setScene("feast")}
        />
      )}

      {scene === "about" && (
        <AboutScene
          onBackToMenu={() => setScene("menu")}
        />
      )}

      {scene === "feast" && (
        <section
          className="w-screen h-screen flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-burgundy-velvet)",
            backgroundImage:
              "linear-gradient(to bottom, #8b1d22 0%, var(--color-burgundy-velvet) 50%, #3a0c10 100%)",
          }}
        >
          <p
            className="text-2xl"
            style={{
              color: "var(--color-cream-linen)",
              fontFamily: "var(--font-italic-accent)",
              fontStyle: "italic",
            }}
          >
            the feast scene begins in step 9.
          </p>
        </section>
      )}

      <MusicCredit
        isVisible={musicStarted}
        variant={scene === "about" ? "light" : "dark"}
      />
    </main>
  );
}