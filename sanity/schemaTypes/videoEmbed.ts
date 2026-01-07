import { defineType, defineField } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  type: "object",
  title: "Video Embed",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Video URL",
      description: "Enter the URL (YouTube, Vimeo, etc.)",
    }),
  ],
  preview: {
    select: { title: "url" },
  },
});
