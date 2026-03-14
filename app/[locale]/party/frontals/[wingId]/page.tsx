import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Breadcrumb } from "@/components/party/Breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPartyWingById } from "@/lib/strapi";

export default async function WingMembersPage({
  params,
}: {
  params: Promise<{ locale: string; wingId: string }>;
}) {
  const { locale, wingId } = await params;

  const wing = await getPartyWingById(wingId);
  if (!wing) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const members = wing.wing_memebers ?? [];

  return (
    <main>
      <SectionContainer>
        <Breadcrumb
          locale={locale}
          items={[
            { label: t("home"), href: "" },
            { label: t("party"), href: "/party" },
            { label: t("frontals"), href: "/party/frontals" },
            { label: wing.wingName },
          ]}
        />

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {wing.wingName}
        </h1>

        {members.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No members found.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Card key={member.documentId} className="h-full">
                <CardHeader>
                  <h2 className="font-semibold">{member.name}</h2>
                </CardHeader>
                {member.title && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
