import { describe, expect, it, vi } from "vitest";

const mockCreate = vi.fn().mockResolvedValue({
  content: [
    {
      type: "text",
      text: JSON.stringify({
        categoria: "Ejemplo · Categoría de prueba",
        titulo: "Idea de prueba",
        jugadores: ["Jugador A", "Jugador B"],
        fortalezas: ["Hace algo bien"],
        brecha: ["Falta algo"],
        oportunidad: ["Oportunidad de diferenciación"],
        advertencia: "Advertencia de ejemplo",
        señalesTendencia: ["Señal de tendencia de ejemplo"],
        ideasRedes: ["Idea de redes de ejemplo"],
        queHacer: ["Hacer esto"],
        queNoHacer: ["No hacer esto otro"],
      }),
    },
  ],
});

vi.mock("@anthropic-ai/sdk", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: { create: mockCreate },
    })),
  };
});

describe("POST /api/try-idea", () => {
  it("devuelve un benchmark con las 7 dimensiones para la idea recibida", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const { POST } = await import("../app/api/try-idea/route");

    const request = new Request("http://localhost/api/try-idea", {
      method: "POST",
      body: JSON.stringify({ idea: "Una app de prueba" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(mockCreate).toHaveBeenCalled();
    expect(data.jugadores.length).toBeGreaterThan(0);
    expect(data.fortalezas.length).toBeGreaterThan(0);
    expect(data.brecha.length).toBeGreaterThan(0);
    expect(data.oportunidad.length).toBeGreaterThan(0);
    expect(data.advertencia).toBeTruthy();
    expect(data.señalesTendencia.length).toBeGreaterThan(0);
    expect(data.ideasRedes.length).toBeGreaterThan(0);
    expect(data.queHacer.length).toBeGreaterThan(0);
    expect(data.queNoHacer.length).toBeGreaterThan(0);
  });
});
