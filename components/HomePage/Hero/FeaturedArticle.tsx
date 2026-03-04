import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import ArticleMeta from "../../common/ArticleMeta";
import LocaleLink from "@/components/common/LocaleLink";
import Image from "next/image";

interface FeaturedArticleProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const extract =
    article.excerpt.length > 240
      ? article.excerpt.slice(0, 240) + "…"
      : article.excerpt;

  return (
    <article className="w-full h-full min-h-140 flex flex-col relative lg:bg-neutral">
      {/* Image on top */}
      <div className="relative w-full min-h-110">
        <Image
          src={article.mainImage}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      {/* Content below image */}
      <div className="flex items-end flex-1 lg:p-8 p-4 relative">
        <div className="lg:w-4/5 space-y-3">
          <LocaleLink
            href={`/articles/${article.slug}`}
            className="active:underline hover:underline decoration-primary-red decoration-2"
          >
            <h2
              className={`font-extrabold tracking-wide uppercase ${
                article?.title.length > 80
                  ? "lg:text-2xl text-xl"
                  : article?.title.length > 50
                    ? "lg:text-3xl text-xl"
                    : "lg:text-4xl text-2xl"
              }`}
            >
              {article.title}
            </h2>
          </LocaleLink>

          <ArticleMeta author={article.author} date={article.publishedAt} />
          <LocaleLink href={`/articles/${article.slug}`}>
            <p className="font-secondary leading-tight">{extract}</p>
          </LocaleLink>
        </div>

        {/* Floating Category Badge */}
      </div>
      <div className="slant-left lg:bottom-0 top-0 lg:top-auto lg:py-5 bg-white lg:pr-12 lg:pl-24 py-4 pr-5 pl-10 right-0 absolute">
        <LocaleLink href={`/categories/${article.category.slug}`}>
          <h4 className="text-primary-red font-secondary text-xl lg:text-4xl">
            {article.category.name}
          </h4>
        </LocaleLink>
      </div>
    </article>
  );
};

export default FeaturedArticle;
