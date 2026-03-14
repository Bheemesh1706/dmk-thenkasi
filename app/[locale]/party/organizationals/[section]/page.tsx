import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { PersonListSection } from "@/components/party/PersonListSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getLeaderships,
  getUnionAndTownMembers,
  toLowerCamelCase,
  toStrapiMediaUrl,
} from "@/lib/strapi";
import { getServerRegion } from "@/lib/region.server";

const SECTIONS = ["dmk-leadership", "district-secretaries", "committee-members"] as const;

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
  const strapiLocale = locale as "en" | "ta";
  const region = await getServerRegion();
  const t = await getTranslations("nav");
  const tOrg = await getTranslations("organizationals");

  const leaderships =
    section === "dmk-leadership"
      ? await getLeaderships(strapiLocale)
      : [];
  const unionAndTownMembers =
    section === "committee-members"
      ? await getUnionAndTownMembers(strapiLocale, region)
      : [];

  const leadershipPersons = leaderships.map((leader) => ({
    id: String(leader.id),
    name: leader.name,
    designation: leader.designation,
    image: toStrapiMediaUrl(
      leader.image?.formats?.small?.url ?? leader.image?.url
    ),
  }));

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
          <PersonListSection title={titleMap[section]} persons={leadershipPersons} />
        )}
        {section === "district-secretaries" && (
          <PersonListSection title={titleMap[section]} persons={[]} />
        )}
        {section === "committee-members" && (
          <div className="mt-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {titleMap[section]}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{tOrg("unitIntro")}</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unionAndTownMembers.map((unit) => {
                const displayName = unit.name;
                const routeKey = toLowerCamelCase(unit.name);
                return (
                <Link
                  key={unit.id}
                  href={`/${locale}/party/organizationals/committee-members/${routeKey}`}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <h2 className="font-semibold">{displayName}</h2>
                    </CardHeader>
                    <CardContent>
                      {unit.representative && (
                        <p className="text-sm text-foreground/80">{unit.representative}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {(unit.type ?? "").toLowerCase() === "union"
                          ? tOrg("union")
                          : tOrg("town")}
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
            {unionAndTownMembers.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">{tOrg("emptyState")}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
