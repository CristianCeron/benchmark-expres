import type { Benchmark } from "@/data/benchmarks";
import { BenchmarkDetail } from "@/components/BenchmarkDetail";

interface BenchmarkCardProps {
  benchmark: Benchmark;
  expanded: boolean;
  onToggle: () => void;
}

export function BenchmarkCard({ benchmark: b, expanded, onToggle }: BenchmarkCardProps) {
  return (
    <div className="card" style={{ background: "var(--color-surface)", padding: 0, overflow: "hidden" }}>
      <div
        onClick={onToggle}
        style={{
          cursor: "pointer",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <span className="tag tag-accent">{b.categoria}</span>
        <h4 style={{ margin: 0, flex: 1 }}>{b.titulo}</h4>
      </div>
      {expanded && (
        <div style={{ padding: "0 22px 24px" }}>
          <BenchmarkDetail benchmark={b} />
        </div>
      )}
    </div>
  );
}
