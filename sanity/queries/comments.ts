import { groq } from "next-sanity";

export const GET_COMMENTS_BY_ARTICLE = groq`
  *[_type=="comment" && approved==true && article._ref==$_id] | order(_createdAt desc) [$start...$end] { 
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
    article_ref == $_id
  ])
`;
