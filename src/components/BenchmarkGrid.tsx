"use client";

import { useState } from "react";
import { benchmarks } from "@/data/benchmarks";
import { BenchmarkCard } from "@/components/BenchmarkCard";

export function BenchmarkGrid() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 280 }}>
      {benchmarks.map((b, i) => (
        <BenchmarkCard
          key={b.titulo}
          benchmark={b}
          expanded={i === expandedIndex}
          onToggle={() => setExpandedIndex(i)}
        />
      ))}
    </div>
  );
}
