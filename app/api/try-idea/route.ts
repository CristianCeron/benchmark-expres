import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Eres el motor de Benchmark Exprés. Dada una idea de producto o negocio, entregas un estudio de mercado honesto con 7 dimensiones, en JSON, con esta forma exacta:
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
  "queNoHacer": string[]
}

Reglas:
- "jugadores" deben ser empresas o productos reales que existan en ese mercado, nunca inventados. Si no estás seguro de que algo es real, no lo incluyas.
- "señalesTendencia" es una lectura razonada del sector, nunca datos de redes sociales en tiempo real ni una métrica que no puedas sustentar.
- Responde solo el JSON, sin texto adicional.`;

export async function POST(request: Request) {
  const { idea } = await request.json();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: `Idea: ${idea}` }],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  const parsed = JSON.parse(textBlock && "text" in textBlock ? textBlock.text : "{}");

  return Response.json(parsed);
}
