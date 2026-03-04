// app/api/translate/route.ts
import { NextResponse } from "next/server";
import * as deepl from "deepl-node";
import { sanityUploadClient as sanity } from "@/lib/SanityUploadClient";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 96);

// Helper to generate the i18n document ID
const getTargetId = (sourceId: string, lang: string) => {
  const baseId = sourceId.replace(/^drafts\./, "");
  return `${baseId}__i18n_${lang}`;
};

export async function POST(req: Request) {
  try {
    const { documentId, targetLang } = await req.json();

    // DeepL translation helper
    const translateText = async (text: string) => {
      if (!text) return text;
      const result = await translator.translateText(
        text,
        "en",
        targetLang === "fr" ? "fr" : "en-US",
      );
      return result.text;
    };

    // Recursive function to process documents and their dependencies
    const processDocument = async (docId: string): Promise<string | null> => {
      const targetId = getTargetId(docId, targetLang);

      // 1. Check if the translated document ALREADY exists
      const existingDoc = await sanity.getDocument(targetId);
      if (existingDoc) return targetId; // Skip translation if it already exists

      // 2. Fetch the source document
      const sourceDoc = await sanity.getDocument(docId);
      if (!sourceDoc) return null;

      const { _rev, _createdAt, _updatedAt, ...restSource } = sourceDoc;
      const translatedDoc: any = {
        ...restSource,
        _id: targetId,
        language: targetLang,
      };

      // 3. Process based on Document Type
      if (sourceDoc._type === "author") {
        translatedDoc.bio = await translateText(sourceDoc.bio);
        const baseSlug = slugify(sourceDoc.name);
        translatedDoc.slug = {
          _type: "slug",
          current: `${baseSlug}-${targetLang}`,
        };
        if (sourceDoc.image?.alt)
          translatedDoc.image.alt = await translateText(sourceDoc.image.alt);
      } else if (sourceDoc._type === "category") {
        translatedDoc.name = await translateText(sourceDoc.name);
        translatedDoc.slug = {
          _type: "slug",
          current: slugify(translatedDoc.name),
        };
        translatedDoc.description = await translateText(sourceDoc.description);
      } else if (sourceDoc._type === "article") {
        translatedDoc.title = await translateText(sourceDoc.title);
        translatedDoc.slug = {
          _type: "slug",
          current: slugify(translatedDoc.title),
        };

        // Handle Author Dependency
        if (sourceDoc.author?._ref) {
          const translatedAuthorId = await processDocument(
            sourceDoc.author._ref,
          );
          if (translatedAuthorId)
            translatedDoc.author._ref = translatedAuthorId;
        }

        // Handle Categories Dependencies
        if (sourceDoc.categories?.length > 0) {
          translatedDoc.categories = await Promise.all(
            sourceDoc.categories.map(async (cat: any) => {
              const translatedCatId = await processDocument(cat._ref);
              return { ...cat, _ref: translatedCatId || cat._ref };
            }),
          );
        }

        // Handle Portable Text (Body Content)
        if (sourceDoc.content) {
          translatedDoc.content = await Promise.all(
            sourceDoc.content.map(async (block: any) => {
              if (block._type === "block" && block.children) {
                const newChildren = await Promise.all(
                  block.children.map(async (child: any) => {
                    if (child._type === "span" && child.text) {
                      return {
                        ...child,
                        text: await translateText(child.text),
                      };
                    }
                    return child;
                  }),
                );
                return { ...block, children: newChildren };
              }
              if (block._type === "image" && block.alt) {
                return { ...block, alt: await translateText(block.alt) };
              }
              return block;
            }),
          );
        }

        if (sourceDoc.mainImage?.caption) {
          translatedDoc.mainImage.caption = await translateText(
            sourceDoc.mainImage.caption,
          );
        }
      }

      // 4. Save the newly translated document
      await sanity.createIfNotExists(translatedDoc);
      return targetId;
    };

    // Start the process with the initial document
    await processDocument(documentId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Translation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
