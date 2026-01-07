import { groq } from "next-sanity";

// --- 1. Single Article ---
export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "author":author-> {
      name,
      "slug": slug.current
    },
    "mainImage": {
    "url": mainImage.asset->url,
    "caption": mainImage.caption,
    },
  "category": categories[0]-> {
    name, 
    "slug": slug.current,
    },
    content,
  }
`;

// --- 2. All Articles (Paginated) ---
export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "author":author->{
      name,
      "slug": slug.current,
    },
    "mainImage": mainImage.asset->url, 
    "excerpt": pt::text(
      content[_type == "block"][0...1]
    ),
    "category": categories[0]-> {
      name,
      "slug": slug.current
      },
  }
`;

export const TOTAL_ARTICLES_COUNT = groq`count(*[_type == "article"])`;

// --- 3. Articles by Category (Paginated) ---
export const ARTICLES_BY_CATEGORY_QUERY = groq`
  *[_type == "article" && $slug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "author": author-> { 
      name,
      "slug": slug.current,
    },
    "mainImage": mainImage.asset->url,
    "category": categories[0]->{ 
      name,
      "slug": slug.current,
    }, 
    "excerpt": pt::text(
      content[_type == "block"][0...1]
    ),
  }
`;
