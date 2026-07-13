import type { Benchmark } from "@/data/benchmarks";

function Lista({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div>
      <h6 style={{ color: "var(--color-accent-300)", margin: "0 0 8px" }}>{titulo}</h6>
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
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function BenchmarkDetail({ benchmark: b }: { benchmark: Benchmark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 24,
        }}
      >
        <div>
          <h6 style={{ color: "var(--color-accent-300)", margin: "0 0 8px" }}>Jugadores</h6>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {b.jugadores.map((j) => (
              <span key={j} className="tag tag-neutral" style={{ fontSize: 10 }}>
                {j}
              </span>
            ))}
          </div>
        </div>
        <Lista titulo="Referentes principales" items={b.fortalezas} />
        <Lista titulo="Brecha" items={b.brecha} />
        <Lista titulo="Oportunidad" items={b.oportunidad} />
        <Lista titulo="Señales de tendencia" items={b.señalesTendencia} />
        <Lista titulo="Ideas para mover redes" items={b.ideasRedes} />
        <Lista titulo="Qué hacer" items={b.queHacer} />
        <Lista titulo="Qué no hacer" items={b.queNoHacer} />
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
