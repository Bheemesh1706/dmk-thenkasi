"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { RegionSwitcher } from "@/components/shared/RegionSwitcher";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { key: "home", href: "" },
  { key: "party", href: "party" },
  { key: "achievements", href: "achievements" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const getHref = (path: string) => `/${locale}${path ? `/${path}` : ""}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:text-primary hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 pt-6" aria-label="Mobile navigation">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={getHref(href)}
              onClick={() => setOpen(false)}
              className="text-base font-extrabold text-foreground hover:text-primary transition-colors"
            >
              {t(key)}
            </Link>
          ))}
          <Separator />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">{tCommon("region")}</span>
            <RegionSwitcher />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">{tCommon("language")}</span>
            <LanguageSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
