"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { LinkUnderline } from "@/components/link-underline";
import { site } from "@/content/site";

function FooterNavLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "group text-muted hover:text-foreground inline-flex min-h-11 items-center";

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkUnderline from="start">{label}</LinkUnderline>
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <LinkUnderline from="start">{label}</LinkUnderline>
    </Link>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-border bg-surface/80 border-t">
      <div className="mx-auto max-w-5xl px-6 pt-14 pb-8">
        <div className="border-border flex flex-col gap-8 border-b pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="flex max-w-md flex-col gap-3">
            <BrandMark
              name={site.shortName}
              size={36}
              className="text-foreground"
            />
            <p className="text-muted leading-relaxed">{site.description}</p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end sm:text-right">
            <p className="text-muted text-sm">
              Publicidad y alianzas institucionales
            </p>
            <a
              href={`mailto:${site.urls.email}`}
              className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-5 py-2.5 text-base font-semibold transition"
            >
              Contactar
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-foreground font-display text-sm font-semibold tracking-wide uppercase">
              Secciones
            </h2>
            <nav aria-label="Secciones" className="flex flex-col">
              {site.nav.map((link) => (
                <FooterNavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-foreground font-display text-sm font-semibold tracking-wide uppercase">
              Movimiento
            </h2>
            <nav aria-label="Movimiento" className="flex flex-col">
              <FooterNavLink href={site.urls.portal} label="Portal" external />
              <FooterNavLink
                href={site.urls.capacitacion}
                label="Capacitación"
                external
              />
              <FooterNavLink
                href={site.urls.discord}
                label="Discord"
                external
              />
            </nav>
          </div>

          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <h2 className="text-foreground font-display text-sm font-semibold tracking-wide uppercase">
              Aviso
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              {site.disclaimer}
            </p>
          </div>
        </div>

        <div className="text-muted border-border flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.shortName} — {site.name}
          </p>
          <a
            href={site.urls.beacons}
            className="group hover:text-foreground inline-flex min-h-11 items-center sm:min-h-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkUnderline from="start">Hub de comunidades</LinkUnderline>
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
