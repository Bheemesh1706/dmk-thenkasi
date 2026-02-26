"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const locales = [
  { code: "ta" as const, label: "தமிழ்" },
  { code: "en" as const, label: "English" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(newLocale: "en" | "ta") {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "min-w-[100px] border-white/50 bg-white text-black hover:border-primary hover:text-primary [&_svg]:text-current",
            className
          )}
          disabled={isPending}
          aria-label="Switch language"
        >
          {locales.find((l) => l.code === locale)?.label ?? locale}
          <ChevronDown className="ml-1 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white text-black">
        {locales.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLocaleChange(code)}
            className={cn(
              "text-black focus:text-primary",
              code === locale && "bg-primary/10 text-primary font-medium"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
