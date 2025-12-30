import { article } from "@/data/article";
import ArticleMeta from "../common/ArticleMeta";

interface ArticleItemProps {
  article?: typeof article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="flex gap-10">
      <div className="w-1/2">
        <div
          className="w-full p-8 relative h-80 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${article?.image.url})` }}
        >
          <div className="bg-neutral slant-right-top py-3 pl-6 pr-10 left-0">
            <h6 className="font-secondary text-lg text-primary-green">
              {article?.category.name}
            </h6>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 w-2/5">
        <h2 className="font-extrabold text-2xl">{article?.title}</h2>
        <ArticleMeta
          author={article?.author.name}
          date={article?.publishedAt}
        />
        <p className="font-secondary leading-tight">{article?.exerpt}</p>
      </div>
    </div>
  );
};

export default ArticleItem;
