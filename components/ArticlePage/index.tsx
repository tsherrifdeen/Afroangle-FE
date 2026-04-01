import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import ArticleMeta from "../common/ArticleMeta";
import ArticleHeader from "./ArticleHeader";
import ArticleImage from "./ArticleImage";
import { components } from "../SanityComponents/PortableTextComponents";
import { ARTICLE_BY_SLUG_QUERY_RESULT } from "@/sanity/types";
import Comments from "./Comments";
import AudioPlayer from "./AudioPlayer";
import CommentForm from "./AddComment";
import { getDictionary } from "@/app/[locale]/dictionaries";
import AuthorBio from "./AuthorBio";
import ReadMore from "./ReadMore";

interface ArticlePageContentProps {
  locale: string;
  article: NonNullable<ARTICLE_BY_SLUG_QUERY_RESULT>; // Ensures TS knows this won't be null down below
}

export default async function ArticlePageContent({
  locale,
  article,
}: ArticlePageContentProps) {
  const dict = await getDictionary(locale);

  return (
    <main>
      <section className="max-w-screen-xl py-8 mx-auto lg:py-12">
        <ArticleHeader categories={article.categories} dict={dict} />

        <article className="px-4 space-y-4 lg:space-y-6 lg:px-24">
          <h1 className="text-3xl font-bold capitalize lg:w-11/12 lg:text-6xl">
            {article.title}
          </h1>

          <div className="flex gap-2">
            <p className="font-secondary">{dict.articles.metadata.by}</p>
            <ArticleMeta
              large
              author={article.author}
              date={article.publishedAt}
              locale={locale}
            />
          </div>

          {/* 2. Safely check if the image exists before rendering the block */}
          {article.mainImage?.url && (
            <div>
              <ArticleImage
                src={article.mainImage.url}
                caption={article.mainImage.caption || ""}
              />
              <hr className="mt-6 border-black/30" />
            </div>
          )}

          {/* 3. Safely check if the audio URL exists before rendering the player */}
          {article.audioUrl && (
            <div>
              <AudioPlayer src={article.audioUrl} dict={dict} />
              <hr className="border-black/30" />
            </div>
          )}

          {/* 4. Safely check for content before rendering PortableText */}
          {article.content && (
            <div className="text-black max-w-4xl leading-normal mx-auto prose prose-xl [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:text-9xl [&>p:first-of-type]:first-letter:font-semibold [&>p:first-of-type]:first-letter:pr-2 mt-4 [&>p:first-of-type]:first-letter:-mt-5 [&>p:first-of-type]:first-letter:leading-none">
              <PortableText value={article.content} components={components} />
            </div>
          )}

          <div>
            <AuthorBio articleId={article._id} />
          </div>

          <div>
            <Comments articleId={article._id} dict={dict} />
            <CommentForm locale={locale} postId={article._id} dict={dict} />
          </div>
        </article>
      </section>
      <ReadMore
        articleId={article._id}
        categories={article.categories}
        locale={locale}
        dict={dict}
      />
    </main>
  );
}
