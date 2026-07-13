"use client";

import { useState } from "react";
import type { Benchmark } from "@/types/benchmark";
import { BenchmarkDetail } from "@/components/BenchmarkDetail";

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
    <div className="card elev-md" style={{ padding: 24, background: "var(--color-surface)", maxWidth: 460 }}>
      <h4 style={{ margin: "0 0 12px" }}>Prueba tu idea</h4>
      <textarea
        className="input"
        placeholder="Describe tu idea..."
        style={{ minHeight: 70 }}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <button className="btn btn-primary btn-block" disabled={loading || !idea.trim()} onClick={analizar}>
        {loading ? "Analizando..." : "Analizar mi idea"}
      </button>
      {loading && (
        <p style={{ fontSize: 11.5, opacity: 0.6, marginTop: 8 }}>
          Puede tardar hasta 15-20 segundos, la IA está investigando de verdad.
        </p>
      )}
      {error && <p style={{ fontSize: 12.5, color: "var(--color-accent-100)", marginTop: 12 }}>{error}</p>}
      {resultado && (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <span className="tag tag-accent" style={{ fontSize: 10 }}>
              {resultado.categoria}
            </span>
            <h4 style={{ margin: "8px 0 0" }}>{resultado.titulo}</h4>
          </div>
          <BenchmarkDetail benchmark={resultado} />
        </div>
      )}
    </div>
  );
}
