import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  designation?: string;
  image?: string;
  place?: string;
  district?: string;
  constituency?: string;
  className?: string;
}

export function PersonCard({
  name,
  designation,
  image,
  place,
  district,
  constituency,
  className,
}: PersonCardProps) {
  const resolvedPlace = place ?? district ?? constituency;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-stretch gap-4 p-4">
        <div className="shrink-0">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={112}
              height={140}
              className="h-[140px] w-[112px] rounded-md object-cover ring-1 ring-primary/20"
            />
          ) : (
            <div className="flex h-[140px] w-[112px] items-center justify-center rounded-md bg-primary/10 text-xl font-semibold text-primary ring-1 ring-primary/20">
              {name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <CardHeader className="p-0 pb-2">
            <h3 className="font-semibold leading-tight">{name}</h3>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            {designation && (
              <Badge variant="secondary" className="w-fit">
                {designation}
              </Badge>
            )}
            {resolvedPlace && (
              <p className="text-sm text-muted-foreground">
                {resolvedPlace}
              </p>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
