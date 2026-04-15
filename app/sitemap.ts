// app/sitemap.ts
import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
const LOCALES = ["en", "fr"] as const;

type Translation = { lang: string; slug: string };

type SanityArticle = {
  slug: string;
  language: string;
  _updatedAt: string;
  translations: Translation[] | null;
};

type SanityDocument = {
  slug: string;
  language: string;
  _updatedAt: string;
  translations: Translation[] | null;
};

// ── Safe fetch wrapper — returns [] instead of crashing sitemap ───────────
async function safeFetch<T>(
  query: string,
  options: Parameters<typeof client.fetch>[2]
): Promise<T[]> {
  try {
    const result = await client.fetch<T[]>(query, {}, options);
    return result ?? [];
  } catch (err) {
    console.error("[sitemap] Fetch failed:", err);
    return []; // sitemap still generates — just without this content type
  }
}

async function fetchAllContent() {
  const translationFragment = `
    "translations": *[
      _type == "translation.metadata" &&
      ^._id in translations[].value._ref
    ][0].translations[]{
      "lang": _key,
      "slug": value->slug.current
    }
  `;

  const [articles, categories, authors] = await Promise.all([
    safeFetch<SanityArticle>(
      `*[_type == "article" && !(_id in path('drafts.**')) && defined(slug.current) && defined(language)]{
        "slug": slug.current,
        language,
        _updatedAt,
        ${translationFragment}
      }`,
      { next: { revalidate: 3600, tags: ["articles"] } }
    ),
    safeFetch<SanityDocument>(
      `*[_type == "category" && defined(slug.current) && defined(language)]{
        "slug": slug.current,
        language,
        _updatedAt,
        ${translationFragment}
      }`,
      { next: { revalidate: 3600, tags: ["categories"] } }
    ),
    safeFetch<SanityDocument>(
      `*[_type == "author" && defined(slug.current) && defined(language)]{
        "slug": slug.current,
        language,
        _updatedAt,
        ${translationFragment}
      }`,
      { next: { revalidate: 86400, tags: ["authors"] } }
    ),
  ]);

  return { articles, categories, authors };
}

// ── Build hreflang alternates including x-default ─────────────────────────
function buildAlternates(
  translations: Translation[] | null,
  currentLang: string,
  currentSlug: string,
  pathPrefix: string
): MetadataRoute.Sitemap[number]["alternates"] {
  const languages: Record<string, string> = {};

  // Always include the current document itself
  languages[currentLang] = `${BASE_URL}/${currentLang}${pathPrefix}${currentSlug}`;

  // Add sibling translations
  if (translations?.length) {
    for (const t of translations) {
      if (t?.lang && t?.slug && t.lang !== currentLang) {
        languages[t.lang] = `${BASE_URL}/${t.lang}${pathPrefix}${t.slug}`;
      }
    }
  }

  // x-default points to English — tells Google which is the canonical fallback
  if (languages["en"]) {
    languages["x-default"] = languages["en"];
  }

  return Object.keys(languages).length ? { languages } : undefined;
}

// ── Build static page alternates ──────────────────────────────────────────
function staticAlternates(path: string) {
  return {
    languages: {
      en: `${BASE_URL}/en${path}`,
      fr: `${BASE_URL}/fr${path}`,
      "x-default": `${BASE_URL}/en${path}`, // ✅ English as default
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, categories, authors } = await fetchAllContent();

  // Use a stable date for static pages — don't use new Date() which changes every request
  const SITE_LAUNCH = new Date("2024-01-01");

  // ── Static pages — one entry per locale ───────────────────────────────
  const staticPages: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => [
    {
      url: `${BASE_URL}/${lang}`,
      lastModified: SITE_LAUNCH,           // ✅ stable — not new Date() every request
      changeFrequency: "daily" as const,
      priority: 1.0,
      alternates: staticAlternates(""),
    },
    {
      url: `${BASE_URL}/${lang}/articles`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "hourly" as const,
      priority: 0.9,
      alternates: staticAlternates("/articles"),
    },
    {
      url: `${BASE_URL}/${lang}/categories`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: staticAlternates("/categories"),
    },
    {
      url: `${BASE_URL}/${lang}/about`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: staticAlternates("/about"),
    },
    {
      url: `${BASE_URL}/${lang}/submit-piece`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly" as const,
      priority: 0.4,
      alternates: staticAlternates("/submit-piece"),
    },
  ]);

  // ── Articles ───────────────────────────────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/${article.language}/articles/${article.slug}`,
    lastModified: article._updatedAt ? new Date(article._updatedAt) : SITE_LAUNCH,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: buildAlternates(
      article.translations,
      article.language,
      article.slug,
      "/articles/"
    ),
  }));

  // ── Categories ─────────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.language}/categories/${cat.slug}`,
    lastModified: cat._updatedAt ? new Date(cat._updatedAt) : SITE_LAUNCH,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: buildAlternates(
      cat.translations,
      cat.language,
      cat.slug,
      "/categories/"
    ),
  }));

  // ── Authors ────────────────────────────────────────────────────────────
  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${BASE_URL}/${author.language}/authors/${author.slug}`,
    lastModified: author._updatedAt ? new Date(author._updatedAt) : SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.5,
    alternates: buildAlternates(
      author.translations,
      author.language,
      author.slug,
      "/authors/"
    ),
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...categoryPages,
    ...authorPages,
  ];
}