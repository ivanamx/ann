import { privacyPolicy } from "../content/legal/privacy";
import { LegalDocument } from "../components/LegalDocument";
import { LegalLayout } from "../components/LegalLayout";
import { useLocale } from "../i18n/LocaleContext";

export function PrivacyPage() {
  const { locale, t } = useLocale();
  const doc = privacyPolicy[locale];

  return (
    <LegalLayout metaTitle={t.legal.privacy.metaTitle} metaDescription={t.legal.privacy.metaDescription}>
      <LegalDocument doc={doc} tocLabel={t.legal.toc} />
    </LegalLayout>
  );
}
