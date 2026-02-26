import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FrontalCardProps {
  name: string;
  description?: string;
  link?: string;
}

export function FrontalCard({ name, description, link }: FrontalCardProps) {
  const content = (
    <Card className="h-full transition-colors hover:border-primary/50">
      <CardHeader>
        <h3 className="font-semibold">{name}</h3>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      )}
    </Card>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}
