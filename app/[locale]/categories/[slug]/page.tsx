import CategoryPage from "@/components/CategoryPage";
import {
  getCategoryBySlug,
  getAllCategorySlugs, // ← add to categoryService.ts (see below)
} from "@/sanity/services/categoryService";
import { Metadata } from "next";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";
import { cache } from "react";

const getCategory = cache(getCategoryBySlug);

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// ── 1. Static params — pre-renders every category at build time ────────────
export async function generateStaticParams() {
  const categories = await getAllCategorySlugs();
  return categories.map((c) => ({
    locale: c.language,
    slug: c.slug,
  }));
}

// ── 2. Metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const [category, dict] = await Promise.all([
    // ✅ parallel — was sequential
    getCategory(slug, locale),
    getDictionary(locale),
  ]);

  const { defaultTitle, ogTitle } = dict.common.seo.home;
  const currentUrl = `${BASE_URL}/${locale}/categories/${slug}`;

  if (!category) {
    return { title: dict.categories.notFound };
  }

  // ✅ Correct per-language URLs — category slugs differ per language
  const languageAlternates: Record<string, string> = {
    [locale]: currentUrl,
  };

  if (category.translations?.length) {
    for (const t of category.translations) {
      if (t.language && t.slug) {
        languageAlternates[t.language] =
          `${BASE_URL}/${t.language}/categories/${t.slug}`;
      }
    }
  }

  const description = `${category.description} - ${defaultTitle}`;

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: currentUrl,
      languages: languageAlternates, // ✅ correct slug per language
    },
    openGraph: {
      title: category.name || ogTitle,
      description,
      url: currentUrl,
      type: "website", // ✅ correct OG type for category/index pages
      locale: locale === "fr" ? "fr_FR" : "en_GB", // ✅ OG locale format
    },
  };
}

// ── 3. Page ────────────────────────────────────────────────────────────────
const Category = async ({ params }: CategoryPageProps) => {
  const { slug, locale } = await params;

  return (
    <main>
      <CategoryPage slug={slug} locale={locale} />
    </main>
  );
};

export default Category;
