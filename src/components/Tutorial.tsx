"use client";

import { useState } from "react";

const PASOS = [
  {
    titulo: "1. Describe tu idea",
    cuerpo: "Escríbela en una o dos frases, como se la contarías a un amigo. No hace falta que sea perfecta.",
    icono: "buscar",
  },
  {
    titulo: "2. Recibe el benchmark",
    cuerpo: "En segundos ves quién ya construyó algo parecido, qué hacen bien, y qué se les escapa.",
    icono: "comparar",
  },
  {
    titulo: "3. Decide con evidencia",
    cuerpo: "Con la brecha y la oportunidad claras, decides si vale la pena construirlo o hacia dónde ajustar.",
    icono: "objetivo",
  },
] as const;

function IconoPaso({ icono }: { icono: (typeof PASOS)[number]["icono"] }) {
  if (icono === "buscar") {
    return (
      <svg width="24" height="24" viewBox="0 0 256 256" fill="var(--color-highlight)">
        <path d="M229.66,218.34,179.6,168.28a88.11,88.11,0,1,0-11.32,11.32l50.06,50.06a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
      </svg>
    );
  }
  if (icono === "comparar") {
    return (
      <svg width="24" height="24" viewBox="0 0 256 256" fill="var(--color-highlight)">
        <path d="M247.42,117l-46-92a8,8,0,0,0-14.32,0L163.7,88H92.3L74.9,25a8,8,0,0,0-14.32,0l-46,92A8,8,0,0,0,16,120a56,56,0,0,0,112,0,8,8,0,0,0-1.42-4.66L102.7,104h50.6l-23.88,11.34A8,8,0,0,0,128,120a56,56,0,0,0,112,0A8,8,0,0,0,247.42,117ZM71.63,53l31.6,55H40Zm0,83a40,40,0,0,1-38.6-48h77.2A40,40,0,0,1,71.63,136Zm112.74-83,31.6,55H152.77Zm0,83a40,40,0,0,1-38.6-48h77.2A40,40,0,0,1,184.37,136Z" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="var(--color-highlight)">
      <path d="M243.31,68.69,203.31,28.69a16,16,0,0,0-22.62,0L36.69,172.69a16,16,0,0,0-4.69,11.31V220a4,4,0,0,0,4,4H72a16,16,0,0,0,11.31-4.69L227.31,75.31A16,16,0,0,0,243.31,68.69ZM72,208H48V184L152,80l24,24Z" />
    </svg>
  );
}

export function Tutorial({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const [idx, setIdx] = useState(0);

  if (!visible) return null;

  const esUltimo = idx === PASOS.length - 1;
  const paso = PASOS[idx];

  function siguiente() {
    if (esUltimo) {
      setIdx(0);
      onDismiss();
    } else {
      setIdx(idx + 1);
    }
  }

  function saltar() {
    setIdx(0);
    onDismiss();
  }

  return (
    <div className="dialog-backdrop">
      <div className="dialog" style={{ padding: 32, borderRadius: 20, position: "relative", overflow: "hidden", width: "min(420px, 100%)" }}>
        <div
          style={{
            position: "relative",
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "color-mix(in srgb, var(--color-highlight) 18%, var(--color-surface))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <IconoPaso icono={paso.icono} />
        </div>

        <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
          {PASOS.map((p, i) => (
            <span
              key={p.titulo}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i <= idx ? "var(--color-highlight)" : "var(--color-neutral-700)",
                transition: "background 0.2s ease",
              }}
            />
          ))}
        </div>

        <div className="dialog-title" style={{ fontSize: 21 }}>
          {paso.titulo}
        </div>
        <div className="dialog-body" style={{ marginTop: 6 }}>
          {paso.cuerpo}
        </div>
        <div className="dialog-actions" style={{ marginTop: 22 }}>
          <button className="btn btn-ghost" onClick={saltar}>
            Saltar
          </button>
          <button
            className="cta-highlight"
            onClick={siguiente}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "11px 22px",
              fontSize: 14,
              fontWeight: 600,
              background: "var(--color-highlight)",
              color: "var(--color-highlight-ink)",
              cursor: "pointer",
            }}
          >
            {esUltimo ? "Entendido" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
