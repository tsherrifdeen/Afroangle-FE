import { groq } from "next-sanity";

// Get all categories (filtered by language)
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category" && language == $locale && !(_id in path('drafts.**'))] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug && language == $locale && !(_id in path('drafts.**'))][0] {
    _id,
    name,
    "slug": slug.current,
    description,
   "translations": *[
    _type == "translation.metadata" &&
    ^._id in translations[].value._ref
  ][0].translations[]{
    "language": _key,
    "slug": value->slug.current
  }
  }
`;

export const ARTICLES_IN_CATEGORY_COUNT = groq`
  count(*[
    _type == "article" && 
    $slug in categories[]->slug.current && 
    language == $locale && 
    !(_id in path('drafts.**'))
  ])
`;

export const ALL_CATEGORY_SLUGS_QUERY = groq`
  *[_type == "category" && defined(slug.current) && defined(language)]{
      "slug": slug.current,
      language
    }`