import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TryIdeaBox } from "@/components/TryIdeaBox";

describe("TryIdeaBox en modo estático (NEXT_PUBLIC_DEMO_MODE sin definir)", () => {
  it("muestra input y botón deshabilitados", () => {
    render(<TryIdeaBox />);
    expect(screen.getByPlaceholderText(/describe tu idea/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /analizar mi idea/i })).toBeDisabled();
  });

  it("muestra el contador fijo en 30/30", () => {
    render(<TryIdeaBox />);
    expect(screen.getByText("30/30")).toBeInTheDocument();
  });

  it("muestra el mensaje explicativo y el video embebido", () => {
    render(<TryIdeaBox />);
    expect(screen.getByText(/se activa con/i)).toBeInTheDocument();
    expect(screen.getByTestId("demo-local-video")).toBeInTheDocument();
  });
});

describe("TryIdeaBox en modo live", () => {
  it("al analizar una idea, muestra las 7 dimensiones del resultado", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "live");
    vi.resetModules();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        categoria: "Categoría de prueba",
        titulo: "Título de prueba",
        jugadores: ["Jugador X"],
        fortalezas: ["Fortaleza X"],
        brecha: ["Brecha X"],
        oportunidad: ["Oportunidad X"],
        advertencia: "Advertencia X",
        señalesTendencia: ["Señal X"],
        ideasRedes: ["Idea de redes X"],
        queHacer: ["Hacer X"],
        queNoHacer: ["No hacer X"],
      }),
    }) as unknown as typeof fetch;

    const { TryIdeaBox: LiveTryIdeaBox } = await import("@/components/TryIdeaBox");
    render(<LiveTryIdeaBox />);

    const textarea = screen.getByPlaceholderText(/describe tu idea/i);
    expect(textarea).not.toBeDisabled();

    fireEvent.change(textarea, { target: { value: "Una idea de prueba" } });
    fireEvent.click(screen.getByRole("button", { name: /analizar mi idea/i }));

    await waitFor(() => {
      expect(screen.getByText("Título de prueba")).toBeInTheDocument();
    });
    expect(screen.getByText("Fortaleza X")).toBeInTheDocument();
    expect(screen.getByText("Señal X")).toBeInTheDocument();

    vi.unstubAllEnvs();
  });
});
