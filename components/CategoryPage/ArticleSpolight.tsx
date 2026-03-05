import ArticleMeta from "../common/ArticleMeta";
import { ARTICLES_BY_CATEGORY_QUERY_RESULT } from "@/sanity/types";
import LocaleLink from "../common/LocaleLink";

interface ArticleSpotlightProps {
  article: ARTICLES_BY_CATEGORY_QUERY_RESULT[number];
  dict: {
    list: {
      topArticle: string;
      noArticles: string;
      featured: string;
      catchUp: string;
    };
  };
}

const ArticleSpotlight = ({ article, dict }: ArticleSpotlightProps) => {
  const extract =
    article.excerpt.length > 370
      ? article.excerpt.slice(0, 370) + "…"
      : article.excerpt;
  const linkPath = `/articles/${article.slug}`;
  return (
    <div className="flex flex-col w-full max-w-screen-xl gap-6 px-4 mx-auto mt-4 mb-12 lg:flex-row lg:gap-9 lg:mt-8 lg:mb-20 lg:px-16">
      {/* LEFT SIDE: IMAGE (Wrapped in Link) */}
      <div className="lg:w-1/2">
        <LocaleLink href={linkPath} className="block w-full">
          <div
            className="relative w-full p-4 transition-opacity bg-center bg-no-repeat bg-cover cursor-pointer lg:p-8 h-120 lg:h-110 hover:opacity-95"
            style={{ backgroundImage: `url(${article.mainImage})` }}
          >
            <div className="py-3 pl-10 pr-8 top-banner-slant lg:py-5 bg-neutral lg:pr-12 lg:pl-18 ">
              <h4 className="text-2xl capitalize text-primary-red font-secondary lg:text-3xl">
                {dict.list.topArticle}
              </h4>
            </div>
            <div className="bottom-0 right-0 py-3 pr-8 slant-left lg:py-5 bg-neutral lg:pr-12 pl-18 lg:pl-24">
              <h4 className="text-2xl capitalize text-primary-red font-secondary lg:text-3xl">
                {article.category.name}
              </h4>
            </div>
          </div>
        </LocaleLink>
      </div>

      {/* RIGHT SIDE: CONTENT */}
      <div className="flex flex-col justify-center w-full gap-4 lg:gap-6 lg:w-2/5">
        {/* TITLE (Wrapped in Link) */}
        <LocaleLink
          href={linkPath}
          className="hover:underline decoration-primary-red decoration-2"
        >
          <h2
            className={`font-extrabold ${
              article?.title.length > 80
                ? "text-2xl lg:text-3xl"
                : "text-3xl lg:text-4xl"
            }`}
          >
            {article.title}
          </h2>
        </LocaleLink>

        <ArticleMeta author={article.author} date={article.publishedAt} large />
        <p className="text-xl leading-tight">
          {extract}.{" "}
          <LocaleLink
            href={linkPath}
            className="underline decoration-primary-green decoration-1"
          >
            read more.
          </LocaleLink>
        </p>
      </div>
    </div>
  );
};

export default ArticleSpotlight;
