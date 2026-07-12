import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("Nocturne design tokens", () => {
  it("incluye las variables de color base del sistema Nocturne", () => {
    const css = readFileSync(path.resolve(__dirname, "../app/nocturne.css"), "utf-8");
    expect(css).toContain("--color-bg");
    expect(css).toContain("--color-accent");
    expect(css).toContain("--color-text");
  });
});
