import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import ArticleMeta from "../../common/ArticleMeta";

interface FeaturedArticleProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
}
// 2. Sub-component for the Main Feature
const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)), url(${article.mainImage})`,
  };
  const extract =
    article.excerpt.length > 320
      ? article.excerpt.slice(0, 320) + "…"
      : article.excerpt;
  return (
    <article
      className="w-full lg:h-full h-140 flex items-end lg:p-8 p-4 relative bg-cover bg-center bg-no-repeat"
      style={backgroundStyle}
    >
      <div className="lg:w-3/5 space-y-3">
        <h2 className="lg:text-4xl text-2xl font-extrabold italic">
          {article.title}
        </h2>
        <ArticleMeta author={article.author} date={article.publishedAt} />
        <p className="font-secondary leading-tight">{extract}</p>
      </div>

      {/* Floating Category Badge */}
      <div className="slant-left lg:bottom-0 top-0 lg:top-auto lg:py-5 bg-neutral lg:pr-12 lg:pl-24 py-4 pr-5 pl-10 right-0">
        <h4 className="text-primary-red font-secondary text-xl lg:text-4xl">
          {article.category.name}
        </h4>
      </div>
    </article>
  );
};

export default FeaturedArticle;
