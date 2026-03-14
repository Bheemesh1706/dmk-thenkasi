import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  heroImageUrl?: string;
}

export async function HeroSection({
  headline,
  subheadline,
  ctaUrl,
  ctaLabel,
  heroImageUrl,
}: HeroSectionProps) {
  const t = await getTranslations("common");
  const tHome = await getTranslations("home");
  const displayHeadline = headline ?? tHome("headline");
  const displaySubheadline = subheadline ?? tHome("title");
  const displayCtaLabel = ctaLabel ?? t("learnMore");
  const textClass = heroImageUrl ? "text-white" : "text-foreground";
  const subTextClass = heroImageUrl ? "text-white/90" : "text-muted-foreground";

  return (
    <SectionContainer className="relative overflow-hidden border-b border-[var(--border)] py-16 sm:py-24 lg:py-32">
      {heroImageUrl && (
        <>
          <Image
            src={heroImageUrl}
            alt={displayHeadline}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/50 to-black/45" />
        </>
      )}
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${textClass}`}>
          {displayHeadline}
        </h1>
        <p className={`mt-4 text-lg sm:text-xl ${subTextClass}`}>
          {displaySubheadline}
        </p>
        {ctaUrl && (
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={ctaUrl}>{displayCtaLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
