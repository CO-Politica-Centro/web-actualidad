import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { site } from "@/content/site";
import { listPublishedPosts } from "@/features/posts/queries-server";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Actualidad Centro — Noticias y análisis",
  description: site.description,
  path: "/",
});

export default async function HomePage() {
  const [noticias, blog] = await Promise.all([
    listPublishedPosts({ tipo: "noticia", limitCount: 4 }),
    listPublishedPosts({ tipo: "blog", limitCount: 3 }),
  ]);

  const featured = noticias[0] ?? blog[0] ?? null;
  const moreNoticias =
    featured?.tipo === "noticia" ? noticias.slice(1) : noticias;
  const moreBlog =
    featured?.tipo === "blog" ? blog.filter((p) => p.id !== featured.id) : blog;

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <section className="home-reveal max-w-3xl">
        <p className="text-muted mb-3 text-sm tracking-wide uppercase">
          {site.name}
        </p>
        <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.shortName}
        </h1>
        <p className="text-muted mt-5 text-lg leading-relaxed">
          {site.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/noticias"
            className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center rounded-md px-5 text-base font-semibold transition"
          >
            Ver noticias
          </Link>
          <Link
            href="/blog"
            className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex min-h-11 items-center rounded-md border-2 px-5 text-base font-semibold transition"
          >
            Ir al blog
          </Link>
        </div>
      </section>

      {featured ? (
        <section className="home-reveal-delay border-border mt-16 border-t pt-12">
          <h2 className="font-display text-foreground mb-8 text-2xl font-semibold">
            Destacado
          </h2>
          <PostCard post={featured} featured />
        </section>
      ) : (
        <section className="home-reveal-delay border-border mt-16 border-t pt-12">
          <p className="text-muted text-base">
            Aún no hay publicaciones. Cuando el equipo editorial publique desde
            el panel, aparecerán aquí.
          </p>
        </section>
      )}

      {moreNoticias.length > 0 ? (
        <section className="home-reveal-delay-2 mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-foreground text-2xl font-semibold">
              Últimas noticias
            </h2>
            <Link
              href="/noticias"
              className="text-brand-green text-base font-semibold"
            >
              Ver todas
            </Link>
          </div>
          <div className="flex flex-col gap-10">
            {moreNoticias.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {moreBlog.length > 0 ? (
        <section className="mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-foreground text-2xl font-semibold">
              Del blog
            </h2>
            <Link
              href="/blog"
              className="text-brand-green text-base font-semibold"
            >
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col gap-10">
            {moreBlog.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
