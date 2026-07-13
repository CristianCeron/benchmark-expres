const PASOS = [
  { n: "1", titulo: "Describe tu idea", cuerpo: "En una o dos frases, como se la contarías a un amigo." },
  { n: "2", titulo: "Recibe el benchmark", cuerpo: "Jugadores reales, fortalezas, brecha y oportunidad, en minutos." },
  { n: "3", titulo: "Decide con evidencia", cuerpo: "Sabes si vale la pena construirlo, o hacia dónde ajustar." },
];

import styles from "../../app/page.module.css";

export function LandingPage({ onGoTool }: { onGoTool: () => void }) {
  return (
    <div className={styles.landingWrap} style={{ position: "relative", maxWidth: 1160, width: "100%", margin: "0 auto", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 64 }}>
      <div style={{ maxWidth: 680, paddingTop: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-accent-300)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 16, height: 1, background: "var(--color-accent-300)" }} />
          Antes de construir, benchmark
        </div>
        <h1 style={{ margin: "0 0 18px", fontSize: 44, lineHeight: 1.1 }}>¿Cuántas veces construiste algo que ya existía?</h1>
        <p style={{ fontSize: 16, opacity: 0.75, margin: "0 0 28px", lineHeight: 1.5 }}>
          Benchmark Exprés es un chequeo rápido antes de escribir una línea de código. Le describes tu idea y te
          devuelve quién ya la resolvió, qué tan bien lo hace, y dónde queda espacio real para diferenciarte.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <button
            className="cta-highlight"
            onClick={onGoTool}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 26px",
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              borderRadius: 999,
              background: "var(--color-highlight)",
              color: "var(--color-highlight-ink)",
              cursor: "pointer",
              boxShadow: "0 10px 28px color-mix(in srgb, var(--color-highlight) 40%, transparent)",
            }}
          >
            Probar mi idea
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-highlight-ink)", opacity: 0.55 }} />
          </button>
          <a
            href="#como-funciona"
            style={{ display: "inline-flex", alignItems: "center", padding: "15px 22px", fontSize: 14, borderRadius: 999, border: "1px solid var(--color-divider)", color: "var(--color-text)", textDecoration: "none" }}
          >
            Cómo funciona →
          </a>
        </div>
      </div>

      <div id="como-funciona" style={{ scrollMarginTop: 24 }}>
        <h3 style={{ margin: "0 0 24px", color: "var(--color-accent-300)", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Cómo funciona
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {PASOS.map((paso) => (
            <div key={paso.n} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent-300)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {paso.n}
              </div>
              <h4 style={{ margin: 0 }}>{paso.titulo}</h4>
              <p style={{ margin: 0, fontSize: 13.5, opacity: 0.7, lineHeight: 1.5 }}>{paso.cuerpo}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card elev-md" style={{ padding: 32, background: "var(--color-surface)", display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
        <h3 style={{ margin: 0 }}>Por qué existe esto</h3>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.8, lineHeight: 1.6 }}>
          La mayoría de ideas de producto fallan por construir algo que el mercado ya resolvió, no por mala
          ejecución. Este proyecto convierte ese primer chequeo, el que cualquier consultor haría antes de firmar
          un contrato, en algo que corre en minutos y con evidencia real: jugadores nombrados, no relleno
          genérico.
        </p>
      </div>
    </div>
  );
}
