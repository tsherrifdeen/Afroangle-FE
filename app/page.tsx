import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * Root page handler - serves as a fallback for middleware edge cases.
 * In normal operation, middleware.ts should handle locale detection and redirect
 * users to /{locale} before this component renders.
 *
 * This exists as a safety net for:
 * - Direct bot access that bypasses middleware
 * - Edge case routing scenarios
 */
export default async function RootPage() {
  try {
    const headersList = await headers();
    const acceptLang = headersList.get("accept-language") ?? "";

    // Safely parse Accept-Language header
    let locale = "en"; // default
    if (acceptLang) {
      try {
        const preferred = acceptLang
          .split(",")[0]
          .trim()
          .split("-")[0] // Get primary language code
          .toLowerCase();

        // Only accept known locales
        if (preferred === "fr") {
          locale = "fr";
        }
      } catch {
        // If parsing fails, use default
        locale = "en";
      }
    }

    redirect(`/${locale}`);
  } catch (error) {
    // If redirect fails for any reason, default to English
    console.error("Root page redirect error:", error);
    redirect("/en");
  }
}
