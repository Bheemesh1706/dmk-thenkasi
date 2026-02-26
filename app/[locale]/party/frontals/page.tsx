import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { FrontalCard } from "@/components/party/FrontalCard";

const mockFrontals = [
  { name: "Youth Wing", description: "Youth organization" },
  { name: "Women's Wing", description: "Women's organization" },
  { name: "Students Wing", description: "Student organization" },
];

export default async function FrontalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

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
          {mockFrontals.map((frontal) => (
            <FrontalCard
              key={frontal.name}
              name={frontal.name}
              description={frontal.description}
            />
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
