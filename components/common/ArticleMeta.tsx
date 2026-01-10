import { formatDate } from "@/utils/DateConversion";
import Link from "next/link";

interface ArticleMetaProps {
  author: {
    name: string;
    slug: string;
  };
  date: string;
  large?: boolean;
}

const ArticleMeta = ({ author, date, large = false }: ArticleMetaProps) => {
  return (
    <div
      className={`flex items-center gap-2 ${large ? "lg:text-lg text-base" : "lg:text-base text-sm"}`}
    >
      <Link
        href={`/authors/${author.slug}`}
        className="hover:underline decoration-primary-red decoration-2"
      >
        {author.name}
      </Link>
      <span className="text-neutral-300">●</span>
      <span>{formatDate(date)}</span>
    </div>
  );
};

export default ArticleMeta;
