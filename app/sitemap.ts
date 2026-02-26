import { routing } from "@/lib/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const staticPaths = [
  "",
  "/party",
  "/party/ideology",
  "/party/organizationals",
  "/party/organizationals/dmk-leadership",
  "/party/organizationals/district-secretaries",
  "/party/organizationals/committee-members",
  "/party/frontals",
  "/party/electedrepresentatives",
  "/achievements",
  "/resources",
];

export default function sitemap() {
  const urls = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  return urls;
}
