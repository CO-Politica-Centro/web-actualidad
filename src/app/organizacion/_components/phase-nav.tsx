import Link from "next/link";
import type { Phase } from "@/content/organizacion/types";

type PhaseNavProps = {
  previous: Phase | null;
  next: Phase | null;
};

export function PhaseNav({ previous, next }: PhaseNavProps) {
  return (
    <nav
      aria-label="Navegación entre fases"
      className="border-border flex flex-col gap-4 border-t pt-10 sm:flex-row sm:items-stretch sm:justify-between"
    >
      {previous ? (
        <Link
          href={`/organizacion/${previous.slug}`}
          className="border-border hover:bg-foreground/4 flex min-h-11 flex-1 flex-col justify-center rounded-xl border px-5 py-4 transition"
        >
          <span className="text-muted text-sm">Anterior</span>
          <span className="text-foreground mt-1 font-semibold">
            Fase {previous.id} · {previous.shortTitle}
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}

      <Link
        href="/organizacion"
        className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex min-h-11 items-center justify-center rounded-xl border-2 px-5 text-base font-semibold transition sm:self-center"
      >
        Mapa del plan
      </Link>

      {next ? (
        <Link
          href={`/organizacion/${next.slug}`}
          className="border-border hover:bg-foreground/4 flex min-h-11 flex-1 flex-col justify-center rounded-xl border px-5 py-4 text-right transition sm:items-end"
        >
          <span className="text-muted text-sm">Siguiente</span>
          <span className="text-foreground mt-1 font-semibold">
            Fase {next.id} · {next.shortTitle}
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
    </nav>
  );
}
