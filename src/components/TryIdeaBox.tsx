"use client";

import { useState } from "react";
import type { Benchmark } from "@/types/benchmark";
import { ResultGrid } from "@/components/ResultGrid";

const IDEA_EJEMPLO =
  "Una app que ayuda a restaurantes pequeños a predecir cuánto inventario de comida perecedera necesitan comprar cada semana";

export function TryIdeaBox() {
  const [idea, setIdea] = useState(IDEA_EJEMPLO);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<Benchmark | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analizar() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/try-idea", {
        method: "POST",
        body: JSON.stringify({ idea }),
      });
      if (!response.ok) {
        setError("Gemini no respondió esta vez (puede ser demanda alta momentánea). Intenta de nuevo en unos segundos.");
        return;
      }
      const data = await response.json();
      setResultado(data);
    } catch {
      setError("No se pudo conectar con la IA. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
      <div
        className="card elev-lg"
        style={{
          padding: 28,
          background: "var(--color-surface)",
          width: "100%",
          maxWidth: 680,
          margin: "0 auto",
          borderTop: "2px solid var(--color-accent)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <svg width="18" height="18" viewBox="0 0 256 256" fill="var(--color-accent)">
            <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144Z" />
          </svg>
          <h4 style={{ margin: 0 }}>Prueba tu idea</h4>
        </div>
        <textarea
          className="input"
          placeholder="Describe tu idea..."
          style={{ minHeight: 70, width: "100%", boxSizing: "border-box" }}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <button
          className="btn btn-primary btn-block"
          disabled={loading || !idea.trim()}
          onClick={analizar}
          style={{ marginTop: 12 }}
        >
          {loading ? "Analizando..." : "Analizar mi idea"}
        </button>
        {loading && (
          <p style={{ fontSize: 11.5, opacity: 0.6, marginTop: 8 }}>
            Puede tardar hasta 15-20 segundos, la IA está investigando de verdad.
          </p>
        )}
        {error && <p style={{ fontSize: 12.5, color: "var(--color-accent-100)", marginTop: 12 }}>{error}</p>}
      </div>

      {resultado && <ResultGrid benchmark={resultado} />}
    </div>
  );
}
