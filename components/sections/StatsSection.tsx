import { SectionContainer } from "@/components/layout/SectionContainer";

interface StatItem {
  label: string;
  value: string;
}

interface StatsSectionProps {
  locale: string;
  stats?: StatItem[];
}

const mockStats: StatItem[] = [
  { label: "Members", value: "10K+" },
  { label: "Districts", value: "38" },
  { label: "Initiatives", value: "50+" },
  { label: "Years", value: "25+" },
];

export function StatsSection({ stats = mockStats }: StatsSectionProps) {
  return (
    <SectionContainer className="bg-secondary/50">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-primary sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
