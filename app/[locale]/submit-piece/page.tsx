import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import { Metadata } from "next";

interface SubmitPiecePageProps {
  params: Promise<{
    locale: string;
  }>;
}
// export async function generateMetadata({
//   params,
// }: SubmitPiecePageProps): Promise<Metadata> {
//   const { locale } = await params;

//   if (!hasLocale(locale)) notFound();

//   const dict = await getDictionary(locale);
//   const seo = dict.common.seo.submitPiece;
//   const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";
//   const currentUrl = `${baseUrl}/${locale}/submit-piece`;

//   return {
//     title: seo.title,
//     description: seo.description,
//     openGraph: {
//       title: seo.title,
//       description: seo.description,
//       url: currentUrl,
//     },
//     alternates: {
//       canonical: currentUrl,
//       languages: {
//         en: `${baseUrl}/en/submit-piece`,
//         fr: `${baseUrl}/fr/submit-piece`,
//       },
//     },
//   };
// }

const SubmitPiece = async ({ params }: SubmitPiecePageProps) => {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main className="">
      <SubmitPieceContent dict={dict} />
    </main>
  );
};

export default SubmitPiece;
