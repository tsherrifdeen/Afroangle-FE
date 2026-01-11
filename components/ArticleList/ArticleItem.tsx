import Link from "next/link";
import ArticleMeta from "../common/ArticleMeta";
import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";

interface ArticleItemProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const extract =
    article.excerpt.length > 320
      ? article.excerpt.slice(0, 320) + "…"
      : article.excerpt;
  return (
    <div className="flex gap-5 flex-col lg:flex-row lg:gap-10">
      <div className="lg:w-1/2 w-full">
        <Link href={`/articles/${article.slug}`}>
          <div
            className="w-full p-8 relative h-80 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${article.mainImage})` }}
          >
            <div className="bg-neutral slant-right-top py-3 pl-6 pr-10 left-0">
              <h6 className="font-secondary text-lg text-primary-green">
                {article.category.name}
              </h6>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center lg:gap-4 gap-3 w-full lg:w-2/5">
        <Link
          href={`/articles/${article.slug}`}
          className="hover:underline decoration-primary-red decoration-2"
        >
          <h2 className="font-extrabold text-2xl">{article.title}</h2>
        </Link>
        <ArticleMeta author={article.author} date={article.publishedAt} />
        <p className="font-secondary leading-tight">{extract}</p>
      </div>
    </div>
  );
};

export default ArticleItem;
