import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o fue movida.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="max-w-xl space-y-4">
        <p className="text-brand-green text-sm font-semibold tracking-[0.18em] uppercase">
          Error 404
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="text-muted leading-relaxed">
          El enlace puede estar roto o la página ya no existe. Vuelve al inicio
          o explora noticias y blog.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/"
            className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center rounded-md px-5 py-2.5 text-base font-semibold transition"
          >
            Ir al inicio
          </Link>
          <Link
            href="/noticias"
            className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex min-h-11 items-center rounded-md border-2 px-5 py-2.5 text-base font-medium transition"
          >
            Noticias
          </Link>
          <Link
            href="/blog"
            className="text-muted hover:text-foreground inline-flex min-h-11 items-center px-2 text-base underline-offset-4 hover:underline"
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
