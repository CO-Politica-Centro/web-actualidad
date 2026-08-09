export type PostTipo = "noticia" | "blog";
export type PostEstado = "borrador" | "publicado";

export type Post = {
  id: string;
  tipo: PostTipo;
  slug: string;
  titulo: string;
  resumen: string;
  cuerpoHtml: string;
  portadaUrl: string | null;
  portadaAlt: string;
  estado: PostEstado;
  publicadoEn: string | null;
  actualizadoEn: string;
  creadoEn: string;
  autorUid: string;
  autorNombre: string;
  tags: string[];
};

export type PostInput = {
  tipo: PostTipo;
  slug: string;
  titulo: string;
  resumen: string;
  cuerpoHtml: string;
  portadaUrl?: string | null;
  portadaAlt?: string;
  estado: PostEstado;
  tags?: string[];
};

export function tipoToPath(tipo: PostTipo): "noticias" | "blog" {
  return tipo === "noticia" ? "noticias" : "blog";
}

export function pathToTipo(segment: string): PostTipo | null {
  if (segment === "noticias") return "noticia";
  if (segment === "blog") return "blog";
  return null;
}

export function postHref(post: Pick<Post, "tipo" | "slug">): string {
  return `/${tipoToPath(post.tipo)}/${post.slug}`;
}
