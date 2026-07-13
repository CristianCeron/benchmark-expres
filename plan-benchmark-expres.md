# Plan: Benchmark Exprés

## Encabezado
- Objetivo: página pública de una sola sesión con un cuadro de "prueba tu idea" que llama en vivo a Gemini (en todos los entornos, local y publicado) y muestra el resultado como tarjetas expandibles por dimensión.
- Arquitectura: Next.js (App Router) con TypeScript, una ruta de API server-side que llama a Gemini en cada análisis, sin base de datos ni autenticación. El diseño visual reutiliza el sistema Nocturne ya construido por Cristian.
- Stack: Next.js 14, TypeScript, CSS de Nocturne (sin Tailwind), Vitest + React Testing Library para tests, SDK de Google Gemini (`@google/genai`, tier gratis).
- Modelo de datos (`src/types/benchmark.ts`), 8 dimensiones de contenido: apps/productos similares (`jugadores`), referentes principales (`fortalezas`), brecha (`brecha`), oportunidad (`oportunidad`), señales de tendencia (`señalesTendencia`, lectura razonada, no dato en vivo), ideas para mover redes (`ideasRedes`), qué hacer/qué no hacer (`queHacer` / `queNoHacer`), y fuentes (`fuentes`, links reales que respaldan lo dicho). Más `categoria`, `titulo` y `advertencia`.
- Spec: [spec-benchmark-expres.md](spec-benchmark-expres.md)

## Tarea 1: Bootstrap del proyecto e integración de Nocturne [HECHO]
- Checkpoint: no
- implementa: proyecto Next.js con TypeScript (sin Tailwind), Vitest, CSS de Nocturne integrado en `app/nocturne.css`.
- commit: "bootstrap: proyecto Next.js + TypeScript + Vitest + CSS de Nocturne"
- Depende de: nada

## Replanteo: se descartan las 4 tarjetas de ejemplo estáticas
Las tareas originales 2 a 13 de este plan construyeron 4 benchmarks de ejemplo fijos (KYC, madurez ágil, última milla, deuda de proceso) transcritos de un mockup, con un modo estático/en vivo separado (`NEXT_PUBLIC_DEMO_MODE`) y un video grabado a mano para la versión publicada. Ese trabajo quedó commiteado en el historial de git, pero Cristian pidió explícitamente sacarlo ("esto genera mucho ruido y está estático, quítalo") una vez viendo el resultado funcionando. La razón de fondo: con Gemini en tier gratis ya no hay excusa de costo para que el cuadro "prueba tu idea" funcione en vivo también en producción, así que las 4 tarjetas fijas dejaron de aportar y la app se simplifica a una sola herramienta interactiva. Las tareas 19 en adelante documentan ese reemplazo.

## Tarea 19: Reubicar el tipo Benchmark y agregar el campo de fuentes [HECHO]
- Checkpoint: no
- implementa: mover la interfaz `Benchmark` a `src/types/benchmark.ts` (ya no vive junto a datos estáticos que se eliminan) y agregar el campo `fuentes: string[]`.
- tests pasan: suite completa en verde tras el movimiento de tipo.
- commit: incluido en el commit de la Tarea 22 (ver abajo)
- Depende de: Tarea 1

## Tarea 20: Eliminar las 4 tarjetas estáticas, sus datos y el modo demo [HECHO]
- Checkpoint: no
- implementa: borrar `src/data/benchmarks.ts`, `src/components/BenchmarkCard.tsx`, `src/components/BenchmarkGrid.tsx` y sus tests (`benchmarks-shape.test.ts`, `benchmarks-content.test.ts`, `BenchmarkGrid.test.tsx`). Quitar `NEXT_PUBLIC_DEMO_MODE` de `.env.local`, `.env.example` y del código. Borrar la carpeta `public/video/` (ya no hace falta grabar ni embeber video).
- tests pasan: suite completa en verde sin esos archivos.
- Depende de: Tarea 19

