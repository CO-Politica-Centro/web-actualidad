import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = (await request.json().catch(() => null)) as {
    paths?: string[];
    secret?: string;
  } | null;

  if (secret) {
    const headerSecret = request.headers.get("x-revalidate-secret");
    if (body?.secret !== secret && headerSecret !== secret) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const paths =
    body?.paths?.filter((p) => typeof p === "string" && p.startsWith("/")) ??
    [];
  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath("/");
  revalidatePath("/noticias");
  revalidatePath("/blog");

  return NextResponse.json({ ok: true, revalidated: paths });
}
