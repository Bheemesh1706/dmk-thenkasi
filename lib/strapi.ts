import type {
  Page,
  NewsItem,
  OfficeBearer,
  Committee,
  ElectedRepresentative,
  Frontal,
  OrganizationUnit,
  HeroImage,
  RecentUpdate,
  Leadership,
  Gallery,
  UnionAndTownMember,
  TestUnionAchievement,
  PartyWing,
  DistrictAchievement,
  StrapiResponse,
} from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const ORGANIZATION_UNITS_ENDPOINT =
  process.env.STRAPI_ORGANIZATION_UNITS_ENDPOINT || "organization-units";

async function fetchStrapi<T>(
  path: string,
  locale: "en" | "ta" | null,
  options?: RequestInit
): Promise<T | null> {
  try {
    const localeParam = locale ? `${path.includes("?") ? "&" : "?"}locale=${locale}` : "";
    const url = `${STRAPI_URL}/api${path}${localeParam}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
        ...(options?.headers ?? {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      let errorBody = "";
      try { errorBody = await res.text(); } catch { /* ignore */ }
      console.error(`[Strapi] ${res.status} ${res.statusText} — GET ${url}`, errorBody);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`[Strapi] Network error — GET ${STRAPI_URL}/api${path}:`, err);
    return null;
  }
}

export async function getPage(
  slug: string,
  locale: "en" | "ta"
): Promise<Page | null> {
  const res = await fetchStrapi<StrapiResponse<Page[]>>(
    `/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    locale
  );
  return res?.data?.[0] ?? null;
}

export async function getNewsItems(
  locale: "en" | "ta",
  limit = 6
): Promise<NewsItem[]> {
  const res = await fetchStrapi<StrapiResponse<NewsItem[]>>(
    `/news-items?pagination[limit]=${limit}&sort=date:desc`,
    locale
  );
  return res?.data ?? [];
}

export async function getOfficeBearers(
  locale: "en" | "ta",
  type: "leadership" | "district-secretaries"
): Promise<OfficeBearer[]> {
  const res = await fetchStrapi<StrapiResponse<OfficeBearer[]>>(
    `/office-bearers?filters[type][$eq]=${type}&sort=order:asc&populate=*`,
    locale
  );
  return res?.data ?? [];
}

export async function getCommittees(
  locale: "en" | "ta"
): Promise<Committee[]> {
  const res = await fetchStrapi<StrapiResponse<Committee[]>>(
    `/committees?populate[members][populate]=*&sort=order:asc`,
    locale
  );
  return res?.data ?? [];
}

export async function getElectedRepresentatives(
  locale: "en" | "ta"
): Promise<ElectedRepresentative[]> {
  const res = await fetchStrapi<StrapiResponse<ElectedRepresentative[]>>(
    `/elected-representatives?sort=order:asc&populate=*`,
    locale
  );
  return res?.data ?? [];
}

export async function getFrontals(
  locale: "en" | "ta"
): Promise<Frontal[]> {
  const res = await fetchStrapi<StrapiResponse<Frontal[]>>(
    `/frontals?sort=order:asc&populate=*`,
    locale
  );
  return res?.data ?? [];
}

export async function getDistrictAchievements(): Promise<DistrictAchievement[]> {
  const res = await fetchStrapi<StrapiResponse<DistrictAchievement[]>>(
    `/district-achievements?populate=photos&sort=createdAt:desc`,
    null
  );
  return res?.data ?? [];
}

export async function getPartyWings(): Promise<PartyWing[]> {
  const res = await fetchStrapi<StrapiResponse<PartyWing[]>>(
    `/party-wings?populate=wing_memebers&sort=createdAt:asc`,
    null
  );
  return res?.data ?? [];
}

export async function getPartyWingById(id: string): Promise<PartyWing | null> {
  const res = await fetchStrapi<StrapiResponse<PartyWing>>(
    `/party-wings/${id}?populate=wing_memebers`,
    null
  );
  return res?.data ?? null;
}

export function toStrapiMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export async function getOrganizationUnits(
  locale: "en" | "ta"
): Promise<OrganizationUnit[]> {
  const query =
    `/` +
    `${ORGANIZATION_UNITS_ENDPOINT}` +
    `?sort=order:asc` +
    `&populate[coverImage][populate]=*` +
    `&populate[representatives][populate]=image` +
    `&populate[events][populate]=image` +
    `&populate[achievements][populate]=image`;

  const res = await fetchStrapi<StrapiResponse<OrganizationUnit[]>>(query, locale);
  return res?.data ?? [];
}

