import ArticleMeta from "../common/ArticleMeta";

interface ArticleSpotlightProps {
  article?: any;
}

const ArticleSpotlight = ({ article }: ArticleSpotlightProps) => {
  console.log(article);
  return (
    <div className="flex gap-9 mt-8 mb-20 w-full max-w-screen-xl mx-auto px-16">
      <div className="w-1/2">
        <div
          className="w-full p-8 relative h-110 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${article?.mainImage})` }}
        >
          <div className="top-banner-slant py-5 bg-neutral pr-12 pl-20 ">
            <h4 className="text-primary-red font-secondary text-4xl">Top</h4>
          </div>
          <div className="slant-left py-5 bg-neutral pr-12 pl-24 right-0">
            <h4 className="text-primary-red font-secondary text-4xl">
              {article?.category}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 w-2/5">
        <h2 className="font-extrabold text-4xl italic">{article?.title}</h2>
        <ArticleMeta
          author={article?.author}
          date={article?.publishedAt}
          large
        />
        <p className="font-secondary leading-tight text-lg">
          {article?.excerpt}
        </p>
      </div>
    </div>
  );
};

export default ArticleSpotlight;
