import { getArticlesByAuthor } from "@/sanity/services/articleService";
import ArticleList from "../ArticleList";
import AuthorHero from "./AuthorHero";
import AuthorNav from "./AuthorNav";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";
import { GET_AUTHOR_BY_SLUG_RESULT } from "@/sanity/types";

interface AuthorPageContentProps {
  author: GET_AUTHOR_BY_SLUG_RESULT;
  locale: string;
}

const AuthorPageContent = async ({
  author,
  locale,
}: AuthorPageContentProps) => {
  if (!hasLocale(locale) || !author) notFound();

  const dict = await getDictionary(locale);
  const articles = (await getArticlesByAuthor(author._id, locale)).data;

  return (
    <main className="">
      <AuthorNav dict={dict} />
      <AuthorHero author={author} />
      <section className="max-w-screen-xl mx-auto lg:px-24">
        <ArticleList
          articles={articles}
          heading={`${dict.authors.readMoreFrom} ${author.name}`}
          subheading={`${dict.authors.subheading} ${author.name}`}
          dict={dict}
          center={false}
        />
      </section>
    </main>
  );
};

export default AuthorPageContent;
