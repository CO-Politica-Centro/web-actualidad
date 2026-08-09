import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { FirebaseAuthProvider } from "@/lib/firebase/auth-context";
import { getSiteUrl } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
});

function siteMetadataBase(): URL {
  const fallback = "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return new URL(fallback);
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
}

export const metadata: Metadata = {
  title: {
    default: `${site.shortName} — CO Politica Centro`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  metadataBase: siteMetadataBase(),
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.shortName,
    images: [
      {
        url: "/brand/og-social.png",
        width: 1200,
        height: 630,
        alt: site.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/og-social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const organizationLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: site.urls.portal,
        logo: `${siteUrl}/brand/logo-flor-512.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.shortName,
        url: siteUrl,
        inLanguage: "es-CO",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={organizationLd} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <FirebaseAuthProvider>
          <a href="#contenido-principal" className="skip-link">
            Saltar al contenido
          </a>
          <SiteHeader />
          <main
            id="contenido-principal"
            tabIndex={-1}
            className="contenido-principal flex-1"
          >
            {children}
          </main>
          <SiteFooter />
        </FirebaseAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
