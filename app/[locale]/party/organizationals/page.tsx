import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breadcrumb } from "@/components/party/Breadcrumb";

export default async function OrganizationalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const sections = [
    { key: "dmkLeadership", href: "dmk-leadership" },
    { key: "districtSecretaries", href: "district-secretaries" },
    { key: "committeeMembers", href: "committee-members" },
  ];

  return (
    <main>
      <SectionContainer>
        <Breadcrumb
          locale={locale}
          items={[
            { label: t("home"), href: "" },
            { label: t("party"), href: "/party" },
            { label: t("organizationStructure") },
          ]}
        />
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("organizationStructure")}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ key, href }) => (
            <Link key={key} href={`/${locale}/party/organizationals/${href}`}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <h2 className="font-semibold">{t(key)}</h2>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-muted-foreground hover:text-primary">
                    View →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
