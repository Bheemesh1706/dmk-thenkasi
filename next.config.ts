import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");
const strapiUrl = process.env.STRAPI_URL || "https://admin.dmksouthtenkasi.in";
const parsedStrapiUrl = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: parsedStrapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: parsedStrapiUrl.hostname,
        port: parsedStrapiUrl.port || undefined,
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
