import { cache } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getAuthorBySlug as _getAuthorBySlug,
  getAllAuthorSlugs, // ← add this to authorService.ts (see below)
} from "@/sanity/services/authorService";
import AuthorPageContent from "@/components/AuthorPage";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { getExcerpt } from "@/lib/portableTextToPlain";

const getAuthor = cache(_getAuthorBySlug);

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

interface AuthorPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// ── 1. Static params — pre-renders every author page at build time ─────────
export async function generateStaticParams() {
  const authors = await getAllAuthorSlugs();
  return authors.map((a) => ({
    locale: a.language,
    slug: a.slug,
  }));
}

// ── 2. Metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const [author, dict] = await Promise.all([
    getAuthor(slug, locale),
    getDictionary(locale),
  ]);

  const { defaultTitle, ogTitle } = dict.common.seo.home;
  const currentUrl = `${BASE_URL}/${locale}/authors/${slug}`;

  if (!author) {
    return { title: dict.authors.notExist };
  }

  const description = author.bio
    ? getExcerpt(author.bio)
    : `${author.name} - ${defaultTitle}`;

  // ✅ Correct per-language URLs from translation metadata
  // Author slugs differ per language — never reuse the current slug for both
  const languageAlternates: Record<string, string> = {
    [locale]: currentUrl,
  };

  if (author.translations?.length) {
    for (const t of author.translations) {
      if (t.language && t.slug) {
        languageAlternates[t.language] =
          `${BASE_URL}/${t.language}/authors/${t.slug}`;
      }
    }
  }

  return {
    title: author.name,
    description,
    alternates: {
      canonical: currentUrl,
      languages: languageAlternates, // ✅ correct slug per language
    },
    openGraph: {
      title: author.name || ogTitle,
      description,
      url: currentUrl,
      type: "profile", // ✅ correct OG type for person pages
      locale: locale === "fr" ? "fr_FR" : "en_GB", // ✅ OG locale format
      // ✅ profile-specific OG tags — used by Facebook and LinkedIn
      firstName: author.name?.split(" ")[0],
      lastName: author.name?.split(" ").slice(1).join(" "),
      ...(author.image?.url && {
        images: [
          {
            url: author.image.url,
            width: 800,
            height: 800,
            alt: author.name,
          },
        ],
      }),
    },
  };
}

// ── 3. Page ────────────────────────────────────────────────────────────────
export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug, locale } = await params;
  const author = await getAuthor(slug, locale);

  if (!author) notFound();

  return <AuthorPageContent author={author} locale={locale} />;
}
