import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface QuickLink {
  id: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
}

interface QuickLinksSectionProps {
  locale: string;
  links?: QuickLink[];
}

const defaultLinks: QuickLink[] = [
  {
    id: "1",
    titleKey: "ideology",
    descriptionKey: "ideologyDesc",
    href: "/party/ideology",
  },
  {
    id: "2",
    titleKey: "history",
    descriptionKey: "historyDesc",
    href: "/party/history",
  },
  {
    id: "3",
    titleKey: "organizationStructure",
    descriptionKey: "organDesc",
    href: "/party/organizationals",
  },
  {
    id: "4",
    titleKey: "frontals",
    descriptionKey: "frontalsDesc",
    href: "/party/frontals",
  },
];

export async function QuickLinksSection({ locale, links = defaultLinks }: QuickLinksSectionProps) {
  const t = await getTranslations("quickLinks");

  return (
    <SectionContainer className="bg-secondary/50">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("title")}</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Card key={link.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/${locale}${link.href}`} className="h-full block">
              <CardHeader>
                <h3 className="text-lg font-semibold">{t(link.titleKey)}</h3>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <p className="text-sm text-black/70">{t(link.descriptionKey)}</p>
                <Button variant="ghost" className="w-full mt-4 justify-end">
                  {t("visit")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
