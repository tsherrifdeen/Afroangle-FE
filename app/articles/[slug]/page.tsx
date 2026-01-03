// app/articles/[slug]/page.tsx
import { getArticleBySlug } from "@/sanity/services/articleService";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticlePageContent from "@/components/ArticlePage";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      images: [article.mainImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  console.log(article);
  if (!article) {
    notFound();
  }

  return <ArticlePageContent article={article} />;
}
