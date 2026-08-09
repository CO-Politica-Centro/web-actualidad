"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";
import { isCurrentUserAdmin } from "@/features/posts/queries-client";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading, configured, logout } = useFirebaseAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [adminOk, setAdminOk] = useState<boolean | null>(null);
  const isLogin = pathname === "/admin/entrar";

  useEffect(() => {
    if (loading) return;

    if (!configured) {
      queueMicrotask(() => setAdminOk(false));
      return;
    }

    if (isLogin) {
      queueMicrotask(() => setAdminOk(true));
      return;
    }

    if (!user) {
      router.replace("/admin/entrar");
      return;
    }

    let cancelled = false;
    void isCurrentUserAdmin().then((ok) => {
      if (cancelled) return;
      setAdminOk(ok);
      if (!ok) router.replace("/admin/entrar?error=forbidden");
    });

    return () => {
      cancelled = true;
    };
  }, [user, loading, configured, isLogin, router]);

  if (!isLogin && (loading || adminOk === null)) {
    return (
      <div className="bg-background text-muted flex min-h-screen items-center justify-center">
        Cargando panel…
      </div>
    );
  }

  if (!isLogin && adminOk === false) {
    return null;
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border bg-surface/90 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3">
          <Link href="/admin" className="min-h-11">
            <BrandMark name={`${site.shortName} · Admin`} size={32} />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-muted hover:text-foreground hidden min-h-11 items-center text-sm sm:inline-flex"
            >
              Ver sitio
            </Link>
            <ThemeToggle />
            {user ? (
              <button
                type="button"
                onClick={() =>
                  void logout().then(() => router.push("/admin/entrar"))
                }
                className="border-border-strong hover:bg-foreground/5 inline-flex min-h-11 items-center rounded-md border px-3 text-sm font-medium"
              >
                Salir
              </button>
            ) : null}
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
