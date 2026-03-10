import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { PersonListSection } from "@/components/party/PersonListSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getOrganizationUnits } from "@/lib/strapi";
import type { OrganizationUnit } from "@/types/strapi";

const SECTIONS = ["dmk-leadership", "district-secretaries", "committee-members"] as const;

const mockDistrictSecretaries = [
  { id: "1", name: "District Secretary A", designation: "District Secretary", district: "District North" },
  { id: "2", name: "District Secretary B", designation: "District Incharge", district: "District South" },
  { id: "3", name: "District Secretary C", designation: "District Secretary", district: "District East" },
];

const mockLeadership = [
  {
    id: "1",
    name: "Leader Name",
    designation: "President",
    place: "Chennai",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: "2",
    name: "Deputy Leader",
    designation: "Vice President",
    place: "Madurai",
    image: "https://images.unsplash.com/photo-1584999734482-0361aecad844?auto=format&fit=crop&w=320&q=80",
  },
];

const placeholderUnits: OrganizationUnit[] = [
  {
    id: 9001,
    documentId: "placeholder-surandai-union",
    slug: "surandai-union",
    name_en: "Surandai Union",
    name_ta: "சுரண்டை ஒன்றியம்",
    type: "union",
  },
  {
    id: 9002,
    documentId: "placeholder-kadayanallur-union",
    slug: "kadayanallur-union",
    name_en: "Kadayanallur Union",
    name_ta: "கடையநல்லூர் ஒன்றியம்",
    type: "union",
  },
  {
    id: 9003,
    documentId: "placeholder-ayikudi-town",
    slug: "ayikudi-town",
    name_en: "Ayikudi Town",
    name_ta: "ஆய்குடி நகரம்",
    type: "town",
  },
  {
    id: 9004,
    documentId: "placeholder-sivagiri-town",
    slug: "sivagiri-town",
    name_en: "Sivagiri Town",
    name_ta: "சிவகிரி நகரம்",
    type: "town",
  },
];

export function generateStaticParams() {
  return ["en", "ta"].flatMap((locale) =>
    SECTIONS.map((section) => ({ locale, section }))
  );
}

export default async function OrganizationalSectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;

  if (!SECTIONS.includes(section as (typeof SECTIONS)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tOrg = await getTranslations("organizationals");
  const organizationUnits =
    section === "committee-members"
      ? await getOrganizationUnits(locale as "en" | "ta")
      : [];
  const unitsToRender = organizationUnits.length > 0 ? organizationUnits : placeholderUnits;

  const titleMap: Record<string, string> = {
    "dmk-leadership": t("dmkLeadership"),
    "district-secretaries": t("districtSecretaries"),
    "committee-members": t("committeeMembers"),
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: t("home"), href: "" },
            { label: t("party"), href: "/party" },
            { label: t("organizationStructure"), href: "/party/organizationals" },
            { label: titleMap[section] ?? section },
          ]}
        />

        {section === "dmk-leadership" && (
          <PersonListSection title={titleMap[section]} persons={mockLeadership} />
        )}
        {section === "district-secretaries" && (
          <PersonListSection title={titleMap[section]} persons={mockDistrictSecretaries} />
        )}
        {section === "committee-members" && (
          <div className="mt-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {titleMap[section]}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{tOrg("unitIntro")}</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unitsToRender.map((unit) => {
                const displayName =
                  locale === "ta"
                    ? unit.name_ta ?? unit.name_en ?? unit.slug
                    : unit.name_en ?? unit.name_ta ?? unit.slug;
                return (
                <Link
                  key={unit.id}
                  href={`/${locale}/party/organizationals/committee-members/${unit.slug}`}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <h2 className="font-semibold">{displayName}</h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {unit.type === "union" ? tOrg("union") : tOrg("town")}
                      </p>
                      <span className="mt-3 inline-block text-sm font-medium text-primary">
                        {tOrg("viewDetails")}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
                );
              })}
            </div>
            {organizationUnits.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">{tOrg("emptyState")}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
