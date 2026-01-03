import { client } from "@/sanity/lib/client";
import {
  ALL_CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
} from "../queries/categories";

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

//get all categories
export async function getAllCategories(): Promise<CategoryData[]> {
  // 1 hour cache (3600s) is usually good for categories since they rarely change
  return await client.fetch(
    ALL_CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );
}

// get category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryData | null> {
  return await client.fetch(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );
}
