import styles from "../../app/page.module.css";

interface NavProps {
  isTool: boolean;
  onGoLanding: () => void;
  onReplayTutorial: () => void;
}

export function Nav({ isTool, onGoLanding, onReplayTutorial }: NavProps) {
  return (
    <div className={`nav ${styles.nav}`} style={{ position: "relative", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onGoLanding}>
        <svg width="22" height="22" viewBox="0 0 256 256" fill="var(--color-accent)">
          <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144Z" />
        </svg>
        Benchmark Exprés
      </div>
      {isTool && (
        <button className="btn btn-ghost" onClick={onGoLanding} style={{ fontSize: 13 }}>
          ← Volver al inicio
        </button>
      )}
      {isTool && (
        <button className="btn btn-ghost" onClick={onReplayTutorial} style={{ fontSize: 13 }}>
          Ver tutorial
        </button>
      )}
      <span className="tag tag-outline" style={{ marginLeft: "auto" }}>
        Proyecto final · Lab10
      </span>
    </div>
  );
}
