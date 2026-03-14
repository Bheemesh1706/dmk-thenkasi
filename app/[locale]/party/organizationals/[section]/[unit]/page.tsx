import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getUnionAndTownMemberByKey,
  getUnionItemsByType,
  toStrapiMediaUrl,
} from "@/lib/strapi";

const fallbackMembers = [
  {
    key: "surandaiUnion",
    name: "Surandai Union",
    representative: "Representative",
    type: "union",
    bio: "",
  },
  {
    key: "kadayanallurUnion",
    name: "Kadayanallur Union",
    representative: "Representative",
    type: "union",
    bio: "",
  },
  {
    key: "ayikudiTown",
    name: "Ayikudi Town",
    representative: "Representative",
    type: "town",
    bio: "",
  },
  {
    key: "sivagiriTown",
    name: "Sivagiri Town",
    representative: "Representative",
    type: "town",
    bio: "",
  },
];

export default async function UnitDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; section: string; unit: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { locale, section, unit } = await params;
  const { view } = await searchParams;

  if (section !== "committee-members") {
    notFound();
  }

  const memberFromCms = await getUnionAndTownMemberByKey(locale as "en" | "ta", unit);
  const fallbackMember = fallbackMembers.find((item) => item.key === unit) ?? null;
  const currentMember = memberFromCms ?? fallbackMember;

  if (!currentMember) {
    notFound();
  }

  const selectedView: "events" | "achievements" =
    view === "achievements" ? "achievements" : "events";
  const items = await getUnionItemsByType(currentMember.name, selectedView);

  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tOrg = await getTranslations("organizationals");
  const memberImage = toStrapiMediaUrl(
    "image" in currentMember
      ? currentMember.image?.formats?.small?.url ?? currentMember.image?.url
      : undefined
  );

  const itemCards = items.flatMap((item) => {
    const coverPhoto = (item.photos ?? [])[0];
    return [
      {
      key: String(item.id),
      id: String(item.id),
      title: item.title ?? (selectedView === "events" ? tOrg("events") : tOrg("achievements")),
      serviceType: item.serviceType ?? "-",
      slogans: item.slogans ?? "-",
      imageUrl: coverPhoto
        ? toStrapiMediaUrl(coverPhoto.formats?.small?.url ?? coverPhoto.url)
        : undefined,
      imageAlt: coverPhoto?.alternativeText ?? item.title ?? "",
    }
    ];
  });

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
            { label: currentMember.name },
          ]}
        />

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{currentMember.name}</h1>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">{tOrg("representatives")}</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                {memberImage && (
                  <Image
                    src={memberImage}
                    alt={currentMember.name}
                    width={56}
                    height={70}
                    className="h-[70px] w-[56px] rounded object-cover"
                  />
                )}
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {currentMember.representative ?? currentMember.name}
                  </p>
                  <p>{currentMember.type}</p>
                  {currentMember.bio && <p className="mt-2">{currentMember.bio}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href={`/${locale}/party/organizationals/committee-members/${unit}?view=events`}>
                <Card
                  className={
                    selectedView === "events"
                      ? "border-primary ring-1 ring-primary"
                      : "hover:border-primary/40"
                  }
                >
                  <CardHeader>
                    <h2 className="text-lg font-semibold">{tOrg("events")}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Click to load events</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href={`/${locale}/party/organizationals/committee-members/${unit}?view=achievements`}>
                <Card
                  className={
                    selectedView === "achievements"
                      ? "border-primary ring-1 ring-primary"
                      : "hover:border-primary/40"
                  }
                >
                  <CardHeader>
                    <h2 className="text-lg font-semibold">{tOrg("achievements")}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Click to load achievements</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {itemCards.map((card) => (
                <Link
                  key={card.key}
                  href={`/${locale}/party/organizationals/committee-members/${unit}/gallery/${selectedView}/${card.id}`}
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-md">
                    <CardHeader className="pb-2">
                      <h3 className="line-clamp-2 text-base font-semibold">{card.title}</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {card.imageUrl ? (
                        <Image
                          src={card.imageUrl}
                          alt={card.imageAlt || card.title}
                          width={320}
                          height={200}
                          className="h-40 w-full rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-40 w-full items-center justify-center rounded bg-muted text-sm text-muted-foreground">
                          No image
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedView === "events" ? tOrg("noEvents") : tOrg("noAchievements")}
              </p>
            )}
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
