<p align="center">
  <a href="README.md">Español</a> · <a href="README.en.md">English</a>
</p>

<h1 align="center">Actualidad</h1>

<p align="center">
  <img src="public/brand/og-social.jpg" alt="Actualidad brand image, cream, gold, and green" width="100%">
</p>

<p align="center">News and blog of the movement, with a Firebase admin.</p>

Site of CO Politica Centro. It is at [web-actualidad-co-politica.vercel.app](https://web-actualidad-co-politica.vercel.app). The siblings are the [portal](https://web-portal-co-politica.vercel.app) and [training](https://web-capacitacion-co-politica.vercel.app).

<p align="center">
  <a href="https://github.com/CO-Politica-Centro/web-actualidad/actions/workflows/ci.yml"><img src="https://github.com/CO-Politica-Centro/web-actualidad/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
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

## Features

- News and blog of the movement.
- Visual admin at `/admin`, with TipTap.
- CI in `ci.yml` and `pnpm test`.

> [!NOTE]
> Signing up at `/admin/entrar` does not make that person an admin. Admin access is granted
> separately.

## Tech stack

- **Next.js, React, and Tailwind** — the site.
- **Firebase** — Auth, Firestore, and Storage.
- **pnpm 11.1.1** — Node 22 or newer.

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

> [!IMPORTANT]
> `pnpm run ci` runs lint, types, format, tests, and build. Node 22 is required.

## Usage

Fill `NEXT_PUBLIC_FIREBASE_*` in `.env.local`. Rules deploy with `firebase deploy --only firestore:rules,firestore:indexes,storage`.

> [!TIP]
> `pnpm test` runs Vitest without starting the site.

## Contributing

> [!CAUTION]
> The suggested Firebase project is `web-actualidad-cpc`. Do not reuse another site of the movement.

Repository of [CO Politica Centro](https://github.com/CO-Politica-Centro).

> [!WARNING]
> Do not commit `.env.local`. The tracked example is `.env.example`.

## License

This repository does not include a license file.
