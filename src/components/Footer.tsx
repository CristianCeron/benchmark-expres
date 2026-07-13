import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div
      className={styles.footer}
      style={{
        marginTop: "auto",
        borderTop: "1px solid var(--color-divider)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>Construido por Cristian Cerón</div>
          <p style={{ fontSize: 13, opacity: 0.7, margin: "8px 0 0", maxWidth: 480 }}>
            Los grandes resultados no se construyen solo con metodología, sino con visión, empatía y propósito.
            Este proyecto es esa idea aplicada: benchmark antes de construir.
          </p>
        </div>
        <a
          href="https://www.linkedin.com/in/cristianceronb/"
          target="_blank"
          rel="noopener"
          className="cta-highlight"
          style={{
            flex: "none",
            padding: "12px 20px",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 999,
            border: "none",
            background: "var(--color-highlight)",
            color: "var(--color-highlight-ink)",
            textDecoration: "none",
          }}
        >
          Conectemos en LinkedIn
        </a>
      </div>
      <p style={{ fontSize: 11.5, opacity: 0.5, margin: 0, textAlign: "center" }}>
        Este demo usa una API key gratuita de prueba de Google (Gemini). Si tarda o falla, es por el límite del
        tier gratis, no un error del producto.
      </p>
    </div>
  );
}
