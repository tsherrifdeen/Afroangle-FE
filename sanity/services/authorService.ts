import { client } from "../lib/client";
import { GET_AUTHOR_BY_SLUG, AUTHOR_BY_ARTICLE_ID } from "../queries/authors";

// Get author by slug for a specific locale
export async function getAuthorBySlug(
  slug: string,
  locale: string,
): Promise<any | null> {
  return await client.fetch(
    GET_AUTHOR_BY_SLUG,
    { slug, locale }, // Added locale to match $locale in the GROQ query
    { next: { revalidate: 3600 } }, // Cache for 1 hour
  );
}

// Get author via the associated article ID
export async function getAuthorById(articleId: string): Promise<any | null> {
  // Locale isn't needed here because the article ID inherently points to a specific language version!
  return await client.fetch(
    AUTHOR_BY_ARTICLE_ID,
    { articleId },
    { next: { revalidate: 3600 } },
  );
}
