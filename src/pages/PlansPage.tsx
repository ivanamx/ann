import { plansContent } from "../content/plans/plans";
import { PlansDocument } from "../components/PlansDocument";
import { PlansLayout } from "../components/PlansLayout";
import { useLocale } from "../i18n/LocaleContext";

export function PlansPage() {
  const { locale, t } = useLocale();
  const doc = plansContent[locale];

  return (
    <PlansLayout metaTitle={t.plans.metaTitle} metaDescription={t.plans.metaDescription}>
      <PlansDocument doc={doc} locale={locale} labels={t.plans.labels} />
    </PlansLayout>
  );
}
