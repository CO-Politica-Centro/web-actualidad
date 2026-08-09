type PhaseChecklistProps = {
  items: string[];
  title?: string;
};

export function PhaseChecklist({
  items,
  title = "Checklist",
}: PhaseChecklistProps) {
  return (
    <section aria-labelledby="phase-checklist-heading">
      <h2
        id="phase-checklist-heading"
        className="font-display text-foreground text-2xl font-semibold"
      >
        {title}
      </h2>
      <ul className="border-border mt-6 space-y-3 rounded-xl border p-5 sm:p-6">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed">
            <span
              className="border-border-strong mt-1.5 size-4 shrink-0 rounded-sm border-2"
              aria-hidden
            />
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
