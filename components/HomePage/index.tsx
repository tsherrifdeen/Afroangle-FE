import ArticleList from "../ArticleList";
import CategoryNav from "../common/CategoryNav";
import Hero from "@/components/HomePage/Hero";
import { getAllCategories } from "@/sanity/services/categoryService";
import { getAllArticles } from "@/sanity/services/articleService";

const HomePage = async () => {
  const categories = await getAllCategories();
  const articles = (await getAllArticles()).data;
  console.log(articles);
  return (
    <>
      <CategoryNav categories={categories} />
      <Hero articles={articles} />
      <ArticleList
        heading="THIS WEEK’S TOP IDEAS"
        subheading="Our top analyses, debates, ideas and stories of the week."
        articles={articles}
        center={true}
      />
    </>
  );
};

export default HomePage;
