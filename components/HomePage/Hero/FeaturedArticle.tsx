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
  const linkPath = `/articles/${article.slug}`;
  return (
    <article className="relative flex flex-col w-full h-full min-h-140 lg:bg-neutral">
      {/* Image on top */}
      <LocaleLink
        href={linkPath}
        className="relative block w-full lg:h-full h-96"
      >
        <Image
          src={article.mainImage}
          alt={article.title}
          fill
          className="object-cover"
        />
      </LocaleLink>
      {/* Content below image */}
      <div className="relative flex items-end flex-1 p-4 lg:p-8">
        <div className="space-y-3 lg:w-4/5">
          <LocaleLink
            href={linkPath}
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
          <LocaleLink href={linkPath}>
            <p className="text-lg leading-tight">
              {extract}{" "}
              <span className="underline decoration-primary-green decoration-1">
                read more
              </span>
            </p>
          </LocaleLink>
        </div>

        {/* Floating Category Badge */}
      </div>
      <div className="absolute top-0 right-0 py-4 pl-10 pr-5 bg-white slant-left lg:bottom-0 lg:top-auto lg:py-5 lg:pr-12 lg:pl-24">
        <LocaleLink href={`/categories/${article.category.slug}`}>
          <h4 className="text-xl text-primary-red font-secondary lg:text-4xl">
            {article.category.name}
          </h4>
        </LocaleLink>
      </div>
    </article>
  );
};

export default FeaturedArticle;
