import { client } from "@/sanity/lib/client";
import {
  ALL_CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
} from "../queries/categories";
import {
  ALL_CATEGORIES_QUERY_RESULT,
  CATEGORY_BY_SLUG_QUERY_RESULT,
} from "../types";

// Get all categories for a specific locale
export async function getAllCategories(
  locale: string,
): Promise<ALL_CATEGORIES_QUERY_RESULT> {
  // 1 hour cache (3600s) is usually good for categories since they rarely change
  return await client.fetch(
    ALL_CATEGORIES_QUERY,
    { locale },
    { next: { revalidate: 3600 } },
  );
}

// Get category by slug for a specific locale
export async function getCategoryBySlug(
  slug: string,
  locale: string,
): Promise<CATEGORY_BY_SLUG_QUERY_RESULT | null> {
  return await client.fetch(
    CATEGORY_BY_SLUG_QUERY,
    { slug, locale }, // Passed both slug and locale
    { next: { revalidate: 3600 } },
  );
}
