import type {
  Page,
  NewsItem,
  OfficeBearer,
  Committee,
  ElectedRepresentative,
  Frontal,
  StrapiResponse,
} from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

async function fetchStrapi<T>(
  path: string,
  locale: "en" | "ta",
  options?: RequestInit
): Promise<T | null> {
  try {
    const url = `${STRAPI_URL}/api${path}${path.includes("?") ? "&" : "?"}locale=${locale}`;
    const res = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json as T;
  } catch {
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
