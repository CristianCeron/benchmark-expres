import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BenchmarkGrid } from "@/components/BenchmarkGrid";
import { benchmarks } from "@/data/benchmarks";

describe("BenchmarkGrid", () => {
  it("muestra las 4 tarjetas con la primera expandida por defecto", () => {
    render(<BenchmarkGrid />);

    for (const b of benchmarks) {
      expect(screen.getByText(b.titulo)).toBeInTheDocument();
    }

    // Detalle de la primera tarjeta visible (jugadores por nombre).
    expect(screen.getByText(benchmarks[0].jugadores[0])).toBeInTheDocument();
    // Detalle de la segunda tarjeta no visible todavía.
    expect(screen.queryByText(benchmarks[1].jugadores[0])).not.toBeInTheDocument();
  });

  it("al hacer clic en otra tarjeta, cambia cuál está expandida", () => {
    render(<BenchmarkGrid />);

    fireEvent.click(screen.getByText(benchmarks[1].titulo));

    expect(screen.getByText(benchmarks[1].jugadores[0])).toBeInTheDocument();
    expect(screen.queryByText(benchmarks[0].jugadores[0])).not.toBeInTheDocument();
  });

  it("muestra las 7 dimensiones en el detalle expandido", () => {
    render(<BenchmarkGrid />);
    const b = benchmarks[0];

    expect(screen.getByText(b.fortalezas[0])).toBeInTheDocument();
    expect(screen.getByText(b.brecha[0])).toBeInTheDocument();
    expect(screen.getByText(b.oportunidad[0])).toBeInTheDocument();
    expect(screen.getByText(b.advertencia)).toBeInTheDocument();
    expect(screen.getByText(b.señalesTendencia[0])).toBeInTheDocument();
    expect(screen.getByText(b.ideasRedes[0])).toBeInTheDocument();
    expect(screen.getByText(b.queHacer[0])).toBeInTheDocument();
    expect(screen.getByText(b.queNoHacer[0])).toBeInTheDocument();
  });
});
