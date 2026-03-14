import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { FrontalCard } from "@/components/party/FrontalCard";
import { getPartyWings } from "@/lib/strapi";

export default async function FrontalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const wings = await getPartyWings();

  return (
    <main>
      <SectionContainer>
        <Breadcrumb
          locale={locale}
          items={[
            { label: t("home"), href: "" },
            { label: t("party"), href: "/party" },
            { label: t("frontals") },
          ]}
        />
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("frontals")}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wings.map((wing) => (
            <FrontalCard
              key={wing.documentId}
              name={wing.wingName}
              description={`${wing.wing_memebers?.length ?? 0} members`}
              link={`/${locale}/party/frontals/${wing.documentId}`}
            />
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
