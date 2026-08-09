import { site } from "@/content/site";
import type { OrganizationOverview } from "./types";

export const organizationOverview: OrganizationOverview = {
  title: "Plan de organización",
  tagline: "Así avanza CO Política Centro",
  intro: [
    "Pasar de una comunidad digital a un movimiento serio —y, más adelante, a un partido con personería— exige etapas claras. Este plan describe el camino interno del movimiento: qué hacemos ahora, qué viene después y qué todavía no somos.",
    "Discord, WhatsApp y roles regionales ayudan, pero no bastan. La madurez se mide con territorio real, reglas compartidas, capacidad electoral y, solo al final, reconocimiento ante el Consejo Nacional Electoral.",
  ],
  currentBanner:
    "Hoy: Fase 0 — validando que el liderazgo regional no sea solo simbólico.",
  disclaimer: `${site.disclaimer} Este plan es un documento organizativo y educativo del movimiento. No constituye asesoría jurídica electoral, inscripción ante el CNE ni anuncio de candidaturas.`,
  pathSummary:
    "Comunidad digital → diagnóstico → movimiento real → vía electoral → territorio y prueba en urnas → requisitos de personería → partido formal → sostenimiento.",
};
