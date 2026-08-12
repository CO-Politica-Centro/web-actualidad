import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://web-actualidad-co-politica.vercel.app";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_SEO = {
  titleDefault: "Actualidad Centro — Noticias y análisis",
  titleTemplate: "%s · Actualidad Centro",
  description:
    "Noticias del movimiento y blog ciudadano: lo que pasa, por qué importa y qué puedes hacer.",
  siteName: "Actualidad · CO Politica Centro",
  ogAlt: "Actualidad Centro — Noticias y análisis de CO Politica Centro",
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute URL or path under public/. Omit to use opengraph-image. */
  image?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

/** Shared title/description/canonical/OG/Twitter for route pages. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  robots,
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      locale: "es_CO",
      siteName: SITE_SEO.siteName,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
