"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getFirebaseAuth,
  getFirebaseDb,
  getFirebaseStorage,
} from "@/lib/firebase/client";
import { mapPostDoc } from "@/features/posts/map-post";
import { sanitizePostHtml } from "@/features/posts/sanitize";
import { isValidSlug } from "@/features/posts/slug";
import type {
  Post,
  PostEstado,
  PostInput,
  PostTipo,
} from "@/features/posts/types";

function requireDb() {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase no configurado");
  return db;
}

function requireAuthUid() {
  const auth = getFirebaseAuth();
  const uid = auth?.currentUser?.uid;
  if (!uid) throw new Error("Debes iniciar sesión");
  return {
    uid,
    name: auth.currentUser?.displayName || auth.currentUser?.email || "Admin",
  };
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const auth = getFirebaseAuth();
  const uid = auth?.currentUser?.uid;
  if (!uid) return false;
  const db = getFirebaseDb();
  if (!db) return false;
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists();
}

export async function listAdminPosts(filters?: {
  tipo?: PostTipo | "todos";
  estado?: PostEstado | "todos";
}): Promise<Post[]> {
  const db = requireDb();
  const constraints = [];

  if (filters?.tipo && filters.tipo !== "todos") {
    constraints.push(where("tipo", "==", filters.tipo));
  }
  if (filters?.estado && filters.estado !== "todos") {
    constraints.push(where("estado", "==", filters.estado));
  }

  constraints.push(orderBy("actualizadoEn", "desc"));

  const snap = await getDocs(query(collection(db, "posts"), ...constraints));
  return snap.docs.map((d) => mapPostDoc(d.id, d.data()));
}

export async function getAdminPost(id: string): Promise<Post | null> {
  const db = requireDb();
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return null;
  return mapPostDoc(snap.id, snap.data());
}

export async function slugExists(
  tipo: PostTipo,
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const db = requireDb();
  const snap = await getDocs(
    query(
      collection(db, "posts"),
      where("tipo", "==", tipo),
      where("slug", "==", slug),
    ),
  );
  return snap.docs.some((d) => d.id !== excludeId);
}

export async function createPost(input: PostInput): Promise<string> {
  if (!isValidSlug(input.slug)) {
    throw new Error("Slug inválido");
  }
  if (await slugExists(input.tipo, input.slug)) {
    throw new Error("Ya existe un post con ese slug en esta sección");
  }

  const db = requireDb();
  const { uid, name } = requireAuthUid();
  const now = serverTimestamp();
  const publicadoEn = input.estado === "publicado" ? serverTimestamp() : null;

  const refDoc = await addDoc(collection(db, "posts"), {
    tipo: input.tipo,
    slug: input.slug,
    titulo: input.titulo.trim(),
    resumen: input.resumen.trim(),
    cuerpoHtml: sanitizePostHtml(input.cuerpoHtml),
    portadaUrl: input.portadaUrl ?? null,
    portadaAlt: (input.portadaAlt ?? "").trim(),
    estado: input.estado,
    publicadoEn,
    actualizadoEn: now,
    creadoEn: now,
    autorUid: uid,
    autorNombre: name,
    tags: input.tags ?? [],
  });

  return refDoc.id;
}

export async function updatePost(
  id: string,
  input: PostInput,
  previous?: Post | null,
): Promise<void> {
  if (!isValidSlug(input.slug)) {
    throw new Error("Slug inválido");
  }
  if (await slugExists(input.tipo, input.slug, id)) {
    throw new Error("Ya existe un post con ese slug en esta sección");
  }

  const db = requireDb();
  const existing = previous ?? (await getAdminPost(id));
  if (!existing) throw new Error("Post no encontrado");

  const patch: Record<string, unknown> = {
    tipo: input.tipo,
    slug: input.slug,
    titulo: input.titulo.trim(),
    resumen: input.resumen.trim(),
    cuerpoHtml: sanitizePostHtml(input.cuerpoHtml),
    portadaUrl: input.portadaUrl ?? null,
    portadaAlt: (input.portadaAlt ?? "").trim(),
    estado: input.estado,
    actualizadoEn: serverTimestamp(),
    tags: input.tags ?? [],
  };

  if (input.estado === "publicado" && existing.estado !== "publicado") {
    patch.publicadoEn = serverTimestamp();
  }

  await updateDoc(doc(db, "posts", id), patch);
}

export async function deletePost(id: string): Promise<void> {
  const db = requireDb();
  await deleteDoc(doc(db, "posts", id));
}

export async function uploadCoverImage(
  file: File,
  postId: string,
): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Storage no configurado");
  const { uid } = requireAuthUid();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `covers/${uid}/${postId || "draft"}-${Date.now()}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

export async function requestRevalidate(paths: string[]) {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    });
  } catch {
    // Non-blocking: public pages will refresh on next ISR window.
  }
}
