"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { LandingPage } from "@/components/LandingPage";
import { TryIdeaBox } from "@/components/TryIdeaBox";
import { Tutorial } from "@/components/Tutorial";
import { Footer } from "@/components/Footer";
import styles from "../../app/page.module.css";

const TUTORIAL_SEEN_KEY = "be_tutorial_seen";

export function BenchmarkApp() {
  const [view, setView] = useState<"landing" | "tool">("landing");
  const [tutorialVisible, setTutorialVisible] = useState(false);

  useEffect(() => {
    const seen = typeof localStorage !== "undefined" && localStorage.getItem(TUTORIAL_SEEN_KEY);
    if (!seen) {
      setTutorialVisible(true);
    }
  }, []);

  function dismissTutorial() {
    try {
      localStorage.setItem(TUTORIAL_SEEN_KEY, "1");
    } catch {
      // localStorage no disponible, no bloquea el flujo.
    }
    setTutorialVisible(false);
  }

  const isTool = view === "tool";

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)", minHeight: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -220,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1100,
          height: 520,
          background: "radial-gradient(ellipse at center, var(--color-accent-900) 0%, transparent 70%)",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      <Nav isTool={isTool} onGoLanding={() => setView("landing")} onReplayTutorial={() => setTutorialVisible(true)} />

      {view === "landing" && <LandingPage onGoTool={() => setView("tool")} />}

      {view === "tool" && (
        <div className={styles.toolWrap} style={{ position: "relative", maxWidth: 1160, width: "100%", margin: "0 auto", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 32 }}>
          <div className={styles.hero}>
            <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-accent-300)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 16, height: 1, background: "var(--color-accent-300)" }} />
              Antes de construir, benchmark
            </div>
            <h1 style={{ margin: "0 0 14px", fontSize: 38 }}>¿Vale la pena construirlo?</h1>
            <p style={{ fontSize: 15, opacity: 0.75, margin: 0 }}>
              Escribe tu idea y recibe un estudio de mercado honesto: quién ya existe, qué hace bien, y dónde
              queda espacio para diferenciarte.
            </p>
          </div>

          <TryIdeaBox />
        </div>
      )}

      <Footer />

      <Tutorial visible={tutorialVisible && isTool} onDismiss={dismissTutorial} />
    </div>
  );
}
