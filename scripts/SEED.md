# Seed demo (consola Firebase)

Crea documentos en Firestore `posts` con el prefijo `[DEMO]` en el título.
No inventes hechos políticos reales.

Ejemplo de documento:

```json
{
  "tipo": "noticia",
  "slug": "demo-bienvenida-actualidad",
  "titulo": "[DEMO] Bienvenida a Actualidad Centro",
  "resumen": "Entrada de demostración. No es una noticia real.",
  "cuerpoHtml": "<p>Contenido de prueba del panel editorial.</p>",
  "portadaUrl": null,
  "portadaAlt": "",
  "estado": "publicado",
  "publicadoEn": "<timestamp>",
  "actualizadoEn": "<timestamp>",
  "creadoEn": "<timestamp>",
  "autorUid": "seed-demo",
  "autorNombre": "Seed demo",
  "tags": ["demo"]
}
```

También puedes crear posts desde `/admin` tras añadir tu UID en `admins/{uid}`.
