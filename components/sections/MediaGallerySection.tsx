import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface MediaGallerySectionProps {
  locale: string;
  images?: { id: string; url: string; alt: string }[];
}

const mockImages = [
  { id: "1", url: "/vercel.svg", alt: "Placeholder 1" },
  { id: "2", url: "/vercel.svg", alt: "Placeholder 2" },
  { id: "3", url: "/vercel.svg", alt: "Placeholder 3" },
  { id: "4", url: "/vercel.svg", alt: "Placeholder 4" },
  { id: "5", url: "/vercel.svg", alt: "Placeholder 5" },
  { id: "6", url: "/vercel.svg", alt: "Placeholder 6" },
];

export async function MediaGallerySection({
  images = mockImages,
}: MediaGallerySectionProps) {
  const t = await getTranslations("gallery");
  return (
    <SectionContainer>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="aspect-square overflow-hidden rounded-lg border border-[var(--border)] bg-muted hover:border-primary/30 transition-colors"
          >
            <div className="flex h-full w-full items-center justify-center p-4">
              <span className="text-sm text-muted-foreground">{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
