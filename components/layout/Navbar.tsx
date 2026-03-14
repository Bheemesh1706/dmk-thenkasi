"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { RegionSwitcher } from "@/components/shared/RegionSwitcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "home", href: "" },
  { key: "party", href: "party" },
  { key: "achievements", href: "achievements" },
] as const;

export function Navbar({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const getHref = (path: string) => `/${locale}${path ? `/${path}` : ""}`;

  return (
    <nav
      className={cn("hidden lg:flex items-center gap-6", className)}
      aria-label="Main navigation"
    >
      {navLinks.map(({ key, href }) => (
        <Link
          key={key}
          href={getHref(href)}
          className="text-sm font-extrabold text-white hover:text-primary transition-colors"
        >
          {t(key)}
        </Link>
      ))}
      <RegionSwitcher className="ml-4" />
      <LanguageSwitcher className="ml-2" />
    </nav>
  );
}
