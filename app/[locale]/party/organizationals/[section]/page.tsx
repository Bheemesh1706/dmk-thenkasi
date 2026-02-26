import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { PersonListSection } from "@/components/party/PersonListSection";
import { CommitteeSection } from "@/components/party/CommitteeSection";

const SECTIONS = ["dmk-leadership", "district-secretaries", "committee-members"] as const;

const mockDistrictSecretaries = [
  { id: "1", name: "District Secretary A", designation: "District Secretary", district: "District North" },
  { id: "2", name: "District Secretary B", designation: "District Incharge", district: "District South" },
  { id: "3", name: "District Secretary C", designation: "District Secretary", district: "District East" },
];

const mockLeadership = [
  { id: "1", name: "Leader Name", designation: "President" },
  { id: "2", name: "Deputy Leader", designation: "Vice President" },
];

const mockCommittees = [
  {
    name: "Committee A",
    members: [
      { name: "Member 1", role: "President" },
      { name: "Member 2", role: "Secretary" },
    ],
  },
  {
    name: "Committee B",
    members: [
      { name: "Member 3", role: "President" },
      { name: "Member 4", role: "Vice President" },
    ],
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
            <div className="mt-8">
              {mockCommittees.map((committee) => (
                <CommitteeSection
                  key={committee.name}
                  name={committee.name}
                  members={committee.members}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
