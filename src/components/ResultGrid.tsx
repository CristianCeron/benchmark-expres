import type { Benchmark } from "@/types/benchmark";

type Tono = "positivo" | "precaucion" | "neutral";

interface Seccion {
  titulo: string;
  tipo: "tags" | "lista" | "links";
  items: string[];
  tono: Tono;
}

const FONDO: Record<Tono, string> = {
  positivo: "color-mix(in srgb, var(--color-accent-900) 65%, var(--color-surface))",
  precaucion: "color-mix(in srgb, var(--color-neutral-800) 55%, var(--color-surface))",
  neutral: "var(--color-surface)",
};

const PUNTO: Record<Tono, string> = {
  positivo: "var(--color-accent)",
  precaucion: "var(--color-neutral-400)",
  neutral: "var(--color-neutral-500)",
};

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
        gap: 6,
      }}
    >
      {seccion.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ResultGrid({ benchmark: b }: { benchmark: Benchmark }) {
  const secciones: Seccion[] = [
    { titulo: "Apps o productos similares", tipo: "tags", items: b.jugadores, tono: "neutral" },
    { titulo: "Referentes principales", tipo: "lista", items: b.fortalezas, tono: "neutral" },
    { titulo: "Brecha", tipo: "lista", items: b.brecha, tono: "precaucion" },
    { titulo: "Oportunidad", tipo: "lista", items: b.oportunidad, tono: "positivo" },
    { titulo: "Señales de tendencia", tipo: "lista", items: b.señalesTendencia, tono: "neutral" },
    { titulo: "Ideas para mover redes", tipo: "lista", items: b.ideasRedes, tono: "neutral" },
    { titulo: "Qué hacer", tipo: "lista", items: b.queHacer, tono: "positivo" },
    { titulo: "Qué no hacer", tipo: "lista", items: b.queNoHacer, tono: "precaucion" },
    { titulo: "Fuentes", tipo: "links", items: b.fuentes, tono: "neutral" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
      <div>
        <span className="tag tag-accent">{b.categoria}</span>
        <h2 style={{ margin: "12px 0 0" }}>{b.titulo}</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {secciones.map((seccion) => (
          <div
            key={seccion.titulo}
            className="card"
            style={{
              background: FONDO[seccion.tono],
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              borderLeft: `2px solid ${PUNTO[seccion.tono]}`,
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: PUNTO[seccion.tono],
                  flex: "none",
                }}
              />
              <h6 style={{ margin: 0, color: "var(--color-text)" }}>{seccion.titulo}</h6>
            </div>
            <ContenidoSeccion seccion={seccion} />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          padding: "14px 16px",
          borderRadius: "var(--radius-md)",
          background: "var(--color-accent-900)",
          border: "1px solid var(--color-accent-800)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 256 256"
          fill="var(--color-accent-300)"
          style={{ flex: "none", marginTop: 1 }}
        >
          <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z" />
        </svg>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-accent-100)" }}>{b.advertencia}</p>
      </div>
    </div>
  );
}
