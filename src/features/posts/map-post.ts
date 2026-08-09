import type { DocumentData, Timestamp } from "firebase/firestore";
import type { Post, PostEstado, PostTipo } from "@/features/posts/types";

function toIso(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as Timestamp).toDate === "function"
  ) {
    return (value as Timestamp).toDate().toISOString();
  }
  return null;
}

export function mapPostDoc(id: string, data: DocumentData): Post {
  const tipo = data.tipo === "blog" ? "blog" : "noticia";
  const estado: PostEstado =
    data.estado === "publicado" ? "publicado" : "borrador";

  return {
    id,
    tipo: tipo as PostTipo,
    slug: String(data.slug ?? ""),
    titulo: String(data.titulo ?? ""),
    resumen: String(data.resumen ?? ""),
    cuerpoHtml: String(data.cuerpoHtml ?? ""),
    portadaUrl:
      typeof data.portadaUrl === "string" && data.portadaUrl.length > 0
        ? data.portadaUrl
        : null,
    portadaAlt: String(data.portadaAlt ?? ""),
    estado,
    publicadoEn: toIso(data.publicadoEn),
    actualizadoEn: toIso(data.actualizadoEn) ?? new Date(0).toISOString(),
    creadoEn: toIso(data.creadoEn) ?? new Date(0).toISOString(),
    autorUid: String(data.autorUid ?? ""),
    autorNombre: String(data.autorNombre ?? ""),
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
  };
}