## Tarea 21: Rediseñar el resultado como tarjetas expandibles por dimensión [HECHO]
- Checkpoint: no
- test (falla): test de `BenchmarkDetail`/`TryIdeaBox` que espera que solo la primera dimensión ("Apps o productos similares") esté expandida por defecto, que las demás secciones existan como encabezado sin su contenido visible, y que un clic en otro encabezado cambie cuál está expandida.
- implementa: reescribir `BenchmarkDetail` como acordeón (una sección abierta a la vez, estado por índice), con una sección extra de "Fuentes" que renderiza los links como `<a target="_blank">`. La advertencia queda fuera del acordeón, siempre visible.
- tests pasan: test en verde.
- commit: "feat: rediseño del resultado como tarjetas expandibles por dimensión, con fuentes"
- Depende de: Tarea 20
- Ajuste posterior [HECHO]: Cristian probó en su propio Chrome y las secciones colapsadas se veían como vacías/rotas sin ninguna señal de que eran clickeables. Se agregó una flechita que rota al expandir/colapsar, y un aviso de "puede tardar 15-20 segundos" mientras Gemini responde. Commit: "fix: agregar flechita de expandir/colapsar y aviso de espera en el análisis".

## Tarea 22: TryIdeaBox siempre en vivo, con idea de ejemplo precargada [HECHO]
- Checkpoint: sí (siempre estuvo en vivo desde antes, pero ahora también corre en producción sin que Cristian pruebe cada despliegue con su propia key; se revisa que el manejo de errores de Gemini alcance para no romper la página si falla en producción)
- implementa: quitar toda la lógica de `NEXT_PUBLIC_DEMO_MODE`/deshabilitado; el textarea y el botón están siempre activos. Se precarga una idea de ejemplo en el textarea para que un juez pueda darle clic sin escribir nada. Se actualiza el prompt de `app/api/try-idea/route.ts` para pedir también `fuentes` y aclarar que `jugadores` son apps/productos reales similares a la idea.
- tests pasan: suite completa en verde (12 tests), build de producción limpio, y verificación manual en el navegador: análisis real con una idea nueva ("paseadores de perros") devuelve jugadores reales (Rover, Wag!, Gudog, PetBacker) y el acordeón cambia de sección correctamente al hacer clic.
- commit: "feat: TryIdeaBox siempre en vivo con idea de ejemplo, fuentes y apps similares en el prompt"
- Depende de: Tarea 21

## Tarea 15: Verificación de manejo seguro de la clave [HECHO]
- Checkpoint: sí (manejo de credencial sensible)
- implementa: `.env.local` y `.env*.local` en `.gitignore`, `.env.example` con `GEMINI_API_KEY=` sin valor real, test que confirma que ningún archivo en `src/components/` referencia la key.
- tests pasan: test en verde.
- commit: "chore: asegurar que la API key nunca se sube ni se expone al cliente"
- Depende de: Tarea 14 (histórica, ver Replanteo)

## Tarea 16: Responsive y verificación visual [HECHO]
- Checkpoint: no
- implementa: `page.module.css` con breakpoint mobile (padding y layout ajustados por debajo de 640px); verificado en el navegador a 375px (mobile) y 800px (desktop): sin scroll horizontal, el acordeón colapsa a una columna.
- commit: "style: ajuste responsive sobre el layout de Nocturne"
- Depende de: Tarea 1

## Tarea 17: Autoría y footer [HECHO]
- Checkpoint: no
- implementa: componente `Footer` con el nombre de Cristian, la frase de objetivo, y el link a linkedin.com/in/cristianceronb.
- commit: "feat: footer con autoría y link de contacto transcrito del mockup"
- Depende de: Tarea 1

