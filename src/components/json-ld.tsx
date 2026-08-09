type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Escape `<` so JSON-LD cannot break out of the script tag (XSS). */
function toSafeJsonLd(data: JsonLdProps["data"]) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** Server-safe JSON-LD script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJsonLd(data) }}
    />
  );
}
