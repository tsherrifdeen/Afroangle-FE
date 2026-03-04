import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/sanity/services/categoryService";
import { Metadata } from "next";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.home;
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    return {
      title: dict.categories.notFound,
    };
  }

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name || seo.ogTitle,
      description: `${category.description} - ${seo.defaultTitle}`,
    },
  };
}

const Category = async ({ params }: CategoryPageProps) => {
  const { slug, locale } = await params;
  return (
    <main className="">
      <CategoryPage slug={slug} locale={locale} />
    </main>
  );
};

export default Category;
