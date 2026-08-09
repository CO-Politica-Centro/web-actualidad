---
description: Commit de cambios actuales con Conventional Commits, sin trailer Co-authored-by de Cursor
---

# Auto-commit — web-capacitacion (CO Politica Centro)

Usar cuando el usuario pida **hacer commit** del trabajo actual o invoque **`/auto-commit`**.
Mensajes **Conventional Commits** en **inglés**, coherentes con `git log` de este repo.
**No** hacer `git push` salvo petición explícita.
Respuestas al chat en **español**.

Cumplir siempre [`.cursor/rules/git-commits.mdc`](../rules/git-commits.mdc).
Si existe el skill global `auto-commit`, aplicar el mismo flujo (este comando aporta scopes y contexto del repo).

## Prohibido (Cursor / co-autor)

- **Nunca** dejar `Co-authored-by: Cursor` (ni variantes), `Made-with: Cursor`, ni trailers de otro agente/IDE.
- **Nunca** hacer push si `git log -1 --format=%B` muestra un trailer de Cursor o de otro agente/IDE.
- **No** usar solo `git commit -m "..."`: usar **`git commit -F`** con un archivo de mensaje limpio.
- Tras cada commit, **obligatorio**: `git log -1 --format=%B` → si hay trailer y el commit no está publicado, `git commit --amend -F` con el mismo texto sin trailer.
- Si ya se publicó con trailer y el usuario lo pide: reescribir historial y `git push --force-with-lease` solo con petición explícita.
- Nunca actualizar `git config`. Nunca `--no-verify` salvo petición explícita.

## Cuándo ejecutar

- Invocación de **`/auto-commit`** o petición explícita de **commit** / **autocommit**.
- **No** commitear si el usuario no lo pidió.

## Antes de commitear

Ejecutar en paralelo:

1. `git status` — staged y unstaged.
2. `git diff` y `git diff --staged` — qué entra en el commit.
3. `git log -15 --oneline` — tono y scopes recientes.

Luego:

4. **Respetar borrados:** si el diff elimina líneas o archivos, **no restaurarlos** ni “arreglar” el contenido antes del commit salvo petición explícita.
5. Stage solo archivos relevantes. **No** incluir `.env`, credenciales, ni artefactos (`.next/`, `dist/`, `node_modules/`, `.vercel/`) salvo petición explícita.
6. Inferir `scope` desde rutas del diff e historial (no hardcodear scopes de otro proyecto).

## Ámbitos (`scope`) habituales en este repo

`home`, `cursos`, `recursos`, `ruta`, `layout`, `ui`, `lib`, `hooks`, `seo`, `a11y`, `ci`, `cursor`, `deps`, `readme`, `content`.

Rutas de referencia: `src/app/`, `src/components/`, `src/lib/`, `src/hooks/`, `.github/workflows/`, `.cursor/`.

## Formas de mensaje

### A) Formato lista — varias áreas en un commit

```text
<type>(<scope>): <acción en imperativo, inglés, sin punto final>
```

Primera línea = resumen; líneas siguientes = un bloque lógico del diff cada una.

```text
feat(cursos): add stub catalog shell for future modules

chore(cursor): add repo rules and auto-commit command
```

### B) Formato clásico — un solo tema

```text
docs(readme): document Vercel production URL
```

## Tipos

| Tipo              | Uso aquí                                    |
| ----------------- | ------------------------------------------- |
| `feat`            | UI, rutas, contenido educativo visible      |
| `fix`             | Bugs, regresiones                           |
| `docs`            | README, docs, comandos Cursor               |
| `refactor`        | Reorganización sin cambio de comportamiento |
| `style` / `chore` | Formato, tokens, deps, scripts, `.cursor/`  |
| `perf`            | Rendimiento                                 |
| `ci`              | `.github/workflows/`                        |
| `test`            | Vitest / pruebas                            |

**Evitar** encadenar `feat: … feat: …` en una sola línea.

## Commit (obligatorio con `-F`)

```bash
cat > /tmp/commit-msg.txt <<'EOF'
feat(scope): concise imperative summary

refactor(other): optional second logical block
EOF
git commit -F /tmp/commit-msg.txt
git log -1 --format=%B
```

Si aparece trailer de Cursor:

```bash
git commit --amend -F /tmp/commit-msg.txt
git log -1 --format=%B
```

## Reglas

- Mensaje en **inglés**; respuesta al chat en **español**.
- Hook rechazado → corregir y **nuevo** commit (no amend del fallido).
- Si no hay cambios, no crear commit vacío; informarlo.
