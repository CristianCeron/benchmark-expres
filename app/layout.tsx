import type { Metadata } from "next";
import "./nocturne.css";

export const metadata: Metadata = {
  title: "Benchmark Exprés",
  description: "¿Vale la pena construirlo? Cuatro benchmarks reales antes de construir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
