import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TryIdeaBox } from "@/components/TryIdeaBox";

describe("TryIdeaBox", () => {
  it("el cuadro empieza vacío y el botón deshabilitado", () => {
    render(<TryIdeaBox />);
    const textarea = screen.getByPlaceholderText(/describe tu idea/i);
    expect(textarea).not.toBeDisabled();
    expect((textarea as HTMLTextAreaElement).value).toBe("");
    expect(screen.getByRole("button", { name: /analizar mi idea/i })).toBeDisabled();
  });

  it("el botón se habilita al escribir una idea", () => {
    render(<TryIdeaBox />);
    fireEvent.change(screen.getByPlaceholderText(/describe tu idea/i), {
      target: { value: "Una idea de prueba" },
    });
    expect(screen.getByRole("button", { name: /analizar mi idea/i })).not.toBeDisabled();
  });

  it("al analizar una idea, muestra el resultado con todas las dimensiones visibles a la vez", async () => {
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
        fuentes: ["https://ejemplo.com/fuente"],
      }),
    }) as unknown as typeof fetch;

    render(<TryIdeaBox />);
    fireEvent.change(screen.getByPlaceholderText(/describe tu idea/i), {
      target: { value: "Una idea de prueba" },
    });
    fireEvent.click(screen.getByRole("button", { name: /analizar mi idea/i }));

    await waitFor(() => {
      expect(screen.getByText("Título de prueba")).toBeInTheDocument();
    });

    // Todas las dimensiones se muestran a la vez, sin necesidad de clic.
    expect(screen.getByText("Jugador X")).toBeInTheDocument();
    expect(screen.getByText("Brecha X")).toBeInTheDocument();
    expect(screen.getByText("Oportunidad X")).toBeInTheDocument();
    expect(screen.getByText("Señal X")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si Gemini no responde", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as unknown as typeof fetch;

    render(<TryIdeaBox />);
    fireEvent.change(screen.getByPlaceholderText(/describe tu idea/i), {
      target: { value: "Una idea de prueba" },
    });
    fireEvent.click(screen.getByRole("button", { name: /analizar mi idea/i }));

    await waitFor(() => {
      expect(screen.getByText(/gemini no respondió/i)).toBeInTheDocument();
    });
  });
});
