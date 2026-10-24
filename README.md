<p align="center">
  <a href="README.md">Español</a> · <a href="README.en.md">English</a>
</p>

<h1 align="center">Actualidad</h1>

<p align="center">
  <img src="public/brand/og-social.jpg" alt="Imagen de marca de Actualidad, crema, oro y verde" width="100%">
</p>

<p align="center">Noticias y blog del movimiento, con admin en Firebase.</p>

Sitio de CO Politica Centro. Está en [web-actualidad-co-politica.vercel.app](https://web-actualidad-co-politica.vercel.app). Los hermanos son el [portal](https://web-portal-co-politica.vercel.app) y [capacitación](https://web-capacitacion-co-politica.vercel.app).

<p align="center">
  <a href="https://github.com/CO-Politica-Centro/web-actualidad/actions/workflows/ci.yml"><img src="https://github.com/CO-Politica-Centro/web-actualidad/actions/workflows/ci.yml/badge.svg" alt="Estado de CI"></a>
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,firebase,pnpm&theme=dark&perline=6">
      <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,firebase,pnpm&theme=light&perline=6">
      <img alt="Next.js, React, TypeScript, Tailwind, Firebase, pnpm" src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,firebase,pnpm&perline=6">
    </picture>
  </a>
</p>

## Características

- Noticias y blog del movimiento.
- Admin visual en `/admin`, con TipTap.
- CI en `ci.yml` y `pnpm test`.

> [!NOTE]
> El registro en `/admin/entrar` no vuelve administrador a quien entra. El alta se hace aparte.

## Tecnologías

- **Next.js, React y Tailwind** — el sitio.
- **Firebase** — Auth, Firestore y Storage.
- **pnpm 11.1.1** — Node 22 o superior.

## Inicio rápido

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

> [!IMPORTANT]
> `pnpm run ci` junta lint, tipos, formato, pruebas y build. Hace falta Node 22.

## Uso

Completa `NEXT_PUBLIC_FIREBASE_*` en `.env.local`. Las reglas se despliegan con `firebase deploy --only firestore:rules,firestore:indexes,storage`.

> [!TIP]
> `pnpm test` corre Vitest sin levantar el sitio.

## Contribuir

> [!CAUTION]
> El proyecto Firebase sugerido es `web-actualidad-cpc`. No reutilices el de otro sitio del
> movimiento.

Repositorio de [CO Politica Centro](https://github.com/CO-Politica-Centro).

> [!WARNING]
> No subas `.env.local`. El ejemplo versionado es `.env.example`.

## Licencia

Este repositorio no incluye un archivo de licencia.
