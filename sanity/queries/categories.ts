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
    
    // Fetch translations for the Language Switcher
    "translations": *[
      _type == ^._type && 
      _id match string::split(^._id, "__i18n_")[0] + "*" && 
      _id != ^._id && 
      !(_id in path('drafts.**'))
    ] {
      "language": language,
      "slug": slug.current
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
