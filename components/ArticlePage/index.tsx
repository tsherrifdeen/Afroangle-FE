import { PortableText } from "next-sanity";
import ArticleMeta from "../common/ArticleMeta";
import ArticleHeader from "./ArticleHeader";
import ArticleImage from "./ArticleImage";
import { RichTextComponents } from "../common/RichTextComponents";
import { ARTICLE_BY_SLUG_QUERY_RESULT } from "@/sanity/types";
import Comments from "./Comments";

interface ArticlePageContentProps {
  article: ARTICLE_BY_SLUG_QUERY_RESULT;
}

export default function ArticlePageContent({
  article,
}: ArticlePageContentProps) {
  return (
    <main>
      <section className="mx-auto max-w-screen-xl py-8 lg:py-12">
        <ArticleHeader category={article.category} />

        <article className="space-y-4 px-4 lg:space-y-8 lg:px-24">
          <h1 className="text-3xl font-bold italic lg:w-11/12 lg:text-6xl">
            {article.title}
          </h1>

          <div className="flex gap-2">
            <p className="text-lg">By</p>
            <ArticleMeta
              large
              author={article.author!}
              date={article.publishedAt!}
            />
          </div>
          <div className="space-y-2">
            <ArticleImage
              src={article.mainImage.url!}
              caption={article.mainImage.caption!}
            />
            <hr className="text-black/30" />
          </div>

          <div className="prose prose-blue prose-lg max-w-3xl mx-auto ">
            <PortableText
              value={article.content}
              components={RichTextComponents}
            />
          </div>
          <div className="">
            <Comments id={article._id} />
          </div>
        </article>
      </section>
    </main>
  );
}
