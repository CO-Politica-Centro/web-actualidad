"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { isCurrentUserAdmin } from "@/features/posts/queries-client";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";

const FORBIDDEN_MESSAGE =
  "Tu cuenta no está en la lista de administradores. Pide que añadan tu UID en Firestore (admins/{uid}).";

function LoginFormInner() {
  const { user, loading, configured, signInEmail, signInGoogle } =
    useFirebaseAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [adminReady, setAdminReady] = useState(false);
  const forbidden = searchParams.get("error") === "forbidden";
  const displayError = error ?? (forbidden ? FORBIDDEN_MESSAGE : null);

  useEffect(() => {
    if (loading || !user) {
      queueMicrotask(() => setAdminReady(false));
      return;
    }
    let cancelled = false;
    void isCurrentUserAdmin().then((ok) => {
      if (cancelled) return;
      if (ok) setAdminReady(true);
      else
        setError(
          "Sesión iniciada, pero no eres administrador. Contacta al equipo técnico.",
        );
    });
    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signInEmail(email, password);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión",
      );
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    setError(null);
    try {
      await signInGoogle();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión",
      );
    } finally {
      setBusy(false);
    }
  }

  if (!configured) {
    return (
      <div className="panel max-w-md">
        <h1 className="font-display text-2xl font-semibold">Admin</h1>
        <p className="text-muted mt-3 text-base">
          Firebase no está configurado. Completa las variables{" "}
          <code className="text-sm">NEXT_PUBLIC_FIREBASE_*</code> en{" "}
          <code className="text-sm">.env.local</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="panel max-w-md">
      {adminReady ? redirect("/admin") : null}
      <h1 className="font-display text-2xl font-semibold">Entrar al panel</h1>
      <p className="text-muted mt-2 text-base">
        Solo cuentas listadas en <code className="text-sm">admins</code>.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Correo
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border bg-background min-h-11 rounded-md border px-3 text-base font-normal"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Contraseña
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-border bg-background min-h-11 rounded-md border px-3 text-base font-normal"
          />
        </label>
        {displayError ? (
          <p className="text-sm text-red-700 dark:text-red-300" role="alert">
            {displayError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={busy}
          className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 items-center justify-center rounded-md px-5 font-semibold transition disabled:opacity-60"
        >
          {busy ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <button
        type="button"
        disabled={busy}
        onClick={() => void onGoogle()}
        className="border-border-strong mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border-2 px-5 font-medium disabled:opacity-60"
      >
        Continuar con Google
      </button>
    </div>
  );
}

export function AdminLoginForm() {
  return (
    <Suspense fallback={<div className="text-muted">Cargando…</div>}>
      <LoginFormInner />
    </Suspense>
  );
}
