import ArticleMeta from "../common/ArticleMeta";

// 2. Sub-component for the Main Feature
const FeaturedArticle = ({ article }) => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)), url(${article.image.url})`,
  };

  return (
    <div className="w-3/4 border border-black/10">
      <article
        className="w-full h-full flex items-end p-8 relative bg-cover bg-center bg-no-repeat"
        style={backgroundStyle}
      >
        <div className="w-3/5 space-y-3">
          <h2 className="text-4xl font-extrabold italic">{article.title}</h2>
          <ArticleMeta
            author={article.author.name}
            date={article.publishedAt}
          />
          <p className="font-secondary leading-tight">{article.exerpt}</p>
        </div>

        {/* Floating Category Badge */}
        <div className="w-fit [clip-path:polygon(25%_0,100%_0,100%_100%,0%_100%)] py-5 bg-neutral pr-12 pl-24 absolute bottom-0 right-0">
          <h4 className="text-primary-red font-secondary text-4xl">
            {article.category.name}
          </h4>
        </div>
      </article>
    </div>
  );
};

export default FeaturedArticle;
