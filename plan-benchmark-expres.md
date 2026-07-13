# Plan: Benchmark Exprés

## Encabezado
- Objetivo: página pública de una sola sesión que muestra 4 benchmarks de mercado reales, con un cuadro de "prueba tu idea" funcional en local y estático en el demo publicado.
- Arquitectura: Next.js (App Router) con TypeScript, contenido de los benchmarks como datos estáticos tipados, una sola ruta de API server-side para la llamada real a IA (solo se usa en local), despliegue estático en Vercel. El diseño visual reutiliza el sistema Nocturne ya construido por Cristian, no se inventa uno nuevo.
- Stack: Next.js 14, TypeScript, CSS de Nocturne (sin Tailwind), Vitest + React Testing Library para tests, SDK de Anthropic para la llamada a IA en local.
- Fuente de diseño y contenido: `design-system/dise-o-de-plataforma-final/project/Benchmark Expres - Plataforma.dc.html` (mockup con el contenido de los 4 benchmarks ya investigado y el sistema Nocturne en `_ds/nocturne-.../styles.css`).
- Spec: [spec-benchmark-expres.md](spec-benchmark-expres.md)

## Tarea 1: Bootstrap del proyecto e integración de Nocturne [HECHO]
- Checkpoint: no
- test (falla): no hay proyecto todavía, `npm run build` no existe como comando.
- implementa: crear proyecto Next.js con TypeScript (sin Tailwind), estructura base (`app/`, `src/data/`, `src/components/`), configurar Vitest. Copiar `styles.css` de Nocturne a `app/nocturne.css` (o `public/`) e importarlo global en `app/layout.tsx`.
- tests pasan: `npm run build` y `npm run test` corren sin errores sobre el esqueleto vacío, y una página de prueba confirma que las variables CSS de Nocturne (`--color-bg`, `--color-accent`) están disponibles.
- commit: "bootstrap: proyecto Next.js + TypeScript + Vitest + CSS de Nocturne"
- Depende de: nada

## Tarea 2: Tipo Benchmark y datos placeholder [HECHO]
- Checkpoint: no
- test (falla): test que carga `src/data/benchmarks.ts` y espera un arreglo de 4 elementos, cada uno con `categoria`, `titulo`, `jugadores` (mínimo 1), `fortalezas`, `brecha`, `oportunidad`, `advertencia` no vacíos; falla porque el arreglo está vacío.
- implementa: definir la interfaz `Benchmark` en TypeScript (mismos campos que usa el mockup: `categoria`, `titulo`, `jugadores[]`, `fortalezas[]`, `brecha[]`, `oportunidad[]`, `advertencia`) y un arreglo `benchmarks` con 4 objetos placeholder.
- tests pasan: el test de forma pasa contando los 4 elementos y la presencia de campos (el contenido real se transcribe en las tareas 3 a 6).
- commit: "feat: tipo Benchmark y datos placeholder"
- Depende de: Tarea 1

## Tarea 3: Transcribir benchmark 1, explicador de rechazos KYC [HECHO]
- Checkpoint: no
- test (falla): test específico que verifica que el objeto en el índice 0 no tiene ningún campo con el valor `"TODO"` y que `jugadores` incluye los nombres reales del mockup.
- implementa: copiar el contenido ya escrito en el mockup (Truora, Onfido, Sumsub, Trulioo, iDenfy; fortalezas, brecha, oportunidad, advertencia) al objeto del índice 0, sin reinventar el texto.
- tests pasan: test del índice 0 en verde.
- commit: "content: benchmark KYC transcrito del mockup"
- Depende de: Tarea 2

## Tarea 4: Transcribir benchmark 2, madurez ágil conversacional [HECHO]
- Checkpoint: no
- test (falla): mismo test de forma que la tarea 3, aplicado al índice 1.
- implementa: copiar el contenido del mockup (TeamRetro, Agile Velocity, AgilityHealth Radars, Info-Tech Research Group y el resto de campos) al índice 1.
- tests pasan: test del índice 1 en verde.
- commit: "content: benchmark madurez ágil transcrito del mockup"
- Depende de: Tarea 3

