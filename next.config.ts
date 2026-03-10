import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");
const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";
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
    ],
  },
};

export default withNextIntl(nextConfig);
