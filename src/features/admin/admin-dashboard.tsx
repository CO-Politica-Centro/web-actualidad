"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  deletePost,
  listAdminPosts,
  requestRevalidate,
} from "@/features/posts/queries-client";
import type { Post, PostEstado, PostTipo } from "@/features/posts/types";
import { postHref, tipoToPath } from "@/features/posts/types";

export function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tipo, setTipo] = useState<PostTipo | "todos">("todos");
  const [estado, setEstado] = useState<PostEstado | "todos">("todos");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      void (async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await listAdminPosts({ tipo, estado });
          if (!cancelled) setPosts(data);
        } catch (err) {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : "No se pudo cargar");
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    });
    return () => {
      cancelled = true;
    };
  }, [tipo, estado]);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const data = await listAdminPosts({ tipo, estado });
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(post: Post) {
    if (!window.confirm(`¿Borrar «${post.titulo}»?`)) return;
    try {
      await deletePost(post.id);
      await requestRevalidate([
        "/",
        `/${tipoToPath(post.tipo)}`,
        postHref(post),
      ]);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo borrar");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Publicaciones
          </h1>
          <p className="text-muted mt-2 text-base">
            Crea y publica noticias o entradas de blog.
          </p>
        </div>
        <Link
          href="/admin/posts/nuevo"
          className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center rounded-md px-5 text-base font-semibold transition"
        >
          Nueva publicación
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Tipo
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as PostTipo | "todos")}
            className="border-border bg-surface min-h-11 rounded-md border px-3"
          >
            <option value="todos">Todos</option>
            <option value="noticia">Noticias</option>
            <option value="blog">Blog</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Estado
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as PostEstado | "todos")}
            className="border-border bg-surface min-h-11 rounded-md border px-3"
          >
            <option value="todos">Todos</option>
            <option value="publicado">Publicado</option>
            <option value="borrador">Borrador</option>
          </select>
        </label>
      </div>

      {error ? (
        <p className="text-sm text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-muted">Cargando…</p>
      ) : posts.length === 0 ? (
        <p className="text-muted">No hay publicaciones con esos filtros.</p>
      ) : (
        <ul className="divide-border border-border divide-y border-y">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-muted text-xs tracking-wide uppercase">
                  {post.tipo} · {post.estado}
                </p>
                <p className="font-display text-lg font-semibold">
                  {post.titulo}
                </p>
                <p className="text-muted font-mono text-sm">/{post.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.estado === "publicado" ? (
                  <Link
                    href={postHref(post)}
                    className="border-border inline-flex min-h-11 items-center rounded-md border px-3 text-sm"
                    target="_blank"
                  >
                    Ver
                  </Link>
                ) : null}
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="border-border inline-flex min-h-11 items-center rounded-md border px-3 text-sm font-medium"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => void onDelete(post)}
                  className="inline-flex min-h-11 items-center rounded-md border border-red-700/40 px-3 text-sm text-red-700 dark:text-red-300"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
