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
    señalesTendencia: [
      "Más del 70% del onboarding KYC ya es automatizado con biometría, pero el abandono durante el proceso sigue en 34%: automatizar no resolvió la fricción",
      "El fraude con deepfakes e identidades sintéticas ya es ~22% de los intentos de fraude digital, lo que empuja a subir la exigencia de verificación, no a bajarla",
    ],
    ideasRedes: [
      "Contenido corto en LinkedIn dirigido a founders fintech mostrando el contraste entre un rechazo KYC mal explicado y uno bien explicado",
      "Compartir el dato del 25 a 45% de falsos positivos como gancho en comunidades de compliance y fintech, con la fuente citada",
    ],
    queHacer: [
      "Diseñar la capa de explicación como complemento del motor KYC existente, no como reemplazo",
      "Medir y comunicar la reducción de tickets de soporte como métrica central de valor",
    ],
    queNoHacer: [
      "No prometer que se puede relajar el rigor regulatorio: AMLR y eIDAS 2.0 entran en 2027 y van a exigir más, no menos",
      "No exponer datos biométricos o de identidad en los mensajes de explicación sin control de privacidad",
    ],
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
    señalesTendencia: [
      "Las herramientas líderes están migrando de encuestas puntuales a evaluación continua con IA sobre datos reales de entrega, no solo autopercepción del equipo",
      "El criterio de madurez está pasando de 'ceremonias bien hechas' a resultados: velocidad de entrega, calidad y satisfacción del cliente por encima de rituales perfectos",
    ],
    ideasRedes: [
      "Publicar comparativas honestas tipo 'scrum perfecto vs entrega real' en LinkedIn dirigidas a agile coaches y heads of delivery",
      "Ofrecer un mini-diagnóstico corto como lead magnet en comunidades de Scrum Masters y agile coaches",
    ],
    queHacer: [
      "Enfocar el diagnóstico conversacional en resultados de entrega, no solo en adherencia a ceremonias",
      "Ofrecerlo con cadencia corta y repetible (por ejemplo trimestral), no como auditoría anual única",
    ],
    queNoHacer: [
      "No posicionarlo como reemplazo del agile coach humano: el mercado ya está mostrando que la IA complementa, no reemplaza el coaching",
      "No prometer un diagnóstico definitivo en una sola sesión, la madurez de un equipo cambia con el tiempo",
    ],
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
    señalesTendencia: [
      "La prueba de entrega automatizada ya bajó quejas de clientes hasta un 34% y subió el rendimiento de los conductores hasta un 30% donde se implementó",
      "La calidad de la prueba de entrega se está tratando como control financiero (evita disputas y contracargos), no solo como detalle de servicio al cliente",
    ],
    ideasRedes: [
      "Mostrar casos con métricas concretas de reducción de disputas en LinkedIn y foros de operaciones de e-commerce y última milla",
      "Contenido con ángulo humano: cómo la verificación automática protege a los conductores de reclamos injustos, no solo eficiencia para la empresa",
    ],
    queHacer: [
      "Enfocar el pitch en reducción de disputas y contracargos como retorno medible, que es justo lo que el mercado ya está validando",
      "Construirlo como capa adicional sobre plataformas existentes (Onfleet, Bringg, etc.), no como reemplazo de la suite logística completa",
    ],
    queNoHacer: [
      "No competir de frente en ruteo u optimización de rutas, ese terreno ya está consolidado y no es la brecha real",
      "No capturar más contexto o comportamiento del conductor sin ser explícito sobre qué se audita y por qué",
    ],
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
    señalesTendencia: ["TODO"],
    ideasRedes: ["TODO"],
    queHacer: ["TODO"],
    queNoHacer: ["TODO"],
  },
];
