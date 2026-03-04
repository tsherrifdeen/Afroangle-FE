"use client";
import { ALL_CATEGORIES_QUERY_RESULT } from "@/sanity/types";
import LocaleLink from "./LocaleLink";

type Dict = {
  navigation: {
    home: string;
  };
};

interface CategoryNavProps {
  categories: ALL_CATEGORIES_QUERY_RESULT;
  dict: Dict;
}

const CategoryNav = ({ categories, dict }: CategoryNavProps) => {
  return (
    <div className="mx-auto lg:px-16 px-4 max-w-screen-xl lg:pt-8 py-4 lg:pb-4">
      <nav className="flex space-x-3 overflow-x-auto">
        <LocaleLink
          href="/"
          className="whitespace-nowrap font-secondary [clip-path:polygon(0_0,80%_0,100%_30%,100%_100%,0_100%)] px-5 py-3 capitalize transition-colors leading-none bg-neutral text-primary-red hover:bg-primary-red hover:text-white"
          activeClassName="!bg-primary-red !text-white"
        >
          {dict.navigation.home}
        </LocaleLink>
        {categories &&
          categories.map((category) => (
            <LocaleLink
              key={category.name}
              href={`/categories/${category.slug}`}
              className="whitespace-nowrap font-secondary [clip-path:polygon(0_0,80%_0,100%_30%,100%_100%,0_100%)] px-5 py-3 text-primary-red hover:text-white capitalize bg-neutral hover:bg-primary-red transition-colors leading-none"
              activeClassName="!bg-primary-red !text-white"
            >
              {category.name}
            </LocaleLink>
          ))}
        <div className="relative">
          <button className=""></button>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNav;
