import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import ArticleItem from "./ArticleItem";

type Dict = {
  articles: {
    list: {
      noArticles: string;
    };
  };
};

interface ArticleListProps {
  heading: string;
  subheading: string;
  center?: boolean;
  articles: ALL_ARTICLES_QUERY_RESULT;
  dict: Dict;
}

const ArticleList = async ({
  heading,
  subheading,
  center = false,
  articles,
  dict,
}: ArticleListProps) => {
  return (
    <section className={`w-full max-w-5xl px-4 ${center ? "mx-auto" : ""}`}>
      <div className={`${center ? "text-center" : ""} space-y-3 mb-8 lg:mb-14`}>
        <h2 className="mb-0 text-2xl tracking-widest uppercase lg:text-3xl lg:mb-2">
          {heading}
        </h2>
        <p className="text-lg font-light lg:text-xl font-secondary">
          {subheading}
        </p>
      </div>
      <div className="mb-5 space-y-11">
        {articles.length === 0 ? (
          <p className="text-gray-500 font-secondary">
            {dict.articles.list.noArticles}
          </p>
        ) : (
          articles.map((article) => (
            <ArticleItem key={article._id} article={article} />
          ))
        )}
      </div>
    </section>
  );
};

export default ArticleList;
