import { describe, expect, it } from "vitest";
import { benchmarks } from "@/data/benchmarks";

function assertSinTodo(index: number) {
  const b = benchmarks[index];
  const valores = [b.categoria, b.titulo, ...b.jugadores, ...b.fortalezas, ...b.brecha, ...b.oportunidad, b.advertencia];
  for (const v of valores) {
    expect(v).not.toBe("TODO");
  }
}

describe("contenido benchmark 0: explicador de rechazos KYC", () => {
  it("no tiene campos placeholder", () => {
    assertSinTodo(0);
  });

  it("incluye jugadores reales del mercado KYC", () => {
    expect(benchmarks[0].jugadores).toEqual(
      expect.arrayContaining(["Truora", "Onfido", "Sumsub"])
    );
  });
});

describe("contenido benchmark 1: madurez ágil conversacional", () => {
  it("no tiene campos placeholder", () => {
    assertSinTodo(1);
  });

  it("incluye jugadores reales del mercado de madurez ágil", () => {
    expect(benchmarks[1].jugadores).toEqual(
      expect.arrayContaining(["TeamRetro", "Agile Velocity"])
    );
  });
});