export async function getOrganizationUnitBySlug(
  locale: "en" | "ta",
  slug: string
): Promise<OrganizationUnit | null> {
  const query =
    `/` +
    `${ORGANIZATION_UNITS_ENDPOINT}` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[coverImage][populate]=*` +
    `&populate[representatives][populate]=image` +
    `&populate[events][populate]=image` +
    `&populate[achievements][populate]=image`;

  const res = await fetchStrapi<StrapiResponse<OrganizationUnit[]>>(query, locale);
  return res?.data?.[0] ?? null;
}

export async function getHeroImages(): Promise<HeroImage[]> {
  const res = await fetchStrapi<StrapiResponse<HeroImage[]>>(
    `/hero-images?populate=heroImage&pagination[limit]=1`,
    null
  );
  return res?.data ?? [];
}

export async function getRecentUpdates(limit = 6): Promise<RecentUpdate[]> {
  const res = await fetchStrapi<StrapiResponse<RecentUpdate[]>>(
    `/recent-updates?sort=data:desc&pagination[limit]=${limit}`,
    null
  );
  return res?.data ?? [];
}

export async function getLeaderships(): Promise<Leadership[]> {
  const res = await fetchStrapi<StrapiResponse<Leadership[]>>(
    `/leaderships?populate=image&sort=designation:asc`,
    null
  );
  return res?.data ?? [];
}

export async function getGalleries(limit = 3): Promise<Gallery[]> {
  const res = await fetchStrapi<StrapiResponse<Gallery[]>>(
    `/galleries?populate=images&sort=createdAt:desc&pagination[limit]=${limit}`,
    null
  );
  return res?.data ?? [];
}

export function toLowerCamelCase(value: string): string {
  const parts = value
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, "")
    .split(/[\s_-]+/)
    .filter(Boolean);

  if (parts.length === 0) return "";
  return parts
    .map((part, index) => {
      const lower = part.toLowerCase();
      return index === 0 ? lower : `${lower[0].toUpperCase()}${lower.slice(1)}`;
    })
    .join("");
}

function toEndpointSlug(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getUnionAndTownMembers(
  locale: "en" | "ta"
): Promise<UnionAndTownMember[]> {
  const res = await fetchStrapi<StrapiResponse<UnionAndTownMember[]>>(
    `/tenkasi-union-and-town-secretaries?populate=image&pagination[limit]=100`,
    locale
  );
  return res?.data ?? [];
}

export async function getUnionAndTownMemberByKey(
  locale: "en" | "ta",
  key: string
): Promise<UnionAndTownMember | null> {
  const members = await getUnionAndTownMembers(locale);
  return members.find((member) => toLowerCamelCase(member.name) === key) ?? null;
}

export async function getUnionEventAndAchievementItems(
  name: string
): Promise<{ events: TestUnionAchievement[]; achievements: TestUnionAchievement[] }> {
  const endpointBase = toEndpointSlug(name);

  const [eventsRes, achievementsRes] = await Promise.all([
    fetchStrapi<StrapiResponse<TestUnionAchievement[]>>(
      `/${endpointBase}-events?populate=photos&pagination[limit]=200`,
      null
    ),
    fetchStrapi<StrapiResponse<TestUnionAchievement[]>>(
      `/${endpointBase}-achievements?populate=photos&pagination[limit]=200`,
      null
    ),
  ]);

  return {
    events: eventsRes?.data ?? [],
    achievements: achievementsRes?.data ?? [],
  };
}

export async function getUnionItemsByType(
  name: string,
  type: "events" | "achievements"
): Promise<TestUnionAchievement[]> {
  const endpointBase = toEndpointSlug(name);
  const res = await fetchStrapi<StrapiResponse<TestUnionAchievement[]>>(
    `/${endpointBase}-${type}?populate=photos&pagination[limit]=200`,
    null
  );
  return res?.data ?? [];
}

export async function getUnionItemByTypeAndId(
  name: string,
  type: "events" | "achievements",
  id: string
): Promise<TestUnionAchievement | null> {
  const items = await getUnionItemsByType(name, type);
  return items.find((item) => String(item.id) === id) ?? null;
}
