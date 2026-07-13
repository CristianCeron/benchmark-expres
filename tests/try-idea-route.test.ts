import { describe, expect, it, vi } from "vitest";

const mockGenerateContent = vi.fn().mockResolvedValue({
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
    fuentes: ["https://ejemplo.com/fuente"],
  }),
});

vi.mock("@google/genai", () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: { generateContent: mockGenerateContent },
    })),
  };
});

describe("POST /api/try-idea", () => {
  it("devuelve un benchmark con las 7 dimensiones para la idea recibida", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const { POST } = await import("../app/api/try-idea/route");

    const request = new Request("http://localhost/api/try-idea", {
      method: "POST",
      body: JSON.stringify({ idea: "Una app de prueba" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(mockGenerateContent).toHaveBeenCalled();
    expect(data.jugadores.length).toBeGreaterThan(0);
    expect(data.fortalezas.length).toBeGreaterThan(0);
    expect(data.brecha.length).toBeGreaterThan(0);
    expect(data.oportunidad.length).toBeGreaterThan(0);
    expect(data.advertencia).toBeTruthy();
    expect(data.señalesTendencia.length).toBeGreaterThan(0);
    expect(data.ideasRedes.length).toBeGreaterThan(0);
    expect(data.queHacer.length).toBeGreaterThan(0);
    expect(data.queNoHacer.length).toBeGreaterThan(0);
    expect(data.fuentes.length).toBeGreaterThan(0);
  });

  it("devuelve un error controlado con status 503 si Gemini falla", async () => {
    mockGenerateContent.mockRejectedValueOnce(new Error("UNAVAILABLE"));
    process.env.GEMINI_API_KEY = "test-key";
    const { POST } = await import("../app/api/try-idea/route");

    const request = new Request("http://localhost/api/try-idea", {
      method: "POST",
      body: JSON.stringify({ idea: "Una app de prueba" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(503);
  });
});
