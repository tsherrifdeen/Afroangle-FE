import { headers } from "next/headers";
import { FiArrowLeft } from "react-icons/fi";

// Import dictionaries directly
import en from "@/dictionaries/en.json";
import fr from "@/dictionaries/fr.json";
import LocaleLink from "@/components/common/LocaleLink";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  // Determine locale from Accept-Language header (server-side)
  // Default to 'en' if not detectable
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") ?? "";
  const preferred = acceptLang.split(",")[0].trim().slice(0, 2).toLowerCase();
  const locale = preferred === "fr" ? "fr" : "en";
  const dict = locale === "fr" ? fr : en;

  return (
    <main className="flex min-h-[70vh] w-full flex-col font-secondary items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        {/* The 404 Graphic */}
        <h1 className="text-8xl font-black tracking-tighter text-neutral-200 lg:text-9xl">
          404
        </h1>

        {/* The Localized Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-neutral-800 lg:text-3xl">
            {dict.common.errors.notFound}
          </h2>
        </div>

        {/* Back to Home Button */}
        <div className="pt-6">
          <LocaleLink
            href={`/`}
            className="group inline-flex items-center justify-center bg-primary-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <FiArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {dict.common.buttons.backToHome}
          </LocaleLink>
        </div>
      </div>
    </main>
  );
}
