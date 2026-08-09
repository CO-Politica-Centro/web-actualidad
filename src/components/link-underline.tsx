import { cn } from "@/lib/utils";

type LinkUnderlineProps = {
  children: React.ReactNode;
  /** `center`: header (abre desde el medio). `start`: footer (de lado a lado). */
  from?: "center" | "start";
  className?: string;
};

/**
 * Subrayado animado. El enlace padre debe incluir la clase `group`.
 */
export function LinkUnderline({
  children,
  from = "center",
  className,
}: LinkUnderlineProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-0.5 h-px bg-current",
          "scale-x-0 transition-transform duration-300 ease-out",
          "group-hover:scale-x-100 group-focus-visible:scale-x-100",
          from === "start" ? "origin-left" : "origin-center",
        )}
      />
    </span>
  );
}
