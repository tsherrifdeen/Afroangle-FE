import { notFound } from "next/navigation";
import CategoryNav from "../common/CategoryNav";
import ArticleList from "../ArticleList";
import CategoryInfo from "./CategoryInfo";
import ArticleSpotlight from "./ArticleSpolight";
import { getArticlesByCategory } from "@/sanity/services/articleService";
import {
  getAllCategories,
  getCategoryBySlug,
} from "@/sanity/services/categoryService";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";

const CategoryPage = async ({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) => {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  const [categories, categoryData, articlesResponse] = await Promise.all([
    getAllCategories(locale),
    getCategoryBySlug(slug, locale),
    getArticlesByCategory(slug, locale),
  ]);

  if (!categoryData) {
    notFound();
  }

  const articles = articlesResponse.data;

  return (
    <>
      <CategoryInfo
        slug={categoryData.slug}
        name={categoryData.name}
        description={
          categoryData.description ||
          `${dict.categories.explore} ${categoryData.name}`
        }
        dict={dict}
      />

      <CategoryNav categories={categories} dict={dict} />

      {articles.length > 0 && (
        <ArticleSpotlight article={articles[0]} dict={dict.articles} />
      )}

      <div className="border-t border-t-black/30">
        <div className="max-w-screen-xl mx-auto lg:px-16 px-4 pt-12">
          {articles.length > 0 ? (
            <ArticleList
              heading={`${dict.categories.readMore}${categoryData.name}`}
              subheading={dict.categories.subheading}
              articles={articles.slice(1)}
              dict={dict}
            />
          ) : (
            <p className="text-center text-gray-600 py-10">
              {dict.categories.noArticlesInCategory}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
