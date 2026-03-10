import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breadcrumb } from "@/components/party/Breadcrumb";

interface HistoryItem {
  id: string;
  titleKey: string;
  sinceKey: string;
  descKey: string;
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");
  const tNav = await getTranslations("nav");

  const historyItems: HistoryItem[] = [
    {
      id: "1",
      titleKey: "justiceParty",
      sinceKey: "justicePartySince",
      descKey: "justicePartyDesc",
    },
    {
      id: "2",
      titleKey: "periyar",
      sinceKey: "periyarSince",
      descKey: "periyarDesc",
    },
    {
      id: "3",
      titleKey: "anna",
      sinceKey: "annaSince",
      descKey: "annaDesc",
    },
    {
      id: "4",
      titleKey: "dmk",
      sinceKey: "dmkSince",
      descKey: "dmkDesc",
    },
    {
      id: "5",
      titleKey: "kalaignar",
      sinceKey: "kalaignarSince",
      descKey: "kalaignarDesc",
    },
    {
      id: "6",
      titleKey: "stalin",
      sinceKey: "stalinSince",
      descKey: "stalinDesc",
    },
  ];

  return (
    <main>
      <SectionContainer>
        <Breadcrumb
          locale={locale}
          items={[
            { label: tNav("home"), href: "" },
            { label: tNav("party"), href: "/party" },
            { label: tNav("history") },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          {t("title")}
        </h1>

        <div className="max-w-4xl">
          {/* Timeline */}
          <div className="space-y-8">
            {historyItems.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline Line */}
                {index !== historyItems.length - 1 && (
                  <div className="absolute left-8 top-24 w-1 h-12 bg-gradient-to-b from-primary to-transparent" />
                )}

                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex gap-6 p-6">
                    {/* Timeline Dot */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="text-xl font-bold text-primary">
                          {t(item.titleKey)}
                        </h3>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                          {t(item.sinceKey)}
                        </span>
                      </div>
                      <p className="text-base leading-relaxed text-black/80">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Final Message */}
          <div className="mt-16 p-8 rounded-lg border border-primary/20 bg-primary/5">
            <p className="text-center text-lg font-semibold text-primary">
              {locale === "ta"
                ? "திராவிட இயக்கத்தின் வாழ்விளக்கம் என்று சொல்லலாம் இந்த வரலாற்றை"
                : "This history represents the legacy of the Dravidian movement"}
            </p>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
