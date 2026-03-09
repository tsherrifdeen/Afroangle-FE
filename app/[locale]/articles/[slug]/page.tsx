import { cache } from "react";
import { getArticleBySlug as _getArticleBySlug } from "@/sanity/services/articleService";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticlePageContent from "@/components/ArticlePage";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { getExcerpt } from "@/lib/portableTextToPlain";

const getArticle = cache(_getArticleBySlug);

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const [article, dict] = await Promise.all([
    getArticle(slug, locale),
    getDictionary(locale),
  ]);

  const { defaultTitle, ogTitle } = dict.common.seo.home;
  const currentUrl = `${BASE_URL}/${locale}/articles/${slug}`;

  if (!article) {
    return { title: defaultTitle };
  }

  const description =
    article.excerpt ??
    getExcerpt(article.content) ??
    `${article.title} - ${defaultTitle}`;

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title || ogTitle,
      description,
      url: currentUrl,
      ...(article.mainImage?.url && {
        images: [
          {
            url: article.mainImage.url,
            width: 1200,
            height: 630,
            alt: article.mainImage.caption || article.title,
          },
        ],
      }),
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${BASE_URL}/en/articles/${slug}`,
        fr: `${BASE_URL}/fr/articles/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticle(slug, locale);

  if (!article) notFound();

  return <ArticlePageContent article={article} locale={locale} />;
}
