import { getRelatedArticles } from "@/sanity/services/articleService";
import ArticleList from "../ArticleList";
import { ALL_CATEGORIES_QUERY_RESULT } from "@/sanity/types";

interface ReadMoreProps {
  articleId: string;
  categories: ALL_CATEGORIES_QUERY_RESULT;
  locale: string;
  dict: {
    articles: {
      list: {
        noArticles: string;
      };
    };
  };
}

const ReadMore = async ({
  articleId,
  categories,
  locale,
  dict,
}: ReadMoreProps) => {
  const relatedArticles = await getRelatedArticles(
    articleId,
    categories.map((c) => c.slug),
    locale,
  );
  if (relatedArticles.length === 0) return null;
  return (
    <div className="max-w-screen-xl pt-12 mx-auto lg:px-16">
      <ArticleList
        center
        heading={"checkout these related articles"}
        subheading={""}
        articles={relatedArticles}
        dict={dict}
      />
    </div>
  );
};

export default ReadMore;
