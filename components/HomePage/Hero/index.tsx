import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import FeaturedArticle from "./FeaturedArticle";
import SidebarArticle from "./SidebarArticle";

type Dict = {
  articles: {
    list: {
      catchUp: string;
    };
  };
};

interface HeroSectionProps {
  articles: ALL_ARTICLES_QUERY_RESULT;
  dict: Dict;
}

const HeroSection = ({ articles, dict }: HeroSectionProps) => {
  return (
    <section className="mb-12 border-b pb-14 lg:mb-20 border-black/30">
      <div className="flex flex-col max-w-screen-xl gap-10 px-4 mx-auto lg:flex-row lg:gap-9 lg:px-16">
        {/* Left Column: Featured */}
        <div className="border lg:w-3/4 border-black/10">
          <FeaturedArticle article={articles[0]} />
        </div>
        {/* Right Column: Sidebar */}
        {articles.length > 2 && (
          <aside className="p-6 space-y-5 lg:w-1/4 bg-neutral lg:p-9">
            <h3 className="text-3xl italic">{dict.articles.list.catchUp}</h3>
            <div className="flex flex-col gap-5">
              {articles.slice(1, 3).map((article, index) => (
                <SidebarArticle key={index} article={article} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
