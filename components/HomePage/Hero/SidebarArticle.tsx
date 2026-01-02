import ArticleMeta from "../../common/ArticleMeta";

const SidebarArticle = ({ article }) => {
  return (
    <article className="mb-5">
      {/* Image Container */}
      <div
        className="w-full h-40 relative mb-2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${article.mainImage})` }}
      >
        <div className="slant-right bg-white py-2 pl-5 pr-10 left-0">
          <h5 className="text-primary-red font-secondary">
            {article.category}
          </h5>
        </div>
      </div>

      {/* Content */}
      <h5 className="font-black text-lg tracking-wider leading-tight mb-2">
        {article.title}
      </h5>
      <ArticleMeta author={article.author} date={article.publishedAt} />
    </article>
  );
};
export default SidebarArticle;
