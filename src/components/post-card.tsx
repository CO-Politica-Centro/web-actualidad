import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/features/posts/types";
import { postHref } from "@/features/posts/types";
import { cn } from "@/lib/utils";

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

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const date = formatDate(post.publicadoEn);
  const href = postHref(post);
  const tipoLabel = post.tipo === "noticia" ? "Noticia" : "Blog";

  return (
    <article
      className={cn(
        "group border-border flex flex-col overflow-hidden border-b pb-8",
        featured &&
          "sm:grid sm:grid-cols-[1.1fr_1fr] sm:gap-8 sm:border-0 sm:pb-0",
      )}
    >
      {post.portadaUrl ? (
        <Link
          href={href}
          className={cn(
            "bg-surface relative mb-4 block aspect-[16/10] overflow-hidden",
            featured && "sm:mb-0",
          )}
        >
          <Image
            src={post.portadaUrl}
            alt={post.portadaAlt || post.titulo}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, 40vw"
            }
            unoptimized
          />
        </Link>
      ) : null}

      <div className="flex flex-col">
        <p className="text-muted mb-2 text-sm tracking-wide uppercase">
          {tipoLabel}
          {date ? ` · ${date}` : null}
        </p>
        <h2
          className={cn(
            "font-display text-foreground font-semibold tracking-tight",
            featured ? "text-3xl sm:text-4xl" : "text-2xl",
          )}
        >
          <Link
            href={href}
            className="hover:text-brand-green transition-colors"
          >
            {post.titulo}
          </Link>
        </h2>
        <p className="text-muted mt-3 line-clamp-3 text-base leading-relaxed">
          {post.resumen}
        </p>
        <Link
          href={href}
          className="text-brand-green mt-4 inline-flex min-h-11 items-center text-base font-semibold"
        >
          Leer más
        </Link>
      </div>
    </article>
  );
}
