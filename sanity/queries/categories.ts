import { groq } from "next-sanity";

//get all categories
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description
  }
`;

export const TOTAL_CATEGORY_COUNT = groq`
  count(*[_type == "article" && $slug in categories[]->slug.current])
`;
