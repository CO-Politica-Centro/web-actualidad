import Link from "next/link";
import type { Phase } from "@/content/organizacion/types";
import { PhaseStatusBadge } from "./phase-status-badge";
import { cn } from "@/lib/utils";

type PhaseMapProps = {
  phases: Phase[];
};

export function PhaseMap({ phases }: PhaseMapProps) {
  return (
    <ol className="border-border divide-border divide-y rounded-xl border">
      {phases.map((phase) => {
        const isCurrent = phase.status === "current";
        return (
          <li key={phase.slug}>
            <Link
              href={`/organizacion/${phase.slug}`}
              className={cn(
                "hover:bg-foreground/4 flex flex-col gap-3 px-5 py-5 transition sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                isCurrent && "bg-brand-green/6",
              )}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-muted text-sm font-semibold tracking-wide uppercase">
                    Fase {phase.id}
                  </span>
                  <PhaseStatusBadge status={phase.status} />
                </div>
                <p className="font-display text-foreground mt-2 text-xl font-semibold tracking-tight">
                  {phase.shortTitle}
                </p>
                <p className="text-muted mt-2 max-w-2xl text-base leading-relaxed">
                  {phase.objective}
                </p>
              </div>
              <span className="text-foreground shrink-0 text-base font-semibold underline underline-offset-4">
                Ver fase
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
