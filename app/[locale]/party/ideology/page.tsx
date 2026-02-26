import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Breadcrumb } from "@/components/party/Breadcrumb";

export default async function IdeologyPage({
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
        <Breadcrumb
          locale={locale}
          items={[
            { label: t("home"), href: "" },
            { label: t("party"), href: "/party" },
            { label: t("ideology") },
          ]}
        />
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("ideology")}
        </h1>
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            {locale === "ta"
              ? "கொள்கைகள் மற்றும் பார்வையின் விளக்கம் இங்கே வழங்கப்படும்."
              : "Content about ideology and vision will be displayed here."}
          </p>
        </div>
      </SectionContainer>
    </main>
  );
}