## Tarea 5: Transcribir benchmark 3, verificación de contenido en la entrega
- Checkpoint: no
- test (falla): mismo test de forma, aplicado al índice 2.
- implementa: copiar el contenido del mockup (Onfleet, Bringg, Track-POD, Locus, nuVizz y el resto de campos) al índice 2.
- tests pasan: test del índice 2 en verde.
- commit: "content: benchmark verificación de entrega transcrito del mockup"
- Depende de: Tarea 4

## Tarea 6: Transcribir benchmark 4 y revisión humana de los 4
- Checkpoint: sí (el valor central del producto depende de que este contenido sea real; antes de seguir se confirma con Cristian que la transcripción es fiel al mockup y que ninguna afirmación quedó desactualizada)
- test (falla): mismo test de forma, aplicado al índice 3, más un test que corre sobre los 4 elementos juntos.
- implementa: copiar el contenido del mockup (Celonis, SAP Signavio, UiPath Process Mining, mindzie y el resto de campos) al índice 3.
- tests pasan: los 4 tests de forma en verde.
- commit: "content: benchmark deuda de proceso transcrito del mockup"
- Depende de: Tarea 5

## Tarea 7: Grilla de tarjetas y detalle expandible con clases de Nocturne
- Checkpoint: no
- test (falla): test de componente que renderiza la grilla de 4 tarjetas, espera que la primera esté expandida al cargar y las otras 3 colapsadas; falla porque el componente no existe.
- implementa: componentes `BenchmarkCard` y `BenchmarkGrid` en `src/components/`, recreando la estructura del mockup (clases `.card`, `.tag`, `.tag-accent`, `.tag-neutral`) con estado de expandido/colapsado por clic, primera tarjeta expandida por defecto.
- tests pasan: test de componente en verde (clic en una tarjeta distinta cambia cuál está expandida).
- commit: "feat: grilla de benchmarks con detalle expandible usando Nocturne"
- Depende de: Tarea 6

## Tarea 8: Cuadro "prueba tu idea" en modo estático
- Checkpoint: no
- test (falla): test que renderiza el cuadro con `NEXT_PUBLIC_DEMO_MODE` sin definir (caso por defecto, el de Vercel) y espera input y botón deshabilitados (clases `.input`, `.btn.btn-primary`), contador con texto "30/30" (clase `.tag.tag-accent`), mensaje explicativo, y un elemento `<video>` visible; falla porque el componente no existe.
- implementa: componente `TryIdeaBox` recreando el markup del mockup (tarjeta con textarea, botón y contador), controlado por `NEXT_PUBLIC_DEMO_MODE` (`"live"` o cualquier otro valor/ausente = estático). En modo estático: campos deshabilitados, contador fijo, mensaje, y el video en `public/video/demo-local.mp4` embebido en el recuadro donde el mockup deja el ícono de play como placeholder.
- tests pasan: test en verde con el modo por defecto.
- commit: "feat: cuadro prueba tu idea en modo estático con video embebido"
- Depende de: Tarea 7

## Tarea 9: Función local para la llamada real a IA
- Checkpoint: sí (usa la clave personal de Cristian y hace una llamada de red real con costo asociado)
- test (falla): test de la ruta `app/api/try-idea/route.ts` que envía una idea de prueba y espera una respuesta con estructura válida; usa un mock del cliente de Anthropic (no llama a la API real en el test), falla porque la ruta no existe.
- implementa: route handler server-side que lee `ANTHROPIC_API_KEY` de variable de entorno (nunca expuesta al cliente) y llama al modelo de Claude con la idea recibida. En `TryIdeaBox`, cuando `NEXT_PUBLIC_DEMO_MODE === "live"`, el formulario se habilita y llama a esta ruta de verdad.
- tests pasan: test con mock en verde. Verificación manual adicional (no automatizada): correr `npm run dev` en local con la key real en `.env.local` y confirmar que una idea real devuelve una respuesta real.
- commit: "feat: llamada real a Claude en modo local"
- Depende de: Tarea 8

