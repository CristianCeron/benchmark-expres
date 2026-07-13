import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div
      className={styles.footer}
      style={{
        marginTop: "auto",
        borderTop: "1px solid var(--color-divider)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: 15, fontWeight: 500 }}>Construido por Cristian Cerón</div>
        <p style={{ fontSize: 13, opacity: 0.7, margin: "8px 0 0", maxWidth: 480 }}>
          Los grandes resultados no se construyen solo con metodología, sino con visión, empatía y propósito.
          Este proyecto es esa idea aplicada: benchmark antes de construir. Si te resuena este enfoque, conectemos.
        </p>
      </div>
      <a
        href="https://www.linkedin.com/in/cristianceronb/"
        target="_blank"
        rel="noopener"
        className="btn btn-primary"
        style={{ flex: "none", padding: "12px 20px", fontSize: 14 }}
      >
        Conectemos en LinkedIn
      </a>
    </div>
  );
}
