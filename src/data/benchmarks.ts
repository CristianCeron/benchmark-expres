export interface Benchmark {
  categoria: string;
  titulo: string;
  jugadores: string[];
  fortalezas: string[];
  brecha: string[];
  oportunidad: string[];
  advertencia: string;
}

export const benchmarks: Benchmark[] = [
  {
    categoria: "Fintech · Verificación de identidad",
    titulo: "Explicador de rechazos KYC",
    jugadores: ["Truora", "Onfido", "Sumsub", "Trulioo", "iDenfy"],
    fortalezas: [
      "Motores de riesgo en tiempo real y liveness anti-deepfake",
      "Cobertura de documentos en 190+ países",
      "Integración vía API/SDK en horas, no meses",
    ],
    brecha: [
      "Todos optimizan la decisión para el negocio, no la explicación para el usuario",
      "25 a 45% de rechazos son falsos positivos y el usuario nunca sabe por qué",
    ],
    oportunidad: [
      "Capa de explicación post-rechazo en lenguaje simple: qué falló y cómo corregirlo",
      "Reduce reintentos fallidos y tickets de soporte, sin tocar el motor de decisión",
    ],
    advertencia:
      "Mercado con jugadores grandes y consolidados. La oportunidad es una capa complementaria, no un reemplazo del motor KYC.",
  },
  {
    categoria: "TODO",
    titulo: "TODO",
    jugadores: ["TODO"],
    fortalezas: ["TODO"],
    brecha: ["TODO"],
    oportunidad: ["TODO"],
    advertencia: "TODO",
  },
  {
    categoria: "TODO",
    titulo: "TODO",
    jugadores: ["TODO"],
    fortalezas: ["TODO"],
    brecha: ["TODO"],
    oportunidad: ["TODO"],
    advertencia: "TODO",
  },
  {
    categoria: "TODO",
    titulo: "TODO",
    jugadores: ["TODO"],
    fortalezas: ["TODO"],
    brecha: ["TODO"],
    oportunidad: ["TODO"],
    advertencia: "TODO",
  },
];
