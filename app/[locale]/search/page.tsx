import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { searchArticles } from "@/sanity/services/articleService";
import SearchPageContent from "@/components/SearchPage";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}
export async function generateMetadata({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const [{ locale }, { q }] = await Promise.all([params, searchParams]);
  const searchTerm = q?.trim() ?? "";

  // Fetch the dictionary for translated SEO
  const dict = await getDictionary(locale);
  const seo = dict.common.seo.search;

  const title = searchTerm
    ? `${dict.search.resultsFor} "${searchTerm}"`
    : seo.title;

  const description = seo.description;

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
  const currentUrl = `${baseUrl}/${locale}/search`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/search`,
        fr: `${baseUrl}/fr/search`,
      },
    },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const [{ locale }, { q }] = await Promise.all([params, searchParams]);
  const searchTerm = q?.trim() ?? "";

  const dict = await getDictionary(locale);
  const results = searchTerm ? await searchArticles(searchTerm, locale) : [];

  return (
    <SearchPageContent
      searchTerm={searchTerm}
      locale={locale}
      results={results}
      dict={dict}
    />
  );
}
