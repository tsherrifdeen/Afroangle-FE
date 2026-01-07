// import { getArticleBySlug } from "@/sanity/services/articleService";
// import { notFound } from "next/navigation";
// import ArticleMeta from "../common/ArticleMeta";
// import Image from "next/image";
// import { PortableText } from "next-sanity";

// const ArticlePageContent = async ({ slug }: { slug: string }) => {
//   const article = await getArticleBySlug(slug);
//   if (!article) {
//     notFound();
//   }
//   console.log(article);
//   return (
//     <section className="max-w-screen-xl mx-auto py-8  lg:py-12 ">
//       <div className="flex justify-between lg:pl-24 lg:pr-8  px-4 mb-4 lg:mb-8">
//         <h3 className="text-primary-red text-2xl">{article.category}</h3>
//         <button className="slant-top-left bg-neutral py-1.5 pr-4 pl-6 lg:text-lg font-secondary">
//           Share
//         </button>
//       </div>
//       <article className="space-y-4 lg:space-y-8 lg:px-24 px-4">
//         <h1 className="font-bold text-3xl lg:text-6xl italic lg:w-11/12">
//           {article.title}
//         </h1>
//         <div className="flex gap-2">
//           <p className="text-lg">By</p>
//           <ArticleMeta
//             large
//             author={article.author}
//             date={article.publishedAt}
//           />
//         </div>
//         <div className="w-full h-192 relative">
//           <Image alt="ooooo" src={article.mainImage} fill objectFit="contain" />
//         </div>
//         {/* <span className="text-sm tracking-wide">caption text goes here</span> */}
//         <PortableText value={article.content} />
//       </article>
//     </section>
//   );
// };

// export default ArticlePageContent;
import { PortableText } from "next-sanity";
import ArticleMeta from "../common/ArticleMeta";
import ArticleHeader from "./ArticleHeader";
import ArticleImage from "./ArticleImage";
import { RichTextComponents } from "../common/RichTextComponents";
import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";

interface ArticlePageContentProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
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
              author={article.author}
              date={article.publishedAt}
            />
          </div>

          <ArticleImage
            src={article.mainImage.url}
            caption={article.mainImage.caption}
          />

          <div className="prose prose-blue prose-lg max-w-3xl mx-auto ">
            <PortableText
              value={article.content}
              components={RichTextComponents}
            />
          </div>
        </article>
      </section>
    </main>
  );
}
