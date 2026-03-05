// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Prevent crawlers from indexing Sanity Studio and api if it's hosted on the same domain
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
