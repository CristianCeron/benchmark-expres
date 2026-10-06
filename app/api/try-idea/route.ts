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

const MODELO_PRINCIPAL = "gemini-flash-latest";
const MODELO_RESPALDO = "gemini-flash-lite-latest";

// Orden de intentos: si el principal está saturado o sin cupo, el respaldo (otro modelo,
// con su propio cupo y capacidad) responde sin esperar. Las esperas solo aplican de la
// segunda vuelta en adelante.
const INTENTOS = [MODELO_PRINCIPAL, MODELO_RESPALDO, MODELO_PRINCIPAL, MODELO_RESPALDO];
const ESPERA_ANTES_DE_INTENTO_MS = [0, 0, 1000, 2000];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor : "";
}

function lista(valor: unknown): string[] {
  return Array.isArray(valor) ? valor.filter((x): x is string => typeof x === "string") : [];
}

// Garantiza que la respuesta tenga la forma que espera la página. Si lo esencial falta,
// lanza error para que se pruebe otro intento en vez de mostrar una tarjeta vacía.
function normalizar(crudo: unknown) {
  if (typeof crudo !== "object" || crudo === null) {
    throw new Error("Respuesta de Gemini sin formato de objeto");
  }
  const r = crudo as Record<string, unknown>;
  const resultado = {
    categoria: texto(r.categoria),
    titulo: texto(r.titulo),
    jugadores: lista(r.jugadores),
    fortalezas: lista(r.fortalezas),
    brecha: lista(r.brecha),
    oportunidad: lista(r.oportunidad),
    advertencia: texto(r.advertencia),
    señalesTendencia: lista(r.señalesTendencia),
    ideasRedes: lista(r.ideasRedes),
    queHacer: lista(r.queHacer),
    queNoHacer: lista(r.queNoHacer),
    fuentes: lista(r.fuentes),
  };
  if (!resultado.titulo || resultado.jugadores.length === 0) {
    throw new Error("Respuesta de Gemini incompleta");
  }
  return resultado;
}

export async function POST(request: Request) {
  const { idea } = await request.json();

  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let ultimoError: unknown;

  for (let intento = 0; intento < INTENTOS.length; intento++) {
    const modelo = INTENTOS[intento];
    const espera = ESPERA_ANTES_DE_INTENTO_MS[intento];
    if (espera > 0) {
      await esperar(espera);
    }

    try {
      const response = await client.models.generateContent({
        model: modelo,
        contents: `Idea: ${idea}`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
        },
      });

      const resultado = normalizar(JSON.parse(response.text ?? "{}"));
      console.log(`Análisis generado con ${modelo} (intento ${intento + 1}/${INTENTOS.length})`);
      return Response.json(resultado);
    } catch (error) {
      ultimoError = error;
      console.error(`Error con ${modelo} (intento ${intento + 1}/${INTENTOS.length}):`, error);
    }
  }

  console.error("Gemini falló en todos los intentos:", ultimoError);
  return Response.json({ error: "No se pudo generar el análisis" }, { status: 503 });
}
