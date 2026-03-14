import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { QuickLinksSection } from "@/components/sections/QuickLinksSection";
import { MediaGallerySection } from "@/components/sections/MediaGallerySection";
import {
  getGalleries,
  getHeroImages,
  getLeaderships,
  getRecentUpdates,
  toStrapiMediaUrl,
} from "@/lib/strapi";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [heroImages, recentUpdates, leaderships, galleries] = await Promise.all([
    getHeroImages(),
    getRecentUpdates(6),
    getLeaderships(),
    getGalleries(3),
  ]);

  const heroImageUrl = toStrapiMediaUrl(heroImages[0]?.heroImage?.url);

  const newsItems = recentUpdates.map((item) => ({
    id: String(item.id),
    title: item.title,
    excerpt: item.description,
    date: item.data,
    category: "partyWork",
  }));

  const galleryImages = galleries
    .flatMap((gallery) => gallery.images ?? [])
    .slice(0, 6)
    .map((img) => ({
      id: String(img.id),
      url: toStrapiMediaUrl(img.formats?.small?.url ?? img.url) ?? "",
      alt: img.alternativeText ?? "Gallery image",
    }))
    .filter((img) => img.url.length > 0);

  return (
    <main className="flex flex-col">
      <HeroSection heroImageUrl={heroImageUrl} />
      <NewsSection items={newsItems} />
      <AboutSection />
      <QuickLinksSection locale={locale} />
      <MediaGallerySection locale={locale} images={galleryImages} />
    </main>
  );
}
