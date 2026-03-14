import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LeaderItem {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  link?: string;
}

interface LeaderSectionProps {
  items?: LeaderItem[];
}

const mockLeaderKeys = [
  { id: "1", titleKey: "leadership", excerptKey: "excerpt1" },
  { id: "2", titleKey: "vision", excerptKey: "excerpt2" },
  { id: "3", titleKey: "values", excerptKey: "excerpt3" },
  { id: "4", titleKey: "community", excerptKey: "excerpt4" },
] as const;

export async function LeaderSection({ items }: LeaderSectionProps) {
  const t = await getTranslations("leader");
  const leaderItems: LeaderItem[] = items ?? mockLeaderKeys.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    excerpt: t(item.excerptKey),
    link: undefined,
    image: undefined,
  }));
  return (
    <SectionContainer className="bg-secondary/50">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leaderItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.image && (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            )}
            <CardHeader>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black/80 group-hover:text-black/90">{item.excerpt}</p>
              {item.link && (
                <Link
                  href={item.link}
                  className="mt-2 inline-block text-sm font-medium text-black hover:underline group-hover:text-black"
                >
                  {t("learnMore")}
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
