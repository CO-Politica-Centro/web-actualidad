import type { Metadata } from "next";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute path or leave default social image */
  image?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

/** Shared title/description/canonical/OG/Twitter for route pages. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/brand/og-social.png",
  type = "website",
  robots,
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
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
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
