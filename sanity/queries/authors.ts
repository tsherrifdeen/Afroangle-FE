import { groq } from "next-sanity";

export const GET_AUTHOR_BY_SLUG = groq` 
  *[_type == "author" && slug.current == $slug && language == $locale && !(_id in path('drafts.**'))][0]{
    _id,
    name, 
    bio,
    "image": image.asset->url,
    "alt": image.alt,
    socials[]{platform, url},
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

export const ARTICLES_IN_AUTHOR_COUNT = groq`
  count(*[
    _type == "article" &&
    author._ref == $authorId &&
    language == $locale && 
    !(_id in path('drafts.**'))
  ])
`;

export const AUTHOR_BY_ARTICLE_ID = groq`
  *[_type == "article" && _id == $articleId && !(_id in path('drafts.**'))][0].author-> {
    name,
    "slug": slug.current,
    bio
  }
`;
