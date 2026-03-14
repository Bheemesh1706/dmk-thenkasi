import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent } from "@/components/ui/card";
import {
  getUnionAndTownMemberByKey,
  getUnionItemByTypeAndId,
  toStrapiMediaUrl,
} from "@/lib/strapi";
import { getServerRegion } from "@/lib/region.server";

export default async function UnitGalleryPage({
  params,
}: {
  params: Promise<{
    locale: string;
    section: string;
    unit: string;
    type: string;
    id: string;
  }>;
}) {
  const { locale, section, unit, type, id } = await params;
  const strapiLocale = locale as "en" | "ta";
  const region = await getServerRegion();

  if (section !== "committee-members") {
    notFound();
  }

  const selectedType: "events" | "achievements" =
    type === "achievements" ? "achievements" : type === "events" ? "events" : notFound();

  const member = await getUnionAndTownMemberByKey(strapiLocale, unit, region);
  if (!member) {
    notFound();
  }

  const item = await getUnionItemByTypeAndId(member.name, selectedType, id, strapiLocale);
  if (!item) {
    notFound();
  }

  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tOrg = await getTranslations("organizationals");
  const photos = item.photos ?? [];

  return (
    <main>
      <SectionContainer>
        <Breadcrumb
          locale={locale}
          items={[
            { label: tNav("home"), href: "" },
            { label: tNav("party"), href: "/party" },
            { label: tNav("organizationStructure"), href: "/party/organizationals" },
            { label: tNav("committeeMembers"), href: "/party/organizationals/committee-members" },
            { label: member.name, href: `/party/organizationals/committee-members/${unit}?view=${selectedType}` },
            { label: item.title ?? (selectedType === "events" ? tOrg("events") : tOrg("achievements")) },
          ]}
        />

        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {item.title ?? (selectedType === "events" ? tOrg("events") : tOrg("achievements"))}
          </h1>
          <Link
            href={`/${locale}/party/organizationals/committee-members/${unit}?view=${selectedType}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Back
          </Link>
        </div>

        {item.description && (
          <Card>
            <CardContent className="pt-5 text-sm text-muted-foreground">
              {item.description}
            </CardContent>
          </Card>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => {
            const photoUrl = toStrapiMediaUrl(photo.formats?.medium?.url ?? photo.url);
            if (!photoUrl) return null;
            return (
              <Card key={photo.id} className="overflow-hidden">
                <Image
                  src={photoUrl}
                  alt={photo.alternativeText ?? item.title ?? "Gallery image"}
                  width={640}
                  height={400}
                  className="h-56 w-full object-cover"
                />
              </Card>
            );
          })}
        </div>

        {photos.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">No images available.</p>
        )}
      </SectionContainer>
    </main>
  );
}
