import { articles } from "@/data/article";
import ArticleItem from "./ArticleItem";
interface ArticleListProps {
  heading: string;
  subheading: string;
  articles?: typeof articles;
  center?: boolean;
}
const ArticleList = ({
  heading,
  subheading,
  center = false,
}: ArticleListProps) => {
  return (
    <section className={`w-full max-w-5xl ${center ? "mx-auto" : ""}`}>
      <div className={`${center ? "text-center" : ""} space-y-3 mb-14`}>
        <h2 className="text-3xl tracking-widest mb-4">{heading}</h2>
        <p className="text-xl">{subheading}</p>
      </div>
      <div className="space-y-11 mb-5">
        {/* Render article items here */}
        {articles &&
          articles.map((article, index) => (
            <ArticleItem key={index} article={article} />
          ))}
        {articles &&
          articles.map((article, index) => (
            <ArticleItem key={index} article={article} />
          ))}
      </div>
    </section>
  );
};

export default ArticleList;
