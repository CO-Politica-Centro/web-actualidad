import Image from "next/image";
import { sanitizePostHtml } from "@/features/posts/sanitize";
import type { Post } from "@/features/posts/types";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string | null) {
  if (!iso) return null;
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return null;
  }
}

export function PostArticle({ post }: { post: Post }) {
  const date = formatDate(post.publicadoEn);
  const html = sanitizePostHtml(post.cuerpoHtml);

  return (
    <article className="mx-auto max-w-[65ch]">
      <header className="mb-10">
        <p className="text-muted mb-3 text-sm tracking-wide uppercase">
          {post.tipo === "noticia" ? "Noticia" : "Blog"}
          {date ? ` · ${date}` : null}
        </p>
        <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.titulo}
        </h1>
        {post.resumen ? (
          <p className="text-muted mt-5 text-lg leading-relaxed">
            {post.resumen}
          </p>
        ) : null}
        {post.autorNombre ? (
          <p className="text-muted mt-4 text-sm">Por {post.autorNombre}</p>
        ) : null}
      </header>

      {post.portadaUrl ? (
        <div className="border-border relative mb-10 aspect-[16/9] w-full overflow-hidden border">
          <Image
            src={post.portadaUrl}
            alt={post.portadaAlt || post.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 65ch"
            priority
            unoptimized
          />
        </div>
      ) : null}

      <div
        className="prose-actualidad"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
