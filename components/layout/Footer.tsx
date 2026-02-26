import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tHome = await getTranslations("home");
  const prefix = `/${locale}`;
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white">{tHome("headline")}</h3>
            <p className="mt-2 text-sm text-[var(--foreground-light)]">
              {tFooter("tagline")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{t("party")}</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href={`${prefix}/party/ideology`}
                  className="text-sm text-[var(--foreground-light)] hover:text-white transition-colors"
                >
                  {t("ideology")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/party/organizationals`}
                  className="text-sm text-[var(--foreground-light)] hover:text-white transition-colors"
                >
                  {t("organizationStructure")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{t("resources")}</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href={`${prefix}/events`}
                  className="text-sm text-[var(--foreground-light)] hover:text-white transition-colors"
                >
                  {t("events")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/media`}
                  className="text-sm text-[var(--foreground-light)] hover:text-white transition-colors"
                >
                  {t("media")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/gallery`}
                  className="text-sm text-[var(--foreground-light)] hover:text-white transition-colors"
                >
                  {t("gallery")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-[var(--foreground-light)]">
          © {new Date().getFullYear()} {tFooter("copyright")}
        </div>
      </div>
    </footer>
  );
}
