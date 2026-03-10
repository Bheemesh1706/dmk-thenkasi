import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { LeaderSection } from "@/components/sections/LeaderSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { QuickLinksSection } from "@/components/sections/QuickLinksSection";
import { MediaGallerySection } from "@/components/sections/MediaGallerySection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      <HeroSection locale={locale} />
      <NewsSection locale={locale} />
      <AboutSection />
      <QuickLinksSection locale={locale} />
      <MediaGallerySection locale={locale} />
    </main>
  );
}
