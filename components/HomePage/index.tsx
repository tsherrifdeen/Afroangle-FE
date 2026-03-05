import ArticleList from "../ArticleList";
import CategoryNav from "../common/CategoryNav";
import { getAllCategories } from "@/sanity/services/categoryService";
import { getAllArticles } from "@/sanity/services/articleService";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";
import HeroSection from "./Hero";

const HomePage = async ({ locale }: { locale: string }) => {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const categories = await getAllCategories(locale);
  const articles = (await getAllArticles(locale)).data;

  return (
    <>
      <CategoryNav categories={categories} dict={dict} />
      <HeroSection articles={articles.slice(0, 3)} dict={dict} />
      <ArticleList
        heading={dict.categories.topIdea}
        subheading={dict.categories.subheading}
        articles={articles}
        dict={dict}
        center={true}
      />
    </>
  );
};

export default HomePage;
