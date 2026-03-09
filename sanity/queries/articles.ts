import { defineQuery } from "next-sanity";

// --- 1. Single Article ---
export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug && language == $locale][0] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "translations": *[
      _type == ^._type && 
      _id match string::split(^._id, "__i18n_")[0] + "*" && 
      _id != ^._id && 
      !(_id in path('drafts.**'))
    ] {
      "language": language,
      "slug": slug.current
    },

    "author": author-> {
      name,
      "slug": slug.current
    },
    "audioUrl": audio.asset->url,
    "mainImage": {
      "url": mainImage.asset->url,
      "caption": mainImage.caption,
    },
    "categories": categories[]-> {
      name, 
      "slug": slug.current,
    },
    "content": content[]{
      ...,
      // Portable Text images
      _type == "image" => {
        alt,
        "url": asset->url
      },
      // Uploaded video (file) + optional external URL
      _type == "videoUpload" => {
        "videoFileUrl": videoFile.asset->url
      },
      // Social post embed
      _type == "socialMediaPost" => {
        url
      }
    }
  }
`);

// --- 2. All Articles (Paginated) ---
export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && language == $locale && !(_id in path('drafts.**'))] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "author": author->{
      name,
      "slug": slug.current,
    },
    "mainImage": mainImage.asset->url, 
    "excerpt": pt::text(content[_type == "block"][0...1]),
    "category": categories[0]-> {
      name,
      "slug": slug.current
    }
  }
`);

export const TOTAL_ARTICLES_COUNT = defineQuery(
  `count(*[_type == "article" && language == $locale && !(_id in path('drafts.**'))])`,
);

// --- 3. Articles by Category (Paginated) ---
export const ARTICLES_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "article" && $slug in categories[]->slug.current && language == $locale && !(_id in path('drafts.**'))] | order(publishedAt desc) [$start...$end] {
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
    "excerpt": pt::text(content[_type == "block"][0...1])
  }
`);

// --- 4. Articles by Author (Paginated) ---
export const ARTICLES_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "article" && author._ref == $authorId && language == $locale && !(_id in path('drafts.**'))] | order(publishedAt desc) [$start...$end] { 
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
    "excerpt": pt::text(content[_type == "block"][0...1])
  }
`);

export const RELATED_ARTICLES_QUERY = defineQuery(`
  *[
    _type == "article" && 
    _id != $articleId && 
    language == $locale && 
    !(_id in path('drafts.**')) &&
    // Safely checks if the current article's category slugs exist in the passed array
    count(categories[@->slug.current in $categorySlugs]) > 0
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "author": author->{
      name,
      "slug": slug.current,
    },
    "mainImage": mainImage.asset->url, 
    "excerpt": pt::text(content[_type == "block"][0...1]),
    "category": categories[0]-> {
      name,
      "slug": slug.current
    }
  }
`);

export const SEARCH_ARTICLES_QUERY = defineQuery(`*[
  _type == "article" && 
  language == $locale && 
  (title match $searchTerm + "*" || pt::text(content) match $searchTerm + "*")
] | order(publishedAt desc) [0...12] { 
  _id,
  title,
  publishedAt,
  "slug": slug.current,
  "author": author->{
    name,
    "slug": slug.current
  },
  "mainImage": mainImage.asset->url, 
  "excerpt": pt::text(content[_type == "block"][0...1]),
  "category": categories[0]-> {
    name,
    "slug": slug.current
  }
}`);
