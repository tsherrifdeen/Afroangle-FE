import ArticleMeta from "../common/ArticleMeta";

interface ArticleSpotlightProps {
  article: any;
}

const ArticleSpotlight = ({ article }: ArticleSpotlightProps) => {
  const extract =
    article.excerpt.length > 600
      ? article.excerpt.slice(0, 600) + "…"
      : article.excerpt;
  return (
    <div className="flex flex-col lg:flex-row lg:gap-9 gap-6 lg:mt-8 mt-4 lg:mb-20 mb-12 w-full max-w-screen-xl mx-auto px-4 lg:px-16">
      <div className="lg:w-1/2">
        <div
          className="w-full lg:p-8 p-4 relative h-120 lg:h-110 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${article.mainImage})` }}
        >
          <div className="top-banner-slant lg:py-5 py-3 pr-8 pl-10 bg-neutral lg:pr-12 lg:pl-20 ">
            <h4 className="text-primary-red font-secondary lg:text-4xl text-3xl">
              Top
            </h4>
          </div>
          <div className="slant-left bottom-0 lg:py-5 py-3 bg-neutral pr-8 lg:pr-12 pl-18 lg:pl-24 right-0">
            <h4 className="text-primary-red font-secondary lg:text-4xl text-3xl">
              {article.category}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center lg:gap-8 gap-4 lg:w-2/5 w-full">
        <h2 className="font-extrabold text-3xl lg:text-4xl italic">
          {article.title}
        </h2>
        <ArticleMeta author={article.author} date={article.publishedAt} large />
        <p className="font-secondary lg:leading-tight lg:text-lg">{extract}</p>
      </div>
    </div>
  );
};

export default ArticleSpotlight;
