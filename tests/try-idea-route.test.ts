import { describe, expect, it, vi, beforeEach } from "vitest";

const respuestaBuena = {
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
};

const mockGenerateContent = vi.fn();

vi.mock("@google/genai", () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: { generateContent: mockGenerateContent },
    })),
  };
});

function pedido() {
  return new Request("http://localhost/api/try-idea", {
    method: "POST",
    body: JSON.stringify({ idea: "Una app de prueba" }),
  });
}

describe("POST /api/try-idea", () => {
  beforeEach(() => {
    mockGenerateContent.mockReset();
    mockGenerateContent.mockResolvedValue({ text: JSON.stringify(respuestaBuena) });
    process.env.GEMINI_API_KEY = "test-key";
  });

  it("devuelve un benchmark completo para la idea recibida", async () => {
    const { POST } = await import("../app/api/try-idea/route");

    const response = await POST(pedido());
    const data = await response.json();

    expect(response.status).toBe(200);
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

  it("usa primero el modelo principal", async () => {
    const { POST } = await import("../app/api/try-idea/route");

    await POST(pedido());

    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerateContent.mock.calls[0][0].model).toBe("gemini-flash-latest");
  });

  it("si el modelo principal falla, pasa al modelo liviano y responde con éxito", async () => {
    mockGenerateContent.mockRejectedValueOnce(new Error("UNAVAILABLE"));
    const { POST } = await import("../app/api/try-idea/route");

    const response = await POST(pedido());
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
    expect(mockGenerateContent.mock.calls[1][0].model).toBe("gemini-flash-lite-latest");
    expect(data.jugadores.length).toBeGreaterThan(0);
  }, 10000);

  it("si una respuesta viene incompleta, la descarta y prueba con otro intento", async () => {
    mockGenerateContent.mockResolvedValueOnce({ text: "{}" });
    const { POST } = await import("../app/api/try-idea/route");

    const response = await POST(pedido());

    expect(response.status).toBe(200);
    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
  }, 10000);

  it("si faltan campos secundarios, los completa vacíos para que la página no se rompa", async () => {
    mockGenerateContent.mockResolvedValueOnce({
      text: JSON.stringify({ titulo: "Solo título", jugadores: ["Jugador A"] }),
    });
    const { POST } = await import("../app/api/try-idea/route");

    const response = await POST(pedido());
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.fuentes).toEqual([]);
    expect(data.queHacer).toEqual([]);
    expect(data.advertencia).toBe("");
  });

  it("devuelve un error controlado con status 503 si fallan los 4 intentos", async () => {
    mockGenerateContent.mockRejectedValue(new Error("UNAVAILABLE"));
    const { POST } = await import("../app/api/try-idea/route");

    const response = await POST(pedido());

    expect(response.status).toBe(503);
    expect(mockGenerateContent).toHaveBeenCalledTimes(4);
  }, 15000);
});
