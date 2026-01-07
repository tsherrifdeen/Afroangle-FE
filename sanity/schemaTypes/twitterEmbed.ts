// schemaTypes/twitterEmbed.ts
import { defineField, defineType } from "sanity";

export const twitterEmbed = defineType({
  name: "twitterEmbed",
  type: "object",
  title: "Twitter/X Embed",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Tweet URL",
      description:
        "Paste the full URL of the tweet (e.g., https://twitter.com/sanity_io/status/123...)",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "url" },
    prepare({ title }) {
      return {
        title: "Twitter Embed",
        subtitle: title,
      };
    },
  },
});
