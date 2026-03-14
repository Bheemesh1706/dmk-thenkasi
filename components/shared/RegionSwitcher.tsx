"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { REGION_COOKIE, DEFAULT_REGION, REGIONS } from "@/lib/region";

export function RegionSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const [region, setRegion] = useState<string>(DEFAULT_REGION);
  const [isPending, startTransition] = useTransition();

  // Read region from cookie on mount (SSR renders with DEFAULT_REGION, hydrates correctly)
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )region=([^;]*)/);
    if (match) setRegion(decodeURIComponent(match[1]));
  }, []);

  function handleRegionChange(newRegion: string) {
    if (newRegion === region) return;
    document.cookie = `${REGION_COOKIE}=${encodeURIComponent(newRegion)};path=/;max-age=${
      60 * 60 * 24 * 365
    };samesite=lax`;
    setRegion(newRegion);
    startTransition(() => {
      router.refresh(); // triggers server components to re-fetch with new region cookie
    });
  }

  const currentLabel = REGIONS.find((r) => r.value === region)?.label ?? region;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "min-w-[110px] border-white/50 bg-white text-black hover:border-primary hover:text-primary [&_svg]:text-current",
            className
          )}
          disabled={isPending}
          aria-label="Switch region"
        >
          {currentLabel}
          <ChevronDown className="ml-1 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white text-black">
        {REGIONS.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleRegionChange(value)}
            className={cn(
              "text-black focus:text-primary",
              value === region && "bg-primary/10 text-primary font-medium"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
