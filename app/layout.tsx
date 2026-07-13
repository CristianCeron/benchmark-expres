import type { Metadata } from "next";
import "./nocturne.css";
import "./highlight.css";

export const metadata: Metadata = {
  title: "Benchmark Exprés",
  description: "¿Vale la pena construirlo? Escribe tu idea y recibe un estudio de mercado honesto.",
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
