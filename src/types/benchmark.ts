export interface Benchmark {
  categoria: string;
  titulo: string;
  jugadores: string[];
  fortalezas: string[];
  brecha: string[];
  oportunidad: string[];
  advertencia: string;
  /** Lectura razonada del sector, no es un dato de redes sociales en tiempo real. */
  señalesTendencia: string[];
  ideasRedes: string[];
  queHacer: string[];
  queNoHacer: string[];
  /** Links reales que respaldan las afirmaciones (fuentes, no inventados). */
  fuentes: string[];
}
