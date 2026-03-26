import { cache } from "react";
import {
  getArticleBySlug as _getArticleBySlug,
  getAllArticleSlugs,
} from "@/sanity/services/articleService";
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

// ── 1. Static params — pre-renders every article at build time ─────────────
export async function generateStaticParams() {
  const articles = await getAllArticleSlugs(); // fetch all slugs + locales
  return articles.map((a) => ({
    locale: a.language,
    slug: a.slug,
  }));
}

// ── 2. Metadata ────────────────────────────────────────────────────────────
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

  // ✅ Build correct per-language URLs from translation metadata
  // Each language version has its own slug — don't reuse the current slug
  const languageAlternates: Record<string, string> = {
    [locale]: currentUrl, // always include the current page
  };

  if (article.translations?.length) {
    for (const t of article.translations) {
      if (t.language && t.slug) {
        languageAlternates[t.language] =
          `${BASE_URL}/${t.language}/articles/${t.slug}`;
      }
    }
  }

  return {
    title: article.title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: languageAlternates, // ✅ correct slugs per language
    },
    openGraph: {
      title: article.title || ogTitle,
      description,
      url: currentUrl,
      type: "article", // ✅ tells platforms this is an article
      locale: locale === "fr" ? "fr_FR" : "en_GB", // ✅ OG locale format
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
      // ✅ Article-specific OG tags for Google Discover & social cards
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
    },
  };
}

// ── 3. Page ────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticle(slug, locale);
  if (!article) notFound();

  return <ArticlePageContent article={article} locale={locale} />;
}
