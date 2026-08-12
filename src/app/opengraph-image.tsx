import { SITE_SEO } from "@/lib/seo";
import { ogContentType, ogSize, renderBrandOg } from "@/lib/og-brand";

export const alt = SITE_SEO.ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return renderBrandOg({
    eyebrow: "Editorial · Centro",
    title: "Actualidad · Centro",
    subtitle: "Noticias del movimiento y análisis para actuar con criterio.",
  });
}
