import { cache } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthorBySlug as _getAuthorBySlug } from "@/sanity/services/authorService";
import AuthorPageContent from "@/components/AuthorPage";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { getExcerpt } from "@/lib/portableTextToPlain";

const getAuthor = cache(_getAuthorBySlug);

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

interface AuthorPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const [author, dict] = await Promise.all([
    getAuthor(slug, locale),
    getDictionary(locale),
  ]);

  const { defaultTitle, ogTitle } = dict.common.seo.home;
  const currentUrl = `${BASE_URL}/${locale}/authors/${slug}`;

  if (!author) {
    return { title: dict.authors.notExist };
  }

  const description = author.bio
    ? getExcerpt(author.bio)
    : `${author.name} - ${defaultTitle}`;

  return {
    title: author.name,
    description,
    openGraph: {
      title: author.name || ogTitle,
      description,
      url: currentUrl,
      ...(author.mainImage?.url && {
        images: [
          {
            url: author.mainImage.url,
            width: 800,
            height: 800,
            alt: author.name,
          },
        ],
      }),
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${BASE_URL}/en/authors/${slug}`,
        fr: `${BASE_URL}/fr/authors/${slug}`,
      },
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug, locale } = await params;
  const author = await getAuthor(slug, locale);

  if (!author) notFound();

  return <AuthorPageContent author={author} locale={locale} />;
}
