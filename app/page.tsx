import CategoryNav from "@/components/common/CategoryNav";
import Hero from "@/components/Hero";
import { articles } from "@/data/article";
import ArticleList from "@/components/ArticleList";

export default function Home() {
  return (
    <main className="">
      <CategoryNav />
      <Hero />
      <ArticleList
        heading="THIS WEEK’S TOP IDEAS"
        subheading="Our top analyses, debates, ideas and stories of the week."
        articles={articles}
        center={true}
      />
    </main>
  );
}
