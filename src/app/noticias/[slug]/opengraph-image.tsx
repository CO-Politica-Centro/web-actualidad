import { getPublishedPostBySlug } from "@/features/posts/queries-server";
import { ogContentType, ogSize, renderBrandOg } from "@/lib/og-brand";

export const alt = "Noticia · Actualidad Centro";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ slug: string }> };

export default async function NoticiaOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug("noticia", slug);

  return renderBrandOg({
    eyebrow: "Noticia · Actualidad Centro",
    title: post?.titulo ?? "Noticia del movimiento",
    subtitle:
      post?.resumen ??
      "Actualidad editorial de CO Politica Centro para Colombia.",
  });
}
