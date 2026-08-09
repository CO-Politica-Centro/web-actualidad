import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { organizationOverview } from "@/content/organizacion/overview";
import {
  getAdjacentPhases,
  getPhaseBySlug,
  phases,
} from "@/content/organizacion/phases";
import { pageMetadata } from "@/lib/seo";
import { OrganizationDisclaimer } from "../_components/organization-disclaimer";
import { PhaseChecklist } from "../_components/phase-checklist";
import { PhaseNav } from "../_components/phase-nav";
import { PhaseStatusBadge } from "../_components/phase-status-badge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return phases.map((phase) => ({ slug: phase.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const phase = getPhaseBySlug(slug);
  if (!phase) {
    return pageMetadata({
      title: "Fase no encontrada",
      description: "La fase solicitada no existe en el plan de organización.",
      path: `/organizacion/${slug}`,
      robots: { index: false, follow: false },
    });
  }
  return pageMetadata({
    title: `${phase.title}`,
    description: phase.objective,
    path: `/organizacion/${phase.slug}`,
  });
}

function BulletSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: string[];
}) {
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="font-display text-foreground text-2xl font-semibold"
      >
        {title}
      </h2>
      <ul className="text-muted mt-5 list-disc space-y-3 pl-5 text-base leading-relaxed">
        {items.map((item) => (
          <li key={item}>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function FaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const phase = getPhaseBySlug(slug);
  if (!phase) notFound();

  const { previous, next } = getAdjacentPhases(slug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/organizacion", label: "Organización" },
          { label: `Fase ${phase.id}` },
        ]}
      />

      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <PhaseStatusBadge status={phase.status} />
          <p className="text-muted text-sm tracking-wide uppercase">
            Plan de organización
          </p>
        </div>
        <h1 className="font-display text-foreground mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {phase.title}
        </h1>
        <p className="text-muted mt-5 text-lg leading-relaxed">
          {phase.objective}
        </p>
      </header>

      <div className="mt-10 max-w-3xl">
        <OrganizationDisclaimer text={organizationOverview.disclaimer} />
      </div>

      <div className="mt-14 grid max-w-3xl gap-14">
        <section aria-labelledby="phase-summary-heading">
          <h2
            id="phase-summary-heading"
            className="font-display text-foreground text-2xl font-semibold"
          >
            Resumen
          </h2>
          <p className="text-muted mt-4 text-base leading-relaxed sm:text-lg">
            {phase.summary}
          </p>
        </section>

        <BulletSection
          id="phase-actions-heading"
          title="Qué hacer"
          items={phase.actions}
        />

        <PhaseChecklist items={phase.checklist} />

        <BulletSection
          id="phase-exit-heading"
          title="Criterios de salida"
          items={phase.exitCriteria}
        />

        <BulletSection
          id="phase-anti-heading"
          title="Qué no hacer"
          items={phase.antiPatterns}
        />

        {phase.legalNote ? (
          <aside
            className="border-border bg-surface rounded-xl border p-5 sm:p-6"
            aria-label="Nota legal"
          >
            <h2 className="font-display text-foreground text-lg font-semibold">
              Nota informativa
            </h2>
            <p className="text-muted mt-3 text-sm leading-relaxed sm:text-base">
              {phase.legalNote}
            </p>
          </aside>
        ) : null}
      </div>

      <div className="mt-16">
        <PhaseNav previous={previous} next={next} />
      </div>
    </div>
  );
}
