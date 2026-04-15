import type { StructureResolver } from "sanity/structure";
import {
  EarthGlobeIcon,
  DocumentIcon,
  UserIcon,
  FolderIcon,
  CommentIcon,
} from "@sanity/icons";
import { apiVersion } from "./env";
import { SortOrderingItem } from "sanity";

export const structure: StructureResolver = (S) => {
  const languages = [
    { id: "en", title: "English" },
    { id: "fr", title: "French" },
  ];

  // Define available sort options per document type
  const orderingsByType: Record<string, SortOrderingItem[]> = {
    article: [
      { field: "publishedAt", direction: "desc" },
      { field: "title", direction: "asc" },
      { field: "_createdAt", direction: "desc" },
      { field: "_updatedAt", direction: "desc" },
    ],
    author: [
      { field: "name", direction: "asc" },
      { field: "_createdAt", direction: "desc" },
    ],
    category: [
      { field: "name", direction: "asc" },
      { field: "_createdAt", direction: "desc" },
    ],
    comment: [
      { field: "_createdAt", direction: "desc" },
      { field: "name", direction: "asc" },
    ],
  };

  const i18nTypes = [
    { type: "article", title: "Articles", icon: DocumentIcon },
    { type: "author", title: "Authors", icon: UserIcon },
    { type: "category", title: "Categories", icon: FolderIcon },
    { type: "comment", title: "Comments", icon: CommentIcon },
  ];

  return S.list()
    .title("Content")
    .items([
      ...languages.map((lang) =>
        S.listItem()
          .title(`${lang.title} Content`)
          .icon(EarthGlobeIcon)
          .child(
            S.list()
              .title(`${lang.title} Content`)
              .items(
                i18nTypes.map((schema) =>
                  S.listItem()
                    .title(schema.title)
                    .icon(schema.icon)
                    .child(
                      S.documentList()
                        .title(`${lang.title} ${schema.title}`)
                        .apiVersion(apiVersion)
                        .schemaType(schema.type)
                        .filter("_type == $type && language == $lang")
                        .params({ type: schema.type, lang: lang.id })
                        // Default sort — first item in the array is the default
                        .defaultOrdering(orderingsByType[schema.type] ?? [
                          { field: "_createdAt", direction: "desc" },
                        ])
                        .initialValueTemplates([
                          S.initialValueTemplateItem(schema.type, {
                            language: lang.id,
                          }),
                        ]),
                    ),
                ),
              ),
          ),
      ),

      S.divider(),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();
        return id && !["article", "author", "category", "comment"].includes(id);
      }),
    ]);
};