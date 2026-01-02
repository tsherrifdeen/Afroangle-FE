import FeaturedArticle from "./FeaturedArticle";
import SidebarArticle from "./SidebarArticle";

// 4. The Main Layout Component
const NewsLayout = ({ articles }) => {
  return (
    <section className=" pb-14 mb-20 border-b border-black/30 ">
      <div className="flex gap-9 max-w-screen-xl mx-auto px-16">
        {/* Left Column: Featured */}
        <FeaturedArticle article={articles[0]} />

        {/* Right Column: Sidebar */}
        <aside className="w-1/4 bg-neutral pr-14 pl-8 py-3 space-y-5">
          <h3 className="italic text-3xl">Catch up</h3>
          <div className="flex flex-col gap-5">
            {articles.map((article, index) => (
              <SidebarArticle key={index} article={article} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default NewsLayout;
