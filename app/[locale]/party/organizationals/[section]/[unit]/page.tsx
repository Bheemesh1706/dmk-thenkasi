import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getOrganizationUnitBySlug, toStrapiMediaUrl } from "@/lib/strapi";
import type { OrganizationUnit } from "@/types/strapi";

const placeholderUnits: OrganizationUnit[] = [
  {
    id: 9001,
    documentId: "placeholder-surandai-union",
    slug: "surandai-union",
    name_en: "Surandai Union",
    name_ta: "சுரண்டை ஒன்றியம்",
    type: "union",
    representatives: [
      {
        id: 1,
        name: "R. Kumar",
        designation: "Union Secretary",
        place: "Surandai",
        image: {
          id: 1,
          url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        },
      },
    ],
    events: [
      {
        id: 1,
        title_en: "Public Outreach Camp",
        title_ta: "பொது தொடர்பு முகாம்",
        description_en: "A placeholder event for Surandai Union.",
        description_ta: "சுரண்டை ஒன்றியத்திற்கான மாதிரி நிகழ்வு.",
        image: {
          id: 11,
          url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
        },
      },
    ],
    achievements: [
      {
        id: 1,
        title_en: "Membership Milestone",
        title_ta: "உறுப்பினர் சாதனை",
        description_en: "Placeholder achievement entry for upcoming CMS data.",
        description_ta: "வரவிருக்கும் CMS தரவுக்கான மாதிரி சாதனை பதிவு.",
        image: {
          id: 21,
          url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
        },
      },
    ],
  },
  {
    id: 9002,
    documentId: "placeholder-kadayanallur-union",
    slug: "kadayanallur-union",
    name_en: "Kadayanallur Union",
    name_ta: "கடையநல்லூர் ஒன்றியம்",
    type: "union",
    representatives: [
      {
        id: 2,
        name: "T. Selvi",
        designation: "Deputy Organizer",
        place: "Kadayanallur",
      },
    ],
    events: [
      {
        id: 2,
        title_en: "Women Wing Meet",
        title_ta: "பெண்கள் அணி கூட்டம்",
        description_en: "Placeholder event details for Kadayanallur.",
        description_ta: "கடையநல்லூர் ஒன்றியத்திற்கான மாதிரி நிகழ்வு விவரங்கள்.",
      },
    ],
    achievements: [
      {
        id: 2,
        title_en: "Social Welfare Drive",
        title_ta: "சமூக நல இயக்கம்",
        description_en: "Placeholder achievement details for Kadayanallur.",
        description_ta: "கடையநல்லூர் ஒன்றியத்திற்கான மாதிரி சாதனை விவரங்கள்.",
      },
    ],
  },
  {
    id: 9003,
    documentId: "placeholder-ayikudi-town",
    slug: "ayikudi-town",
    name_en: "Ayikudi Town",
    name_ta: "ஆய்குடி நகரம்",
    type: "town",
    representatives: [
      {
        id: 3,
        name: "V. Senthil",
        designation: "Town Secretary",
        place: "Ayikudi",
      },
    ],
    events: [
      {
        id: 3,
        title_en: "Town Public Meeting",
        title_ta: "நகர பொதுக்கூட்டம்",
        description_en: "Placeholder event for Ayikudi Town.",
        description_ta: "ஆய்குடி நகரத்திற்கான மாதிரி நிகழ்வு.",
      },
    ],
    achievements: [
      {
        id: 3,
        title_en: "Volunteer Expansion",
        title_ta: "தன்னார்வ குழு விரிவாக்கம்",
        description_en: "Placeholder achievement for Ayikudi Town.",
        description_ta: "ஆய்குடி நகரத்திற்கான மாதிரி சாதனை.",
      },
    ],
  },
  {
    id: 9004,
    documentId: "placeholder-sivagiri-town",
    slug: "sivagiri-town",
    name_en: "Sivagiri Town",
    name_ta: "சிவகிரி நகரம்",
    type: "town",
    representatives: [
      {
        id: 4,
        name: "G. Anand",
        designation: "Town Secretary",
        place: "Sivagiri",
      },
    ],
    events: [
      {
        id: 4,
        title_en: "Civic Awareness Session",
        title_ta: "பொதுமக்கள் விழிப்புணர்வு நிகழ்வு",
        description_en: "Placeholder event for Sivagiri Town.",
        description_ta: "சிவகிரி நகரத்திற்கான மாதிரி நிகழ்வு.",
      },
    ],
    achievements: [
      {
        id: 4,
        title_en: "Community Participation Growth",
        title_ta: "சமூக பங்கேற்பு வளர்ச்சி",
        description_en: "Placeholder achievement for Sivagiri Town.",
        description_ta: "சிவகிரி நகரத்திற்கான மாதிரி சாதனை.",
      },
    ],
  },
];

