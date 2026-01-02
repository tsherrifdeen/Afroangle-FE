import { formatToMonthDayYear } from "@/utils/DateConversion";

interface ArticleMetaProps {
  author: string;
  date: string;
  large?: boolean;
}

const ArticleMeta = ({ author, date, large = false }: ArticleMetaProps) => {
  const formattedDate = formatToMonthDayYear(date);

  return (
    <div
      className={`flex items-center gap-2 ${large ? "text-base" : "text-sm"} text-gray-600`}
    >
      <span>{author}</span>
      <span>•</span>
      <span>{formattedDate}</span>
    </div>
  );
};

export default ArticleMeta;
