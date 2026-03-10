"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface NewsCarouselItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  backgroundImage?: string;
}

interface NewsCarouselProps {
  items: NewsCarouselItem[];
}

const AUTOPLAY_INTERVAL = 4000;

export function NewsCarousel({ items }: NewsCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Track selected (center) slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-scroll from right to left (infinite)
  useEffect(() => {
    if (!emblaApi || items.length <= 1) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [emblaApi, items.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]",
                "transition-transform duration-300"
              )}
            >
              <Card
                className={cn(
                  "h-full overflow-hidden transition-all duration-300 relative",
                  index === selectedIndex
                    ? "ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-lg"
                    : "opacity-90"
                )}
              >
                {item.backgroundImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
                    style={{ backgroundImage: `url(${item.backgroundImage})` }}
                  />
                )}
                <div className={item.backgroundImage ? "absolute inset-0 bg-black/40" : ""} />
                <CardHeader className={cn("pb-2 relative", item.backgroundImage && "text-white")}>
                  <h3 className={cn("text-lg font-semibold", item.backgroundImage && "text-white")}>{item.title}</h3>
                </CardHeader>
                <CardContent className={item.backgroundImage ? "relative text-white/90" : ""}>
                  <p className={cn("text-sm", item.backgroundImage ? "text-white/80" : "text-black/80 group-hover:text-black/90")}>
                    {item.excerpt}
                  </p>
                  <p className={cn("mt-2 text-xs", item.backgroundImage ? "text-white/70" : "text-black/70 group-hover:text-black/80")}>
                    {item.date}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === selectedIndex
                    ? "w-6 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
