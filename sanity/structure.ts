import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list().title("Content").items(S.documentTypeListItems());

// export const structure: StructureResolver = (S) =>
//   S.list()
//     .title("Content")
//     .items([
//       // --- Section 1: Editorial Content ---
//       S.listItem()
//         .title("Editorial")
//         .child(
//           S.list()
//             .title("Editorial Content")
//             .items([
//               // Articles
//               S.documentTypeListItem("article").title("Articles"),

//               // Comments (Optional: You might want to view them per article later, but strictly as a list here)
//               S.documentTypeListItem("comment").title("Comments"),
//             ])
//         ),

//       S.divider(), // A visual separator

//       // --- Section 2: Taxonomy & Management ---
//       S.listItem()
//         .title("Management")
//         .child(
//           S.list()
//             .title("Management")
//             .items([
//               // Authors
//               S.documentTypeListItem("author").title("Authors"),

//               // Categories
//               S.documentTypeListItem("category").title("Categories"),
//             ])
//         ),

//       // --- Section 3: Catch-all ---
//       // This ensures any new schemas you add later still show up automatically
//       // without needing to manually update this file immediately.
//       S.divider(),
//       ...S.documentTypeListItems().filter(
//         (listItem) =>
//           !["article", "comment", "author", "category"].includes(
//             listItem.getId() as string
//           )
//       ),
//     ]);
