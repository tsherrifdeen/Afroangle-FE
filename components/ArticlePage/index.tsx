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
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import AuthorBio from "./AuthorBio";
import ReadMore from "./Readmore";

interface ArticlePageContentProps {
  locale: string;
  article: NonNullable<ARTICLE_BY_SLUG_QUERY_RESULT>; // Ensures TS knows this won't be null down below
}

export default async function ArticlePageContent({
  locale,
  article,
}: ArticlePageContentProps) {
  if (!hasLocale(locale)) notFound();
  if (!article) notFound();

  const dict = await getDictionary(locale);

  return (
    <main>
      <section className="max-w-screen-xl py-8 mx-auto lg:py-12">
        <ArticleHeader categories={article.categories} dict={dict} />

        <article className="px-4 space-y-4 lg:space-y-8 lg:px-24">
          <h1 className="text-3xl font-bold capitalize lg:w-11/12 lg:text-6xl">
            {article.title}
          </h1>

          <div className="flex gap-2">
            <p className="text-lg">{dict.articles.metadata.by}</p>
            <ArticleMeta
              large
              author={article.author}
              date={article.publishedAt}
            />
          </div>

          {/* 2. Safely check if the image exists before rendering the block */}
          {article.mainImage?.url && (
            <div>
              <ArticleImage
                src={article.mainImage.url}
                caption={article.mainImage.caption || ""}
              />
              <hr className="mt-10 border-black/30" />
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
            <div className="max-w-3xl mx-auto prose prose-xl prose-blue">
              <PortableText value={article.content} components={components} />
            </div>
          )}

          <div>
            <AuthorBio articleId={article._id} />
          </div>

          <div>
            <Comments articleId={article._id} locale={locale} dict={dict} />
            <CommentForm locale={locale} postId={article._id} dict={dict} />
          </div>

          {/* <div>
            <ReadMore articleId={article._id} locale={locale} />
          </div> */}
        </article>
      </section>
    </main>
  );
}
