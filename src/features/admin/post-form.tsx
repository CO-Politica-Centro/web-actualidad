"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PostEditor } from "@/features/admin/post-editor";
import {
  createPost,
  requestRevalidate,
  updatePost,
  uploadCoverImage,
} from "@/features/posts/queries-client";
import { slugify } from "@/features/posts/slug";
import type { Post, PostEstado, PostTipo } from "@/features/posts/types";
import { postHref, tipoToPath } from "@/features/posts/types";

type Props = {
  initial?: Post | null;
};

export function PostForm({ initial }: Props) {
  const router = useRouter();
  const [tipo, setTipo] = useState<PostTipo>(initial?.tipo ?? "noticia");
  const [titulo, setTitulo] = useState(initial?.titulo ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [resumen, setResumen] = useState(initial?.resumen ?? "");
  const [cuerpoHtml, setCuerpoHtml] = useState(
    initial?.cuerpoHtml ?? "<p></p>",
  );
  const [portadaUrl, setPortadaUrl] = useState(initial?.portadaUrl ?? "");
  const [portadaAlt, setPortadaAlt] = useState(initial?.portadaAlt ?? "");
  const [estado, setEstado] = useState<PostEstado>(
    initial?.estado ?? "borrador",
  );
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const effectiveSlug = slugTouched ? slug : slugify(titulo);

  const tags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 12),
    [tagsText],
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        tipo,
        slug: effectiveSlug,
        titulo,
        resumen,
        cuerpoHtml,
        portadaUrl: portadaUrl || null,
        portadaAlt,
        estado,
        tags,
      };

      if (initial) {
        await updatePost(initial.id, payload, initial);
      } else {
        await createPost(payload);
      }

      if (estado === "publicado") {
        await requestRevalidate([
          "/",
          `/${tipoToPath(tipo)}`,
          postHref({ tipo, slug: effectiveSlug }),
        ]);
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  async function onCoverChange(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadCoverImage(file, initial?.id ?? "nuevo");
      setPortadaUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Tipo
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as PostTipo)}
            className="border-border bg-surface min-h-11 rounded-md border px-3 text-base font-normal"
          >
            <option value="noticia">Noticia</option>
            <option value="blog">Blog</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Estado
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as PostEstado)}
            className="border-border bg-surface min-h-11 rounded-md border px-3 text-base font-normal"
          >
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Título
        <input
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border-border bg-surface min-h-11 rounded-md border px-3 text-base font-normal"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Slug
        <input
          required
          value={effectiveSlug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className="border-border bg-surface min-h-11 rounded-md border px-3 font-mono text-base font-normal"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Resumen
        <textarea
          required
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          rows={3}
          maxLength={500}
          className="border-border bg-surface rounded-md border px-3 py-2 text-base font-normal"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Cuerpo</span>
        <PostEditor value={cuerpoHtml} onChange={setCuerpoHtml} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Portada
          <input
            type="file"
            accept="image/*"
            onChange={(e) => void onCoverChange(e.target.files?.[0] ?? null)}
            className="text-sm font-normal"
          />
          {uploading ? (
            <span className="text-muted text-sm">Subiendo…</span>
          ) : null}
          {portadaUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portadaUrl}
              alt=""
              className="border-border mt-2 aspect-[16/9] w-full max-w-sm border object-cover"
            />
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Texto alternativo de portada
          <input
            value={portadaAlt}
            onChange={(e) => setPortadaAlt(e.target.value)}
            className="border-border bg-surface min-h-11 rounded-md border px-3 text-base font-normal"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Etiquetas (separadas por coma)
        <input
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          className="border-border bg-surface min-h-11 rounded-md border px-3 text-base font-normal"
        />
      </label>

      {error ? (
        <p className="text-sm text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center rounded-md px-5 text-base font-semibold transition disabled:opacity-60"
        >
          {saving ? "Guardando…" : initial ? "Guardar cambios" : "Crear"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="border-border-strong inline-flex min-h-11 items-center rounded-md border-2 px-5 text-base font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
