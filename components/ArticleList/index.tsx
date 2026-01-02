import ArticleItem from "./ArticleItem";
interface ArticleListProps {
  heading: string;
  subheading: string;
  center?: boolean;
  articles: any[];
}
const ArticleList = async ({
  heading,
  subheading,
  center = false,
  articles,
}: ArticleListProps) => {
  return (
    <section className={`w-full max-w-5xl ${center ? "mx-auto" : ""}`}>
      <div className={`${center ? "text-center" : ""} space-y-3 mb-14`}>
        <h2 className="text-3xl tracking-widest mb-2">{heading}</h2>
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
