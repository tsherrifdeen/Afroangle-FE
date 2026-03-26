import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
const LOCALES = ["en", "fr"] as const;

// Single batched query — one round trip instead of three
async function fetchAllContent() {
  const [articles, categories, authors] = await Promise.all([
    client.fetch(
      `*[_type == "article" && !(_id in path('drafts.**')) && defined(slug.current) && defined(language)]{
        "slug": slug.current,
        language,
        _updatedAt,
        "translations": *[
          _type == "translation.metadata" &&
          ^._id in translations[].value._ref
        ][0].translations[]{
          "lang": _key,
          "slug": value->slug.current
        }
      }`,
      {},
      { next: { revalidate: 3600, tags: ["articles"] } }
    ),

    client.fetch(
      `*[_type == "category" && defined(slug.current) && defined(language)]{
        "slug": slug.current,
        language,
        _updatedAt,
        "translations": *[
          _type == "translation.metadata" &&
          ^._id in translations[].value._ref
        ][0].translations[]{
          "lang": _key,
          "slug": value->slug.current
        }
      }`,
      {},
      { next: { revalidate: 3600, tags: ["categories"] } }
    ),

    client.fetch(
      `*[_type == "author" && defined(slug.current) && defined(language)]{
        "slug": slug.current,
        language,
        _updatedAt,
        "translations": *[
          _type == "translation.metadata" &&
          ^._id in translations[].value._ref
        ][0].translations[]{
          "lang": _key,
          "slug": value->slug.current
        }
      }`,
      {},
      { next: { revalidate: 86400, tags: ["authors"] } }
    ),
  ]);

  return { articles, categories, authors };
}

// Build the hreflang alternates object from translation metadata
function buildAlternates(
  translations: Array<{ lang: string; slug: string }> | null,
  pathPrefix: string
): MetadataRoute.Sitemap[number]["alternates"] {
  if (!translations?.length) return undefined;

  const languages: Record<string, string> = {};
  for (const t of translations) {
    if (t?.lang && t?.slug) {
      languages[t.lang] = `${BASE_URL}/${t.lang}${pathPrefix}${t.slug}`;
    }
  }

  return Object.keys(languages).length ? { languages } : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, categories, authors } = await fetchAllContent();

  // ── Static pages ───────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => [
    {
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          fr: `${BASE_URL}/fr`,
        },
      },
    },
    {
      url: `${BASE_URL}/${lang}/articles`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,   // new articles appear here
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/articles`,
          fr: `${BASE_URL}/fr/articles`,
        },
      },
    },
    {
      url: `${BASE_URL}/${lang}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/categories`,
          fr: `${BASE_URL}/fr/categories`,
        },
      },
    },
    {
      url: `${BASE_URL}/${lang}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/about`,
          fr: `${BASE_URL}/fr/about`,
        },
      },
    },
    {
      url: `${BASE_URL}/${lang}/submit-piece`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/submit-piece`,
          fr: `${BASE_URL}/fr/submit-piece`,
        },
      },
    },
  ]);

  // ── Articles ───────────────────────────────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${BASE_URL}/${article.language}/articles/${article.slug}`,
    lastModified: article._updatedAt ? new Date(article._updatedAt) : new Date(),
    changeFrequency: "weekly" as const,   // ✅ not daily — articles rarely change post-publish
    priority: 0.8,
    alternates: buildAlternates(article.translations, "/articles/"),
  }));

  // ── Categories ─────────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat: any) => ({
    url: `${BASE_URL}/${cat.language}/categories/${cat.slug}`,
    lastModified: cat._updatedAt ? new Date(cat._updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: buildAlternates(cat.translations, "/categories/"),
  }));

  // ── Authors ────────────────────────────────────────────────────────────
  const authorPages: MetadataRoute.Sitemap = authors.map((author: any) => ({
    url: `${BASE_URL}/${author.language}/authors/${author.slug}`,
    lastModified: author._updatedAt ? new Date(author._updatedAt) : new Date(),
    changeFrequency: "monthly" as const,  // ✅ authors barely change
    priority: 0.5,
    alternates: buildAlternates(author.translations, "/authors/"),
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...categoryPages,
    ...authorPages,
  ];
}