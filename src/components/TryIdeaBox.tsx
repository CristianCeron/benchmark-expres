"use client";

import { useState } from "react";
import type { Benchmark } from "@/data/benchmarks";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE;
const isLive = DEMO_MODE === "live";

export function TryIdeaBox() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<Benchmark | null>(null);

  async function analizar() {
    setLoading(true);
    const response = await fetch("/api/try-idea", {
      method: "POST",
      body: JSON.stringify({ idea }),
    });
    const data = await response.json();
    setResultado(data);
    setLoading(false);
  }

  return (
    <div className="card elev-md" style={{ padding: 24, background: "var(--color-surface)", maxWidth: 400 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h4 style={{ margin: 0 }}>Prueba tu idea</h4>
        <span className="tag tag-accent" style={{ fontSize: 10 }}>
          30/30
        </span>
      </div>
      <textarea
        className="input"
        disabled={!isLive}
        placeholder="Describe tu idea..."
        style={{ minHeight: 70 }}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <button
        className="btn btn-primary btn-block"
        disabled={!isLive || loading || !idea.trim()}
        onClick={analizar}
      >
        {loading ? "Analizando..." : "Analizar mi idea"}
      </button>
      {!isLive && (
        <>
          <video
            data-testid="demo-local-video"
            src="/video/demo-local.mp4"
            controls
            style={{
              width: "100%",
              marginTop: 14,
              borderRadius: "var(--radius-sm)",
              background: "var(--color-neutral-900)",
              border: "1px solid var(--color-divider)",
            }}
          />
          <p style={{ fontSize: 11, opacity: 0.5, margin: "8px 0 0" }}>
            Se activa con conexión a una API real en producción. Este video muestra la versión local funcionando.
          </p>
        </>
      )}
      {isLive && resultado && (
        <div style={{ marginTop: 14, fontSize: 12.5, display: "flex", flexDirection: "column", gap: 8 }}>
          <strong>{resultado.titulo}</strong>
          <span>{resultado.categoria}</span>
        </div>
      )}
    </div>
  );
}
