import { describe, expect, it } from "vitest";
import { isValidSlug, slugify } from "@/features/posts/slug";
import { sanitizePostHtml } from "@/features/posts/sanitize";
import { pathToTipo, postHref, tipoToPath } from "@/features/posts/types";

describe("slugify", () => {
  it("normaliza acentos y espacios", () => {
    expect(slugify("  ¡Hola Colombia!  ")).toBe("hola-colombia");
    expect(slugify("Análisis político")).toBe("analisis-politico");
  });

  it("valida slugs", () => {
    expect(isValidSlug("hola-mundo")).toBe(true);
    expect(isValidSlug("Hola")).toBe(false);
    expect(isValidSlug("-bad-")).toBe(false);
  });
});

describe("sanitizePostHtml", () => {
  it("elimina scripts", () => {
    const html = sanitizePostHtml("<p>ok</p><script>alert(1)</script>");
    expect(html).toContain("<p>ok</p>");
    expect(html.toLowerCase()).not.toContain("script");
  });
});

describe("post paths", () => {
  it("mapea tipo ↔ ruta", () => {
    expect(tipoToPath("noticia")).toBe("noticias");
    expect(tipoToPath("blog")).toBe("blog");
    expect(pathToTipo("noticias")).toBe("noticia");
    expect(pathToTipo("blog")).toBe("blog");
    expect(postHref({ tipo: "noticia", slug: "demo" })).toBe("/noticias/demo");
  });
});
