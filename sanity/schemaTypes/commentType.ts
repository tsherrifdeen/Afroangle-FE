import { CommentIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "article",
      title: "Article",
      type: "reference",
      to: [{ type: "article" }],
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
