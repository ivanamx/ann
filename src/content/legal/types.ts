export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  subtitle: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
};

export type LegalLocaleContent = {
  en: LegalDocument;
  es: LegalDocument;
};
