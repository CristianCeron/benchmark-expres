import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TryIdeaBox } from "@/components/TryIdeaBox";

describe("TryIdeaBox", () => {
  it("input y botón están habilitados desde el inicio, con una idea de ejemplo precargada", () => {
    render(<TryIdeaBox />);
    const textarea = screen.getByPlaceholderText(/describe tu idea/i);
    expect(textarea).not.toBeDisabled();
    expect((textarea as HTMLTextAreaElement).value.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /analizar mi idea/i })).not.toBeDisabled();
  });

  it("el botón se deshabilita si se borra la idea", () => {
    render(<TryIdeaBox />);
    fireEvent.change(screen.getByPlaceholderText(/describe tu idea/i), {
      target: { value: "" },
    });
    expect(screen.getByRole("button", { name: /analizar mi idea/i })).toBeDisabled();
  });

  it("al analizar una idea, muestra el resultado en tarjetas expandibles por dimensión", async () => {
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

    // La primera sección (apps similares) está expandida por defecto.
    expect(screen.getByText("Jugador X")).toBeInTheDocument();
    // Las demás secciones existen como encabezados pero su contenido está colapsado.
    expect(screen.getByText("Brecha")).toBeInTheDocument();
    expect(screen.queryByText("Brecha X")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Brecha"));
    expect(screen.getByText("Brecha X")).toBeInTheDocument();
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
