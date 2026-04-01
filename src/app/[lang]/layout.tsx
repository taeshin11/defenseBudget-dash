import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import FeedbackWidget from "@/components/FeedbackWidget";
import BackToTop from "@/components/BackToTop";
import LangSetter from "@/components/LangSetter";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";
import { getDictionary, hasLocale } from "./dictionaries";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <DictionaryProvider dict={dict} lang={lang}>
      <LangSetter lang={lang} />
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <FeedbackWidget />
      <AdSlot position="sticky-footer" />
    </DictionaryProvider>
  );
}
