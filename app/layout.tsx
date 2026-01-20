import type { Metadata } from "next";
import { Rokkitt, Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});
// const didactGothic = Didact_Gothic({
//   variable: "--font-didact-gothic",
//   subsets: ["latin"],
//   weight: "400",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Afroangle",
  description: "The African lens for global issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rokkitt.variable} ${kumbhSans.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
