import { describe, expect, it } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import path from "path";

describe("manejo seguro de la API key", () => {
  it(".gitignore ignora .env.local", () => {
    const gitignore = readFileSync(path.resolve(__dirname, "../.gitignore"), "utf-8");
    expect(gitignore).toMatch(/\.env\.local/);
  });

  it("existe .env.example con la variable sin valor real", () => {
    const envExamplePath = path.resolve(__dirname, "../.env.example");
    expect(existsSync(envExamplePath)).toBe(true);
    const content = readFileSync(envExamplePath, "utf-8");
    expect(content).toMatch(/^GEMINI_API_KEY=\s*$/m);
  });

  it("ningún componente cliente referencia GEMINI_API_KEY", () => {
    const componentsDir = path.resolve(__dirname, "../src/components");
    const files = readdirSync(componentsDir);
    for (const file of files) {
      const content = readFileSync(path.join(componentsDir, file), "utf-8");
      expect(content).not.toMatch(/GEMINI_API_KEY/);
    }
  });
});
