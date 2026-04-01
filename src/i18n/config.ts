export const locales = [
  "en",
  "ko",
  "zh",
  "ja",
  "es",
  "fr",
  "de",
  "ar",
  "pt",
  "ru",
  "hi",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  zh: "中文",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
  pt: "Português",
  ru: "Русский",
  hi: "हिन्दी",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
