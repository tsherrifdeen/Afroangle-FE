import { formatDate } from "@/utils/DateConversion";
import LocaleLink from "./LocaleLink";

interface ArticleMetaProps {
  author: {
    name: string | null;
    slug: string | null;
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
      className={`flex font-secondary items-center gap-2 min-w-0 ${large ? "lg:text-base text-sm" : "lg:text-sm text-xs"}`}
    >
      <LocaleLink
        href={`/authors/${author.slug}`}
        className="min-w-0 hover:underline decoration-primary-red decoration-1"
      >
        <span className="block truncate">{author.name}</span>
      </LocaleLink>
      <span className="text-neutral-300 shrink-0">●</span>
      <span className="shrink-0">{formatDate(date, locale)}</span>
    </div>
  );
};

export default ArticleMeta;
