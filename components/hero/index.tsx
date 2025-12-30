import { article, articles } from "@/data/article";
import FeaturedArticle from "./FeaturedArticle";
import SidebarArticle from "./SidebarArticle";

// 4. The Main Layout Component
const NewsLayout = () => {
  return (
    <section className="flex gap-9 max-w-screen-xl mx-auto px-16">
      {/* Left Column: Featured */}
      <FeaturedArticle article={article} />

      {/* Right Column: Sidebar */}
      <aside className="w-1/4 bg-neutral pr-14 pl-8 py-3 space-y-5">
        <h3 className="italic text-3xl">Catch up</h3>
        <div className="flex flex-col gap-5">
          {articles.map((article, index) => (
            <SidebarArticle key={index} article={article} />
          ))}
        </div>
      </aside>
    </section>
  );
};

export default NewsLayout;
