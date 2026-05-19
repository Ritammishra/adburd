import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adburd | Premium Digital Marketing Agency",
    template: "%s | Adburd",
  },
  description: "Adburd is a premium digital marketing agency driving revenue for small and medium-sized businesses in India through SEO, PPC, and more.",
  openGraph: {
    title: "Adburd | Premium Digital Marketing Agency",
    description: "Adburd is a premium digital marketing agency driving revenue for small and medium-sized businesses in India through SEO, PPC, and more.",
    url: "https://adburd.com",
    siteName: "Adburd",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
