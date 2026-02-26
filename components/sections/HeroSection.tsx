import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  locale: string;
  headline?: string;
  subheadline?: string;
  ctaUrl?: string;
  ctaLabel?: string;
}

export async function HeroSection({
  locale,
  headline,
  subheadline,
  ctaUrl,
  ctaLabel,
}: HeroSectionProps) {
  const t = await getTranslations("common");
  const displayHeadline = headline ?? "Tenkasi";
  const displaySubheadline = subheadline ?? (locale === "ta" ? "வரவேற்பு" : "Welcome");
  const displayCtaLabel = ctaLabel ?? t("learnMore");

  return (
    <SectionContainer className="bg-primary/5 border-b border-[var(--border)] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {displayHeadline}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
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
