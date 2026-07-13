# Benchmark Exprés

## Qué es
Le describes tu idea y en segundos te dice qué tan buena es la oportunidad real: quién ya está haciendo algo parecido, qué tan bien lo hacen, y dónde te queda espacio para meterte y diferenciarte. Nada de relleno genérico, solo competidores y datos reales.

Por ejemplo: escribes "una plataforma que conecta estudiantes universitarios con tutores para clases por videollamada", y en segundos te dice que ya existen Superprof, Preply y Chegg, que dominan por SEO y bases de datos gigantes de tutores. Pero también te dice que ninguno resuelve la urgencia de última hora antes de un examen. Ese hueco (tutorías exprés, hiperlocales, por facultad) es tu oportunidad real.

## De dónde salió la idea
Llevo más de 5 años liderando proyectos en fintech, PM, logística y transformación digital, y siempre hago lo mismo antes de arrancar cualquier cosa: reviso qué existe, qué tan bien lo resuelven, y dónde hay un hueco real. Ese chequeo lo tengo tan interiorizado que ya es casi automático. Esta herramienta es ese proceso, convertido en algo que cualquiera puede usar sin tener que pedírmelo a mí directamente.

## Cómo cambió el alcance
La primera versión tenía 4 ejemplos fijos, de mercados que conozco bien, para mostrar el concepto sin necesitar una conexión en vivo a una IA.

- Al verlo funcionando, me di cuenta de que lo interesante no era mostrar ejemplos ya armados.
- Lo interesante era que cualquiera pudiera meter SU propia idea y recibir un análisis real, en el momento.

Con eso, dejé los 4 ejemplos a un lado y la herramienta se volvió una sola cosa: el cuadro donde escribes tu idea y te responde de verdad.

## Cómo funciona por dentro
Técnicamente corre en Next.js, con una función de servidor que llama a la API de Gemini de Google en su tier gratuito (el plan sin costo, con un límite de cuántas veces se puede usar por minuto/día), así que la demo funciona en vivo tanto en local como en producción sin costo. Si Gemini falla por alta demanda (algo común en el tier gratis), el sistema reintenta automáticamente con espera creciente antes de mostrar cualquier error. El resultado nunca inventa competidores: si la IA no tiene evidencia real de algo, lo omite en vez de rellenar.

## Diseño
El diseño usa un sistema propio, oscuro y con un acento dorado para el llamado a la acción principal. Un tutorial de bienvenida guía a quien entra por primera vez, y el resultado se muestra en tarjetas con color según el tipo de contenido (verde/dorado para oportunidades y qué hacer, gris para brechas y qué evitar), para que se lea rápido sin sentirse abrumador.

## Links
- Repo: github.com/CristianCeron/benchmark-expres
- Demo en vivo: benchmark-expres.vercel.app

---

Este proyecto es mi forma de trabajar hecha herramienta. Si te interesa cómo pienso, hablemos: [linkedin.com/in/cristianceronb](https://www.linkedin.com/in/cristianceronb/)
