import { Dictionary } from "@/app/[locale]/dictionaries";
import ArticleList from "@/components/ArticleList";
import { SEARCH_ARTICLES_QUERY_RESULT } from "@/sanity/types";

interface SearchPageContentProps {
  searchTerm: string;
  locale: string;
  results: SEARCH_ARTICLES_QUERY_RESULT;
  dict: Dictionary;
}

export default function SearchPageContent({
  searchTerm,
  results,
  dict,
}: SearchPageContentProps) {
  // Dynamically generate the localized headings
  const heading = searchTerm
    ? `${dict.search.resultsFor} "${searchTerm}"`
    : dict.search.pageTitle;

  const subheading = searchTerm
    ? `${results.length} ${results.length === 1 ? dict.search.oneArticleFound : dict.search.articlesFound}`
    : dict.search.enterSearchTerm;

  const customDict = {
    ...dict,
    articles: {
      ...dict.articles,
      list: {
        ...dict.articles.list,
        noArticles: searchTerm
          ? `${dict.search.noArticles} "${searchTerm}"`
          : dict.articles.list.noArticles,
      },
    },
  };

  return (
    <main className="mx-auto w-full max-w-screen-xl py-12 lg:px-16">
      <h3 className="text-2xl text-primary-red px-4 tracking-wider mb-3 uppercase">
        {dict.common.seo.search.title}
      </h3>
      <ArticleList
        heading={heading}
        subheading={subheading}
        articles={results}
        dict={customDict}
      />
    </main>
  );
}