## Tarea 23: Landing, tutorial de bienvenida y resultado como grilla con color [HECHO]
- Checkpoint: no
- test (falla): tests de `BenchmarkApp` que esperan landing por defecto, cambio a herramienta con "Probar mi idea", vuelta a landing con "Volver al inicio", tutorial visible la primera vez (sin `localStorage`), tutorial oculto si ya se marcó visto, "Ver tutorial" lo reactiva, y "Saltar" lo cierra y marca `localStorage`. Test de `TryIdeaBox` ajustado: ya no espera un acordeón, espera que las 9 dimensiones estén visibles a la vez tras analizar.
- implementa: Cristian actualizó el mockup de diseño con una landing nueva ("¿Cuántas veces construiste algo que ya existía?"), un tutorial modal de 3 pasos (con `localStorage` para mostrarlo solo la primera vez), y reemplazó el acordeón del resultado por una grilla de tarjetas siempre visibles, coloreadas según el tipo (positivo/precaución/neutral). Se construyeron los componentes `BenchmarkApp` (estado de vista landing/tool y tutorial), `LandingPage`, `Nav`, `Tutorial`, y `ResultGrid` (reemplaza a `BenchmarkDetail`, que se borró). Se agregó `app/highlight.css` con los tokens de color propios del CTA principal (no son parte de Nocturne base).
- tests pasan: 19 tests en verde, `tsc --noEmit` sin errores, verificado en el navegador de punta a punta (landing → tutorial → análisis real con jugadores reales → volver al inicio).
- commit: "feat: landing con CTA, tutorial de bienvenida, y resultado en grilla con color por tipo"
- Depende de: Tarea 22

## Tarea 18: Deploy a Vercel
- Checkpoint: sí (es la publicación real, lo que va a ver el jurado)
- Regla dura: esta tarea no arranca sola aunque todo lo anterior esté en verde. Antes de tocar Vercel, Cristian tiene que probar todo en local con sus propios ojos (no solo que los tests automatizados pasen) y dar el visto bueno explícito. Sin ese "sí, dale" en el chat, la tarea queda bloqueada.
- test (falla): no aplica test automatizado; el checkpoint es la validación manual de Cristian descrita abajo, más la revisión posterior al deploy.
- implementa: conectar el repo a Vercel, configurar `GEMINI_API_KEY` como variable de entorno de producción (ahora sí hace falta ahí, porque el cuadro llama a Gemini también en producción), deploy.
- tests pasan: abrir la URL publicada, confirmar que carga rápido, que "prueba tu idea" ya tiene la idea de ejemplo precargada, que analizar (con el ejemplo o una idea propia) devuelve un resultado real en tarjetas expandibles, y que se ve bien en mobile.
- commit: "deploy: primera versión publicada en Vercel"
- Depende de: Tarea 15, Tarea 16, Tarea 17, Tarea 22, Tarea 23, y validación manual explícita de Cristian en local

## Tarea 24: Reintento automático con backoff ante fallas de Gemini [HECHO]
- Checkpoint: no
- test (falla): test que simula que Gemini falla una vez y responde bien la segunda, esperando status 200 y que se haya llamado 2 veces; y otro que simula 3 fallas seguidas, esperando 503 y 3 llamadas. Fallan porque la ruta no reintentaba (una sola llamada, error inmediato).
- implementa: en `app/api/try-idea/route.ts`, hasta 3 intentos con espera creciente (1s, luego 2s) entre cada uno antes de rendirse. El error 503 al usuario solo aparece si los 3 intentos fallan. Justificación: el error de "alta demanda" de Gemini es capacidad compartida de Google, no cupo propio, y su propia documentación dice que los picos suelen ser temporales, así que reintentar en el momento resuelve la mayoría de los casos sin que el usuario vea nada. No se muestra un contador de tiempo de esperado exacto porque Google no expone esa información para este tipo de error, y hubiera sido inventar un dato.
- tests pasan: 22 tests en verde, `tsc --noEmit` sin errores.
- commit: "feat: reintentar automáticamente con backoff si Gemini falla por alta demanda"
- Depende de: Tarea 22

## Verificación end-to-end
- En local: `npm run dev`, abrir el cuadro "prueba tu idea", analizar la idea de ejemplo o una propia, confirmar que llega una respuesta real de Gemini con las 8 dimensiones en tarjetas expandibles, y que la advertencia se ve siempre.
- En publicado: abrir la URL de Vercel, repetir la misma prueba, y confirmar que se ve bien en un celular.
