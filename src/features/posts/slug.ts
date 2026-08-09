const SEPARATORS = /[\s_]+/g;
const NON_SLUG = /[^a-z0-9-]/g;
const MULTI_DASH = /-+/g;

/**
 * Normaliza un título o texto libre a un slug URL-safe en español básico.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(SEPARATORS, "-")
    .replace(NON_SLUG, "")
    .replace(MULTI_DASH, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 120;
}
