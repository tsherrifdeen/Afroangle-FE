import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import ArticleMeta from "../../common/ArticleMeta";
import LocaleLink from "@/components/common/LocaleLink";

interface SidebarProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
}
const SidebarArticle = ({ article }: SidebarProps) => {
  return (
    <article className="mb-5">
      {/* Image Container */}
      <LocaleLink href={`/articles/${article.slug}`}>
        <div
          className="relative w-full h-40 mb-2 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${article.mainImage})` }}
        >
          <div className="left-0 py-2 pl-5 pr-10 bg-white slant-right">
            <h5 className="text-primary-red font-secondary">
              {article.category?.name}
            </h5>
          </div>
        </div>

        {/* Content */}
        <h5
          className={`font-extrabold tracking-wide leading-tight uppercase mb-2 hover:underline active:underline decoration-primary-red ${article.title?.length > 60 ? "text-md" : "text-lg"}`}
        >
          {article.title}
        </h5>
      </LocaleLink>
      <ArticleMeta author={article.author} date={article.publishedAt} />
    </article>
  );
};
export default SidebarArticle;
