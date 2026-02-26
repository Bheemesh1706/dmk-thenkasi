import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono, Noto_Sans_Tamil } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-tamil-sans",
  subsets: ["latin", "tamil"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tLogo = await getTranslations({ locale, namespace: "logo" });
  return {
    title: tLogo("title"),
    description: tHome("subtitle"),
    alternates: {
      languages: {
        ta: "/ta",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ta")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansTamil.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
