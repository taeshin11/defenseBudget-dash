import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale } from "./i18n/config";

function getLocale(request: NextRequest): string {
  const negotiator = new Negotiator({
    headers: { "accept-language": request.headers.get("accept-language") || "" },
  });
  const languages = negotiator.languages();
  try {
    return match(languages, [...locales], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, static files, metadata routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files like .svg, .png, .ico, .txt, .xml
  ) {
    return;
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's the default locale prefix, rewrite without prefix (canonical URL)
    if (
      pathname.startsWith(`/${defaultLocale}/`) ||
      pathname === `/${defaultLocale}`
    ) {
      const newPath = pathname.replace(`/${defaultLocale}`, "") || "/";
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    return;
  }

  // No locale in pathname — detect and handle
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = cookieLocale && locales.includes(cookieLocale as typeof locales[number])
    ? cookieLocale
    : getLocale(request);

  // For default locale (English), rewrite internally (URL stays clean)
  if (locale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // For non-default locales, redirect to prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", locale, { maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|ads.txt).*)",
  ],
};
