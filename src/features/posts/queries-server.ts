import "server-only";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type QueryConstraint,
} from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import { mapPostDoc } from "@/features/posts/map-post";
import type { Post, PostTipo } from "@/features/posts/types";

type ListOptions = {
  tipo?: PostTipo;
  limitCount?: number;
};

export async function listPublishedPosts(
  options: ListOptions = {},
): Promise<Post[]> {
  if (!isFirebaseConfigured()) return [];

  try {
    const db = getFirebaseDb();
    if (!db) return [];

    const constraints: QueryConstraint[] = [where("estado", "==", "publicado")];
    if (options.tipo) {
      constraints.push(where("tipo", "==", options.tipo));
    }
    constraints.push(orderBy("publicadoEn", "desc"));
    if (options.limitCount) {
      constraints.push(limit(options.limitCount));
    }

    const snap = await getDocs(query(collection(db, "posts"), ...constraints));
    return snap.docs.map((doc) => mapPostDoc(doc.id, doc.data()));
  } catch (error) {
    console.error("listPublishedPosts failed", error);
    return [];
  }
}

export async function getPublishedPostBySlug(
  tipo: PostTipo,
  slug: string,
): Promise<Post | null> {
  if (!isFirebaseConfigured()) return null;

  try {
    const db = getFirebaseDb();
    if (!db) return null;
    const snap = await getDocs(
      query(
        collection(db, "posts"),
        where("tipo", "==", tipo),
        where("slug", "==", slug),
        where("estado", "==", "publicado"),
        limit(1),
      ),
    );
    const doc = snap.docs[0];
    return doc ? mapPostDoc(doc.id, doc.data()) : null;
  } catch (error) {
    console.error("getPublishedPostBySlug failed", error);
    return null;
  }
}

export async function listAllPublishedForSitemap(): Promise<Post[]> {
  return listPublishedPosts({ limitCount: 500 });
}
