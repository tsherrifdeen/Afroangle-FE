import type { Metadata } from "next";
import { Rokkitt, Kumbh_Sans } from "next/font/google";
import Header from "@/components/common/Header";
import { notFound } from "next/navigation";
import Footer from "@/components/common/Footer";
import { hasLocale, getDictionary } from "./dictionaries";
import { GoogleAnalytics } from "@next/third-parties/google";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.home;

  return {
    metadataBase: new URL("https://afroangle.com"),

    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },

    description: seo.description,

    openGraph: {
      type: "website",
      url: "https://afroangle.com",
      siteName: seo.defaultTitle,
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: seo.ogAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: ["/og-image.jpg"],
    },

    icons: {
      icon: "/icon.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();
  const gaid = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  return (
    <html lang={locale}>
      <body className={`${rokkitt.variable} ${kumbhSans.variable} antialiased`}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
      <GoogleAnalytics gaId={gaid} />
    </html>
  );
}
