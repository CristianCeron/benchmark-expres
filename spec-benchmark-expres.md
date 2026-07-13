# Spec: Benchmark Exprés

## Overview
Benchmark Exprés es una herramienta que, antes de construir cualquier producto o negocio, genera un análisis rápido y honesto de qué ya existe en el mercado, qué tan bien lo resuelven los jugadores actuales, y dónde queda un espacio real de diferenciación. Nace del propio método de trabajo de Cristian (benchmark/consultoría antes de ejecutar) convertido en herramienta reutilizable, y se construye como proyecto para el reto final de Lab10 (flujo idea → roadmap → spec → diseño → app publicada), dentro del ecosistema Truora / 30X.

## Qué significa éxito acá
Esto no es un producto con usuarios reales todavía, es una entrega de una sola sesión para un jurado. Las métricas de adopción o retención típicas de un PRD no aplican y sería forzarlas sin sentido. El éxito real es: un juez entra al link, ve el cuadro de "prueba tu idea" con un ejemplo ya precargado, le da clic a analizar (o escribe su propia idea), y en segundos entiende el valor de la herramienta y la calidad del análisis sin necesitar explicación adicional. Le queda claro que Cristian construyó esto y para qué.

## Usuarios objetivo
Emprendedores, PMs y founders no técnicos que tienen una idea de producto o negocio y necesitan, en minutos y no semanas, saber si vale la pena invertir tiempo construyéndola. Cristian es el primer usuario, usándola como su propio proyecto para el reto de Lab10.

## Alcance v1
- Página pública, sin login, con un solo cuadro de "prueba tu idea": textarea con una idea de ejemplo ya precargada (para que baste un clic, sin obligar a escribir) y botón "Analizar mi idea".
- El cuadro funciona en vivo en todos los entornos, local y publicado, llamando a la API de Gemini (tier gratis) para generar el análisis en el momento. No hay modo estático ni deshabilitado: no hace falta, porque Gemini no tiene costo para este volumen de uso.
- Cada análisis es un estudio de mercado con estas dimensiones, generadas por la IA para la idea puntual que se escribió:
  1. Apps o productos similares: apps/productos reales que ya existen y hacen algo igual o parecido a la idea (nunca inventados).
  2. Referentes principales: qué hacen bien esos jugadores.
  3. Brecha real detectada.
  4. Oportunidad de diferenciación.
  5. Señales de tendencia: lectura razonada del sector, nunca presentada como dato de redes en tiempo real.
  6. Ideas para empezar a mover redes/visibilidad.
  7. Qué hacer y qué no hacer al construir en este espacio.
  8. Fuentes: links reales que respaldan las afirmaciones de brecha, oportunidad o señales de tendencia. Si no hay una URL real para respaldar algo, se omite antes que inventar un link falso.
  Además de: categoría, título y una advertencia si el terreno ya tiene competidores grandes o consolidados.
- El resultado se muestra redistribuido en tarjetas expandibles, una por dimensión, con el mismo patrón de acordeón (una sección abierta a la vez, clic para cambiar) para evitar mostrar todo el texto junto y de golpe. La advertencia se muestra aparte, siempre visible, como una nota destacada.
- Diseño: se usa el sistema de diseño Nocturne ya construido por Cristian (tema oscuro, tokens de color y componentes como tarjetas, tags, botones e inputs). La página debe ser usable en mobile.
- Sin base de datos ni autenticación. Hay una función server-side (route de Next.js) que hace la llamada real a Gemini; la key de API nunca se expone al frontend ni se sube al repo.
- Autoría visible: pie de página con el nombre de Cristian, el objetivo del proyecto, y un link a linkedin.com/in/cristianceronb.

## Comportamiento
1. El usuario abre la página y ve el encabezado y el cuadro "Prueba tu idea" con una idea de ejemplo ya escrita en el textarea.
2. Puede darle clic directo a "Analizar mi idea" (usa el ejemplo) o borrar y escribir su propia idea.
3. Al analizar, se llama a la API de Gemini y, mientras responde, el botón muestra "Analizando...".
4. El resultado aparece debajo: categoría, título, y las dimensiones en tarjetas expandibles. La primera tarjeta (apps o productos similares) aparece expandida por defecto; el resto colapsado. Al hacer clic en otra tarjeta, esa se expande y la anterior se colapsa.
5. La advertencia (si aplica) se muestra siempre visible, no dentro del acordeón.
6. Si Gemini no responde (por ejemplo, alta demanda momentánea) o falla la conexión, se muestra un mensaje de error claro invitando a intentar de nuevo, sin que la página se rompa.

## Errores y seguridad
La única llamada de red real es a la API de Gemini desde una función server-side; la clave de API vive solo en variable de entorno del servidor (nunca en código de cliente ni en el repo).

No hay autenticación ni cuentas de usuario, así que no hay límite propio de uso por persona: se depende del límite de solicitudes por minuto/día del tier gratis de Gemini. Si alguien agota ese límite, la próxima persona ve el mensaje de error de "alta demanda" hasta que se libere. Es un riesgo aceptado para una demo de una sola sesión con tráfico bajo (un jurado), no para un producto con tráfico real.

## Futuro (v2+)
- Evaluar si tiene sentido guardar o compartir el benchmark generado por un usuario. Fuera de v1 porque implica decidir sobre cuentas o identificadores, una decisión de producto que no hace falta resolver para una demo de una sola sesión.
- Autenticación o cuentas de usuario. Fuera de alcance en cualquier versión cercana: no aporta nada mientras la herramienta no tenga uso recurrente real más allá de la demo.
- Límite propio de uso (rate limiting a nivel de la app, no solo el de Gemini) si el tráfico real lo empieza a justificar.
- Evaluar un proveedor de pago si el volumen de uso supera el tier gratis de Gemini de forma sostenida.
