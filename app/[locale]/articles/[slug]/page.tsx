import { getArticleBySlug } from "@/sanity/services/articleService";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticlePageContent from "@/components/ArticlePage";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.home;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: seo.defaultTitle,
    };
  }
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
  const currentUrl = `${baseUrl}/${locale}/articles/${slug}`;

  return {
    title: article.title,
    description: article.excerpt || `${article.title} - ${seo.defaultTitle}`,

    // 1. Upgraded OpenGraph Object
    openGraph: {
      title: article.title || seo.ogTitle,
      description: article.excerpt || `${article.title} - ${seo.defaultTitle}`,
      url: currentUrl,
      images: article.mainImage?.url
        ? [
            {
              url: article.mainImage.url,
              width: 1200,
              height: 630,
              alt: article.mainImage.caption || article.title, // Add an alt tag for accessibility
            },
          ]
        : [],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/articles/${slug}`,
        fr: `${baseUrl}/fr/articles/${slug}`,
      },
    },
  };
}
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);
  if (!article) {
    notFound();
  }
  return <ArticlePageContent article={article} locale={locale} />;
}
