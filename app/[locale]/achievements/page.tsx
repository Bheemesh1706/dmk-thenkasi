import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main>
      <SectionContainer>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("achievements")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {locale === "ta"
            ? "சாதனைகள் மற்றும் முன்னேற்றங்கள் இங்கே காணப்படும்."
            : "Achievements and progress will be displayed here."}
        </p>
      </SectionContainer>
    </main>
  );
}
