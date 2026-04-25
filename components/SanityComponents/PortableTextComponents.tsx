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
          {/* Image Container — drives height from image's natural aspect ratio */}
          <div className="relative w-full">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Embedded article image"}
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 800px"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Caption */}
          {value.alt && (
            <figcaption className="w-full max-w-3xl -mt-4 text-center text-sm leading-relaxed text-gray-800 font-secondary">
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
    h1: ({ children }) => <h1 className="mt-10 mb-4 text-4xl">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 mb-4 text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-3 text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="relative py-4 px-6 pl-5 my-6 bg-gray-50 border-l-4 border-gray-700 font-secondary text-base italic text-gray-700 leading-relaxed rounded-r-md">
        {children}
      </blockquote>
    ),
  },

  // 2. Customizing List types
  list: {
    bullet: ({ children }) => (
      <ul className="my-3 space-y-2 list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-3 space-y-2 list-decimal">{children}</ol>
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
          className="text-blue-500 no-underline hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
