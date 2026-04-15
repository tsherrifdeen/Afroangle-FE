import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "fr"];
const defaultLocale = "en";

function getLocale(req: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (locales.includes(first)) return NextResponse.next();

  const locale = getLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
