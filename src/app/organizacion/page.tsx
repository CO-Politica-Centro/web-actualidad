import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { organizationOverview } from "@/content/organizacion/overview";
import { getCurrentPhase, phases } from "@/content/organizacion/phases";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { OrganizationDisclaimer } from "./_components/organization-disclaimer";
import { PhaseMap } from "./_components/phase-map";
import { PhaseStatusBadge } from "./_components/phase-status-badge";

export const metadata = pageMetadata({
  title: "Cómo maduramos como organización",
  description:
    "Del diagnóstico territorial al camino institucional: el plan de madurez de CO Politica Centro, con honestidad y pasos claros.",
  path: "/organizacion",
});

export default function OrganizacionPage() {
  const current = getCurrentPhase();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <Breadcrumbs
        items={[{ href: "/", label: "Inicio" }, { label: "Organización" }]}
      />

      <header className="home-reveal max-w-3xl">
        <p className="text-muted mb-3 text-sm tracking-wide uppercase">
          {site.name}
        </p>
        <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {organizationOverview.title}
        </h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          {organizationOverview.tagline}
        </p>
        <div className="text-muted mt-6 space-y-4 text-base leading-relaxed sm:text-lg">
          {organizationOverview.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className="home-reveal-delay mt-10">
        <OrganizationDisclaimer text={organizationOverview.disclaimer} />
      </div>

      {current ? (
        <section
          className="border-brand-green/35 bg-brand-green/8 mt-12 rounded-xl border-2 p-6 sm:p-8"
          aria-labelledby="current-phase-heading"
        >
          <div className="flex flex-wrap items-center gap-3">
            <PhaseStatusBadge status="current" />
            <p className="text-muted text-sm tracking-wide uppercase">
              Dónde estamos hoy
            </p>
          </div>
          <h2
            id="current-phase-heading"
            className="font-display text-foreground mt-4 text-2xl font-semibold sm:text-3xl"
          >
            {organizationOverview.currentBanner}
          </h2>
          <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed">
            {current.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/organizacion/${current.slug}`}
              className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center rounded-md px-5 text-base font-semibold transition"
            >
              Ir a Fase {current.id}
            </Link>
            <a
              href={site.urls.discord}
              className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex min-h-11 items-center rounded-md border-2 px-5 text-base font-semibold transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unirse en Discord
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </section>
      ) : null}

      <section className="mt-16" aria-labelledby="path-heading">
        <h2
          id="path-heading"
          className="font-display text-foreground text-2xl font-semibold sm:text-3xl"
        >
          El camino
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-base leading-relaxed">
          {organizationOverview.pathSummary}
        </p>
        <div className="mt-10">
          <PhaseMap phases={phases} />
        </div>
      </section>
    </div>
  );
}
