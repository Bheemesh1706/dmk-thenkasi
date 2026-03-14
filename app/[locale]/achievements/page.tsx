import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDistrictAchievements, toStrapiMediaUrl } from "@/lib/strapi";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const achievements = await getDistrictAchievements();

  return (
    <main>
      <SectionContainer>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("achievements")}
        </h1>

        {achievements.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No achievements found.</p>
        ) : (
          <div className="mt-8 space-y-10">
            {achievements.map((item) => {
              const photos = item.photos ?? [];
              return (
                <Card key={item.documentId}>
                  {item.title && (
                    <CardHeader>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                    </CardHeader>
                  )}
                  {photos.length > 0 && (
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {photos.map((photo) => {
                          const src = toStrapiMediaUrl(
                            photo.formats?.medium?.url ?? photo.url
                          );
                          if (!src) return null;
                          return (
                            <div
                              key={photo.id}
                              className="relative aspect-video overflow-hidden rounded-md"
                            >
                              <Image
                                src={src}
                                alt={photo.alternativeText ?? item.title ?? "Achievement photo"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
