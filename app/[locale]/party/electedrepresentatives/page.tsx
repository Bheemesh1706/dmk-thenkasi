import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { PersonListSection } from "@/components/party/PersonListSection";
import { getElectedRepresentatives, toStrapiMediaUrl } from "@/lib/strapi";

export default async function ElectedRepresentativesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const reps = await getElectedRepresentatives(locale as "en" | "ta");
  const persons = reps.map((r) => ({
    id: String(r.id),
    name: r.name,
    designation: r.designation,
    constituency: r.constituency,
    image: toStrapiMediaUrl(r.image?.formats?.small?.url ?? r.image?.url),
  }));

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
          persons={persons}
        />
      </div>
    </main>
  );
}
