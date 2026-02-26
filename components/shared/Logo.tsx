"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export function Logo() {
  const locale = useLocale();
  const t = useTranslations("logo");
  return (
    <Link
      href={`/${locale}`}
      className="flex flex-row items-center gap-3 text-white hover:text-primary transition-colors"
    >
      <Image
        src="/dmklogo.121ba4e5.webp"
        alt="DMK Logo"
        width={56}
        height={40}
        className="h-8 w-auto object-contain sm:h-10"
      />
      <span className="text-sm font-extrabold tracking-widest sm:text-base">
        {t("title")}
      </span>
    </Link>
  );
}
