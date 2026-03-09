import { client } from "../lib/client";
import {
  GET_COMMENTS_BY_ARTICLE,
  TOTAL_COMMENTS_COUNT,
} from "../queries/comments";
import { GET_COMMENTS_BY_ARTICLE_RESULT } from "../types";
import { PaginatedResponse } from "./articleService";

const DEFAULT_LIMIT = 5;

export async function getArticleComments(
  articleId: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
): Promise<PaginatedResponse<GET_COMMENTS_BY_ARTICLE_RESULT>> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const [data, total] = await Promise.all([
    client.fetch(
      GET_COMMENTS_BY_ARTICLE,
      { _id: articleId, start, end },
      { next: { revalidate: 10 } },
    ),
    client.fetch(
      TOTAL_COMMENTS_COUNT,
      { _id: articleId },
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
