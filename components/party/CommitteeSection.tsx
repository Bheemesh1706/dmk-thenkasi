import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CommitteeMember {
  name: string;
  role: string;
}

interface CommitteeSectionProps {
  name: string;
  members: CommitteeMember[];
}

export function CommitteeSection({ name, members }: CommitteeSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-xl font-semibold">{name}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={`${member.name}-${member.role}`}>
            <CardHeader className="pb-1">
              <span className="text-xs font-medium text-muted-foreground">
                {member.role}
              </span>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{member.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