export default async function UnitDetailPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; unit: string }>;
}) {
  const { locale, section, unit } = await params;

  if (section !== "committee-members") {
    notFound();
  }

  const currentUnitFromCms = await getOrganizationUnitBySlug(
    locale as "en" | "ta",
    unit
  );
  const currentUnit =
    currentUnitFromCms ??
    placeholderUnits.find((item) => item.slug === unit) ??
    null;
  if (!currentUnit) {
    notFound();
  }

  setRequestLocale(locale);
  const tNav = await getTranslations("nav");
  const tOrg = await getTranslations("organizationals");
  const displayName =
    locale === "ta"
      ? currentUnit.name_ta ?? currentUnit.name_en ?? currentUnit.slug
      : currentUnit.name_en ?? currentUnit.name_ta ?? currentUnit.slug;

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
            { label: displayName },
          ]}
        />

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{displayName}</h1>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">{tOrg("representatives")}</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {currentUnit.representatives?.map((person) => {
                  const imageUrl = toStrapiMediaUrl(person.image?.url);
                  return (
                    <li key={person.id} className="flex items-start gap-3">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={person.name ?? "Representative"}
                          width={56}
                          height={70}
                          className="h-[70px] w-[56px] rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{person.name}</p>
                        <p>{person.designation}</p>
                        <p>{person.place}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {(!currentUnit.representatives || currentUnit.representatives.length === 0) && (
                <p className="text-sm text-muted-foreground">{tOrg("noRepresentatives")}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">{tOrg("events")}</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {currentUnit.events?.map((event) => {
                  const imageUrl = toStrapiMediaUrl(event.image?.url);
                  const title =
                    locale === "ta"
                      ? event.title_ta ?? event.title_en
                      : event.title_en ?? event.title_ta;
                  const description =
                    locale === "ta"
                      ? event.description_ta ?? event.description_en
                      : event.description_en ?? event.description_ta;
                  return (
                    <li key={event.id} className="space-y-2">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={title ?? "Event"}
                          width={320}
                          height={180}
                          className="h-36 w-full rounded object-cover"
                        />
                      )}
                      <p className="font-medium text-foreground">{title}</p>
                      <p>{description}</p>
                    </li>
                  );
                })}
              </ul>
              {(!currentUnit.events || currentUnit.events.length === 0) && (
                <p className="text-sm text-muted-foreground">{tOrg("noEvents")}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">{tOrg("achievements")}</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {currentUnit.achievements?.map((achievement) => {
                  const imageUrl = toStrapiMediaUrl(achievement.image?.url);
                  const title =
                    locale === "ta"
                      ? achievement.title_ta ?? achievement.title_en
                      : achievement.title_en ?? achievement.title_ta;
                  const description =
                    locale === "ta"
                      ? achievement.description_ta ?? achievement.description_en
                      : achievement.description_en ?? achievement.description_ta;
                  return (
                    <li key={achievement.id} className="space-y-2">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={title ?? "Achievement"}
                          width={320}
                          height={180}
                          className="h-36 w-full rounded object-cover"
                        />
                      )}
                      <p className="font-medium text-foreground">{title}</p>
                      <p>{description}</p>
                    </li>
                  );
                })}
              </ul>
              {(!currentUnit.achievements || currentUnit.achievements.length === 0) && (
                <p className="text-sm text-muted-foreground">{tOrg("noAchievements")}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </main>
  );
}
