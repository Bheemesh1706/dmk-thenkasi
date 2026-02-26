import Link from "next/link";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LeaderItem {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  link?: string;
}

interface LeaderSectionProps {
  locale: string;
  items?: LeaderItem[];
}

const mockLeaders: LeaderItem[] = [
  {
    id: "1",
    title: "Leadership",
    excerpt: "Dedicated to serving the community.",
  },
  {
    id: "2",
    title: "Vision",
    excerpt: "Building a stronger future together.",
  },
  {
    id: "3",
    title: "Values",
    excerpt: "Integrity, transparency, and progress.",
  },
  {
    id: "4",
    title: "Community",
    excerpt: "United for positive change.",
  },
];

export function LeaderSection({ items = mockLeaders }: LeaderSectionProps) {
  return (
    <SectionContainer className="bg-secondary/50">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.excerpt}</p>
              {item.link && (
                <Link
                  href={item.link}
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Learn more
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
