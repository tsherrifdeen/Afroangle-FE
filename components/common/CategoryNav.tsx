"use client";
import { ALL_CATEGORIES_QUERY_RESULT } from "@/sanity/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryNavProps {
  categories: ALL_CATEGORIES_QUERY_RESULT;
}
const CategoryNav = ({ categories }: CategoryNavProps) => {
  const pathname = usePathname();
  return (
    <div className="mx-auto lg:px-16 px-4 max-w-screen-xl lg:pt-8 py-4 lg:pb-4 ">
      <nav className="flex space-x-3 overflow-x-auto">
        <Link
          href="/"
          className={`whitespace-nowrap font-secondary [clip-path:polygon(0_0,80%_0,100%_30%,100%_100%,0_100%)] px-5 py-3 hover:bg-primary-red text-primary-red hover:text-white capitalize bg-neutral  transition-colors leading-none ${
            pathname === `/`
              ? "bg-primary-red text-white" // Active Style
              : "bg-neutral text-primary-red hover:bg-primary-red hover:text-white" // Inactive Style
          }`}
        >
          Home
        </Link>
        {categories &&
          categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.slug}`}
              className={`whitespace-nowrap font-secondary [clip-path:polygon(0_0,80%_0,100%_30%,100%_100%,0_100%)] px-5 py-3 hover:bg-primary-red text-primary-red hover:text-white capitalize bg-neutral  transition-colors leading-none ${
                pathname === `/categories/${category.slug}`
                  ? "bg-primary-red text-white" // Active Style
                  : "bg-neutral text-primary-red hover:bg-primary-red hover:text-white" // Inactive Style
              }`}
            >
              {category.name}
            </Link>
          ))}
        <div className="relative">
          <button className=""></button>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNav;
