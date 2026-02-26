import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import { NewsCarousel, type NewsCarouselItem } from "@/components/sections/NewsCarousel";

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
  { id: "1", titleKey: "item1Title", excerptKey: "item1Excerpt", date: "2026-02-23", category: "partyWork" },
  { id: "2", titleKey: "item2Title", excerptKey: "item2Excerpt", date: "2026-02-23", category: "partyWork" },
  { id: "3", titleKey: "item3Title", excerptKey: "item3Excerpt", date: "2026-02-23", category: "partyWork" },
  { id: "4", titleKey: "item4Title", excerptKey: "item4Excerpt", date: "2026-02-23", category: "partyWork" },
  { id: "5", titleKey: "item5Title", excerptKey: "item5Excerpt", date: "2026-02-23", category: "partyWork" },
];

export async function NewsSection({ locale, items = mockNewsItems }: NewsSectionProps) {
  const t = await getTranslations("news");

  const carouselItems: NewsCarouselItem[] = items.map((item) => ({
    id: item.id,
    category: item.category ? t(`category.${item.category.toLowerCase()}`) : "",
    title: item.titleKey ? t(item.titleKey) : item.title ?? "",
    excerpt: item.excerptKey ? t(item.excerptKey) : item.excerpt ?? "",
    date: item.date,
  }));

  return (
    <SectionContainer>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("title")}</h2>
      <div className="mt-8">
        <NewsCarousel items={carouselItems} />
      </div>
      {/* <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href={`/${locale}/resources/events`}>{t("learnMore")}</Link>
        </Button>
      </div> */}
    </SectionContainer>
  );
}
