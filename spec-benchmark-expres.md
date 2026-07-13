# Spec: Benchmark Exprés

## Overview
Benchmark Exprés es una herramienta que, antes de construir cualquier producto o negocio, genera un análisis rápido y honesto de qué ya existe en el mercado, qué tan bien lo resuelven los jugadores actuales, y dónde queda un espacio real de diferenciación. Nace del propio método de trabajo de Cristian (benchmark/consultoría antes de ejecutar) convertido en herramienta reutilizable, y se construye como proyecto para el reto final de Lab10 (flujo idea → roadmap → spec → diseño → app publicada), dentro del ecosistema Truora / 30X.

## Qué significa éxito acá
Esto no es un producto con usuarios reales todavía, es una entrega de una sola sesión para un jurado. Las métricas de adopción o retención típicas de un PRD no aplican y sería forzarlas sin sentido. El éxito real es: un juez entra al link, entiende el valor de la herramienta y la calidad del análisis en menos de 60 segundos sin necesitar explicación adicional, y le queda claro que Cristian construyó esto y para qué.

## Usuarios objetivo
Emprendedores, PMs y founders no técnicos que tienen una idea de producto o negocio y necesitan, en minutos y no semanas, saber si vale la pena invertir tiempo construyéndola. Cristian es el primer usuario, usándola como su propio proyecto para el reto de Lab10.

## Alcance v1
Esta v1 tiene dos estados distintos y ambos son parte del alcance:
- **Entorno local (desarrollo)**: la app funciona al 100%, incluyendo el cuadro de "prueba tu propia idea" con una llamada real a un modelo de IA usando la key personal de Cristian. Sirve para validar la calidad del análisis y para grabar un video mostrando la herramienta funcionando de verdad.
- **Entorno publicado (Vercel, lo que ve el jurado)**: demo estático, sin llamadas reales, con el cuadro de "prueba tu idea" deshabilitado y el video grabado en local embebido para mostrar cómo funciona sin exponer la key ni depender de créditos de API en producción.

- Página pública, sin login, con 4 benchmarks ya calculados con investigación real (no contenido inventado). El contenido ya está investigado y escrito por Cristian (jugadores, fortalezas, brecha, oportunidad y advertencia de cada uno), disponible en el mockup de diseño en `design-system/dise-o-de-plataforma-final/project/Benchmark Expres - Plataforma.dc.html`. La implementación transcribe ese contenido ya validado, no investiga de cero:
  1. Explicador de rechazos KYC (fintech / verificación de identidad).
  2. Chequeo de madurez ágil conversacional (PM / transformación ágil).
  3. Verificación de contenido en el punto de entrega (marketplaces de última milla).
  4. Detector de deuda de proceso sin integración de sistemas (cross-sector, basado en la experiencia de Cristian en seis industrias distintas).
- Cada benchmark es un estudio de mercado con 7 dimensiones:
  1. Competidores: quién ya existe en ese mercado, jugadores reales mencionados por nombre.
  2. Referentes principales: qué hacen bien esos jugadores (equivale al campo `fortalezas`).
  3. Brecha real detectada, con evidencia.
  4. Oportunidad de diferenciación.
  5. Señales de tendencia: hacia dónde se mueve el sector. Se llama "señales" y no "datos en tiempo real" a propósito, porque no hay conexión a redes sociales en vivo; es una lectura razonada, no una métrica en vivo, y el copy no debe insinuar lo contrario.
  6. Ideas para empezar a mover redes/visibilidad si alguien construyera esto.
  7. Qué hacer y qué no hacer al construir en este espacio (formato de dos listas cortas).
  Cuando el terreno ya tiene competidores grandes o consolidados, eso se marca explícitamente como advertencia, no se oculta el riesgo.
