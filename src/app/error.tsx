"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="max-w-xl space-y-4">
        <p className="text-brand-green text-sm font-semibold tracking-[0.18em] uppercase">
          Error
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Algo salió mal</h1>
        <p className="text-muted leading-relaxed">
          No pudimos cargar esta página. Prueba de nuevo o vuelve al inicio.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center rounded-md px-5 py-2.5 text-base font-semibold transition"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex min-h-11 items-center rounded-md border-2 px-5 py-2.5 text-base font-medium transition"
          >
            Ir al inicio
          </Link>
          <Link
            href="/noticias"
            className="text-muted hover:text-foreground inline-flex min-h-11 items-center px-2 text-base underline-offset-4 hover:underline"
          >
            Ver noticias
          </Link>
        </div>
      </div>
    </div>
  );
}
