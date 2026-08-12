import { PostCard } from "@/components/post-card";
import { listPublishedPosts } from "@/features/posts/queries-server";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Noticias que mueven al centro",
  description:
    "Comunicados y hechos del movimiento: entérate primero y comparte con criterio.",
  path: "/noticias",
});

export default async function NoticiasPage() {
  const posts = await listPublishedPosts({ tipo: "noticia" });

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          Noticias
        </h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          Actualidad puntual del movimiento: anuncios, cobertura y comunicados.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="text-muted text-base">
            No hay noticias publicadas aún.
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
