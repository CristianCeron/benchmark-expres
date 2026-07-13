import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BenchmarkApp } from "@/components/BenchmarkApp";

describe("BenchmarkApp", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra la landing por defecto", () => {
    render(<BenchmarkApp />);
    expect(screen.getByText(/cuántas veces construiste algo que ya existía/i)).toBeInTheDocument();
  });

  it("al hacer clic en Probar mi idea, pasa a la herramienta", () => {
    render(<BenchmarkApp />);
    fireEvent.click(screen.getByRole("button", { name: /probar mi idea/i }));
    expect(screen.getByText("Prueba tu idea")).toBeInTheDocument();
  });

  it("al hacer clic en Volver al inicio, regresa a la landing", () => {
    render(<BenchmarkApp />);
    fireEvent.click(screen.getByRole("button", { name: /probar mi idea/i }));
    fireEvent.click(screen.getByRole("button", { name: /volver al inicio/i }));
    expect(screen.getByText(/cuántas veces construiste algo que ya existía/i)).toBeInTheDocument();
  });

  it("muestra el tutorial la primera vez que se entra a la herramienta", () => {
    render(<BenchmarkApp />);
    fireEvent.click(screen.getByRole("button", { name: /probar mi idea/i }));
    expect(screen.getByText(/1\. describe tu idea/i)).toBeInTheDocument();
  });

  it("no vuelve a mostrar el tutorial solo si ya se marcó como visto", () => {
    localStorage.setItem("be_tutorial_seen", "1");
    render(<BenchmarkApp />);
    fireEvent.click(screen.getByRole("button", { name: /probar mi idea/i }));
    expect(screen.queryByText(/1\. describe tu idea/i)).not.toBeInTheDocument();
  });

  it("el botón Ver tutorial lo vuelve a mostrar aunque ya se haya visto", () => {
    localStorage.setItem("be_tutorial_seen", "1");
    render(<BenchmarkApp />);
    fireEvent.click(screen.getByRole("button", { name: /probar mi idea/i }));
    fireEvent.click(screen.getByRole("button", { name: /ver tutorial/i }));
    expect(screen.getByText(/1\. describe tu idea/i)).toBeInTheDocument();
  });

  it("saltar el tutorial lo cierra y marca localStorage", () => {
    render(<BenchmarkApp />);
    fireEvent.click(screen.getByRole("button", { name: /probar mi idea/i }));
    fireEvent.click(screen.getByRole("button", { name: /saltar/i }));
    expect(screen.queryByText(/1\. describe tu idea/i)).not.toBeInTheDocument();
    expect(localStorage.getItem("be_tutorial_seen")).toBe("1");
  });
});
