"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { isCurrentUserAdmin } from "@/features/posts/queries-client";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";

const ROLE_ALERT =
  "Crear una cuenta no otorga acceso al panel. Antes de poder iniciar sesión y publicar, un programador debe asignarte un rol creando el documento Firestore admins/{uid}.";

const PENDING_ROLE_MESSAGE =
  "Tu cuenta está autenticada, pero aún no tiene rol de administrador. Pide al programador que cree admins/{uid} con tu UID. Hasta entonces no puedes entrar al panel ni publicar.";

type AuthMode = "entrar" | "crear";

function firebaseErrorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) return fallback;
  const code = "code" in err && typeof err.code === "string" ? err.code : "";
  switch (code) {
    case "auth/email-already-in-use":
      return "Ese correo ya tiene una cuenta. Usa Entrar o Continuar con Google.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/invalid-email":
      return "El correo no es válido.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Correo o contraseña incorrectos.";
    case "auth/popup-closed-by-user":
      return "Se cerró la ventana de Google. Intenta de nuevo.";
    case "auth/popup-blocked":
      return "El navegador bloqueó la ventana de Google. Permite ventanas emergentes.";
    default:
      return err.message || fallback;
  }
}

function LoginFormInner() {
  const {
    user,
    loading,
    configured,
    signInEmail,
    signUpEmail,
    signInGoogle,
    logout,
  } = useFirebaseAuth();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [adminReady, setAdminReady] = useState(false);
  const [pendingRole, setPendingRole] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const forbidden = searchParams.get("error") === "forbidden";

  useEffect(() => {
    if (loading) return;
    if (!user) {
      queueMicrotask(() => {
        setAdminReady(false);
        setPendingRole(forbidden);
        setRoleChecked(true);
      });
      return;
    }
    let cancelled = false;
    queueMicrotask(() => setRoleChecked(false));
    void isCurrentUserAdmin().then((ok) => {
      if (cancelled) return;
      if (ok) {
        setAdminReady(true);
        setPendingRole(false);
        setError(null);
      } else {
        setAdminReady(false);
        setPendingRole(true);
        setError(null);
      }
      setRoleChecked(true);
    });
    return () => {
      cancelled = true;
    };
  }, [user, loading, forbidden]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "crear") {
        if (password !== passwordConfirm) {
          setError("Las contraseñas no coinciden.");
          return;
        }
        await signUpEmail(email, password);
      } else {
        await signInEmail(email, password);
      }
    } catch (err) {
      setError(
        firebaseErrorMessage(
          err,
          mode === "crear"
            ? "No se pudo crear la cuenta"
            : "No se pudo iniciar sesión",
        ),
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
        firebaseErrorMessage(err, "No se pudo iniciar sesión con Google"),
      );
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    setBusy(true);
    setError(null);
    try {
      await logout();
      setPendingRole(false);
      setPassword("");
      setPasswordConfirm("");
    } catch (err) {
      setError(firebaseErrorMessage(err, "No se pudo cerrar sesión"));
    } finally {
      setBusy(false);
    }
  }

  async function copyUid() {
    if (!user?.uid) return;
    try {
      await navigator.clipboard.writeText(user.uid);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("No se pudo copiar el UID. Selecciónalo manualmente.");
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

  if (adminReady) {
    redirect("/admin");
  }

  if (loading || (user && !roleChecked)) {
    return (
      <div className="panel max-w-md">
        <p className="text-muted">Comprobando acceso…</p>
      </div>
    );
  }

  if (pendingRole && user) {
    return (
      <div className="panel max-w-md">
        <h1 className="font-display text-2xl font-semibold">Rol pendiente</h1>
        <p
          className="mt-3 rounded-md border border-amber-600/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100"
          role="status"
        >
          {PENDING_ROLE_MESSAGE}
        </p>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted font-medium">Correo</dt>
            <dd className="mt-1 break-all">{user.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-muted font-medium">UID</dt>
            <dd className="mt-1 font-mono text-xs break-all">{user.uid}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void copyUid()}
            className="border-border-strong inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md border-2 px-5 font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copied ? "UID copiado" : "Copiar UID"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void onLogout()}
            className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md px-5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cerrar sesión
          </button>
        </div>
        {error ? (
          <p
            className="mt-3 text-sm text-red-700 dark:text-red-300"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="panel max-w-md">
      <h1 className="font-display text-2xl font-semibold">
        {mode === "crear" ? "Crear cuenta" : "Entrar al panel"}
      </h1>

      <p
        className="mt-3 rounded-md border border-amber-600/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100"
        role="status"
      >
        {ROLE_ALERT}
      </p>

      {forbidden && !user ? (
        <p className="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">
          {PENDING_ROLE_MESSAGE}
        </p>
      ) : null}

      <div className="border-border mt-5 flex gap-1 border-b">
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setMode("entrar");
            setError(null);
          }}
          className={`min-h-11 flex-1 cursor-pointer px-3 text-sm font-medium transition disabled:cursor-not-allowed ${
            mode === "entrar"
              ? "border-foreground text-foreground border-b-2"
              : "text-muted hover:text-foreground"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setMode("crear");
            setError(null);
          }}
          className={`min-h-11 flex-1 cursor-pointer px-3 text-sm font-medium transition disabled:cursor-not-allowed ${
            mode === "crear"
              ? "border-foreground text-foreground border-b-2"
              : "text-muted hover:text-foreground"
          }`}
        >
          Crear cuenta
        </button>
      </div>

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
            minLength={6}
            autoComplete={
              mode === "crear" ? "new-password" : "current-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-border bg-background min-h-11 rounded-md border px-3 text-base font-normal"
          />
        </label>
        {mode === "crear" ? (
          <label className="flex flex-col gap-2 text-sm font-medium">
            Confirmar contraseña
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border-border bg-background min-h-11 rounded-md border px-3 text-base font-normal"
            />
          </label>
        ) : null}
        {error ? (
          <p className="text-sm text-red-700 dark:text-red-300" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={busy || loading}
          className="bg-foreground text-background hover:bg-brand-green inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy
            ? mode === "crear"
              ? "Creando…"
              : "Entrando…"
            : mode === "crear"
              ? "Crear cuenta"
              : "Entrar"}
        </button>
      </form>

      <button
        type="button"
        disabled={busy || loading}
        onClick={() => void onGoogle()}
        className="border-border-strong mt-3 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md border-2 px-5 font-medium disabled:cursor-not-allowed disabled:opacity-60"
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
