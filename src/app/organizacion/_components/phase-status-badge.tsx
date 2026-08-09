import type { PhaseStatus } from "@/content/organizacion/types";
import { cn } from "@/lib/utils";

const labels: Record<PhaseStatus, string> = {
  done: "Hecha",
  current: "En curso",
  upcoming: "Pendiente",
};

type PhaseStatusBadgeProps = {
  status: PhaseStatus;
  className?: string;
};

export function PhaseStatusBadge({ status, className }: PhaseStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-sm font-semibold tracking-wide",
        status === "current" &&
          "bg-brand-green/15 text-brand-green ring-brand-green/30 ring-1",
        status === "done" &&
          "bg-foreground/8 text-foreground ring-border-strong ring-1",
        status === "upcoming" &&
          "text-muted bg-foreground/5 ring-border ring-1",
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}
