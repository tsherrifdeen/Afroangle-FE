import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthorBySlug } from "@/sanity/services/authorService";
import AuthorPageContent from "@/components/AuthorPage";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";

interface AuthorPageProps {
  params: Promise<{ slug: string; locale: string }>;
}
export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.home;
  const author = await getAuthorBySlug(slug, locale);

  if (!author) {
    return {
      title: dict.authors.notExist,
    };
  }
  return {
    title: author.name,
    description: `${author.bio} - ${seo.defaultTitle}`,
    openGraph: {
      title: author.name || seo.ogTitle,
      description: `${author.name} - ${seo.defaultTitle}`,
      images: author.mainImage?.url ? [author.mainImage.url] : [],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug, locale } = await params;
  const author = await getAuthorBySlug(slug, locale);
  if (!author) {
    notFound();
  }
  return <AuthorPageContent author={author} locale={locale} />;
}