- Los 4 benchmarks ya existentes (transcritos del mockup) cubren bien las dimensiones 1 a 4. Las dimensiones 5 a 7 son contenido nuevo que se agrega a esos mismos 4, no se investigan 4 benchmarks distintos desde cero.
- Plan B de research: si en algún momento se agrega o cambia un benchmark y no se consigue evidencia real sólida en el tiempo disponible, se prioriza reducir a los benchmarks que sí están bien sustentados antes que incluir uno con contenido débil o inventado. Ningún benchmark se publica sin al menos los nombres reales de los jugadores identificados.
- Presupuesto de longitud: el detalle expandido de cada tarjeta debe poder leerse completo en el tiempo que le toma a un juez entender el valor (~15 segundos por tarjeta dentro del objetivo total de 60 segundos), aun con las 7 dimensiones. Cada bloque va en formato corto (bullets de 1-2 frases), nunca párrafos largos. Este presupuesto aplica a las 4 tarjetas de ejemplo por igual en local y en publicado, porque son el mismo contenido estático en los dos entornos.
- Un cuadro de "prueba tu propia idea": en local funciona de verdad (llamada real a un modelo de IA con la key personal de Cristian), generando las mismas 7 dimensiones para la idea que Cristian escriba en ese momento. En la versión publicada queda en modo demo: input y botón deshabilitados, contador fijo mostrando "30/30 cupos disponibles", un mensaje explicando que se activa cuando haya conexión a una API real en producción, y un video embebido junto al cuadro mostrando la versión local funcionando. El video lo graba Cristian manualmente (screen recording de su pantalla) por fuera de la app; la app solo necesita un espacio para embeber ese archivo de video como asset estático, no hay que construir ninguna funcionalidad de grabación ni de captura de pantalla. A diferencia de las 4 tarjetas de ejemplo (que respetan el presupuesto de 60 segundos), el resultado que se ve en el video puede tener más profundidad por dimensión, porque ahí Cristian lo está narrando en vivo, no se lee en frío.
- Diseño: se usa el sistema de diseño Nocturne ya construido por Cristian (tema oscuro, tokens de color y componentes como tarjetas, tags, botones e inputs), incluido en el mismo mockup (`design-system/dise-o-de-plataforma-final/project/_ds/nocturne-.../styles.css`). La implementación recrea ese diseño con fidelidad visual, no inventa un tema nuevo. La página debe ser usable en mobile (un juez puede abrir el link desde el celular), aunque el mockup esté pensado primero para desktop.
- La versión publicada no tiene backend, base de datos ni autenticación: es contenido estático servido como página única. En local sí existe una función mínima (serverless o similar) para hacer la llamada real a la IA — esa función y la key nunca se exponen en el frontend ni se suben al repo público.
- Autoría visible: un pie de página o sección corta que deja claro que esto lo construyó Cristian y con qué objetivo, incluyendo un link de contacto o portafolio (LinkedIn u otro), para que la página funcione también como carta de presentación, no solo como demo anónima. El texto y el link (linkedin.com/in/cristianceronb) ya están escritos en el mismo mockup de diseño, se transcriben tal cual.

## Comportamiento
1. El usuario abre la página y ve el encabezado, el cuadro de "prueba tu propia idea" (deshabilitado) y una grilla con las 4 tarjetas de ejemplo.
2. Al hacer clic en una tarjeta, se muestra debajo el detalle completo de ese benchmark: categoría, competidores (jugadores por nombre), referentes principales (qué hacen bien), la brecha real, la oportunidad de diferenciación (con advertencia si aplica), señales de tendencia, ideas para mover redes, y qué hacer/qué no hacer.
3. La primera tarjeta aparece expandida por defecto al cargar la página.
4. El cuadro de "prueba tu propia idea": en local, escribir una idea y enviarla dispara una llamada real a la IA y muestra un resultado real. En la versión publicada no ejecuta ninguna acción: textarea y botón deshabilitados, contador y mensaje estáticos, y en su lugar se ve el video grabado en local.

## Errores y seguridad
En la versión publicada no hay inputs de usuario que se envíen a ningún lado, porque el cuadro de prueba está deshabilitado. No hay validación de formularios ni llamadas de red que puedan fallar, no se manejan datos sensibles, y no hay autenticación ni permisos involucrados: es contenido estático de solo lectura.

En local, donde el cuadro sí hace una llamada real a la IA, el único punto de seguridad real es que la clave de API personal de Cristian nunca debe quedar expuesta en el código que corre en el navegador ni subirse al repo (variable de entorno ignorada por git). Debe vivir únicamente en una función de servidor/local, nunca en el frontend.

## Futuro (v2+)
- Activar el cuadro de "prueba tu propia idea" en la versión publicada (no solo en local) con una llamada real a un modelo de IA, usando una clave de API de producción guardada de forma segura en el servidor, con un límite real de 30 usos que va bajando en el contador en tiempo real. Fuera del demo público en v1 porque hoy no hay una clave de API con crédito para producción — no por falta de diseño ni de funcionalidad, esa integración ya se construye y prueba en local.
- Agregar más ejemplos de benchmark además de los 4 iniciales. Fuera de v1 porque 4 ejemplos bien investigados alcanzan para demostrar el concepto sin diluir el tiempo de construcción en más contenido repetitivo.
- Evaluar si tiene sentido guardar o compartir el benchmark generado por un usuario. Fuera de v1 porque implica decidir sobre cuentas o identificadores, una decisión de producto que no hace falta resolver para una demo de una sola sesión.
- Autenticación o cuentas de usuario. Fuera de alcance en cualquier versión cercana: no aporta nada mientras la herramienta no tenga uso recurrente real más allá de la demo.
