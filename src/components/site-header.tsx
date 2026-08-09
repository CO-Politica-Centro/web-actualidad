"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { LinkUnderline } from "@/components/link-underline";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hideChrome = pathname.startsWith("/admin");

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  if (hideChrome) return null;

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-chrome border-border sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-6 py-3.5">
        <Link
          href="/"
          aria-label={site.shortName}
          className="min-h-11 shrink-0"
          onClick={closeMenu}
        >
          <BrandMark
            name={site.shortName}
            size={36}
            priority
            nameClassName="hidden text-base font-semibold sm:inline md:text-lg"
          />
        </Link>

        <nav
          aria-label="Principal"
          className="text-muted hidden items-center gap-x-5 text-base md:flex"
        >
          {site.nav.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group inline-flex min-h-11 items-center transition-colors",
                  active
                    ? "text-foreground font-semibold"
                    : "hover:text-foreground",
                )}
              >
                <LinkUnderline>{link.label}</LinkUnderline>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "bg-foreground block h-0.5 w-5 transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "bg-foreground block h-0.5 w-5 transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "bg-foreground block h-0.5 w-5 transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        id={menuId}
        hidden={!open}
        className="border-border bg-surface/95 border-t px-6 py-4 md:hidden"
      >
        <nav aria-label="Principal móvil" className="flex flex-col gap-1">
          {site.nav.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-2 text-base transition-colors",
                  active
                    ? "text-foreground font-semibold"
                    : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
