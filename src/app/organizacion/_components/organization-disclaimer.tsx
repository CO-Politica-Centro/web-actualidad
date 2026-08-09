import { site } from "@/content/site";

type OrganizationDisclaimerProps = {
  text: string;
};

export function OrganizationDisclaimer({ text }: OrganizationDisclaimerProps) {
  return (
    <aside
      className="border-border-strong bg-surface/90 rounded-xl border-2 p-5 sm:p-6"
      aria-label="Aviso importante"
    >
      <p className="text-muted text-sm leading-relaxed sm:text-base">{text}</p>
      <p className="text-muted mt-3 text-sm">
        Comunidad:{" "}
        <a
          href={site.urls.discord}
          className="text-foreground font-semibold underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord de CO Política Centro
        </a>
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </p>
    </aside>
  );
}
