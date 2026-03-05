// app/sitemap.ts
import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace this with your actual production URL later!
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

  // Fetch all published articles with their language and update times
  const query = `*[_type == "article" && !(_id in path('drafts.**'))] {
    "slug": slug.current,
    language,
    _updatedAt
  }`;

  const articles = await client.fetch(query);

  // Map the articles to sitemap URL objects
  const articleUrls: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${baseUrl}/${article.language}/articles/${article.slug}`,
    lastModified: article._updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Add your static localized routes (Home, Categories index, etc.)
  const staticRoutes: MetadataRoute.Sitemap = ["en", "fr"].map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [...staticRoutes, ...articleUrls];
}
