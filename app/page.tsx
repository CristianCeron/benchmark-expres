import { BenchmarkGrid } from "@/components/BenchmarkGrid";
import { TryIdeaBox } from "@/components/TryIdeaBox";

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
      <div style={{ padding: "24px 56px" }}>
        <div className="nav-brand">Benchmark Exprés</div>
      </div>

      <div style={{ padding: "8px 56px 40px", maxWidth: 640 }}>
        <h1 style={{ margin: "0 0 14px", fontSize: 36 }}>¿Vale la pena construirlo?</h1>
        <p style={{ fontSize: 15, opacity: 0.75, margin: 0 }}>
          Cuatro benchmarks reales: quién existe, qué hace bien, y dónde queda espacio para diferenciarse.
        </p>
      </div>

      <div
        style={{
          padding: "0 56px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "start",
        }}
      >
        <TryIdeaBox />
        <BenchmarkGrid />
      </div>
    </div>
  );
}
