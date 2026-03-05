import { formatDate } from "@/utils/DateConversion";
import LocaleLink from "./LocaleLink";

interface ArticleMetaProps {
  author: {
    name: string;
    slug: string;
  };
  date: string;
  large?: boolean;
  locale: string;
}

const ArticleMeta = ({
  author,
  date,
  large = false,
  locale,
}: ArticleMetaProps) => {
  return (
    <div
      className={`flex items-center gap-2 ${large ? "lg:text-lg text-base" : "lg:text-base text-sm"}`}
    >
      <LocaleLink
        href={`/authors/${author.slug}`}
        className="hover:underline decoration-primary-red decoration-2"
      >
        {author.name}
      </LocaleLink>
      <span className="text-neutral-300">●</span>
      <span>{formatDate(date, locale)}</span>
    </div>
  );
};

export default ArticleMeta;
