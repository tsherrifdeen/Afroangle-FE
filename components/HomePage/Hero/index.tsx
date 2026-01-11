import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import FeaturedArticle from "./FeaturedArticle";
import SidebarArticle from "./SidebarArticle";

interface NewsLayoutProps {
  articles: ALL_ARTICLES_QUERY_RESULT;
}
// 4. The Main Layout Component
const NewsLayout = ({ articles }: NewsLayoutProps) => {
  return (
    <section className="pb-14 lg:mb-20 mb-12 border-b border-black/30 ">
      <div className="flex flex-col lg:flex-row lg:gap-9 gap-12 max-w-screen-xl mx-auto px-4 lg:px-16">
        {/* Left Column: Featured */}
        <div className="lg:w-3/4 border border-black/10">
          <FeaturedArticle article={articles[0]} />
        </div>
        {/* Right Column: Sidebar */}
        <aside className="lg:w-1/4 bg-neutral pr-14 pl-8 py-3 space-y-5">
          <h3 className="italic text-3xl">Catch up</h3>
          <div className="flex flex-col gap-5">
            {articles.slice(1, 3).map((article, index) => (
              <SidebarArticle key={index} article={article} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default NewsLayout;
