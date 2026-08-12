import { getPublishedPostBySlug } from "@/features/posts/queries-server";
import { ogContentType, ogSize, renderBrandOg } from "@/lib/og-brand";

export const alt = "Blog · Actualidad Centro";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ slug: string }> };

export default async function BlogOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug("blog", slug);

  return renderBrandOg({
    eyebrow: "Blog · Actualidad Centro",
    title: post?.titulo ?? "Análisis ciudadano",
    subtitle:
      post?.resumen ??
      "Ideas y análisis de CO Politica Centro para el debate público.",
  });
}
