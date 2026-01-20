import { GenerateAudioInput } from "@/components/common/GenerateAudio";
import { DocumentIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories (ordered by importance)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          title: "Caption/Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        // Fixed: Expanded inline image to allow Alt Text
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
        { type: "videoEmbed" },
        { type: "twitterEmbed" },
      ],
    }),
    defineField({
      name: "audio",
      title: "Audio Form",
      type: "file",
      description: "Generate an AI audio version of this article.",
      components: {
        input: GenerateAudioInput,
      },
      options: {
        accept: "audio/mpeg",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "comment" }] }],
      readOnly: true,
    }),
  ],
  // Added: Preview configuration
  // preview: {
  //   select: {
  //     title: "title",
  //     // We use the arrow syntax (->) to "follow" the reference and grab the name
  //     author: "author->name",
  //     media: "mainImage",
  //   },
  //   prepare(selection) {
  //     const { author } = selection;
  //     return {
  //       ...selection,
  //       subtitle: author && `by ${author}`, // Displays "by [Author Name]"
  //     };
  //   },
  // },
});
