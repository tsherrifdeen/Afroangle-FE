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

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
  const currentUrl = `${baseUrl}/${locale}/authors/${slug}`;

  return {
    title: author.name,
    description: `${author.bio} - ${seo.defaultTitle}`,
    openGraph: {
      title: author.name || seo.ogTitle,
      description: `${author.name} - ${seo.defaultTitle}`,
      url: currentUrl,
      images: author.mainImage?.url
        ? [
            {
              url: author.mainImage.url,
              width: 800, // Profile pictures are usually square, 800x800 is a good standard
              height: 800,
              alt: author.name,
            },
          ]
        : [],
    },
    // The Bilingual SEO Magic
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/authors/${slug}`,
        fr: `${baseUrl}/fr/authors/${slug}`,
      },
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
