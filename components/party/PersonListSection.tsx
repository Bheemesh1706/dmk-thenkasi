import { SectionContainer } from "@/components/layout/SectionContainer";
import { PersonCard } from "./PersonCard";

interface Person {
  id: string;
  name: string;
  designation?: string;
  district?: string;
  constituency?: string;
}

interface PersonListSectionProps {
  title: string;
  persons: Person[];
}

export function PersonListSection({ title, persons }: PersonListSectionProps) {
  return (
    <SectionContainer>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {persons.map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            designation={person.designation}
            district={person.district}
            constituency={person.constituency}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
