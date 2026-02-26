import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  locale: string;
  headline?: string;
  subheadline?: string;
  ctaUrl?: string;
  ctaLabel?: string;
}

export async function CTASection({
  locale,
  headline,
  subheadline,
  ctaUrl = "/join",
  ctaLabel,
}: CTASectionProps) {
  const t = await getTranslations("common");
  const displayHeadline = headline ?? t("joinUs");
  const displaySubheadline =
    subheadline ??
    (locale === "ta"
      ? "உங்கள் சமூகத்தில் நேர்மறை தாக்கத்தை ஏற்படுத்துங்கள்."
      : "Sign up to make a positive impact in your community.");
  const displayCtaLabel = ctaLabel ?? t("joinUs");

  return (
    <SectionContainer className="bg-[var(--primary-gradient)] text-primary-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {displayHeadline}
        </h2>
        <p className="mt-4 text-primary-foreground/90">{displaySubheadline}</p>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href={`/${locale}${ctaUrl}`}>{displayCtaLabel}</Link>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
