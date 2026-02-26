import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ta", "en"],
  defaultLocale: "ta",
  localePrefix: "always",
  localeDetection: false,
});
