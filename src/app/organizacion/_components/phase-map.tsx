import Link from "next/link";
import type { Phase } from "@/content/organizacion/types";
import { PhaseStatusBadge } from "./phase-status-badge";
import { cn } from "@/lib/utils";

type PhaseMapProps = {
  phases: Phase[];
};

function PathNode({
  status,
  label,
}: {
  status: Phase["status"];
  label: string;
}) {
  return (
    <span
      className={cn(
        "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
        status === "current" &&
          "border-brand-green bg-brand-green text-background shadow-[0_0_0_6px_color-mix(in_srgb,var(--brand-green)_22%,transparent)]",
        status === "done" && "border-foreground bg-foreground text-background",
        status === "upcoming" &&
          "border-border-strong bg-background text-muted",
      )}
      aria-hidden
    >
      {label}
    </span>
  );
}

export function PhaseMap({ phases }: PhaseMapProps) {
  return (
    <ol className="relative mx-auto max-w-3xl">
      <div
        className="bg-border-strong absolute top-5 bottom-5 left-[1.375rem] w-px sm:left-1/2 sm:-translate-x-px"
        aria-hidden
      />

      {phases.map((phase, index) => {
        const isCurrent = phase.status === "current";
        const onLeft = index % 2 === 0;
        const delayMs = Math.min(index * 55, 400);

        return (
          <li
            key={phase.slug}
            className="ruta-step relative pb-10 last:pb-0"
            style={{ animationDelay: `${delayMs}ms` }}
          >
            <div className="absolute top-0 left-0 sm:hidden">
              <PathNode status={phase.status} label={String(phase.id)} />
            </div>

            <div className="absolute top-0 left-1/2 hidden -translate-x-1/2 sm:block">
              <PathNode status={phase.status} label={String(phase.id)} />
            </div>

            {/* Conector horizontal hacia el nodo (desktop) */}
            <div
              className={cn(
                "border-border-strong absolute top-[1.375rem] hidden h-px w-8 sm:block",
                onLeft ? "right-1/2 mr-5" : "left-1/2 ml-5",
              )}
              aria-hidden
            />

            <Link
              href={`/organizacion/${phase.slug}`}
              className={cn(
                "group relative ml-16 block sm:ml-0 sm:w-[calc(50%-2.5rem)]",
                onLeft ? "sm:mr-auto" : "sm:ml-auto",
              )}
            >
              <article
                className={cn(
                  "rounded-2xl px-1 py-0.5 transition",
                  isCurrent && "sm:scale-[1.01]",
                )}
              >
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-2",
                    onLeft && "sm:justify-end",
                  )}
                >
                  <span className="text-muted text-sm font-semibold tracking-wide uppercase">
                    Fase {phase.id}
                  </span>
                  <PhaseStatusBadge status={phase.status} />
                </div>
                <p
                  className={cn(
                    "font-display text-foreground mt-2 text-xl font-semibold tracking-tight sm:text-2xl",
                    onLeft && "sm:text-right",
                  )}
                >
                  {phase.shortTitle}
                </p>
                <p
                  className={cn(
                    "text-muted mt-2 text-base leading-relaxed",
                    onLeft && "sm:text-right",
                  )}
                >
                  {phase.objective}
                </p>
                <span
                  className={cn(
                    "text-foreground group-hover:text-brand-green mt-4 inline-flex items-center gap-1.5 text-base font-semibold transition",
                    onLeft && "sm:w-full sm:justify-end",
                  )}
                >
                  Seguir el camino
                  <span aria-hidden>→</span>
                </span>
              </article>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
