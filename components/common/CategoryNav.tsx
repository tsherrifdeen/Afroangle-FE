"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Home", link: "/" },
  { name: "Culture", link: "/categories/fashion" },
  { name: "Music", link: "/categories/home-garden" },
  { name: "History", link: "/categories/sports" },
  { name: "Africa", link: "/categories/toys" },
  { name: "Others", link: "/categories/automotive" },
];

const CategoryNav = () => {
  const pathname = usePathname();
  return (
    <div className="mx-auto px-16 max-w-screen-xl pt-8 pb-4 ">
      <nav className="flex space-x-3 overflow-x-auto">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className={`whitespace-nowrap font-secondary [clip-path:polygon(0_0,80%_0,100%_30%,100%_100%,0_100%)] px-5 py-3 hover:bg-primary-red text-primary-red hover:text-white capitalize bg-neutral  transition-colors leading-none ${
              pathname === category.link
                ? "bg-primary-red text-white" // Active Style
                : "bg-neutral text-primary-red hover:bg-primary-red hover:text-white" // Inactive Style
            }`}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CategoryNav;
