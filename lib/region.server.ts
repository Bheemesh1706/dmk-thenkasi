// Server-only — imports next/headers. Only import this from Server Components / Route Handlers.
import { cookies } from "next/headers";
import { REGION_COOKIE, DEFAULT_REGION, REGIONS, type Region } from "@/lib/region";

/**
 * Reads the current region from the request cookie.
 * Falls back to DEFAULT_REGION if the cookie is absent or invalid.
 */
export async function getServerRegion(): Promise<Region> {
  const jar = await cookies();
  const val = jar.get(REGION_COOKIE)?.value;
  return (REGIONS.some((r) => r.value === val) ? val : DEFAULT_REGION) as Region;
}
