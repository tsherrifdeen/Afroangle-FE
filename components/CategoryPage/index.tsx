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

const CategoryPage = async ({ slug }: { slug: string }) => {
  // 2. Fetch data in parallel for performance
  const [categories, categoryData, articlesResponse] = await Promise.all([
    getAllCategories(), // For the Nav
    getCategoryBySlug(slug), // For the Info Header (Title/Desc)
    getArticlesByCategory(slug), // For the Content
  ]);
  // 3. Handle 404s if the category doesn't exist in Sanity
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
          `Explore our articles on ${categoryData.name}`
        }
      />

      <CategoryNav categories={categories} />

      {/* 4. Safety Check: Only show spotlight if articles exist */}
      {articles.length > 0 && <ArticleSpotlight article={articles[0]} />}

      <div className="border-t border-t-black/30">
        <div className="max-w-screen-xl mx-auto lg:px-16 px-4 py-12">
          {articles.length > 0 ? (
            <ArticleList
              heading={`Read more of ${categoryData.name}`}
              subheading="Our top analyses, debates, ideas and stories of the week."
              // 5. Slice safely (if only 1 article exists, this returns empty array, which is fine)
              articles={articles.slice(1)}
            />
          ) : (
            <p className="text-center text-gray-500 py-10">
              No articles found in this category yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
