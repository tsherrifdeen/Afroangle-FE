import LocaleLink from "../common/LocaleLink";
import ShareButton from "../common/ShareButton";

interface ArticleHeaderProps {
  categories:
    | {
        name: string | null;
        slug: string | null;
      }[]
    | null;
  dict: {
    common: {
      buttons: {
        share: string;
        copied: string;
      };
    };
  };
}

export default function ArticleHeader({
  categories,
  dict,
}: ArticleHeaderProps) {
  return (
    <div className="flex items-baseline justify-between px-4 mb-4 lg:mb-8 lg:pl-24 lg:pr-8">
      <div className="inline-flex gap-1">
        {categories?.length > 0 &&
          categories.map((category, index) => (
            <LocaleLink href={`/categories/${category.slug ?? ""}`} key={index}>
              <h3 className="text-2xl text-primary-red">
                {category.name}
                {index < categories.length - 1 && ","}
              </h3>
            </LocaleLink>
          ))}
      </div>
      <ShareButton dict={dict} />
    </div>
  );
}
