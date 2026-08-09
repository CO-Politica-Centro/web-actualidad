import { PostCard } from "@/components/post-card";
import { listPublishedPosts } from "@/features/posts/queries-server";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Análisis y opinión de CO Politica Centro: ideas para una política ciudadana.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await listPublishedPosts({ tipo: "blog" });

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          Análisis, contexto y columnas para pensar Colombia desde el centro.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="text-muted text-base">No hay entradas de blog aún.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
