import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  titleKey?: string;
  excerptKey?: string;
  title?: string;
  excerpt?: string;
  date: string;
  link?: string;
  category?: string;
}

interface NewsSectionProps {
  locale: string;
  items?: NewsItem[];
}

const mockNewsItems: NewsItem[] = [
  { id: "1", titleKey: "item1Title", excerptKey: "item1Excerpt", date: "2025-02-20", category: "Party" },
  { id: "2", titleKey: "item2Title", excerptKey: "item2Excerpt", date: "2025-02-15", category: "Report" },
  { id: "3", titleKey: "item3Title", excerptKey: "item3Excerpt", date: "2025-02-10", category: "Party" },
];

export async function NewsSection({ locale, items = mockNewsItems }: NewsSectionProps) {
  const t = await getTranslations("news");

  return (
    <SectionContainer>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("title")}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <span className="text-xs font-medium text-black/80">
                {item.category ? t(`category.${item.category.toLowerCase()}`) : ""}
              </span>
              <h3 className="text-lg font-semibold">{item.titleKey ? t(item.titleKey) : item.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black/80 group-hover:text-black/90">{item.excerptKey ? t(item.excerptKey) : item.excerpt}</p>
              <p className="mt-2 text-xs text-black/70 group-hover:text-black/80">{item.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href={`/${locale}/resources/events`}>{t("learnMore")}</Link>
        </Button>
      </div>
    </SectionContainer>
  );
}
