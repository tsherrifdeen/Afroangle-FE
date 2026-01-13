import { UserIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
  ],
});
