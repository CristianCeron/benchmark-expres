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
    categoria: "PM · Transformación ágil",
    titulo: "Chequeo de madurez ágil conversacional",
    jugadores: ["TeamRetro", "Agile Velocity", "AgilityHealth Radars", "Info-Tech Research Group"],
    fortalezas: [
      "Modelos de madurez validados con años de datos de equipos reales",
      "Dashboards comparativos entre equipos y portafolios",
      "Integración con Jira, Teams y Asana",
    ],
    brecha: [
      "Todos son encuestas estáticas de opción múltiple, no una conversación real",
      "Interpretar el resultado exige agendar una sesión con un consultor",
    ],
    oportunidad: [
      "Chequeo por conversación con IA que repregunta según cada respuesta",
      "Diagnóstico en minutos, sin agendar nada ni pagar consultoría",
    ],
    advertencia:
      "Jugadores establecidos venden consultoría cara junto al diagnóstico. Ganar credibilidad frente a agile coaches toma tiempo.",
  },
  {
    categoria: "Marketplaces · Última milla",
    titulo: "Verificación de contenido en la entrega",
    jugadores: ["Onfleet", "Bringg", "Track-POD", "Locus", "nuVizz"],
    fortalezas: [
      "Prueba de entrega con foto, firma y GPS en cada parada",
      "Notificaciones automáticas e integración con ERP/CRM",
      "Dashboards de disputas y desempeño por conductor",
    ],
    brecha: [
      "Todos capturan la foto de entrega, ninguno verifica que el contenido sea correcto",
      "Confirmar que lo entregado coincide con el pedido sigue siendo manual",
    ],
    oportunidad: [
      "Visión por computador que compara la foto contra el pedido y marca discrepancias",
      "Detecta el error antes de que el cliente reclame, no después",
    ],
    advertencia:
      "La logística de última milla ya está consolidada. La oportunidad es un nicho angosto, la verificación de contenido, no la ruta completa.",
  },
  {
    categoria: "Cross-sector · Operaciones",
    titulo: "Detector de deuda de proceso sin integración de sistemas",
    jugadores: ["Celonis", "SAP Signavio", "UiPath Process Mining", "mindzie"],
    fortalezas: [
      "Minería de procesos a partir de logs de sistemas ya integrados",
      "Detección de cuellos de botella y benchmarks por industria",
      "IA prescriptiva para priorizar automatización",
    ],
    brecha: [
      "Todos dependen de logs limpios de un ERP/CRM ya integrado",
      "La mayoría de negocios en transformación temprana opera en Excel y WhatsApp, sin ese registro",
    ],
    oportunidad: [
      "Diagnóstico por entrevista y observación, sin depender de logs de sistema",
      "Detecta deuda de proceso justo donde estas herramientas no llegan",
    ],
    advertencia:
      "Celonis y SAP dominan la categoría de 'process mining'. La oportunidad vive fuera de su alcance técnico, no compite de frente.",
  },
];
