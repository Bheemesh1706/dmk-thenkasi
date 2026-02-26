import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { PersonListSection } from "@/components/party/PersonListSection";

const mockRepresentatives = [
  { id: "1", name: "Representative A", constituency: "Constituency 1", designation: "MLA" },
  { id: "2", name: "Representative B", constituency: "Constituency 2", designation: "MP" },
  { id: "3", name: "Representative C", constituency: "Constituency 3", designation: "MLA" },
];

export default async function ElectedRepresentativesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: t("home"), href: "" },
            { label: t("party"), href: "/party" },
            { label: t("electedRepresentatives") },
          ]}
        />
        <PersonListSection
          title={t("electedRepresentatives")}
          persons={mockRepresentatives.map((r) => ({
            ...r,
            designation: r.designation,
            constituency: `${r.constituency} (${r.designation})`,
          }))}
        />
      </div>
    </main>
  );
}
