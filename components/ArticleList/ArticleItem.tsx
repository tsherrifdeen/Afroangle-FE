import ArticleMeta from "../common/ArticleMeta";
import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import LocaleLink from "../common/LocaleLink";

interface ArticleItemProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  if (!article) {
    return null;
  }
  const extract =
    article.excerpt.length > 240
      ? article.excerpt.slice(0, 240) + "…"
      : article.excerpt;
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
      <div className="w-full lg:w-1/2">
        <LocaleLink href={`/articles/${article.slug}`}>
          <div
            className="relative w-full p-8 bg-center bg-no-repeat bg-cover h-80"
            style={{ backgroundImage: `url(${article.mainImage})` }}
          >
            <div className="left-0 py-3 pl-6 pr-10 bg-neutral slant-right-top">
              <h6 className="text-lg font-secondary text-primary-green">
                {article.category.name}
              </h6>
            </div>
          </div>
        </LocaleLink>
      </div>
      <div className="flex flex-col justify-center w-full gap-3 lg:gap-4 lg:w-2/5">
        <LocaleLink
          href={`/articles/${article.slug}`}
          className="hover:underline decoration-primary-red decoration-2"
        >
          <h2
            className={`font-extrabold uppercase tracking-wide ${
              article.title.length > 80 ? "text-xl" : "text-2xl"
            }`}
          >
            {article.title}
          </h2>
        </LocaleLink>

        <ArticleMeta author={article.author} date={article.publishedAt} />

        <p className="text-lg leading-tight">
          {extract}.{" "}
          <LocaleLink
            href={`/articles/${article.slug}`}
            className="underline decoration-primary-green decoration-1"
          >
            read more.
          </LocaleLink>
        </p>
      </div>
    </div>
  );
};

export default ArticleItem;
