import AboutPageContent from "@/components/AboutPage";
import { Metadata } from "next";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.about;
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
  const currentUrl = `${baseUrl}/${locale}/about`;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: currentUrl,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/about`,
        fr: `${baseUrl}/fr/about`,
      },
    },
  };
}
const About = async ({ params }: AboutPageProps) => {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main className="">
      <AboutPageContent dict={dict} />
    </main>
  );
};

export default About;
