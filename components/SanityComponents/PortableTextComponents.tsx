import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ReactPlayer from "react-player";
import SocialEmbedWrapper from "./SocialEmbedWrapper";
export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <figure className="flex flex-col items-center w-full my-4 lg:my-6">
          {/* Image Container */}
          <div className="relative w-full overflow-hidden h-80 lg:h-112">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Article Image"}
              fill
              className="object-contain" // object-contain is best for keeping aspect ratio visible
              sizes="(max-width: 1024px) 100vw, 800px" // Improves performance/LCP
            />
          </div>

          {/* Caption */}
          {value.alt && (
            <figcaption className="w-full max-w-3xl px-4 mt-1 text-sm leading-relaxed text-center text-gray-700 capitalize font-secondary">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    videoUpload: ({ value }) => {
      const { url, videoFileUrl } = value;
      const source = url || videoFileUrl;

      if (!source) return null;

      return (
        <div className="flex items-center w-full my-4 overflow-hidden rounded-md shadow-md lg:my-6 aspect-video">
          <ReactPlayer
            src={source}
            width="100%"
            height="100%"
            controls
            light={false} // Set to true if you want a thumbnail placeholder
          />
        </div>
      );
    },
    socialMediaPost: ({ value }) => {
      return <SocialEmbedWrapper url={value.url} />;
    },
  },

  // 1. Customizing Block types (Headers, Paragraphs)
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-3xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-2xl font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="py-1 pl-4 my-5 italic border-l-4 border-gray-500">
        {children}
      </blockquote>
    ),
  },

  // 2. Customizing List types
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-10 space-y-2 list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-10 space-y-2 list-decimal">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
