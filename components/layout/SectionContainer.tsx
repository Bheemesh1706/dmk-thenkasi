import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
}: SectionContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
        className
      )}
    >
      {children}
    </Component>
  );
}
