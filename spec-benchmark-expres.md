# Spec: Benchmark Exprés

## Overview
Benchmark Exprés es una herramienta que, antes de construir cualquier producto o negocio, genera un análisis rápido y honesto de qué ya existe en el mercado, qué tan bien lo resuelven los jugadores actuales, y dónde queda un espacio real de diferenciación. Nace del propio método de trabajo de Cristian (benchmark/consultoría antes de ejecutar) convertido en herramienta reutilizable, y se construye como proyecto para el reto final de Lab10 (flujo idea → roadmap → spec → diseño → app publicada), dentro del ecosistema Truora / 30X.

## Qué significa éxito acá
Esto no es un producto con usuarios reales todavía, es una entrega de una sola sesión para un jurado. Las métricas de adopción o retención típicas de un PRD no aplican y sería forzarlas sin sentido. El éxito real es: un juez entra al link, ve el cuadro de "prueba tu idea" con un ejemplo ya precargado, le da clic a analizar (o escribe su propia idea), y en segundos entiende el valor de la herramienta y la calidad del análisis sin necesitar explicación adicional. Le queda claro que Cristian construyó esto y para qué.

## Usuarios objetivo
Emprendedores, PMs y founders no técnicos que tienen una idea de producto o negocio y necesitan, en minutos y no semanas, saber si vale la pena invertir tiempo construyéndola. Cristian es el primer usuario, usándola como su propio proyecto para el reto de Lab10.

## Alcance v1
- Página pública, sin login, con dos pantallas dentro de una sola página (sin rutas separadas): landing y herramienta.
- **Landing** (pantalla inicial): titular "¿Cuántas veces construiste algo que ya existía?", texto explicando qué hace la herramienta, botón destacado "Probar mi idea" (color de acento propio, distinto del acento del sistema, solo para este CTA y el tutorial) y un link "Cómo funciona →" que baja a una sección de 3 pasos. Incluye una tarjeta "Por qué existe esto" con la motivación del proyecto.
- **Herramienta** (tras el clic en "Probar mi idea"): cuadro "Prueba tu idea" con textarea (idea de ejemplo ya precargada, para que baste un clic) y botón "Analizar mi idea". El nav, en esta pantalla, agrega "← Volver al inicio" y "Ver tutorial".
- El cuadro funciona en vivo en todos los entornos, local y publicado, llamando a la API de Gemini (tier gratis) para generar el análisis en el momento. No hay modo estático ni deshabilitado: no hace falta, porque Gemini no tiene costo para este volumen de uso.
- **Tutorial de bienvenida**: la primera vez que alguien entra a la herramienta (detectado con `localStorage`), aparece un modal de 3 pasos explicando el flujo (describe tu idea → recibe el benchmark → decide con evidencia), con puntos de progreso, botón "Saltar" y "Siguiente"/"Entendido". No vuelve a aparecer solo después de cerrarlo, salvo que se pida explícitamente con "Ver tutorial" en el nav.
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
- El resultado se muestra como una grilla de tarjetas, una por dimensión, **todas visibles al mismo tiempo** (no es un acordeón). Cada tarjeta tiene un color según el tipo de contenido: tono "positivo" (acento) para oportunidad y qué hacer, tono "precaución" (gris apagado) para brecha y qué no hacer, tono neutral para el resto. La advertencia se muestra aparte, siempre visible, como una nota destacada al final.
- Diseño: se usa el sistema de diseño Nocturne ya construido por Cristian (tema oscuro, tokens de color y componentes como tarjetas, tags, botones e inputs), más un color de acento adicional ("highlight", dorado) exclusivo para el CTA principal de la landing y el tutorial. La página debe ser usable en mobile.
- Sin base de datos ni autenticación. Hay una función server-side (route de Next.js) que hace la llamada real a Gemini; la key de API nunca se expone al frontend ni se sube al repo.
- Autoría visible: pie de página con el nombre de Cristian, el objetivo del proyecto, y un link a linkedin.com/in/cristianceronb.

## Comportamiento
1. El usuario abre la página y ve la landing: titular, explicación, botón "Probar mi idea" y sección "Cómo funciona".
2. Al hacer clic en "Probar mi idea", pasa a la pantalla de la herramienta. Si es la primera vez que entra ahí (no hay marca en `localStorage`), se muestra el tutorial de 3 pasos automáticamente.
3. En la herramienta, el textarea ya tiene una idea de ejemplo escrita. Puede darle clic directo a "Analizar mi idea" o borrar y escribir la suya.
4. Al analizar, se llama a la API de Gemini y, mientras responde, el botón muestra "Analizando..." y un aviso de que puede tardar 15-20 segundos.
5. El resultado aparece debajo: categoría, título, y las 9 tarjetas de dimensión, todas visibles a la vez con su color según el tipo. La advertencia se muestra aparte, siempre visible.
6. Si Gemini no responde (por ejemplo, alta demanda momentánea) o falla la conexión, se muestra un mensaje de error claro invitando a intentar de nuevo, sin que la página se rompa.
7. Desde el nav, "← Volver al inicio" regresa a la landing; "Ver tutorial" vuelve a mostrar el tutorial aunque ya se haya visto antes.

## Errores y seguridad
La única llamada de red real es a la API de Gemini desde una función server-side; la clave de API vive solo en variable de entorno del servidor (nunca en código de cliente ni en el repo).

No hay autenticación ni cuentas de usuario, así que no hay límite propio de uso por persona: se depende del límite de solicitudes por minuto/día del tier gratis de Gemini. Si alguien agota ese límite, la próxima persona ve el mensaje de error de "alta demanda" hasta que se libere. Es un riesgo aceptado para una demo de una sola sesión con tráfico bajo (un jurado), no para un producto con tráfico real.

## Futuro (v2+)
- Evaluar si tiene sentido guardar o compartir el benchmark generado por un usuario. Fuera de v1 porque implica decidir sobre cuentas o identificadores, una decisión de producto que no hace falta resolver para una demo de una sola sesión.
- Autenticación o cuentas de usuario. Fuera de alcance en cualquier versión cercana: no aporta nada mientras la herramienta no tenga uso recurrente real más allá de la demo.
- Límite propio de uso (rate limiting a nivel de la app, no solo el de Gemini) si el tráfico real lo empieza a justificar.
- Evaluar un proveedor de pago si el volumen de uso supera el tier gratis de Gemini de forma sostenida.
