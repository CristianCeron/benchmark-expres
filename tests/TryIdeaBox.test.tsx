import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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
