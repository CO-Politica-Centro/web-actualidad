import type { MetadataRoute } from "next";
import { listAllPublishedForSitemap } from "@/features/posts/queries-server";
import { postHref } from "@/features/posts/types";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${base}/noticias`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const posts = await listAllPublishedForSitemap();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}${postHref(post)}`,
    lastModified: post.actualizadoEn ? new Date(post.actualizadoEn) : now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
