import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PostArticle } from "@/components/post-article";
import {
  getPublishedPostBySlug,
  listPublishedPosts,
} from "@/features/posts/queries-server";
import { getSiteUrl, pageMetadata } from "@/lib/seo";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await listPublishedPosts({ tipo: "blog", limitCount: 50 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug("blog", slug);
  if (!post) {
    return pageMetadata({
      title: "Entrada no encontrada",
      description: "La entrada solicitada no existe o no está publicada.",
      path: `/blog/${slug}`,
      robots: { index: false, follow: false },
    });
  }
  return pageMetadata({
    title: post.titulo,
    description: post.resumen,
    path: `/blog/${post.slug}`,
    ...(post.portadaUrl ? { image: post.portadaUrl } : {}),
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug("blog", slug);
  if (!post) notFound();

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumen,
    datePublished: post.publicadoEn ?? undefined,
    dateModified: post.actualizadoEn,
    author: {
      "@type": "Person",
      name: post.autorNombre || "CO Politica Centro",
    },
    image: post.portadaUrl ? [post.portadaUrl] : undefined,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/blog", label: "Blog" },
          { label: post.titulo },
        ]}
      />
      <div className="mt-8">
        <PostArticle post={post} />
      </div>
    </div>
  );
}
