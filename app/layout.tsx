import type { Metadata } from "next";
import { Rokkitt, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "300",
});
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Afroangle Next App",
  description: "The African lens for global issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rokkitt.variable} ${poppins.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
