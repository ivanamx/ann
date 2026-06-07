import { termsOfService } from "../content/legal/terms";
import { LegalDocument } from "../components/LegalDocument";
import { LegalLayout } from "../components/LegalLayout";
import { useLocale } from "../i18n/LocaleContext";

export function TermsPage() {
  const { locale, t } = useLocale();
  const doc = termsOfService[locale];

  return (
    <LegalLayout metaTitle={t.legal.terms.metaTitle} metaDescription={t.legal.terms.metaDescription}>
      <LegalDocument doc={doc} tocLabel={t.legal.toc} />
    </LegalLayout>
  );
}
