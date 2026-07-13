"use client";

import { useState } from "react";
import type { Benchmark } from "@/types/benchmark";

interface Seccion {
  titulo: string;
  tipo: "tags" | "lista" | "links";
  items: string[];
}

function ContenidoSeccion({ seccion }: { seccion: Seccion }) {
  if (seccion.tipo === "tags") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {seccion.items.map((item) => (
          <span key={item} className="tag tag-neutral" style={{ fontSize: 10 }}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (seccion.tipo === "links") {
    return (
      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, display: "flex", flexDirection: "column", gap: 5 }}>
        {seccion.items.map((url) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 16,
        fontSize: 13,
        opacity: 0.85,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {seccion.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function BenchmarkDetail({ benchmark: b }: { benchmark: Benchmark }) {
  const [expandido, setExpandido] = useState(0);

  const secciones: Seccion[] = [
    { titulo: "Apps o productos similares", tipo: "tags", items: b.jugadores },
    { titulo: "Referentes principales", tipo: "lista", items: b.fortalezas },
    { titulo: "Brecha", tipo: "lista", items: b.brecha },
    { titulo: "Oportunidad", tipo: "lista", items: b.oportunidad },
    { titulo: "Señales de tendencia", tipo: "lista", items: b.señalesTendencia },
    { titulo: "Ideas para mover redes", tipo: "lista", items: b.ideasRedes },
    { titulo: "Qué hacer", tipo: "lista", items: b.queHacer },
    { titulo: "Qué no hacer", tipo: "lista", items: b.queNoHacer },
    { titulo: "Fuentes", tipo: "links", items: b.fuentes },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {secciones.map((seccion, i) => (
          <div key={seccion.titulo} className="card" style={{ background: "var(--color-surface)", padding: 0, overflow: "hidden" }}>
            <div
              onClick={() => setExpandido(i)}
              style={{
                cursor: "pointer",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <h6 style={{ margin: 0, flex: 1, color: "var(--color-accent-300)" }}>{seccion.titulo}</h6>
            </div>
            {expandido === i && <div style={{ padding: "0 18px 18px" }}>
              <ContenidoSeccion seccion={seccion} />
            </div>}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          padding: "12px 14px",
          borderRadius: "var(--radius-md)",
          background: "var(--color-accent-900)",
          border: "1px solid var(--color-accent-800)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--color-accent-100)" }}>{b.advertencia}</p>
      </div>
    </div>
  );
}
