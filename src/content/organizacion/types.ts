export type PhaseStatus = "done" | "current" | "upcoming";

export type Phase = {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  objective: string;
  summary: string;
  actions: string[];
  checklist: string[];
  exitCriteria: string[];
  antiPatterns: string[];
  status: PhaseStatus;
  /** Extra notice for legal/sensitive phases */
  legalNote?: string;
};

export type OrganizationOverview = {
  title: string;
  tagline: string;
  intro: string[];
  currentBanner: string;
  disclaimer: string;
  pathSummary: string;
};
