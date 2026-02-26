import { SectionContainer } from "@/components/layout/SectionContainer";
import { Card, CardContent } from "@/components/ui/card";

interface AnnouncementSectionProps {
  locale: string;
  announcements?: { id: string; title: string; body: string; type?: "banner" | "card" }[];
}

const mockAnnouncements = [
  {
    id: "1",
    title: "Important Update",
    body: "Stay informed about our latest initiatives and community programs.",
    type: "banner" as const,
  },
];

export function AnnouncementSection({
  announcements = mockAnnouncements,
}: AnnouncementSectionProps) {
  return (
    <SectionContainer>
      {announcements.map((ann) =>
        ann.type === "banner" ? (
          <div
            key={ann.id}
            className="rounded-lg border border-primary/30 bg-primary/10 p-6 text-center"
          >
            <h3 className="text-lg font-semibold">{ann.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{ann.body}</p>
          </div>
        ) : (
          <Card key={ann.id}>
            <CardContent className="pt-6">
              <h3 className="font-semibold">{ann.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{ann.body}</p>
            </CardContent>
          </Card>
        )
      )}
    </SectionContainer>
  );
}
