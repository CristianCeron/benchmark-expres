import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("muestra el nombre de Cristian y la frase de objetivo", () => {
    render(<Footer />);
    expect(screen.getByText(/Construido por Cristian Cerón/i)).toBeInTheDocument();
    expect(screen.getByText(/benchmark antes de construir/i)).toBeInTheDocument();
  });

  it("tiene el link a LinkedIn abierto en una pestaña nueva", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /conectemos en linkedin/i });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/cristianceronb/");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
