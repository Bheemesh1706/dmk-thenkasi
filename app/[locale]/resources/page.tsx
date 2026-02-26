import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const resources = [
    { key: "events", href: `/${locale}/resources/events` },
    { key: "media", href: `/${locale}/resources/media` },
    { key: "gallery", href: `/${locale}/resources/gallery` },
  ];

  return (
    <main>
      <SectionContainer>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("resources")}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(({ key, href }) => (
            <Link key={key} href={href}>
              <Card className="h-full">
                <CardHeader>
                  <h2 className="font-semibold">{t(key)}</h2>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-black/80 group-hover:text-black">{tCommon("view")}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
