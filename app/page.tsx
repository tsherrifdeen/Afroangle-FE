// app/page.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// This should never render — middleware redirects / before it gets here.
// This is purely a safety net for bots or edge cases middleware misses.
export default async function RootPage() {
  try {
    const headersList = await headers();
    const acceptLang = headersList.get("accept-language") ?? "";
    const preferred = acceptLang.split(",")[0].trim().slice(0, 2).toLowerCase();
    const locale = preferred === "fr" ? "fr" : "en";
    redirect(`/${locale}`);
  } catch {
    redirect("/en");
  }
}
