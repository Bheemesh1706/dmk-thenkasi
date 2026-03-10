import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breadcrumb } from "@/components/party/Breadcrumb";

export default async function IdeologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ideology");
  const tNav = await getTranslations("nav");

  return (
    <main>
      <SectionContainer>
        <Breadcrumb
          locale={locale}
          items={[
            { label: tNav("home"), href: "" },
            { label: tNav("party"), href: "/party" },
            { label: tNav("ideology") },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          {t("title")}
        </h1>

        <div className="max-w-4xl">
          {/* Party Objective Section */}
          <section className="mb-12">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <h2 className="text-2xl font-bold text-primary">{t("objective")}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-black/80">
                  {t("objectiveDesc")}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Core Principle Section */}
          <section>
            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30">
              <CardHeader>
                <h2 className="text-2xl font-bold">{t("corePrinciple")}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-black/80">
                  {t("corePrincipleDesc")}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </SectionContainer>
    </main>
  );
}
