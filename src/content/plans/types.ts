export type PlanTier = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  minimumMonths: number;
  recommended?: boolean;
  features: string[];
};

export type FrontendOnlyOption = {
  title: string;
  tagline: string;
  price: number;
  description: string;
  includes: string[];
  excludes: string[];
};

export type PlansContent = {
  title: string;
  subtitle: string;
  date: string;
  intro: string;
  frontendOnly: FrontendOnlyOption;
  tiersLabel: string;
  tiers: PlanTier[];
  notIncluded: { title: string; items: string[] };
  terms: { title: string; items: string[] };
  footerNote: string;
};

export type PlansLocaleContent = {
  en: PlansContent;
  es: PlansContent;
};
