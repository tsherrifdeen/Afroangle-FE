import {
  DocumentIcon,
  ComposeIcon,
  ThListIcon,
  ImageIcon,
} from "@sanity/icons";
import { defineType, defineField } from "sanity";
import { GenerateAudioInput } from "@/components/SanityComponents/GenerateAudio";
import { generateShortSlug } from "../lib/slug";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", icon: ComposeIcon },
    { name: "meta", title: "Meta & SEO", icon: ThListIcon },
    { name: "media", title: "Media", icon: ImageIcon },
  ],
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      initialValue: "en",
    }),
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        slugify: (input) => generateShortSlug(input, 8),
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),

    // Author filtered to same language as this document
    defineField({
      name: "author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      options: {
        disableNew: true,
        filter: ({ document }) => {
          if (!document.language) return {};
          return {
            filter: "language == $lang",
            params: { lang: document.language },
          };
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "content",
      title: "Body Content",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        { type: "videoUpload" },
        { type: "socialMediaPost" },
      ],
    }),
    defineField({
      name: "mainImage",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption/Alt Text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "audio",
      type: "file",
      group: "media",
      components: { input: GenerateAudioInput },
      options: { accept: "audio/mpeg" },
    }),

    // Categories filtered to same language as this document
    defineField({
      name: "categories",
      type: "array",
      group: "meta",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
          options: {
            filter: ({ document }) => {
              if (!document.language) return {};
              return {
                filter: "language == $lang",
                params: { lang: document.language },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
