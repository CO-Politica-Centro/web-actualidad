# web-actualidad — CO Politica Centro

Sitio de **noticias** y **blog** del movimiento, con panel visual de administración respaldado por Firebase.

Sitios hermanos:

- Portal: https://web-portal-co-politica.vercel.app
- Capacitación: https://web-capacitacion-co-politica.vercel.app

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- pnpm 11 · Node ≥ 22
- Firebase Auth, Firestore, Storage
- TipTap (editor WYSIWYG en `/admin`)
- Vitest · Vercel Analytics

## Desarrollo

```bash
pnpm install
cp .env.example .env.local
# Completa NEXT_PUBLIC_FIREBASE_*
pnpm dev
```

Calidad:

```bash
pnpm run ci
```

## Firebase (proyecto dedicado)

1. Crea el proyecto Firebase (sugerido: `web-actualidad-cpc`).
2. Activa **Authentication** (Email/Password + Google).
3. Crea Firestore y Storage; despliega reglas:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

4. Crea un usuario en Auth y un documento `admins/{uid}`:

```json
{
  "email": "tu@correo.com",
  "displayName": "Nombre",
  "createdAt": "<timestamp>"
}
```

5. (Opcional) crea posts DEMO según [`scripts/SEED.md`](scripts/SEED.md).

## Rutas

| Ruta                                       | Descripción       |
| ------------------------------------------ | ----------------- |
| `/`                                        | Portada editorial |
| `/noticias`, `/noticias/[slug]`            | Noticias          |
| `/blog`, `/blog/[slug]`                    | Blog              |
| `/admin/entrar`                            | Login             |
| `/admin`                                   | Listado de posts  |
| `/admin/posts/nuevo` · `/admin/posts/[id]` | Editor            |

## Variables de entorno

Ver [`.env.example`](.env.example).

## Notas de producto

- No inventar noticias reales en seeds; usar el prefijo `[DEMO]`.
- El HTML del cuerpo se sanitiza al guardar y al renderizar.
- Tras publicar, el cliente intenta `POST /api/revalidate` (ISR ~60s).
