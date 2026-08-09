import { sanitizePostHtml } from "@/features/posts/sanitize";
import type { Post } from "@/features/posts/types";

function formatDate(iso: string | null) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.portadaUrl}
          alt={post.portadaAlt || post.titulo}
          className="border-border mb-10 aspect-[16/9] w-full border object-cover"
        />
      ) : null}

      <div
        className="prose-actualidad"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
