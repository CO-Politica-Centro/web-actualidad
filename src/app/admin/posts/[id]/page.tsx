"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostForm } from "@/features/admin/post-form";
import { getAdminPost } from "@/features/posts/queries-client";
import type { Post } from "@/features/posts/types";

export default function EditarPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getAdminPost(params.id)
      .then((data) => {
        if (!cancelled) setPost(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error al cargar");
          setPost(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (post === undefined) {
    return <p className="text-muted">Cargando publicación…</p>;
  }

  if (!post) {
    return (
      <p className="text-muted" role="alert">
        {error ?? "Publicación no encontrada."}
      </p>
    );
  }

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-semibold tracking-tight">
        Editar publicación
      </h1>
      <PostForm initial={post} />
    </div>
  );
}
