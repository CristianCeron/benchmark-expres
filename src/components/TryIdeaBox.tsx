"use client";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE;
const isLive = DEMO_MODE === "live";

export function TryIdeaBox() {
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
      />
      <button className="btn btn-primary btn-block" disabled={!isLive}>
        Analizar mi idea
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
    </div>
  );
}
