import { formatDate } from "@/utils/DateConversion";

interface ArticleMetaProps {
  author: string;
  date: string;
  large?: boolean;
}

const ArticleMeta = ({ author, date, large = false }: ArticleMetaProps) => {
  return (
    <div
      className={`flex items-center gap-2 ${large ? "lg:text-lg text-base" : "lg:text-base text-sm"}`}
    >
      <span>{author}</span>
      <span>•</span>
      <span>{formatDate(date)}</span>
    </div>
  );
};

export default ArticleMeta;
