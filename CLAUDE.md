@AGENTS.md

# Claude — web-actualidad

Sigue `AGENTS.md` y las reglas en `.cursor/rules/`.

Al commitear o al recibir `/auto-commit`, aplica `.cursor/commands/auto-commit.md` y `.cursor/rules/git-commits.mdc`: mensaje Conventional Commits en inglés con `git commit -F`, sin trailers de co-autor de Cursor/IA, verificación con `git log -1 --format=%B`, chat en español, sin push salvo petición explícita.

Antes de cambiar APIs de Next.js, consulta la documentación empaquetada en `node_modules/next/dist/docs/`.