## Tarea 10: Verificación de manejo seguro de la clave
- Checkpoint: sí (manejo de credencial sensible)
- test (falla): test que revisa que `.env.local` está listado en `.gitignore` y que `ANTHROPIC_API_KEY` no aparece referenciado en ningún archivo dentro de `src/components/` (solo en el route handler server-side); falla si `.gitignore` no existe todavía con esa entrada.
- implementa: agregar `.env.local` y `.env*.local` a `.gitignore`, `.env.example` con la variable sin valor real, confirmar que ningún componente cliente importa la key.
- tests pasan: test en verde.
- commit: "chore: asegurar que la API key nunca se sube ni se expone al cliente"
- Depende de: Tarea 9

## Tarea 11: Responsive y verificación visual contra el mockup
- Checkpoint: no
- test (falla): no aplica test automatizado de diseño visual; se deja como verificación manual en navegador (desktop y mobile) descrita en la sección de Verificación de este plan.
- implementa: el mockup ya define el layout desktop (grid `auto-fit`, nav, footer); se ajusta el breakpoint mobile para que la grilla colapse a una columna y el nav/footer no se corten en pantallas angostas.
- tests pasan: revisión manual en navegador en dos anchos de pantalla (desktop y mobile), comparando visualmente contra el mockup abierto en paralelo.
- commit: "style: ajuste responsive sobre el layout de Nocturne"
- Depende de: Tarea 7

## Tarea 12: Autoría y footer
- Checkpoint: no
- test (falla): test que renderiza el footer y espera el nombre de Cristian, la frase de objetivo del mockup, y el link a linkedin.com/in/cristianceronb con `target="_blank"`; falla porque el footer no existe.
- implementa: componente `Footer` transcribiendo tal cual el texto y el link ya escritos en el mockup.
- tests pasan: test en verde.
- commit: "feat: footer con autoría y link de contacto transcrito del mockup"
- Depende de: Tarea 7

## Tarea 13: Deploy a Vercel
- Checkpoint: sí (es la publicación real, lo que va a ver el jurado)
- Regla dura: esta tarea no arranca sola aunque las tareas 8 a 12 estén en verde. Antes de tocar Vercel, Cristian tiene que probar todo en local con sus propios ojos (no solo que los tests automatizados pasen) y dar el visto bueno explícito. Sin ese "sí, dale" en el chat, la tarea queda bloqueada.
- test (falla): no aplica test automatizado; el checkpoint es la validación manual de Cristian descrita abajo, más la revisión posterior al deploy.
- implementa: conectar el repo a Vercel, confirmar que no hay `ANTHROPIC_API_KEY` configurada en las variables de entorno de producción (para que el modo estático sea el único posible ahí), deploy.
- tests pasan: abrir la URL publicada y confirmar manualmente que carga rápido, que el cuadro de "prueba tu idea" está deshabilitado con el video visible, que las 4 tarjetas funcionan, y que se ve bien en mobile.
- commit: "deploy: primera versión publicada en Vercel"
- Depende de: Tarea 8, Tarea 9, Tarea 10, Tarea 11, Tarea 12, y validación manual explícita de Cristian en local

## Verificación end-to-end
- En local: `npm run dev`, abrir el cuadro "prueba tu idea", escribir una idea real y confirmar que llega una respuesta real de Claude. Comparar visualmente la página contra el mockup `.dc.html`.
- En publicado: abrir la URL de Vercel, confirmar que el cuadro está deshabilitado, el video se reproduce, las 4 tarjetas cargan con contenido real, y la página es usable en un celular.
