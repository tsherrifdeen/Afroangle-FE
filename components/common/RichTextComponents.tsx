import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image"; // Ensure you have this helper

export const RichTextComponents: PortableTextComponents = {
  // 1. Customizing Block types (Headers, Paragraphs)
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 py-1 italic my-5">
        {children}
      </blockquote>
    ),
  },

  // 2. Customizing List types
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-10 space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-10 space-y-2 my-4">{children}</ol>
    ),
  },

  // 3. Customizing Images (The "types" property)
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-96 my-8">
          {/* Uses Next.js Image for optimization */}
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Article Image"}
            fill
            className="object-contain"
          />
        </div>
      );
    },
  },

  // 4. Customizing Links (The "marks" property)
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
