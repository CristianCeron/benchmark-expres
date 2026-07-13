import { TryIdeaBox } from "@/components/TryIdeaBox";
import { Footer } from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className={styles.nav}>
        <div className="nav-brand">Benchmark Exprés</div>
      </div>

      <div className={styles.hero}>
        <h1 style={{ margin: "0 0 14px", fontSize: 36 }}>¿Vale la pena construirlo?</h1>
        <p style={{ fontSize: 15, opacity: 0.75, margin: 0 }}>
          Escribe tu idea y recibe un estudio de mercado honesto: quién ya existe, qué hace bien, y dónde queda
          espacio para diferenciarte.
        </p>
      </div>

      <div className={styles.content}>
        <TryIdeaBox />
      </div>

      <Footer />
    </div>
  );
}
