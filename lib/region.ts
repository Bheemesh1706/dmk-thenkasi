// Client-safe — no next/headers imports. Import this from both client and server code.

export const REGION_COOKIE = "region" as const;
export const DEFAULT_REGION = "region1" as const;

/**
 * Central registry of all regions.
 * To add a new region in the future, just add an entry here — everything else adapts.
 */
export const REGIONS = [
  { value: "region1", label: "Region 1" },
  { value: "region2", label: "Region 2" },
] as const;

export type Region = (typeof REGIONS)[number]["value"];

/**
 * Builds the Strapi $in filter params for region-scoped queries.
 * Always includes "global" so items not tied to a specific region are also returned.
 *
 * Format: filters[region][$in]=<region>,global
 *
 * Returns undefined (no filter) when region is null/undefined — useful for endpoints
 * that don't support region filtering.
 */
export function buildRegionFilter(
  region: string | null | undefined,
): Record<string, string> | undefined {
  if (!region) return undefined;
  // Strapi v5 $in requires array-index notation.
  return {
    "filters[region][$in][0]": region,
  };
}
