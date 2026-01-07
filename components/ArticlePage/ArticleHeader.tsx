// components/articles/ArticleHeader.tsx

import Link from "next/link";
import ShareButton from "../common/ShareButton";

interface ArticleHeaderProps {
  category: {
    name: string;
    slug: string;
  };
}

export default function ArticleHeader({ category }: ArticleHeaderProps) {
  return (
    <div className="mb-4 flex justify-between px-4 items-center lg:mb-8 lg:pl-24 lg:pr-8">
      <Link href={`/categories/${category.slug}`}>
        <h3 className="text-2xl text-primary-red">{category.name}</h3>
      </Link>
      <ShareButton />
    </div>
  );
}
