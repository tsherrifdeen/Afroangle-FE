import { client } from "../lib/client";
import { GET_AUTHOR_BY_SLUG, AUTHOR_BY_ARTICLE_ID, ALL_AUTHOR_SLUGS } from "../queries/authors";
import {
  AUTHOR_BY_ARTICLE_ID_RESULT,
  GET_AUTHOR_BY_SLUG_RESULT,
} from "../types";

// Get author by slug for a specific locale
export async function getAuthorBySlug(
  slug: string,
  locale: string,
): Promise<GET_AUTHOR_BY_SLUG_RESULT> {
  return await client.fetch(
    GET_AUTHOR_BY_SLUG,
    { slug, locale }, // Added locale to match $locale in the GROQ query
    { next: { revalidate: 3600 } }, // Cache for 1 hour
  );
}

// Get author via the associated article ID
export async function getAuthorById(
  articleId: string,
): Promise<AUTHOR_BY_ARTICLE_ID_RESULT> {
  return await client.fetch(
    AUTHOR_BY_ARTICLE_ID,
    { articleId },
    { next: { revalidate: 3600 } },
  );
}
// Get all slugs for generateStaticParams
export async function getAllAuthorSlugs() {
  return client.fetch<Array<{ slug: string; language: string }>>(
   ALL_AUTHOR_SLUGS,
    {},
    { next: { revalidate: 86400, tags: ["authors"] } }
  );
}