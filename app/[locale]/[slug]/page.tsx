import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/strapi";
import { SectionContainer } from "@/components/layout/SectionContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPage(slug, locale as "en" | "ta");
  const title = page
    ? (locale === "ta" ? page.title_ta : page.title_en) ?? page.slug
    : slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${title} | Tenkasi`,
    description: "Building a stronger community together",
    alternates: {
      languages: {
        en: `/en/${slug}`,
        ta: `/ta/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const slugs = ["about", "contact"];
  return ["en", "ta"].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!["en", "ta"].includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const page = await getPage(slug, locale as "en" | "ta");

  const title = page
    ? (locale === "ta" ? page.title_ta : page.title_en) ?? page.slug
    : slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main>
      <SectionContainer>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            {page
              ? locale === "ta"
                ? "CMS இருந்து உள்ளடக்கம் ஏற்றப்படும்."
                : "Content will be loaded from CMS."
              : locale === "ta"
                ? "இந்தப் பக்கத்திற்கான உள்ளடக்கம் விரைவில் சேர்க்கப்படும்."
                : "Content for this page will be added soon."}
          </p>
        </div>
      </SectionContainer>
    </main>
  );
}
