import { describe, expect, it } from "vitest";
import { benchmarks } from "@/data/benchmarks";

function assertSinTodo(index: number) {
  const b = benchmarks[index];
  const valores = [b.categoria, b.titulo, ...b.jugadores, ...b.fortalezas, ...b.brecha, ...b.oportunidad, b.advertencia];
  for (const v of valores) {
    expect(v).not.toBe("TODO");
  }
}

function assertNuevasDimensionesSinTodo(index: number) {
  const b = benchmarks[index];
  const valores = [...b.señalesTendencia, ...b.ideasRedes, ...b.queHacer, ...b.queNoHacer];
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

  it("tiene las 3 dimensiones nuevas redactadas", () => {
    assertNuevasDimensionesSinTodo(0);
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

  it("tiene las 3 dimensiones nuevas redactadas", () => {
    assertNuevasDimensionesSinTodo(1);
  });
});

describe("contenido benchmark 2: verificación de contenido en la entrega", () => {
  it("no tiene campos placeholder", () => {
    assertSinTodo(2);
  });

  it("incluye jugadores reales de última milla", () => {
    expect(benchmarks[2].jugadores).toEqual(
      expect.arrayContaining(["Onfleet", "Bringg"])
    );
  });

  it("tiene las 3 dimensiones nuevas redactadas", () => {
    assertNuevasDimensionesSinTodo(2);
  });
});

describe("contenido benchmark 3: deuda de proceso sin integración de sistemas", () => {
  it("no tiene campos placeholder", () => {
    assertSinTodo(3);
  });

  it("incluye jugadores reales de process mining", () => {
    expect(benchmarks[3].jugadores).toEqual(
      expect.arrayContaining(["Celonis", "SAP Signavio"])
    );
  });
});

describe("los 4 benchmarks juntos", () => {
  it("ninguno tiene campos placeholder", () => {
    for (let i = 0; i < 4; i++) assertSinTodo(i);
  });
});
