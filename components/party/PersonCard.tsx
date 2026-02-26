import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  designation?: string;
  district?: string;
  constituency?: string;
  className?: string;
}

export function PersonCard({
  name,
  designation,
  district,
  constituency,
  className,
}: PersonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        {designation && (
          <Badge variant="secondary" className="mb-2 w-fit">
            {designation}
          </Badge>
        )}
        <h3 className="font-semibold">{name}</h3>
      </CardHeader>
      <CardContent>
        {(district || constituency) && (
          <p className="text-sm text-muted-foreground">
            {district ?? constituency}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
