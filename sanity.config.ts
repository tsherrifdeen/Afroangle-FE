"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\admin\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { TranslateAction } from "./sanity/actions/translateAction";

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      // Add the translation action to our specific schemas
      if (["article", "author", "category"].includes(context.schemaType)) {
        return [...prev, TranslateAction];
      }
      return prev;
    },
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "fr", title: "French" },
      ],
      schemaTypes: ["article", "category", "author", "comment"],
      languageField: "language",
      bulkPublish: true,
    }),
  ],
});
