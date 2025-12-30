import ArticleMeta from "../common/ArticleMeta";

const SidebarArticle = ({ article }) => {
  return (
    <article className="mb-5">
      {/* Image Container */}
      <div
        className="w-full h-40 relative border border-black/10 mb-2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${article.image.url})` }}
      >
        <div className="[clip-path:polygon(0_0,75%_0,100%_100%,0%_100%)] w-fit bg-white py-2 pl-5 pr-10 absolute bottom-0 left-0 right-0">
          <h5 className="text-primary-red font-secondary">
            {article.category.name}
          </h5>
        </div>
      </div>

      {/* Content */}
      <h5 className="font-black text-lg tracking-wider leading-tight mb-2">
        {article.title}
      </h5>
      <ArticleMeta author={article.author.name} date={article.publishedAt} />
    </article>
  );
};
export default SidebarArticle;
