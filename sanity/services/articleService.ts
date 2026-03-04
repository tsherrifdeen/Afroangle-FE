import { client } from "@/sanity/lib/client";
import {
  ALL_ARTICLES_QUERY,
  TOTAL_ARTICLES_COUNT,
  ARTICLES_BY_CATEGORY_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLES_BY_AUTHOR_QUERY,
  RELATED_ARTICLES_QUERY,
} from "../queries/articles";
import {
  ALL_ARTICLES_QUERY_RESULT,
  ARTICLE_BY_SLUG_QUERY_RESULT,
  ARTICLES_BY_CATEGORY_QUERY_RESULT,
} from "../types";
import { ARTICLES_IN_CATEGORY_COUNT } from "../queries/categories";
import { ARTICLES_IN_AUTHOR_COUNT } from "../queries/authors";

// Helper Interface for Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const DEFAULT_LIMIT = 10;

// --- 1. Get All Articles (Paginated) ---
export async function getAllArticles(
  locale: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
): Promise<PaginatedResponse<ALL_ARTICLES_QUERY_RESULT>> {
  const start = (page - 1) * limit;
  const end = start + limit;

  // Run both the data fetch and the count fetch in parallel for speed
  const [data, total] = await Promise.all([
    client.fetch(
      ALL_ARTICLES_QUERY,
      { locale, start, end },
      { next: { revalidate: 3600 } },
    ),
    //Added locale to the variables object
    client.fetch(
      TOTAL_ARTICLES_COUNT,
      { locale },
      { next: { revalidate: 3600 } },
    ),
  ]);

  return {
    data,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

// --- 2. Get Articles By Category (Paginated) ---
export async function getArticlesByCategory(
  slug: string,
  locale: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
): Promise<PaginatedResponse<ARTICLES_BY_CATEGORY_QUERY_RESULT>> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const [data, total] = await Promise.all([
    client.fetch(
      ARTICLES_BY_CATEGORY_QUERY,
      { slug, locale, start, end },
      { next: { revalidate: 3600 } },
    ),
    // Added locale to the variables object
    client.fetch(
      ARTICLES_IN_CATEGORY_COUNT,
      { slug, locale },
      { next: { revalidate: 3600 } },
    ),
  ]);

  return {
    data,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

// --- 3. Get Single Article (No Pagination Needed) ---
export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<ARTICLE_BY_SLUG_QUERY_RESULT | null> {
  return await client.fetch(
    ARTICLE_BY_SLUG_QUERY,
    { slug, locale },
    { next: { revalidate: 10 } },
  );
}

// --- 4. Get Articles by author ---
export async function getArticlesByAuthor(
  authorId: string,
  locale: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
): Promise<PaginatedResponse<ARTICLES_BY_CATEGORY_QUERY_RESULT>> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const [data, total] = await Promise.all([
    client.fetch(
      ARTICLES_BY_AUTHOR_QUERY,
      { authorId, locale, start, end },
      { next: { revalidate: 10 } },
    ),
    client.fetch(
      ARTICLES_IN_AUTHOR_COUNT,
      { authorId, locale },
      { next: { revalidate: 10 } },
    ),
  ]);

  return {
    data,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

// --- 5. Get Related Articles ---
export async function getRelatedArticles(
  articleId: string,
  categoryIds: string[],
  authorId: string,
  locale: string,
) {
  return await client.fetch(
    RELATED_ARTICLES_QUERY,
    { articleId, categoryIds, authorId, locale },
    { next: { revalidate: 3600 } }, // Added a sensible cache here too!
  );
}
