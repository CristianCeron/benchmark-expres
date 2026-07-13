import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Eres el motor de Benchmark Exprés. Dada una idea de producto o negocio, entregas un estudio de mercado honesto con estas dimensiones, en JSON, con esta forma exacta:
{
  "categoria": string,
  "titulo": string,
  "jugadores": string[],
  "fortalezas": string[],
  "brecha": string[],
  "oportunidad": string[],
  "advertencia": string,
  "señalesTendencia": string[],
  "ideasRedes": string[],
  "queHacer": string[],
  "queNoHacer": string[],
  "fuentes": string[]
}

Reglas:
- "jugadores" son apps o productos reales que ya existen y hacen algo igual o parecido a la idea recibida, nunca inventados. Si no estás seguro de que algo es real, no lo incluyas.
- "señalesTendencia" es una lectura razonada del sector, nunca datos de redes sociales en tiempo real ni una métrica que no puedas sustentar.
- "fuentes" son URLs reales (artículos, reportes, páginas de los jugadores mencionados) que respaldan lo que afirmas en brecha, oportunidad o señales de tendencia. Si no tienes una URL real para respaldar algo, no la inventes: deja el arreglo más corto en vez de poner un link falso.
- Responde solo el JSON, sin texto adicional.`;

const MAX_INTENTOS = 3;
const ESPERA_MS = [1000, 2000];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  const { idea } = await request.json();

  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let ultimoError: unknown;

  for (let intento = 0; intento < MAX_INTENTOS; intento++) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-flash-latest",
        contents: `Idea: ${idea}`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text ?? "{}");
      return Response.json(parsed);
    } catch (error) {
      ultimoError = error;
      console.error(`Error llamando a Gemini (intento ${intento + 1}/${MAX_INTENTOS}):`, error);
      if (intento < MAX_INTENTOS - 1) {
        await esperar(ESPERA_MS[intento]);
      }
    }
  }

  console.error("Gemini falló en todos los intentos:", ultimoError);
  return Response.json({ error: "No se pudo generar el análisis" }, { status: 503 });
}
