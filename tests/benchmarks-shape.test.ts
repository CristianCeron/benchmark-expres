import { describe, expect, it } from "vitest";
import { benchmarks } from "@/data/benchmarks";

describe("datos de benchmarks: forma", () => {
  it("tiene exactamente 4 benchmarks", () => {
    expect(benchmarks).toHaveLength(4);
  });

  it("cada benchmark tiene todos los campos requeridos no vacíos", () => {
    for (const b of benchmarks) {
      expect(b.categoria).toBeTruthy();
      expect(b.titulo).toBeTruthy();
      expect(b.jugadores.length).toBeGreaterThan(0);
      expect(b.fortalezas.length).toBeGreaterThan(0);
      expect(b.brecha.length).toBeGreaterThan(0);
      expect(b.oportunidad.length).toBeGreaterThan(0);
      expect(b.advertencia).toBeTruthy();
    }
  });

  it("cada benchmark tiene las 3 dimensiones nuevas no vacías", () => {
    for (const b of benchmarks) {
      expect(b.señalesTendencia.length).toBeGreaterThan(0);
      expect(b.ideasRedes.length).toBeGreaterThan(0);
      expect(b.queHacer.length).toBeGreaterThan(0);
      expect(b.queNoHacer.length).toBeGreaterThan(0);
    }
  });
});
