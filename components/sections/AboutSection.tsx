import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";

const ACHIEVEMENT_KEYS = [
  "achievement1",
  "achievement2",
  "achievement3",
  "achievement4",
  "achievement5",
  "achievement6",
  "achievement7",
] as const;

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <SectionContainer className="bg-secondary/50">
      <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
        {t("title")} - {t("name")}
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[var(--border)] shadow-lg">
            <Image
              src="/profile_image.jpeg"
              alt={t("name")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
            />
          </div>
        </div>
        <div className="space-y-6 lg:col-span-2">
          <p className="text-base leading-relaxed text-foreground sm:text-lg">
            {t("intro")}
          </p>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("achievementsTitle")}</h3>
            <ul className="space-y-3">
              {ACHIEVEMENT_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex gap-3 text-sm leading-relaxed text-foreground sm:text-base"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
