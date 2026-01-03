import CategoryPage from "@/components/CategoryPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
const Category = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <main className="">
      <CategoryPage slug={slug} />
    </main>
  );
};

export default Category;
