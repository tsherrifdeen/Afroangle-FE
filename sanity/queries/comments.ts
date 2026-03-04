import { groq } from "next-sanity";

export const GET_COMMENTS_BY_ARTICLE = groq`
  *[_type == "comment" && approved == true && article._ref == $_id && !(_id in path('drafts.**'))] | order(_createdAt desc) [$start...$end] { 
    _id, 
    name,
    message,
    _createdAt
  }
`;

export const TOTAL_COMMENTS_COUNT = groq`
  count(*[
    _type == "comment" &&
    approved == true &&
    article._ref == $_id && // Fixed typo here (was article_ref)
    !(_id in path('drafts.**'))
  ])
`;
