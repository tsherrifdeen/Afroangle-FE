import type { StructureResolver } from "sanity/structure";
import {
  EarthGlobeIcon,
  DocumentIcon,
  UserIcon,
  FolderIcon,
  CommentIcon,
} from "@sanity/icons";
import { apiVersion } from "./env";

export const structure: StructureResolver = (S) => {
  // 1. Define your supported languages
  const languages = [
    { id: "en", title: "English" },
    { id: "fr", title: "French" },
  ];

  // 2. Define the document types that use the language field
  const i18nTypes = [
    { type: "article", title: "Articles", icon: DocumentIcon },
    { type: "author", title: "Authors", icon: UserIcon },
    { type: "category", title: "Categories", icon: FolderIcon },
    { type: "comment", title: "Comments", icon: CommentIcon },
  ];

  return S.list()
    .title("Content")
    .items([
      // 3. Loop through the languages to create top-level folders
      ...languages.map((lang) =>
        S.listItem()
          .title(`${lang.title} Content`)
          .icon(EarthGlobeIcon)
          .child(
            S.list()
              .title(`${lang.title} Content`)
              .items(
                // 4. Inside each language folder, create a list of the schemas
                i18nTypes.map((schema) =>
                  S.listItem()
                    .title(schema.title)
                    .icon(schema.icon)
                    .child(
                      // 5. Filter the documents by _type AND language
                      S.documentList()
                        .title(`${lang.title} ${schema.title}`)
                        .apiVersion(apiVersion)
                        .schemaType(schema.type)
                        .filter("_type == $type && language == $lang")
                        .params({ type: schema.type, lang: lang.id })
                        // Adding initial value ensures new docs created here get the right language
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

      // 6. Keep any non-translated documents (like settings, standalone pages) visible
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();
        return id && !["article", "author", "category", "comment"].includes(id);
      }),
    ]);
};
